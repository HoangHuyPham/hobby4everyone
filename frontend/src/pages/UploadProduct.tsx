import React from "react";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import UploadProductComp from "@/components/inventory/UploadProduct";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const UploadProduct = () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  const token = Cookies.get("token")
  const navigate = useNavigate()

  // Chỉ kiểm tra token, redirect nếu không có (bổ sung cho Middleware)
  if (!token) {
    // redirect("/login");
    navigate("/login")
  }
  return (
    <div>
      <UploadProductComp token={token} />
    </div>
  );
};

export default UploadProduct;
