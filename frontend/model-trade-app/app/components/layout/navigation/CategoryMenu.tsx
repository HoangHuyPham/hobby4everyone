// components/navigation/CategoryMenu.tsx
'use client';

import { useState,useRef,useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './Search';

// Định nghĩa cấu trúc dữ liệu cho các mục menu
interface SubCategory {
  name: string;
  url: string;
}

interface Category {
  name: string;
  url: string;
  subCategories?: SubCategory[];
  isAdult?: boolean;
}



// Dữ liệu menu
const categories: Category[] = [
  {
    name: 'Gundam',
    url: '/gundam',
    subCategories: [
      { name: 'Gundam Specialty Page', url: '/gundam/specialty' },
    ],
  },
  {
    name: 'Sci-fi',
    url: '/sci-fi',
    subCategories: [
      { name: 'High Grade Kits', url: '/sci-fi/high-grade-kits' },
    ],
  },
  {
    name: 'Action Figures',
    url: '/action-figures',
    subCategories: [
      { name: 'Entry Grade Kits', url: '/action-figures/entry-grade-kits' },
    ],
  },
  {
    name: 'Anime',
    url: '/anime',
    subCategories: [
      { name: 'Real Grade Kits', url: '/anime/real-grade-kits' },
    ],
  },
  {
    name: 'Scale Models',
    url: '/scale-models',
    subCategories: [
      { name: 'Master Grade Kits', url: '/scale-models/master-grade-kits' },
    ],
  },
  {
    name: 'More',
    url: '/more',
    subCategories: [
      { name: 'Perfect Grade Kits', url: '/more/perfect-grade-kits' },
    ],
  },
  {
    name: '18+',
    url: '/adult',
    isAdult: true,
    subCategories: [
      { name: 'SD, BB, & CS Kits', url: '/adult/sd-bb-cs-kits' },
    ],
  },
];

export default function CategoryMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
    
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý tìm kiếm
    console.log('Searching for:', searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

   // Xử lý sự kiện click bên ngoài menu - tương thích với NextJS
   useEffect(() => {
    // Chỉ thực hiện ở client-side
    if (typeof window !== 'undefined') {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current && 
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && 
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsMenuOpen(false);
        }
      };
      
      // Thêm event listener
      document.addEventListener("mousedown", handleClickOutside);
      
      // Cleanup event listener
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);
   



 

  return (
    <div className='flex w-full'>

    <div className="  flex md:relative mr-3 lg:mr-0 ">
      {/* Category Menu Button */}
      <button 
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex  items-center text-white text-sm font-medium  focus:outline-none lg:mr-14 "
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 ml-2 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round"  strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <p className=' flex text-xl lg:text-sm'>
        <span className='hidden md:block mr-1'>Category  </span>
          
          Menu
        </p>
   
      </button>
    

      {/* Dropdown Menu */}
      {isMenuOpen  && (
        <div 
        ref={menuRef}
        className=" absolute left-0  w-screen z-50  mt-12 md:mt-7 animate-slide-right" style={{ maxWidth: '350px' }}>
          <div className="flex">
            {/* Left Column - Main Categories */}
            <div className="w-full bg-white border border-gray-700 rounded-lg">
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className={`border-b ${category.isAdult ? 'text-red-500' : 'text-gray-700'}`}>
                    <Link 
                      href={category.url}
                      className="flex justify-between items-center px-4 py-3 hover:bg-gray-100"
                    >
                      <span>{category.name}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${category.isAdult ? 'text-red-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
                <li className="bg-red-500 text-white">
                  <Link 
                    href="/categories"
                    className="block px-4 py-3"
                  >
                    Browse All Categories
                  </Link>
                </li>
               
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
       {/* Search Bar */}
       <div className=' md:hidden w-full h-full'>
        <SearchBar/>
      </div>
    </div>
  );
}