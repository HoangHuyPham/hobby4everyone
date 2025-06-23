// import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

interface UserData {
  name: string;
  rating: number;
  productCount: number;
  location: string;
  createdDate?: string; // Tùy chọn để tính joinedTime
}

interface SellerInfoProps {
  seller: UserData;
  onFollow: () => void;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ seller, onFollow }) => {
  const [joinedTime, setJoinedTime] = useState<string>("");

  // Tính toán thời gian tham gia nếu có createdDate
  // useEffect(() => {
  //   if (seller.createdDate) {
  //     const calculateJoinedTime = () => {
  //       const created = new Date(seller.createdDate);
  //       const now = new Date();
  //       const diffTime = now.getTime() - created.getTime();
  //       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  //       const diffMonths = Math.floor(diffDays / 30);
  //       const diffYears = Math.floor(diffDays / 365);

  //       if (diffYears > 0) {
  //         return `${diffYears} năm ${diffMonths % 12} tháng`;
  //       } else if (diffMonths > 0) {
  //         return `${diffMonths} tháng`;
  //       } else {
  //         return `${diffDays} ngày`;
  //       }
  //     };
  //     setJoinedTime(calculateJoinedTime());
  //   } else {
  //     setJoinedTime("6 năm 5 tháng"); // Giá trị mặc định nếu không có createdDate
  //   }
  // }, [seller.createdDate]);

  return (
    <div className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md">
      <h2 className="text-center font-bold text-xl mb-4">{seller.name}</h2>
      <div className="flex items-center justify-center mb-4">
        <span className="text-yellow-400">
          {`★`.repeat(Math.floor(seller.rating))}
        </span>
        <span className="text-gray-600 ml-1">{`(${seller.rating} ★)`}</span>
        <span className="text-gray-600 ml-2">{`(${seller.productCount} sản phẩm)`}</span>
      </div>
      <p className="text-gray-600 mb-4">Đã tham gia: {joinedTime}</p>
      <p className="text-gray-600 mb-4">Địa chỉ: {seller.location}</p>
      <div className="flex justify-center">
        {/* <Link href="/uploadProduct">
          <button
            // onClick={onFollow}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Thêm sản phẩm
          </button>
        </Link> */}
        <Link to="/uploadProduct">
          <button
            // onClick={onFollow}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Thêm sản phẩm
          </button>
        </Link>
      </div>
      <div className="mt-4 flex justify-end">
        <IoInformationCircle className="text-2xl text-blue-500 mr-2" />
        <span className="text-blue-600">Thông tin người bán</span>
      </div>
    </div>
  );
};

export default SellerInfo;
