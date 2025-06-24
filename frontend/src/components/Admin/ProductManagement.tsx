import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaHeart, FaSearch, FaFilter, FaTrashAlt } from "react-icons/fa";
import Cookies from "js-cookie";

interface Model {
    modelId: string;
    name: string;
    images: string[];
    description: string;
    price: number;
    see: number;
    like: number;
    delete: boolean;
    createdDate?: string;
}

interface Props {
    userId: string;
    userName: string;
    goBack: () => void;
}

const ProductManagement: React.FC<Props> = ({ userId, userName, goBack }) => {
    const [models, setModels] = useState<Model[]>([]);
    const [filteredModels, setFilteredModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const navigate = useNavigate();

    const fetchModels = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("token");
            if (!token) throw new Error("Token không tồn tại");

            const response = await fetch(
                `http://localhost:8080/model_trade/api/admin/getAllModelByUserId/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Không thể tải dữ liệu sản phẩm");

            const data = await response.json();
            setModels(data.result);
            setFilteredModels(data.result);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModels();
    }, [userId]);

    useEffect(() => {
        let filtered = models;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(model =>
                model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                model.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter === "active") {
            filtered = filtered.filter(model => !model.delete);
        } else if (statusFilter === "deleted") {
            filtered = filtered.filter(model => model.delete);
        }

        setFilteredModels(filtered);
    }, [models, searchTerm, statusFilter]);

    const handleDeleteProduct = async (modelId: string) => {
        const token = Cookies.get("token");
        if (!token) {
            alert("Bạn phải đăng nhập để thực hiện hành động này.");
            return;
        }

        const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (!confirmation) return;

        try {
            const response = await fetch(`http://localhost:8080/model_trade/api/admin/deleteModel/${modelId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Không thể xóa sản phẩm");

            const data = await response.json();
            alert(data.message); // Thông báo khi xóa thành công
            fetchModels(); // Tải lại danh sách sản phẩm
        } catch (error) {
            alert(error instanceof Error ? error.message : "Lỗi không xác định khi xóa sản phẩm");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Đang tải sản phẩm...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800">{error}</div>
                <button
                    onClick={fetchModels}
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
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={goBack}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Quay lại</span>
                    </button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Sản phẩm của {userName}</h3>
                        <p className="text-gray-600 mt-1">Quản lý tất cả sản phẩm của người dùng</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
                <div className="flex-1">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FaFilter className="text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="active">Đang bán</option>
                        <option value="deleted">Đã xóa</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            {filteredModels.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="text-gray-500 text-lg">
                        {searchTerm || statusFilter !== "all"
                            ? "Không tìm thấy sản phẩm nào phù hợp"
                            : "Người dùng chưa có sản phẩm nào"
                        }
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredModels.map((model) => (
                        <div
                            key={model.modelId}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >
                            <div
                                className="cursor-pointer"
                                onClick={() => navigate(`/product/${model.modelId}`)}
                            >
                                {/* Product Image */}
                                <div className="relative h-48 bg-gray-100">
                                    {model.images && model.images.length > 0 ? (
                                        <img
                                            src={model.images[0]}
                                            alt={model.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <span>Không có ảnh</span>
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div className="absolute top-2 right-2">
                                        {model.delete ? (
                                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                                Đã xóa
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                Đang bán
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h4
                                    className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
                                    onClick={() => navigate(`/product/${model.modelId}`)}
                                >
                                    {model.name}
                                </h4>

                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {model.description}
                                </p>

                                <div className="space-y-2">
                                    <div className="text-lg font-bold text-blue-600">
                                        {model.price.toLocaleString('vi-VN')} ₫
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1">
                                                <FaEye className="text-xs" />
                                                <span>{model.see}</span>
                                            </div>
                                            {model.like !== undefined && (
                                                <div className="flex items-center space-x-1">
                                                    <FaHeart className="text-xs" />
                                                    <span>{model.like}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductManagement;