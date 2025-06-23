import React from "react";
// import { useSearchParams } from 'next/navigation';
import Header from '@/layouts/navigation/Header';
import Footer from '@/layouts/navigation/Footer';
import { useParams } from 'react-router';

export default function ReturnApi() {
  // const searchParams = useSearchParams();
  const searchParams = useParams();
  const status = searchParams['status'];

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header/>
      {status === 'Success' ? '✅ Thành công' : '❌ Thất bại'}
      <h3>Hãy trở về trang chủ bằng Logo</h3>
      <Footer/>
    </div>
  );
}