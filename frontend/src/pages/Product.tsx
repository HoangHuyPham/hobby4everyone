import React from "react";
import ProductDetailPage from "@/components/inventory/ProductDetailPage";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// interface PageProps {
//   params: { id: string };
// }

interface IProduct {
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

const Product = () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  const token = Cookies.get("token");
  const navigate = useNavigate()
  const params = useParams()
  const [product, setProduct] = useState<IProduct | null>()

  if (!token) {
    // redirect("/login");
    navigate("/login")
  }

  useEffect(()=>{
    fetchProduct()
  }, [])

  // Fetch dữ liệu sản phẩm từ API
  // let product: Product | null = null;
  // try {
  //   const res = await fetch(
  //     `http://localhost:8080/model_trade/api/model/${productId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       mode: "cors",
  //       credentials: "include",
  //     }
  //   );

  //   if (!res.ok) {
  //     throw new Error(`Lỗi: ${res.statusText}`);
  //   }

  //   const data = await res.json();
  //   product = data.result || null; // Giả định API trả về { result: product }
  // } catch (err) {
  //   console.error("Lỗi fetch sản phẩm:", err);
  //   // if (err.message.includes("401")) {
  //   //   redirect("/login");
  //   // }
  //   product = null; // Fallback nếu fetch thất bại
  // }

  const fetchProduct = async () => {
    let product: Product | null = null;
    const productId = params.id;

    try {
      const res = await fetch(
        `http://localhost:8080/model_trade/api/model/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`Lỗi: ${res.statusText}`);
      }

      const data = await res.json();
      product = data.result || null; // Giả định API trả về { result: product }
    } catch (err) {
      console.error("Lỗi fetch sản phẩm:", err);
      // if (err.message.includes("401")) {
      //   redirect("/login");
      // }
      product = null; // Fallback nếu fetch thất bại
    }
    setProduct(product)
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
    // Hoặc redirect/error page
  }

  return <ProductDetailPage product={product} token={token} />;
};

export default Product;
