import React from "react";
// import { cookies } from "next/headers";
import InventoryPage from "@/components/inventory/InventoryPage";
// import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Inventory : React.FC = () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  const token = Cookies.get("token")
  const navigate = useNavigate();

  // Chỉ kiểm tra token, redirect nếu không có (bổ sung cho Middleware)
  if (!token) {
    // redirect("/login");
    navigate("/login")
  }
  return (
    <div>
      <InventoryPage token={token} />
    </div>
  );
};

export default Inventory;
