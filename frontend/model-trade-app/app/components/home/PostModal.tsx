"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosCloseCircle } from "react-icons/io";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
  const [postContent, setPostContent] = useState("");
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [modelId, setModelId] = useState("");
  const [models, setModels] = useState<{ modelId: string; name: string }[]>([]);
  const [error, setError] = useState("");
  const modelIdTest = "001";

  // Lấy danh sách model từ API khi modal mở
  useEffect(() => {
    if (isOpen) {
      // const token = localStorage.getItem("token");
      const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZXZubHUuY29tIiwic3ViIjoic29uMTIzNDUiLCJleHAiOjE3NDg2NjEyNTYsImlhdCI6MTc0ODU3NDg1Nn0.jn02vOoNB2ef7dCKaUPfQgwb-fE2oNN1rqmBa3RoR0nRQeVkpZijkOaoTGBWlhiG7RgrAqTd4vm5nxpmLs8gRA";
      if (!token) {
        setError("Vui lòng đăng nhập để lấy danh sách sản phẩm");
        return;
      }

      console.log("Gọi API getModels");
      fetch("http://localhost:8080/model_trade/api/posts/getModels", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        credentials: "include",
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            if (res.status === 401) {
              setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            }
            throw new Error(
              `HTTP error! Status: ${res.status}, Message: ${errorText}`
            );
          }
          return res.json();
        })
        .then((data) => {
          console.log("Dữ liệu models:", data);
          setModels(data);
        })
        .catch((err: unknown) => {
          let errorMessage = "Lỗi không xác định";
          if (err instanceof Error) {
            errorMessage = err.message;
            console.error("Chi tiết lỗi:", err);
          }
          console.error("Lỗi API:", errorMessage);
          if (!error) {
            setError("Không thể tải danh sách sản phẩm: " + errorMessage);
          }
        });
    }
  }, [isOpen]);

  // Xử lý đăng bài
  const handleSubmit = async () => {
    if (!postContent || !modelId) {
      setError("Vui lòng nhập nội dung và chọn sản phẩm");
      return;
    }
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZXZubHUuY29tIiwic3ViIjoic29uMTIzNDUiLCJleHAiOjE3NDg2NjEyNTYsImlhdCI6MTc0ODU3NDg1Nn0.jn02vOoNB2ef7dCKaUPfQgwb-fE2oNN1rqmBa3RoR0nRQeVkpZijkOaoTGBWlhiG7RgrAqTd4vm5nxpmLs8gRA";

    // const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập để đăng bài");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/model_trade/api/posts/createPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            description: postContent, // Sử dụng description
            modelID: modelId, // Sử dụng modelID
          }),
        }
      );
      if (!res.ok) {
        const errorText = await res.text();
        if (res.status === 401) {
          setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        }
        throw new Error(
          `HTTP error! Status: ${res.status}, Message: ${errorText}`
        );
      }
      setPostContent("");
      setModelId("");
      setError("");
      onClose();
      alert("Đăng bài thành công!");
    } catch (err: unknown) {
      let errorMessage = "Lỗi không xác định";
      if (err instanceof Error) {
        errorMessage = err.message;
        console.error("Chi tiết lỗi:", err);
      }
      console.error("Lỗi đăng bài:", errorMessage);
      setError("Đăng bài thất bại: " + errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10"></div>
          <p className="text-center text-2xl font-bold">Tạo tin mới</p>
          <IoIosCloseCircle
            className="text-4xl text-gray-500 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center mb-4">
            <FaUserCircle className="text-2xl mr-2" />
            <div>Trần Sơn</div>
          </div>
          <div className="flex items-center mx-4 bg-gray-200 p-1.5 rounded">
            <div className="rounded-full w-6 h-6 bg-amber-300 mr-2"></div>
            <div>Trao đổi</div>
          </div>
        </div>
        <div>
          <textarea
            ref={textareaRef}
            placeholder="Bạn muốn trao đổi gì thế?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className={`font-medium focus:outline-none w-full break-words transition-all duration-300 ${
              postContent ? "text-black" : "text-gray-500"
            } ${lineCount > 4 ? "text-base" : "text-2xl"} ${
              postContent.length > 55 ? "text-base" : "text-2xl"
            }`}
            maxLength={5000}
            rows={4}
            required
          />
        </div>
        <div className="flex items-center w-fit bg-gray-200 p-1.5 rounded">
          <select
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            className="border-none bg-transparent focus:outline-none"
          >
            <option value="" disabled>
              Chọn sản phẩm
            </option>
            {models.map((model) => (
              <option key={model.modelId} value={model.modelId}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Đăng bài
        </button>
      </div>
    </div>
  );
};

export default PostModal;
