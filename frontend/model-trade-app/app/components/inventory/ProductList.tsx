"use client";
import React from "react";

interface Product {
  modelId:string;
  name:string;
  description:string;
  price:number;
  quantity:number;
  see:boolean;
  isDelete:boolean;
  images:Array<string>
}

interface ProductListProps {
  products: Product[];
  onViewMore: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onViewMore }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.modelId}
          className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-md"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-red-500 font-bold mb-2">{`${product.price.toLocaleString()} đ`}</p>
          <p className="text-gray-600 mb-2">Tp.Hồ Chí Minh</p>
          <button
            onClick={() => onViewMore(product.modelId)}
            className="text-blue-500 hover:underline"
          >
            Xem thêm
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
