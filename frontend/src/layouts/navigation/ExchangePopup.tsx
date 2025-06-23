// components/ExchangePopup.tsx
import React, { useState } from "react";
import Cookies from "js-cookie";

const ExchangePopup = ({
  modelId,
  payAmount,
  onClose,
}: {
  modelId: string;
  payAmount: string;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handlePay = async () => {
    const token = Cookies.get("token");
    payAmount = (Number(payAmount) * quantity).toString();
    try {
      const response = await fetch(
        "http://localhost:8080/model_trade/api/exchange/createPayModel",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({
            modelId,
            payAmount,
            quantity,
          }),
        }
      );

      if (!response.ok) throw new Error("Gọi API thất bại");

      const url = await response.text();
      onClose();
      window.alert("Tạo hóa đơn thành công. Vui lòng thanh toán hóa đơn ở lịch sử")
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-orange-500 rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Nhập số lượng bạn muốn mua
        </h2>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handlePay}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangePopup;
