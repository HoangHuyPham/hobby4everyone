import { useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [i18nInitialized, setI18nInitialized] = useState(true); // Đã khởi tạo trong i18n.ts

  // Không cần useEffect vì i18n đã sẵn sàng
  if (!i18nInitialized) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default ClientWrapper;
