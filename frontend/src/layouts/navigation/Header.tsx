// "use client";
// import { BsChatDots } from "react-icons/bs";
// import { FaRegUser } from "react-icons/fa";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import CategoryMenu from "./CategoryMenu";
// import SearchBar from "./Search";
// import { useRouter } from "next/navigation";
// import { IoLogOutOutline } from "react-icons/io5";
// import { MdOutlineInventory2 } from "react-icons/md";
// import { useTranslation } from "react-i18next";

// interface HeaderProps {
//   openModal?: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ openModal }) => {
//   const [isNavVisible, setIsNavVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];
//     setIsAuthenticated(!!token);
//   }, []);

//   const controlNavbar = () => {
//     if (typeof window !== "undefined") {
//       if (window.scrollY > lastScrollY && window.scrollY > 20) {
//         setIsNavVisible(false);
//       } else {
//         setIsNavVisible(true);
//       }
//       setLastScrollY(window.scrollY);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.addEventListener("scroll", controlNavbar);
//       return () => window.removeEventListener("scroll", controlNavbar);
//     }
//   }, [lastScrollY]);

//   const handleLogout = () => {
//     document.cookie = "token=; max-age=0";
//     setIsAuthenticated(false);
//     router.push("/login");
//   };

//   const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const currentPath = window.location.pathname;
//     if (currentPath === "/home") {
//       window.location.reload();
//     }
//     router.push("/home");
//   };

//   return (
//     <header className="border-gray-200 w-full top-0 left-0 sticky z-10">
//       <div className="bg-primary py-2 relative lg:h-17 z-20">
//         <div className="container mx-auto flex justify-between items-center">
//           <Link
//             href="/home"
//             className="top-0 left-0 flex items-start ml-4 md:mx-8"
//             onClick={handleLogoClick}
//           >
//             <div className="relative lg:pt-0">
//               <Image
//                 src="https://res.cloudinary.com/dxgqzu2vb/image/upload/v1748609195/nludev/product/Efigure.png_20250530194627.png"
//                 alt="Logo"
//                 width={60}
//                 height={30}
//               />
//             </div>
//           </Link>
//           <div className="hidden md:block w-3/5">
//             <SearchBar />
//           </div>
//           <div className="flex items-center justify-end">
//             {isAuthenticated && (
//               <>
//                 <Link
//                   href="/inventory"
//                   className="flex md:hidden items-center mx-3"
//                 >
//                   <div className="flex w-fit items-center">
//                     <MdOutlineInventory2 className="text-2xl mr-2" />
//                     <p className="md:flex hidden text-base items-center">
//                       Inventory
//                     </p>
//                   </div>
//                 </Link>
//                 <Link href="/cart" className="flex items-center mx-3">
//                   <div className="flex w-fit items-center">
//                     <MdOutlineShoppingCart className="text-2xl mr-2" />
//                     <p className="md:flex hidden text-base items-center">
//                       Cart
//                     </p>
//                   </div>
//                 </Link>
//                 <Link href="/chat" className="hidden md:flex items-center mx-3">
//                   <div className="flex w-fit items-center">
//                     <BsChatDots className="text-2xl mr-2" />
//                     <p className="md:flex hidden text-base items-center">
//                       Chat
//                     </p>
//                   </div>
//                 </Link>
//                 <button
//                   className="cursor-pointer flex items-center w-full mx-3"
//                   onClick={openModal}
//                 >
//                   <div className="flex h-auto w-fit items-center justify-center">
//                     <BsChatDots className="text-2xl mr-2" />
//                     <p className="md:flex hidden whitespace-nowrap text-base">
//                       Post
//                     </p>
//                   </div>
//                 </button>
//                 <Link
//                   className="hidden md:flex items-center mx-3"
//                   href="/notification"
//                 >
//                   <div className="flex h-auto w-fit items-center">
//                     <BsChatDots className="text-2xl mr-2" />
//                     <p className="md:flex hidden text-base whitespace-nowrap">
//                       Notification
//                     </p>
//                   </div>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center mx-3 hover:text-red-700"
//                 >
//                   <IoLogOutOutline className="text-2xl mr-2" />
//                   <span className="md:flex hidden text-base items-center">
//                     Logout
//                   </span>
//                 </button>
//               </>
//             )}
//             {!isAuthenticated && (
//               <Link href="/login" className="flex items-center mx-3 mr-5">
//                 <div className="flex w-fit items-center">
//                   <FaRegUser className="text-2xl mr-2" />
//                   <span className="flex text-base items-center">Login</span>
//                 </div>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav
//         className={`bg-primary text-white transition-transform duration-300 ease-in-out border-none relative z-10 ${
//           isNavVisible ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <div className="container h-12 md:h-8 flex md:items-center">
//           <CategoryMenu />
//           <div className="hidden container md:mx-auto px-2 md:flex justify-items-start items-start md:space-x-6">
//             <Link
//               href="/newsletter"
//               className="text-sm font-medium whitespace-nowrap"
//             >
//               Newsletter
//             </Link>
//             <Link
//               href="/how-to"
//               className="text-sm font-medium whitespace-nowrap"
//             >
//               How to
//             </Link>
//             <Link
//               href="/warehouse"
//               className="text-sm font-medium whitespace-nowrap"
//             >
//               Warehouse
//             </Link>
//             <Link
//               href="/help"
//               className="text-sm font-medium whitespace-nowrap"
//             >
//               Help
//             </Link>
//             <Link
//               href="/wishlist"
//               className="text-sm font-medium whitespace-nowrap"
//             >
//               WishList
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 inline-block ml-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import { BsChatDots } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineNotifications } from "react-icons/md";
import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
import CategoryMenu from "./CategoryMenu";
import SearchBar from "./Search";
// import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "@/hooks";
import { INotification } from "@/contexts/NotificationContext";
interface HeaderProps {
  openModal?: () => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
  const { t, i18n } = useTranslation();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState("vi"); // Ngôn ngữ mặc định là 'vi'
  const navigate = useNavigate()
  const { notifications } = useNotification()

  const areAllNotificationsRead = useMemo(() => {
    return notifications.every(notification => notification.read);
  }, [notifications]);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setIsAuthenticated(!!token);
  }, []);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 20) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  const handleLogout = () => {
    document.cookie = "token=; max-age=0";
    setIsAuthenticated(false);
    // router.push("/login");
    navigate("/login")
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    if (currentPath === "/home") {
      window.location.reload();
    }
    // router.push("/home");
    navigate("/home")
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  // const router = useRouter();

  return (
    <header className="border-gray-200 w-full top-0 left-0 sticky z-10">
      {/* <div className="bg-primary py-2 relative lg:h-17 z-20">
        <div className="container mx-auto flex  justify-between items-center">
          <Link
            href="/home"
            className="top-0 left-0 flex items-start ml-4 md:mx-8"
            onClick={handleLogoClick}
          >
            <div className="relative lg:pt-0">
              <Image
                src="https://res.cloudinary.com/dxgqzu2vb/image/upload/v1748609195/nludev/product/Efigure.png_20250530194627.png"
                alt="Logo"
                width={60}
                height={30}
              />
            </div>
          </Link>
          <div className="hidden md:block w-3/5">
            <SearchBar />
          </div>
          <div className="flex items-center justify-end space-x-2">
            <select
              value={language}
              onChange={changeLanguage}
              className="px-2 py-1 border rounded"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
            {isAuthenticated && (
              <>
                <Link
                  href="/inventory"
                  className="flex md:hidden items-center mx-1"
                >
                  <div className="flex w-fit items-center">
                    <MdOutlineInventory2 className="text-2xl mr-1" />
                    <p className="md:flex hidden text-base items-center">
                      {t("inventory")}
                    </p>
                  </div>
                </Link>
                <Link href="/cart" className="flex items-center mx-1">
                  <div className="flex w-fit items-center">
                    <MdOutlineShoppingCart className="text-2xl mr-1" />
                    <p className="md:flex hidden text-base items-center">
                      {t("cart")}
                    </p>
                  </div>
                </Link>
                <Link href="/chat" className="hidden md:flex items-center mx-1">
                  <div className="flex w-fit items-center">
                    <BsChatDots className="text-2xl mr-1" />
                    <p className="md:flex hidden text-base items-center">
                      {t("chat")}
                    </p>
                  </div>
                </Link>
                <button
                  className="cursor-pointer flex items-center w-full mx-1"
                  onClick={openModal}
                >
                  <div className="flex h-auto w-fit items-center justify-center">
                    <BsChatDots className="text-2xl mr-1" />
                    <p className="md:flex hidden whitespace-nowrap text-base">
                      {t("post")}
                    </p>
                  </div>
                </button>
                <Link
                  className="hidden md:flex items-center mx-1"
                  href="/notification"
                >
                  <div className="flex h-auto w-fit items-center">
                    <BsChatDots className="text-2xl mr-1" />
                    <p className="md:flex hidden text-base whitespace-nowrap">
                      {t("notification")}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center mx-1 hover:text-red-700"
                >
                  <IoLogOutOutline className="text-2xl mr-1" />
                  <span className="md:flex hidden text-base items-center">
                    {t("logout")}
                  </span>
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link href="/login" className="flex items-center mx-1 mr-2">
                <div className="flex w-fit items-center">
                  <FaRegUser className="text-2xl mr-1" />
                  <span className="flex text-base items-center">
                    {t("login")}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div> */}
      <div className="bg-primary py-2 relative lg:h-17 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            // href="/home"
            to="/home"
            className="top-0 left-0 flex items-start ml-4 md:mx-8"
            onClick={handleLogoClick}
          >
            <div className="relative lg:pt-0">
              <img
                src="https://res.cloudinary.com/dxgqzu2vb/image/upload/v1748609195/nludev/product/Efigure.png_20250530194627.png"
                alt="Logo"
                width={60}
                height={30}
              />
            </div>
          </Link>
          <div className="hidden md:block w-3/5">
            <SearchBar />
          </div>
          <div className="flex items-center justify-end space-x-2">
            <select
              value={language}
              onChange={changeLanguage}
              className="hidden md:block px-2 py-1 border rounded min-w-[100px] cursor-pointer  hover:text-gray-600" // Thêm min-width để tránh co lại quá mức
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
            {isAuthenticated && (
              <>
                <Link
                  // href="/inventory"
                  to="/inventory"
                  className="flex md:hidden items-center mx-1"
                >
                  <div className="flex w-fit items-center">
                    <MdOutlineInventory2 className="text-2xl mr-1" />
                    <p className="md:flex hidden text-base items-center truncate">
                      {t("inventory")}
                    </p>
                  </div>
                </Link>
                {/* <Link href="/cart" className="flex items-center mx-1">
                  <div className="flex w-fit items-center">
                    <MdOutlineShoppingCart className="text-2xl mr-1" />
                    <p className="hidden md:block text-base items-center truncate">
                      {t("cart")}
                    </p>
                  </div>
                </Link> */}
                <Link
                  // href="/chat"
                  to="/chat"
                  className=" hidden md:flex items-center mx-1 hover:text-gray-600"
                >
                  <div className="flex w-fit items-center">
                    <BsChatDots className="text-2xl mr-1" />
                    <p className=" hidden md:block text-base items-center truncate">
                      {t("chat")}
                    </p>
                  </div>
                </Link>
                <button
                  className="cursor-pointer flex items-center mx-1  hover:text-gray-600"
                  onClick={openModal}
                >
                  <div className="flex h-auto w-fit items-center justify-center">
                    <MdOutlineBookmarkAdd className=" text-2xl mr-1 " />
                    <p className=" hidden md:block text-base items-center truncate">
                      {t("post")}
                    </p>
                  </div>
                </button>
                <Link
                  // href="/notification"
                  to="/notification"
                  className={`hidden md:flex items-center mx-1  hover:text-gray-600 ${!areAllNotificationsRead ? "text-red-600 animate-bounce" : ""}`}
                >
                  <div className="flex h-auto w-fit items-center">
                    <MdOutlineNotifications className="text-2xl mr-1" />
                    <p className="text-base items-center truncate">
                      {t("notification")}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center mx-1 hover:text-red-700"
                >
                  <IoLogOutOutline className="text-2xl mr-1" />
                  <span className="hidden md:block text-base items-center truncate">
                    {t("logout")}
                  </span>
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link
                // href="/login" 
                to="/login"
                className="flex items-center mx-1 mr-2">
                <div className="flex w-fit items-center">
                  <FaRegUser className="text-2xl mr-1" />
                  <span className="text-base items-center truncate">
                    {t("login")}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <nav
        className={`bg-primary text-white transition-transform duration-300 ease-in-out border-none relative z-10 ${isNavVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="container h-12 md:h-8 flex md:items-center">
          <CategoryMenu />
          <div className="hidden container md:mx-auto px-2 md:flex justify-items-start items-start md:space-x-6">
            <Link
              // href="/newsletter"
              to="/newsletter"
              className="text-sm font-medium whitespace-nowrap"
            >
              {t("newsletter")}
            </Link>
            <Link
              to="/how-to"
              // href="/how-to"
              className="text-sm font-medium whitespace-nowrap"
            >
              {t("howTo")}
            </Link>
            <Link
              to="/warehouse"
              href="/warehouse"
              className="text-sm font-medium whitespace-nowrap"
            >
              {t("warehouse")}
            </Link>
            <Link
              to="/help"
              // href="/help"
              className="text-sm font-medium whitespace-nowrap"
            >
              {t("help")}
            </Link>
            <Link
              to="/cart"
              // href="/wishlist"
              className="text-sm font-medium whitespace-nowrap"
            >
              {t("cart")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                /> */}
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
