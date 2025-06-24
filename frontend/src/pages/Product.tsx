
import ProductDetailPage from "@/components/inventory/ProductDetailPage";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const Product = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate()
  const params = useParams()
  const [product, setProduct] = useState<Product | null>()

  if (!token) {
    navigate("/login")
  }

  useEffect(()=>{
    fetchProduct()
  }, [])

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
      product = null; // Fallback nếu fetch thất bại
    }
    setProduct(product)
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
    // Hoặc redirect/error page
  }

  return <ProductDetailPage product={product} />;
};

export default Product;
