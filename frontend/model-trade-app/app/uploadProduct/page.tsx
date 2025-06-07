"use client";
import React, { useState } from "react";
import Header from "../components/layout/navigation/Header";
import Footer from "../components/layout/navigation/Footer";
import RadioButton from "../components/radioGroup/RadioButton";
import { IoInformationCircle } from "react-icons/io5";
import { TbCameraPlus } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";

const SellProduct = () => {
  interface AddModelRequestDTO {
    modelName: string;
    description: string;
    price: number;
    quantity: number
  }

  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState<File[]>([]);

  const modelData = {
    modelName,
    description,
    price,
    quantity
  }
  // State để quản lý giá trị radio button
  const [formData, setFormData] = useState({
    condition: "", // Tình trạng: new, used
    purpose: "", // Mục đích: trade, sell
  });

  // Xử lý thay đổi radio button
  const handleRadioChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Tùy chọn cho radio button
  const conditionOptions = [
    { value: "used", label: "Đã sử dụng" },
    { value: "new", label: "Mới" },
  ];

  const purposeOptions = [
    { value: "trade", label: "Trao đổi" },
    { value: "sell", label: "Bán" },
  ];




  // Xử lý submit form (gửi dữ liệu lên backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("model", new Blob([JSON.stringify(modelData)], { type: "application/json" }));

    // Gửi các ảnh
    images.forEach((file) => {
      formData.append("images", file); // tên này phải đúng với `@RequestPart("images")`
    });
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZXZubHUuY29tIiwic3ViIjoidHJ1b25ndGVzdDExMDYiLCJleHAiOjE3NDg2OTcyODYsImlhdCI6MTc0ODYxMDg4Nn0.RB3-bRpscU-C8pYt9x1VfhNyEdyQ8BDMwviWoUpmIIQxkRr3plbphqepi5mJGELgapcR8eueMartUahfRRQ39A'
    try {
      const response = await fetch("http://localhost:8080/model_trade/api/model/addModel", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) throw new Error("Upload thất bại!");

      const result = await response.json();
      alert("Thêm thành công: " + JSON.stringify(result.result)); // Có thể in riêng tên nếu muốn

    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi gửi dữ liệu.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Header />
      <div className="flex-grow w-4/5 bg-white px-10 py-10">
        <div className="flex">
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="w-48 h-40 border-2 border-dashed border-primary rounded-lg bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center transition-all duration-200">
                <TbCameraPlus className="text-5xl text-gray-600" />
                <p className="text-sm mt-2 text-gray-500 text-center">Đăng từ 1 đến 6 hình</p>
              </div>
            </label>

            <input
              type="file"
              id="imageUpload"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const selected = Array.from(e.target.files).slice(0, 6);
                  console.log("Ảnh đã chọn:", selected);
                  setImages(selected);
                }
              }}
              className="hidden"
            />

            {/* Hiển thị số ảnh đã chọn */}
            {images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Đã chọn {images.length} hình
              </p>
            )}
          </div>

          <div className="w-7/10">
            <form onSubmit={handleSubmit} className="grid gap-6  px-10 py-10">
              <p>Thông tin chi tiết</p>
              <div className="flex items-center gap-4">
                <p>Series sản phẩm</p>
                <div className="bg-yellow-300 p-2 w-fit rounded">
                  <p>Pokemon</p>
                </div>
                <FaPlus className="bg-gray-200 p-1 h-fit w-7 hover:bg-gray-300" />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="my-2">Tình trạng</p>
                  <RadioButton
                    className=""
                    name="condition"
                    options={conditionOptions}
                    value={formData.condition}
                    onChange={handleRadioChange("condition")}
                  />
                </div>
                <div className="ml-20">
                  <p className="my-2">Mục đích</p>
                  <RadioButton
                    name="purpose"
                    options={purposeOptions}
                    value={formData.purpose}
                    onChange={handleRadioChange("purpose")}
                  />
                </div>
              </div>
              <div className="items-center gap-4 grid">

                <textarea
                  className="h-fit w-full border-1 px-2 py-2 focus:border-4 rounded-lg"
                  placeholder="Tên sản phẩm"
                  name="productName"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                ></textarea>
                <textarea
                  className="h-fit w-full border-1 px-2 py-2 focus:border-4 rounded-lg"
                  placeholder="Giá sản phẩm"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                ></textarea>
                <textarea
                  className="h-fit w-full border-1 px-2 py-2 focus:border-4 rounded-lg"
                  placeholder="Mô tả sản phẩm"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <select
                  className="h-fit w-full border-1 px-2 py-2 focus:border-4 rounded-lg"
                  defaultValue=""
                  name="address"
                >
                  <option disabled value="" className="text-gray-400">
                    Địa chỉ
                  </option>
                  <option value="Thu Duc">Thủ Đức</option>
                  <option value="Ho Chi Minh">Hồ Chí Minh</option>
                  <option value="Da Nang">Đà Nẵng</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Đăng sản phẩm
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellProduct;
