import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useNotification } from "@/hooks";
import Header from "@/layouts/navigation/Header";
import Footer from "@/layouts/navigation/Footer";
import { toast } from "react-toastify";
import { NOTIFICATION_ACTION, INotification } from "@/contexts/NotificationContext";

const Notification = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { notifications, dispatchNotification } = useNotification();

  useEffect(() => {
    if (!token) {
      toast.error("Vui lòng đăng nhập")
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [token]);

  useEffect(() => {
    markReadAll()
    fetchNotification()
  }, [])

  const fetchNotification = async () => {
    try {
      const token = Cookies.get("token");
      const resp = await fetch("http://localhost:8080/model_trade/api/notifications/self", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        credentials: "include",
      });

      dispatchNotification({
        type: NOTIFICATION_ACTION.CLEAR,
        payload: null,
      });

      const data = await resp.json();
      if (data?.code === 200) {
        const results: INotification[] = data.result;

        dispatchNotification({
          type: NOTIFICATION_ACTION.ADD,
          payload: results,
        });

        return true;
      } else {
        alert(`Lỗi: ${data?.message}`);
        return false;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const markReadAll = async () => {
    const token = Cookies.get("token");

    try {
      await Promise.all(
        notifications.map((n) =>
          fetch(`http://localhost:8080/model_trade/api/notifications/${n.id}/mark-read`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            mode: "cors",
            credentials: "include",
          })
        )
      );
      console.log("Đã gửi yêu cầu đánh dấu tất cả là đã đọc");
    } catch (error) {
      console.error("Lỗi khi đánh dấu tất cả là đã đọc:", error);
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("vi-VN");
  };

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Thông báo</h1>
        {notifications.length === 0 ? (
          <p>Không có thông báo nào.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`p-4 rounded shadow ${n.isRead ? "bg-gray-100" : "bg-white border-l-4 border-blue-500"
                  }`}
              >
                <h2 className="text-lg font-bold">{n.title}</h2>
                <p className="text-sm text-gray-600">{formatDate(n.createdAt)}</p>
                <p className="mt-1">{n.content}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Notification;
