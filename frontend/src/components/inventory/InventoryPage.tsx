import React, { useState, useEffect } from "react";
import Header from "@/layouts/navigation/Header";
import Footer from "@/layouts/navigation/Footer";
import SellerInfo from "@/components/inventory/SellerInfo";
import ProductList from "@/components/inventory/ProductList";
import { Link, useNavigate } from "react-router-dom";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

interface InventoryPageProps {
  token: string | null;
}

interface ModelResponseDTO {
  modelId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  see: boolean;
  isDelete: boolean;
  images: Array<string>;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ token }) => {
  const [seller, setSeller] = useState({
    name: "Trần Hoàng Sơn",
    rating: 4.8,
    productCount: 7,
    location: "Gò Vấp, Hồ Chí Minh",
  });
  const [products, setProducts] = useState([]);
  // const router = useRouter();
  const navigate = useNavigate();

  const handleFollow = () => {
    console.log("Follow seller:", seller.name);
    // TODO: Gọi API để theo dõi người bán
  };

  const handleViewMore = (productId: string) => {
    console.log("View more product:", productId);
    // router.push(`/product/${productId}`); // Điều hướng đến trang chi tiết
    navigate(`/product/${productId}`)
    // TODO: Điều hướng đến trang chi tiết sản phẩm
  };

  useEffect(() => {
    if (!token) {
      // router.push("/login");
      navigate("/login")
      // alert("Vui lòng đăng nhập để sử dụng chức năng này!");
      return;
    }
    fetch("http://localhost:8080/model_trade/api/model/getAllModelByUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Lỗi: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.result)) {
          setProducts(data.result);
        } else {
          console.error("API không trả về result là mảng:", data);
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        if (err.message.includes("401")) {
          // Xử lý token hết hạn
          document.cookie = "token=; max-age=0"; // Xóa cookie trên client
          // router.push("/login");
          navigate("/login")
        }
      });
  }, [token, navigate]);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header />
      <div className="flex-grow w-4/5 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full ">
            <div className="flex w-full items-center my-auto  ">
              <h2 className="text-xl h-full text-center font-bold mr-5">
                Đang hiển thị ({products.length})
              </h2>
              <div className="flex justify-center">
                {/* <Link href="/uploadProduct">
                  <button
                    // onClick={onFollow}
                    className="bg-orange-500 text-white px-4 py-2 my-6 rounded hover:bg-orange-600 transition cursor-pointer"
                  >
                    Thêm sản phẩm
                  </button>
                </Link> */}
                <Link to="/uploadProduct">
                  <button
                    // onClick={onFollow}
                    className="bg-orange-500 text-white px-4 py-2 my-6 rounded hover:bg-orange-600 transition cursor-pointer"
                  >
                    Thêm sản phẩm
                  </button>
                </Link>
              </div>
            </div>
            {/* <p className="text-gray-600 mb-4">Đã bán ({products.length - 1})</p> */}

            <ProductList products={products} onViewMore={handleViewMore} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InventoryPage;
