import Footer from "@/layouts/navigation/Footer";
import Header from "@/layouts/navigation/Header";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ExchangePopup from "../home/ExchangePopup";

interface Product {
  modelId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  see: boolean;
  isDelete: boolean;
  images: Array<string>;
  seller?: {
    userId: string;
    name: string;
    phoneNumber: string;
    createDate: string;
  };
}

interface ProductDetailPageProps {
  product: Product;
}




const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [selectedPayAmount, setSelectedPayAmount] = useState("");

  // Hàm gọi exchange
  const handleExchange = async (postId: String) => {
    try {
      setSelectedModelId(product.modelId)
      setSelectedPayAmount(product.price.toString())
      setShowPopup(true);

    } catch (error) {
      console.error(error);
    }
  };
  // Hàm định dạng giá thủ công (dùng dấu chấm cho locale tiếng Việt)
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };
  /// Hàm tính toán thời gian hoạt động
  const getActivityTime = (createDate: string | undefined) => {
    if (!createDate) return "Không có thông tin";

    // Parse chuỗi ISO 8601 thành Date
    const dateObj = new Date(createDate);
    if (isNaN(dateObj.getTime())) {
      return "Ngày không hợp lệ";
    }

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - dateObj.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30); // Giả sử 1 tháng = 30 ngày
    const diffYears = Math.floor(diffDays / 365);

    if (diffDays <= 31) {
      return `${diffDays} ngày trước`;
    } else if (diffDays > 31 && diffYears < 1) {
      return `${diffMonths} tháng trước`;
    } else {
      return `${diffYears} năm trước`;
    }
  };
  // State để theo dõi ảnh chính được chọn
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images[0] || "/placeholder-image1.jpg"
  );

  // Hàm xử lý khi click vào thumbnail
  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };


  const addToCart = async () => {
    const token = Cookies.get("token");
    const resp = await fetch("http://localhost:8080/model_trade/api/carts", {
      method: 'POST',
      body: JSON.stringify({
        "modelId": product.modelId,
        "isSelected": true,
        "quantity": 1,
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
    } else {
      alert(`Lỗi: ${data?.message}`)
    }
  }
  const handleAddToCart = async () => {
    await addToCart()
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-white container rounded-2xl mx-auto md:w-3/4 my-4 md:px-4 px-2 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Hình ảnh sản phẩm */}
          <div className="w-full lg:w-1/2">
            <div className="w-full md:h-124 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleThumbnailClick(image)}
                >
                  <img
                    src={image || `/placeholder-image${index + 2}.jpg`}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="w-full  pl-10 lg:w-1/2">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p>Số lượng: {product.quantity}</p>
            <p className="text-red-600 text-xl mt-2">
              {formatPrice(product.price)}
            </p>

            <div className="mt-6 flex space-x-4">
              <button className="bg-green-600 text-white py-2 px-4 cursor-pointer rounded-lg hover:bg-green-700 text-xl"
                onClick={() => handleExchange(product.modelId)}
              >
                Đặt hàng

              </button>
              <button onClick={handleAddToCart} className="bg-blue-600 text-white py-2 cursor-pointer px-4 rounded-lg hover:bg-blue-700 flex items-center text-xl">
                <FaShoppingCart className="mr-2" /> Thêm vào giỏ
              </button>
            </div>
            {/* Phần chat và thông tin người bán */}
            <div className="w-full bg-gray-100 justify-center p-4 rounded-lg mt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <img
                    src="/placeholder-avatar.jpg"
                    alt={product.seller?.name || "Seller Avatar"}
                    className="w-10 h-10 rounded-full mr-2"
                  /> */}
                  <div>
                    <p className=" pb-4 font-bold text-xl">
                      {product.seller?.name || "Unknown Seller"}
                    </p>
                    <p className="text-yellow-500 font-bold text-xl">
                      Số điện thoại {product.seller?.phoneNumber || 0}
                    </p>
                  </div>
                </div>
                {/* <button className="bg-blue-600 text-white text-sm py-1 px-2 rounded hover:bg-blue-700">
                  Theo dõi
                </button> */}
              </div>
              <p className="text-xl text-gray-500 mt-2">
                Đã tham gia: {getActivityTime(product.seller?.createDate)}
              </p>
              {/* <div className="mt-4 text-sm text-gray-600">
                <p>Đánh giá: 98% (174 đánh giá)</p> 
                <p>Đang bán: 5 sản phẩm</p> 
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-white container rounded-2xl mx-auto w-3/4 my-4 px-4 py-6">
        <div className="w-full px-4">
          <p className="text-black font-bold mt-4">Mô tả chi tiết</p>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4">
            <p className="text-black font-bold mt-6">Thông tin chi tiết</p>
            <div className="mt-2">
              <span className="text-sm text-gray-500">
                Tình trạng: {product.see ? "Mới" : "Đã dùng"}
              </span>
              <span className="text-sm text-gray-500 ml-4">
                Địa chỉ: Hồ Chí Minh
              </span>{" "}
              {/* Có thể lấy từ API */}
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <ExchangePopup
          modelId={selectedModelId}
          payAmount={selectedPayAmount}
          onClose={() => setShowPopup(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
