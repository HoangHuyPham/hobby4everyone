import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaSearch, FaCalendarAlt, FaFilter, FaDownload } from "react-icons/fa";
import Cookies from "js-cookie";

interface Exchange {
    exchangeId: string;
    type: string;
    transactionDate: string;
    status: string;
    amount?: number;
    description?: string;
}

interface Props {
    userId: string;
    userName: string;
    goBack: () => void;
}

const ExchangeManagement: React.FC<Props> = ({ userId, userName, goBack }) => {
    const [exchanges, setExchanges] = useState<Exchange[]>([]);
    const [filteredExchanges, setFilteredExchanges] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [dateRange, setDateRange] = useState<string>("all");

    const fetchExchanges = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("token");
            if (!token) throw new Error("Token không tồn tại");

            const response = await fetch(`http://localhost:8080/model_trade/api/admin/getAllExchangeByUserId/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Không thể tải lịch sử trao đổi");

            const data = await response.json();
            if (Array.isArray(data.result)) {
                setExchanges(data.result);
                setFilteredExchanges(data.result);
            } else {
                setExchanges([]);
                setFilteredExchanges([]);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExchanges();
    }, [userId]);

    useEffect(() => {
        let filtered = exchanges;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(exchange =>
                exchange.exchangeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                exchange.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by type
        if (typeFilter !== "all") {
            filtered = filtered.filter(exchange => exchange.type === typeFilter);
        }

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter(exchange => exchange.status === statusFilter);
        }

        // Filter by date range
        if (dateRange !== "all") {
            const now = new Date();
            const filterDate = new Date();

            switch (dateRange) {
                case "today":
                    filterDate.setHours(0, 0, 0, 0);
                    break;
                case "week":
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case "month":
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
            }

            filtered = filtered.filter(exchange =>
                new Date(exchange.transactionDate) >= filterDate
            );
        }

        setFilteredExchanges(filtered);
    }, [exchanges, searchTerm, typeFilter, statusFilter, dateRange]);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            'COMPLETED': { bg: 'bg-green-100', text: 'text-green-800', label: 'Hoàn thành' },
            'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xử lý' },
            'CANCELLED': { bg: 'bg-red-100', text: 'text-red-800', label: 'Đã hủy' },
            'PROCESSING': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đang xử lý' }
        };

        const config = statusConfig[status as keyof typeof statusConfig] ||
            { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    const getTypeBadge = (type: string) => {
        const typeConfig = {
            'BUY': { bg: 'bg-green-100', text: 'text-green-800', label: 'Mua' },
            'SELL': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Bán' },
            'EXCHANGE': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Trao đổi' },
            'REFUND': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Hoàn tiền' }
        };

        const config = typeConfig[type as keyof typeof typeConfig] ||
            { bg: 'bg-gray-100', text: 'text-gray-800', label: type };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    const exportToCSV = () => {
        const csvContent = [
            ['ID Giao dịch', 'Loại', 'Trạng thái', 'Ngày giao dịch'].join(','),
            ...filteredExchanges.map(exchange => [
                exchange.exchangeId,
                exchange.type,
                exchange.status,
                new Date(exchange.transactionDate).toLocaleString('vi-VN')
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `lich-su-giao-dich-${userName}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Đang tải lịch sử trao đổi...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800">{error}</div>
                <button
                    onClick={fetchExchanges}
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
                        <h3 className="text-2xl font-bold text-gray-900">Lịch sử trao đổi của {userName}</h3>
                        <p className="text-gray-600 mt-1">Theo dõi tất cả giao dịch của người dùng</p>
                    </div>
                </div>

                {filteredExchanges.length > 0 && (
                    <button
                        onClick={exportToCSV}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <FaDownload className="text-sm" />
                        <span>Xuất CSV</span>
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm giao dịch..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <FaFilter className="text-gray-400" />
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Tất cả loại</option>
                            <option value="BUY">Mua</option>
                            <option value="SELL">Bán</option>
                            <option value="EXCHANGE">Trao đổi</option>
                            <option value="REFUND">Hoàn tiền</option>
                        </select>
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="COMPLETED">Hoàn thành</option>
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="PROCESSING">Đang xử lý</option>
                        <option value="CANCELLED">Đã hủy</option>
                    </select>

                    <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-gray-400" />
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Tất cả thời gian</option>
                            <option value="today">Hôm nay</option>
                            <option value="week">7 ngày qua</option>
                            <option value="month">30 ngày qua</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{exchanges.length}</div>
                    <div className="text-sm text-gray-600">Tổng giao dịch</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">
                        {exchanges.filter(e => e.status === 'COMPLETED').length}
                    </div>
                    <div className="text-sm text-gray-600">Hoàn thành</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">
                        {exchanges.filter(e => e.status === 'PENDING').length}
                    </div>
                    <div className="text-sm text-gray-600">Chờ xử lý</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">
                        {exchanges.filter(e => e.type === 'EXCHANGE').length}
                    </div>
                    <div className="text-sm text-gray-600">Trao đổi</div>
                </div>
            </div>

            {/* Exchange Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID Giao dịch
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Loại
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày giao dịch
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredExchanges.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    {searchTerm || typeFilter !== "all" || statusFilter !== "all" || dateRange !== "all"
                                        ? "Không tìm thấy giao dịch nào phù hợp"
                                        : "Chưa có lịch sử giao dịch"
                                    }
                                </td>
                            </tr>
                        ) : (
                            filteredExchanges.map((exchange) => (
                                <tr key={exchange.exchangeId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-mono text-gray-900">
                                            {exchange.exchangeId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getTypeBadge(exchange.type)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(exchange.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(exchange.transactionDate).toLocaleString('vi-VN')}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExchangeManagement;