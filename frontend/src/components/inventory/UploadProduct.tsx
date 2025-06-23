"use client";
import React, { useEffect, useState } from "react";
import Header from "@/layouts/navigation/Header";
import Footer from "@/layouts/navigation/Footer";
import RadioButton from "../radioGroup/RadioButton";
import { TbCameraPlus } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// import { useRouter } from "next/navigation";

interface SellProductProps {
  token: string | null;
}
const SellProduct: React.FC<SellProductProps> = ({ token }) => {
  interface AddModelRequestDTO {
    modelName: string;
    description: string;
    price: number;
    quantity: number;
  }

  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(10000);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [selectedProvince, setProvince] = useState("");
  // const router = useRouter();
  const navigate = useNavigate();

  const modelData = {
    modelName,
    description,
    price,
    quantity,
  };
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

    if (modelName.trim() === "") {
      alert("Hãy nhập tên mô hình")
      return;
    }

    if (price < 10000) {
      alert("Giá ít nhất phải lạ 10000 đ. Hãy nhập lại")
      return;
    }

    if (description.trim() === "") {
      alert("Hãy nhập mô tả mô hình")
      return;
    }


    if (quantity < 1) {
      alert("Số lượng ít nhất là 1. Hãy nhập lại")
      return;
    }



    if (images.length === 0) {
      alert("Bạn phải chọn ít nhất một hình ảnh để tiếp tục.");
      return;
    }

    if (selectedProvince === "") {
      alert("Vui lòng chọn địa chỉ");
      return;
    }

    const formData = new FormData();
    formData.append(
      "model",
      new Blob([JSON.stringify(modelData)], { type: "application/json" })
    );

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(
        "http://localhost:8080/model_trade/api/model/addModel",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload thất bại!");

      const result = await response.json();
      alert(`Thêm thành công: ${result.result.modelName}`);
      // router.push("/inventory");
      navigate("/inventory")
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại sau.");
    }
  };


  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Header />
      <div className="flex-grow md:w-4/5 bg-white md:px-10 md:py-10">
        <div className="md:flex justify-center ">
          <div className="my-4 flex flex-col items-center justify-center">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="w-48 h-40 border-2 border-dashed border-primary rounded-lg bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center transition-all duration-200">
                <TbCameraPlus className="text-5xl text-gray-600" />
                <p className="text-sm mt-2 text-gray-500 text-center">
                  Đăng từ 1 đến 6 hình
                </p>
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

          <div className="md:w-7/10">
            <form onSubmit={handleSubmit} className="grid gap-6  px-10 pb-10">
              <p className="font-bold text-2xl">Thông tin chi tiết</p>
              {/* <div className="flex items-center gap-4">
                <p>Series sản phẩm</p>
                <div className="bg-yellow-300 p-2 w-fit rounded">
                  <p>Mô hình</p>
                </div>
                <FaPlus className="bg-gray-200 p-1 h-fit w-7 hover:bg-gray-300" />
              </div> */}
              {/* <div className="md:flex items-center md:gap-4">
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
                <div className="md:ml-20">
                  <p className="my-2">Mục đích</p>
                  <RadioButton
                    name="purpose"
                    options={purposeOptions}
                    value={formData.purpose}
                    onChange={handleRadioChange("purpose")}
                  />
                </div>
              </div> */}
              <div className="items-center gap-4 grid">
                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap">Nhập tên mô hình</span>
                  <textarea
                    className="h-fit w-full border px-2 py-2 focus:border-4 rounded-lg"
                    placeholder="Tên sản phẩm"
                    name="productName"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap">Nhập giá mô hình</span>
                  <input
                    type="number"
                    className="h-fit w-full border-1 px-2 py-2 focus:border-4 rounded-lg"
                    placeholder="Giá sản phẩm (>= 10.000 VND)"
                    name="price"
                    value={price}
                    min={10000}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap">Nhập mô tả cho mô hình</span>
                  <textarea
                    className="h-fit w-full border-1 px-2 py-2 focus:border-4 rounded-lg"
                    placeholder="Mô tả sản phẩm"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap">Nhập số lượng</span>
                  <input
                    type="number"
                    className="h-fit w-full border-1 px-2 py-2 focus:border-4 rounded-lg"
                    placeholder="Số lượng >= 1"
                    name="quantity"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap">Chọn địa chỉ</span>
                  <select
                    className="h-fit w-full border-1 px-2 py-2 focus:border-4 rounded-lg"
                    value={selectedProvince}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                    name="address"
                  >
                    <option disabled value="" className="text-gray-400">
                      Địa chỉ
                    </option>
                    <option value="TP Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="An Giang">An Giang</option>
                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                    <option value="Bắc Giang">Bắc Giang</option>
                    <option value="Bắc Kạn">Bắc Kạn</option>
                    <option value="Bạc Liêu">Bạc Liêu</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Bến Tre">Bến Tre</option>
                    <option value="Bình Định">Bình Định</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Bình Phước">Bình Phước</option>
                    <option value="Bình Thuận">Bình Thuận</option>
                    <option value="Cà Mau">Cà Mau</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Cao Bằng">Cao Bằng</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Đắk Lắk">Đắk Lắk</option>
                    <option value="Đắk Nông">Đắk Nông</option>
                    <option value="Điện Biên">Điện Biên</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Đồng Tháp">Đồng Tháp</option>
                    <option value="Gia Lai">Gia Lai</option>
                    <option value="Hà Giang">Hà Giang</option>
                    <option value="Hà Nam">Hà Nam</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                    <option value="Hải Dương">Hải Dương</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Hậu Giang">Hậu Giang</option>
                    <option value="Hòa Bình">Hòa Bình</option>
                    <option value="Hưng Yên">Hưng Yên</option>
                    <option value="Khánh Hòa">Khánh Hòa</option>
                    <option value="Kiên Giang">Kiên Giang</option>
                    <option value="Kon Tum">Kon Tum</option>
                    <option value="Lai Châu">Lai Châu</option>
                    <option value="Lâm Đồng">Lâm Đồng</option>
                    <option value="Lạng Sơn">Lạng Sơn</option>
                    <option value="Lào Cai">Lào Cai</option>
                    <option value="Long An">Long An</option>
                    <option value="Nam Định">Nam Định</option>
                    <option value="Nghệ An">Nghệ An</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                    <option value="Ninh Thuận">Ninh Thuận</option>
                    <option value="Phú Thọ">Phú Thọ</option>
                    <option value="Phú Yên">Phú Yên</option>
                    <option value="Quảng Bình">Quảng Bình</option>
                    <option value="Quảng Nam">Quảng Nam</option>
                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Quảng Trị">Quảng Trị</option>
                    <option value="Sóc Trăng">Sóc Trăng</option>
                    <option value="Sơn La">Sơn La</option>
                    <option value="Tây Ninh">Tây Ninh</option>
                    <option value="Thái Bình">Thái Bình</option>
                    <option value="Thái Nguyên">Thái Nguyên</option>
                    <option value="Thanh Hóa">Thanh Hóa</option>
                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                    <option value="Tiền Giang">Tiền Giang</option>
                    <option value="Trà Vinh">Trà Vinh</option>
                    <option value="Tuyên Quang">Tuyên Quang</option>
                    <option value="Vĩnh Long">Vĩnh Long</option>
                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                    <option value="Yên Bái">Yên Bái</option>
                  </select>
                </div>


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
