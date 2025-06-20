import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Định nghĩa resources với các ngôn ngữ
const resources = {
  vi: {
    translation: {
      exchange: "Trao đổi",
      exchangeRequest: "Yêu cầu trao đổi",
      pendingResponse: "Yêu cầu trao đổi cần phản hồi",
      rejectedRequest: "Yêu cầu trao đổi bị từ chối",
      scheduleRequest: "Yêu cầu lịch hẹn",
      schedule: "Lịch hẹn",
      inProgress: "Cuộc hẹn đang diễn ra",
      deliveryStatus: "Trạng thái giao hàng",
      history: "Lịch sử trao đổi",
      shortcut: "Lối tắt",
      yourStore: "Cửa hàng của bạn",
      transactionHistory: "Lịch sử giao dịch",
      contacts: "Người liên hệ",
      events: "Sự kiện",
      modelManagement: "Quản lý mô hình",
      giftWarehouseManagement: "Quản lý kho quà tặng",
      walletManagement: "Quản lý túi tiền",
      redeemRewards: "Đổi thưởng",
      postManagement: "Quản lý bài viết",
      accountServices: "Dịch vụ tài khoản",
      customerSupport: "Hỗ trợ khách hàng",
      reports: "Báo cáo",
      inventory: "Kho hàng", // Thêm hoặc kiểm tra
      cart: "Giỏ hàng", // Thêm hoặc kiểm tra
      chat: "Trò chuyện", // Thêm hoặc kiểm tra
      post: "Đăng bài", // Thêm hoặc kiểm tra
      notification: "Thông báo", // Thêm hoặc kiểm tra
      logout: "Đăng xuất",
      login: "Đăng nhập",
      newsletter: "Bản tin",
      howTo: "Hướng dẫn",
      warehouse: "Kho",
      help: "Trợ giúp",
      wishlist: "Danh sách yêu thích",
    },
  },
  en: {
    translation: {
      exchange: "Exchange",
      exchangeRequest: "Exchange Request",
      pendingResponse: "Pending Response",
      rejectedRequest: "Rejected Request",
      scheduleRequest: "Schedule Request",
      schedule: "Schedule",
      inProgress: "In Progress",
      deliveryStatus: "Delivery Status",
      history: "History",
      shortcut: "Shortcut",
      yourStore: "Your Store",
      transactionHistory: "Transaction History",
      contacts: "Contacts",
      events: "Events",
      modelManagement: "Model Management",
      giftWarehouseManagement: "Gift Warehouse Management",
      walletManagement: "Wallet Management",
      redeemRewards: "Redeem Rewards",
      postManagement: "Post Management",
      accountServices: "Account Services",
      customerSupport: "Customer Support",
      reports: "Reports",
      inventory: "Inventory",
      cart: "Cart",
      chat: "Chat",
      post: "Post",
      notification: "Notification",
      logout: "Logout",
      login: "Login",
      newsletter: "Newsletter",
      howTo: "How to",
      warehouse: "Warehouse",
      help: "Help",
      wishlist: "Wishlist",
    },
  },
};

// Khởi tạo i18next
i18n
  .use(initReactI18next) // Kết nối với React
  .init({
    resources,
    lng: "vi", // Ngôn ngữ mặc định
    fallbackLng: "vi", // Ngôn ngữ dự phòng
    debug: process.env.NODE_ENV === "development", // Bật debug trong dev
    interpolation: {
      escapeValue: false, // Không escape giá trị
    },
    react: {
      useSuspense: false, // Tắt suspense để tránh lỗi render
    },
  });

export default i18n;
