import Footer from "@/layouts/navigation/Footer";
import Header from "@/layouts/navigation/Header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICart {
  id: string;
  cartItems: ICartItem[];
}

interface ICartItem {
  id: string;
  model: IModel;
  selected: boolean;
  quantity: number;
}

interface IModel {
  modelId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: IModelImage[]
}

interface IModelImage {
  miid: string,
  image: IImage
}

interface IImage {
  imageId: string,
  url: string
  uploadDate: Date,
  loudinaryImageId: string
}

const Cart = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [cart, setCart] = useState<ICart | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/model_trade/api/carts/self", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCart(data.result))
      .catch(err => console.error(err));
  }, []);

  const toggleSelect = (id: string) => {
    if (!cart) return;
    const newItems = cart.cartItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setCart({ ...cart, cartItems: newItems });
  };

  const updateCartItemApi = async (modelId: string, quantity: number) => {
    const token = Cookies.get("token");
    const resp = await fetch("http://localhost:8080/model_trade/api/carts", {
      method: 'POST',
      body: JSON.stringify({
        modelId,
        "isSelected": true,
        quantity
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      credentials: "include",
    })
    const data = await resp.json()
    if (data?.code === 200) {
      alert(`Thành công: ${data?.message}`)
      return true
    } else {
      alert(`Lỗi: ${data?.message}`)
      return false;
    }
  }

  const updateCartItemLocal = (newItem: ICartItem) => {
    if (!cart) return;

    const newItems = cart?.cartItems.map(item => {
      if (item.id === newItem.id) {
        return {
          ...newItem
        };
      } else {
        return item
      }
    }).filter(v => v.model.quantity > 0)

    setCart(prev => {
      if (!prev) return prev;
      return { ...prev, cartItems: [...newItems] };
    })
  }

  const changeQuantity = async (cartItem: ICartItem, diff: number) => {
    if (!cart) return;

    const newQuantity = cartItem.quantity + diff;
    const result = await updateCartItemApi(cartItem.model.modelId, diff)

    if (result) {
      updateCartItemLocal({ ...cartItem, quantity: newQuantity } as ICartItem)
    }
  };

  const total = cart?.cartItems.reduce(
    (sum, item) =>
      item.selected ? sum + item.model.price * item?.quantity : sum,
    0
  ) ?? 0;

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Giỏ hàng của bạn</h1>

        {!cart || cart.cartItems.length === 0 ? (
          <p className="text-gray-500">Giỏ hàng trống.</p>
        ) : (
          <div className="space-y-6">
            {cart.cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelect(item.id)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="flex gap-2">
                    <img
                      onClick={() => navigate(`/product/${item.model.modelId}`)}
                      className="cursor-pointer w-[120px] h-[80px] object-cover"
                      src={item.model.images[0]?.image.url}
                    />

                    <div>
                      <h2 className="text-lg font-semibold">
                        {item.model.name}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2">{item.model.description}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="w-8 h-8 bg-gray-200 text-xl rounded"
                          onClick={() => changeQuantity(item, -1)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="w-8 h-8 bg-gray-200 text-xl rounded"
                          onClick={() => changeQuantity(item, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {(item.model.price * item.quantity).toLocaleString()} đ
                  </p>
                  <button onClick={() => changeQuantity(item, -item.quantity)} className="cursor-pointer text-sm text-red-500 hover:underline mt-2">
                    Xóa
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right border-t pt-4">
              <p className="text-xl font-bold">
                Tổng cộng:{" "}
                <span className="text-green-700">
                  {total.toLocaleString()} đ
                </span>
              </p>
              <button className="cursor-pointer mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Thanh toán các sản phẩm đã chọn
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;