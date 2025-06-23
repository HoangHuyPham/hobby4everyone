import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Props {
    children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) {
            // Nếu không có token, redirect về login
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:8080/model_trade/api/user/getUser", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Không thể tải thông tin người dùng");
                }

                const data = await response.json();
                console.log(data);

                // Kiểm tra role của user
                if (data.result && data.result.role === "ADMIN") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                // Nếu có lỗi xảy ra (ví dụ, không thể gọi API), chuyển hướng về login
                console.error(error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    if (loading) {
        return <div>Đang kiểm tra quyền truy cập...</div>; // Hiển thị khi đang kiểm tra
    }

    if (isAdmin === null) {
        return null; // Đợi dữ liệu từ API
    }

    if (isAdmin) {
        return <>{children}</>; // Nếu là admin, hiển thị nội dung của trang quản trị
    }

    // Nếu không phải admin, chuyển hướng về trang chủ
    navigate("/");
    return null;
};

export default AdminRoute;