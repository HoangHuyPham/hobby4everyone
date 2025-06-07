// src/app/inventory/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/layout/navigation/Header";
import Footer from "../components/layout/navigation/Footer";
import SellerInfo from "../components/inventory/SellerInfo";
import ProductList from "../components/inventory/ProductList";

interface InventoryPageProps {}

interface ModelResponseDTO{
  modelId:string;
  name:string;
  description:string;
  price:number;
  quantity:number;
  see:boolean;
  isDelete:boolean;
  images:Array<string>
}

const InventoryPage: React.FC<InventoryPageProps> = () => {
  const [seller, setSeller] = useState({
    name: "Xưởng sản xuất mô hình",
    rating: 4.8,
    productCount: 7,
    location: "Gò Vấp, Hồ Chí Minh",
  });
  const [products, setProducts] = useState([]);

  const handleFollow = () => {
    console.log("Follow seller:", seller.name);
    // TODO: Gọi API để theo dõi người bán
  };

  const handleViewMore = (productId: string) => {
    console.log("View more product:", productId);
    // TODO: Điều hướng đến trang chi tiết sản phẩm
  };

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZXZubHUuY29tIiwic3ViIjoidHJ1b25ndGVzdDExMDYiLCJleHAiOjE3NDg2OTcyODYsImlhdCI6MTc0ODYxMDg4Nn0.RB3-bRpscU-C8pYt9x1VfhNyEdyQ8BDMwviWoUpmIIQxkRr3plbphqepi5mJGELgapcR8eueMartUahfRRQ39A'
    fetch("http://localhost:8080/model_trade/api/model/getAllModelByUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        credentials: 'include',
      }).then((res)=>res.json())
      .then(
        (data) => {
                if (Array.isArray(data.result)) {
                    setProducts(data.result);
                } else {
                    console.error("API không trả về result là mảng:", data);
                }
            }
      )
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header />
      <div className="flex-grow w-4/5 py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/10">
            <SellerInfo seller={seller} onFollow={handleFollow} />
          </div>
          <div className="w-full lg:w-7/10">
            <h2 className="text-xl font-bold mb-4">Đang hiển thị (${products.length})</h2>
            <p className="text-gray-600 mb-4">Đã bán (${products.length-1})</p>
            <ProductList products={products} onViewMore={handleViewMore} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InventoryPage;
