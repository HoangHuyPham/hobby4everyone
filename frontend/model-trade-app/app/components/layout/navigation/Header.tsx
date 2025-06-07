// components/layout/Header.tsx
"use client";
import { BsChatDots } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryMenu from "./CategoryMenu";
import SearchBar from "./Search";

interface HeaderProps {
  openModal?: () => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Xử lý sự kiện cuộn
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      // Nếu cuộn xuống và đã cuộn xuống ít nhất 20px, ẩn navbar
      if (window.scrollY > lastScrollY && window.scrollY > 20) {
        setIsNavVisible(false);
      }
      // Nếu cuộn lên hoặc ở đầu trang, hiện navbar
      else {
        setIsNavVisible(true);
      }

      // Cập nhật vị trí cuộn cuối cùng
      setLastScrollY(window.scrollY);
    }
  };
  // Thêm event listener khi component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // Cleanup event listener khi component unmount
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý tìm kiếm
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className=" border-gray-200 w-full top-0 left-0  sticky z-10  ">
      {/* Top Bar */}
      <div className="bg-primary py-2 relative lg:h-17   z-20">
        <div className="container mx-auto flex justify-between items-center px-2 md:px-1">
          {/* Logo */}
          <Link href="/home" className="flex items-start ml-4 md:mx-8 ">
            <div className="relative  pt-2 lg:pt-0">
              <Image
                src="https://static.chotot.com/storage/APP_WRAPPER/logo/chotot-logo-appwrapper.png"
                alt="Logo"
                width={350}
                height={70}
                className=" text-2xl "
              />
            </div>
          </Link>
          <div className="hidden md:block w-full">
            <SearchBar />
          </div>

          <div className="flex items-center justify-end ">
            {/* Login Link */}
            <Link href="/login" className="flex items-center mx-3">
              <div className="flex w-fit items-center ">
                <FaRegUser className="text-2xl mr-2" />
                <span className="flex text-base items-center">Login</span>
              </div>
            </Link>

            {/* Cart Link */}
            <Link href="/cart" className=" flex items-center mx-3">
              <div className="flex w-fit items-center ">
                <MdOutlineShoppingCart className="text-2xl mr-2" />
                <p className="flex text-base items-center">Cart</p>
              </div>
            </Link>

            <Link href="/chat" className=" flex items-center mx-3">
              <div className="flex w-fit items-center ">
                <BsChatDots className="text-2xl mr-2" />
                <p className="flex text-base items-center">Chat</p>
              </div>
            </Link>

            <button
              className=" cursor-pointer flex items-center w-full mx-3"
              onClick={openModal}
            >
              <div className="flex h-auto w-fit items-center justify-center  ">
                <BsChatDots className="text-2xl mr-2" />
                <p className="flex  whitespace-nowrap text-base">Bài viết</p>
              </div>
            </button>

            <Link className=" flex items-center mx-3" href="/notification">
              <div className=" flex h-auto w-fit items-center">
                <BsChatDots className="text-2xl mr-2" />
                <p className="flex text-base  whitespace-nowrap">Thông báo</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      {/* <nav className="bg-blue-700 text-white transition-transform duration-300 ${
          isNavVisible ? 'transform-none' : '-translate-y-full'
        "> */}
      <nav
        className={`bg-primary text-white transition-transform duration-300 ease-in-out border-none relative z-10 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className=" container h-12 md:h-8  flex  md:items-center  ">
          <CategoryMenu />
          <div className=" hidden container  md:mx-auto px-2 md:flex justify-items-start items-start md:space-x-6 ">
            <Link
              href="/newsletter"
              className=" text-sm font-medium whitespace-nowrap "
            >
              Join Our Newsletter
            </Link>
            <Link
              href="/how-to"
              className="text-sm font-medium whitespace-nowrap"
            >
              How to Use It
            </Link>
            <Link
              href="/warehouse"
              className=" text-sm font-medium whitespace-nowrap"
            >
              What's Private Warehouse?
            </Link>
            <Link
              href="/help"
              className=" text-sm font-medium whitespace-nowrap"
            >
              Help Center
            </Link>
            <Link
              href="/wishlist"
              className=" text-sm font-medium whitespace-nowrap"
            >
              Wish List
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
// components/layout/Header.tsx
