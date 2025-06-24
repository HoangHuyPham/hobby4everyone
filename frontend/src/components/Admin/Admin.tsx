import React, { useState } from "react";
import { FaUsers, FaBoxOpen, FaHistory, FaHome } from "react-icons/fa";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";
import ExchangeManagement from "./ExchangeManagement";

const Admin: React.FC = () => {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [selectedUserName, setSelectedUserName] = useState<string>("");
    const [viewingExchangeHistory, setViewingExchangeHistory] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<'users' | 'products' | 'exchanges'>('users');

    const handleViewExchangeHistory = (userId: string, userName: string) => {
        setSelectedUserId(userId);
        setSelectedUserName(userName);
        setViewingExchangeHistory(true);
        setCurrentView('exchanges');
    };

    const handleViewProducts = (userId: string, userName: string) => {
        setSelectedUserId(userId);
        setSelectedUserName(userName);
        setViewingExchangeHistory(false);
        setCurrentView('products');
    };

    const handleGoBack = () => {
        setSelectedUserId(null);
        setSelectedUserName("");
        setViewingExchangeHistory(false);
        setCurrentView('users');
    };

    const renderBreadcrumb = () => {
        const items = [
            { label: 'Quản trị', icon: <FaHome />, active: currentView === 'users' }
        ];

        if (currentView === 'products') {
            items.push({ label: `Sản phẩm - ${selectedUserName}`, icon: <FaBoxOpen />, active: true });
        } else if (currentView === 'exchanges') {
            items.push({ label: `Lịch sử trao đổi - ${selectedUserName}`, icon: <FaHistory />, active: true });
        }

        return (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <span>/</span>}
                        <div className={`flex items-center space-x-1 ${item.active ? 'text-blue-600 font-medium' : ''}`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className="admin-container flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="sidebar bg-white shadow-lg w-64 h-full">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FaUsers className="text-white text-lg" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                            <p className="text-sm text-gray-500">Quản lý hệ thống</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={handleGoBack}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    currentView === 'users'
                                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                            >
                                <FaUsers className="text-lg" />
                                <span className="font-medium">Quản lý người dùng</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="content flex-1 h-full overflow-hidden">
                <div className="h-full p-6 overflow-y-auto">
                    {renderBreadcrumb()}

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
                        <div className="p-6 h-full overflow-y-auto">
                            {viewingExchangeHistory ? (
                                <ExchangeManagement
                                    userId={selectedUserId!}
                                    userName={selectedUserName}
                                    goBack={handleGoBack}
                                />
                            ) : selectedUserId ? (
                                <ProductManagement
                                    userId={selectedUserId}
                                    goBack={handleGoBack}
                                    userName={selectedUserName}
                                />
                            ) : (
                                <UserManagement
                                    onViewProducts={handleViewProducts}
                                    onViewExchangeHistory={handleViewExchangeHistory}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;