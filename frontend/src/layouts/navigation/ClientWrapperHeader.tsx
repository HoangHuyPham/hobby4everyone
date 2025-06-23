import React, { useState } from "react";
import Header from "./Header";
import PostModal from "@/components/home/PostModal";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n"; // Đường dẫn đến file i18n.ts

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapperHeader: React.FC<ClientWrapperProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // <>
    //   <Header openModal={openModal} />
    //   {children}
    //   <PostModal isOpen={isModalOpen} onClose={closeModal} />
    // </>
    <I18nextProvider i18n={i18n}>
      <Header openModal={openModal} />
      {children}
      <PostModal isOpen={isModalOpen} onClose={closeModal} />
    </I18nextProvider>
  );
};

export default ClientWrapperHeader;
