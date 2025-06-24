import React, { useState } from 'react';
import { Search, Bell, ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import bigLogo from '../assets/big-logo.png';

const TopBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý tìm kiếm ở đây
        console.log('Tìm kiếm:', searchQuery);
    };

    const handleUserClick = () => {
        navigate('/profile/products');
    };

    return (
        <div className="w-full bg-gradient-to-r from-orange-300 to-orange-400 py-2 px-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <div className="h-12 overflow-hidden">
                    <img
                        src={bigLogo}
                        alt="HOBBY4EVERYONE"
                        className="h-full object-contain"
                    />
                </div>
            </Link>

            {/* Thanh tìm kiếm */}
            <form
                onSubmit={handleSearchSubmit}
                className="flex-grow max-w-2xl mx-8"
            >
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full py-2 px-4 rounded-l-md border-0 focus:ring-0 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 transition-colors p-2 rounded-r-md"
                    >
                        <Search className="text-white" size={24} />
                    </button>
                </div>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-6">
                <button className="text-gray-800 hover:text-gray-600 transition-colors">
                    <Bell size={24}/>
                </button>
                <button className="text-gray-800 hover:text-gray-600 transition-colors">
                    <ShoppingCart size={24}/>
                </button>
                <button
                    onClick={handleUserClick}
                    className="flex items-center justify-center bg-gray-200 rounded-full h-10 w-10 overflow-hidden border-2 border-white hover:bg-gray-300 transition-colors"
                >
                    <User size={24} className="text-gray-600"/>
                </button>
            </div>
        </div>
    );
};

export default TopBar;