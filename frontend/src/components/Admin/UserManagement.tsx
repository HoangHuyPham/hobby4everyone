import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaHistory, FaToggleOn, FaToggleOff, FaSearch } from "react-icons/fa";
import Cookies from "js-cookie";

interface User {
    userId: string;
    userName: string;
    email: string;
    createdDate: string;
    phoneNumber: string;
    dateOfBirth: string;
    role: string;
    active: boolean;
    delete: boolean;
}

interface Props {
    onViewProducts: (userId: string, userName: string) => void;
    onViewExchangeHistory: (userId: string, userName: string) => void;
}

const UserManagement: React.FC<Props> = ({ onViewProducts, onViewExchangeHistory }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("token");
            if (!token) throw new Error("Token không tồn tại");

            const response = await fetch("http://localhost:8080/model_trade/api/user/getAll", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Không thể tải dữ liệu người dùng");

            const data = await response.json();
            setUsers(data.result);
            setFilteredUsers(data.result);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        let filtered = users;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (filterStatus === "active") {
            filtered = filtered.filter(user => !user.delete && user.active);
        } else if (filterStatus === "inactive") {
            filtered = filtered.filter(user => !user.delete && !user.active);
        } else if (filterStatus === "deleted") {
            filtered = filtered.filter(user => user.delete);
        }

        setFilteredUsers(filtered);
    }, [users, searchTerm, filterStatus]);

    const handleActivateUser = async (userId: string) => {
        const token = Cookies.get("token");
        if (!token) {
            alert("Bạn phải đăng nhập để thực hiện hành động này.");
            return;
        }

        const confirmation = window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái người dùng này?");
        if (!confirmation) return;

        try {
            const response = await fetch(`http://localhost:8080/model_trade/api/admin/deactivateUser/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Không thể cập nhật người dùng");

            const data = await response.json();
            alert(data.message);
            fetchUsers();
        } catch (error) {
            alert(error instanceof Error ? error.message : "Lỗi không xác định khi cập nhật người dùng");
        }
    };

    const getStatusBadge = (user: User) => {
        if (user.delete) {
            return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Đã vô hiệu hóa</span>;
        } else if (user.active) {
            return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Đã kích hoạt</span>;
        } else {
            return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Chưa kích hoạt</span>;
        }
    };

    const getRoleBadge = (role: string) => {
        const colors = {
            'ADMIN': 'bg-purple-100 text-purple-800',
            'USER': 'bg-blue-100 text-blue-800',
            'MODERATOR': 'bg-orange-100 text-orange-800'
        };
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
                {role}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Đang tải...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800">{error}</div>
                <button
                    onClick={fetchUsers}
                    className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h3>
                    <p className="text-gray-600 mt-1">Quản lý tất cả người dùng trong hệ thống</p>
                </div>
                <button
                    onClick={fetchUsers}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FaHistory className="text-sm" />
                    <span>Làm mới</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
                <div className="flex-1">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="active">Đã kích hoạt</option>
                        <option value="inactive">Chưa kích hoạt</option>
                        <option value="deleted">Đã vô hiệu hóa</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                    <div className="text-sm text-gray-600">Tổng người dùng</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{users.filter(u => !u.delete && u.active).length}</div>
                    <div className="text-sm text-gray-600">Đã kích hoạt</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">{users.filter(u => !u.delete && !u.active).length}</div>
                    <div className="text-sm text-gray-600">Chưa kích hoạt</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-red-600">{users.filter(u => u.delete).length}</div>
                    <div className="text-sm text-gray-600">Đã vô hiệu hóa</div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Người dùng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Liên hệ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vai trò
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hành động
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(user.dateOfBirth).toLocaleDateString('vi-VN')}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm text-gray-900">{user.email}</div>
                                        <div className="text-sm text-gray-500">{user.phoneNumber}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getRoleBadge(user.role)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(user)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(user.createdDate).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex items-center justify-center space-x-3">
                                        <button
                                            onClick={() => handleActivateUser(user.userId)}
                                            className="text-gray-600 hover:text-red-600 transition-colors"
                                            title={user.delete ? "Khôi phục tài khoản" : "Vô hiệu hóa tài khoản"}
                                        >
                                            {user.delete ? <FaToggleOff size={18} /> : <FaToggleOn size={18} />}
                                        </button>
                                        <button
                                            onClick={() => onViewProducts(user.userId, user.userName)}
                                            className="text-green-600 hover:text-green-800 transition-colors"
                                            title="Xem sản phẩm"
                                        >
                                            <FaBoxOpen size={16} />
                                        </button>
                                        <button
                                            onClick={() => onViewExchangeHistory(user.userId, user.userName)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                            title="Xem lịch sử trao đổi"
                                        >
                                            <FaHistory size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500">Không tìm thấy người dùng nào</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;