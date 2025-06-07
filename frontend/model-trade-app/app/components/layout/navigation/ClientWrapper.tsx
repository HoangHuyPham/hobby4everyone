'use client';
import React, { useState } from 'react';
import Header from './Header';
import PostModal from  '../../home/PostModal'; 

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header openModal={openModal} />
      {children}
      <PostModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ClientWrapper;