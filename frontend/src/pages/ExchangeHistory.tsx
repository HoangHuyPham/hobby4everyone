import React from "react";
import { useState, useEffect } from "react";
import Header from '@/layouts/navigation/Header';
import Footer from '@/layouts/navigation/Footer';
import Cookies from "js-cookie";
interface Exchange {
    exchangeId: string,
    type: string,
    transactionDate: Date,
    status: string
}

const statusColorMap: Record<string, string> = {
    PENDING: "bg-sky-500 text-white cursor-pointer hover:opacity-90",
    SUCCESS_TRADE: "bg-yellow-400 text-black",
};

const statusLabelMap: Record<string, string> = {
    PENDING: "Trong quá trình giao dịch",
    SUCCESS_TRADE: "Giao dịch thành công",
};

function ExchangeHistory() {
    const token = Cookies.get("token");
    const [exchanges, setExchanges] = useState<Exchange[]>([]);

    useEffect(() => {
        const fetchExchanges = async () => {
            const token = Cookies.get("token");

            try {
                const response = await fetch("http://localhost:8080/model_trade/api/exchange/getAllExchangeByUser", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    mode: "cors",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // data.result sẽ là danh sách Exchange
                if (data.result) {
                    // Nếu transactionDate là string, nên convert về Date nếu cần
                    const parsed = data.result.map((ex: any) => ({
                        ...ex,
                        transactionDate: new Date(ex.transactionDate),
                    }));

                    setExchanges(parsed);
                } else {
                    console.warn("Không có kết quả trả về từ API.");
                }

            } catch (error) {
                console.error("Lỗi khi lấy danh sách exchanges:", error);
            }
        };

        fetchExchanges();
    }, []);


    const handlePayClick = async (exchangeId: string) => {
        const token = Cookies.get("token");
        try {
            const res = await fetch(
                `http://localhost:8080/model_trade/api/exchange/createPayURL/${exchangeId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    mode: "cors",
                    credentials: "include",
                }
            );

            const data = await res.json();
            if (data.result) {
                window.location.href = data.result; // Redirect to VNPay
            }
        } catch (error) {
            console.error("Lỗi khi tạo URL thanh toán:", error);
        }
    };




    return (
        <div className="flex flex-col min-h-screen items-center">
            <Header />
            <div className="w-full max-w-5xl mx-auto mt-8">
                <h1 className="text-2xl font-semibold mb-4">Danh sách giao dịch</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-md">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border">Mã giao dịch</th>
                                <th className="px-4 py-2 border">Loại</th>
                                <th className="px-4 py-2 border">Ngày giao dịch</th>
                                <th className="px-4 py-2 border">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exchanges.map((exchange) => (
                                <tr key={exchange.exchangeId} className="text-center">
                                    <td className="px-4 py-2 border">{exchange.exchangeId}</td>
                                    <td className="px-4 py-2 border">{exchange.type}</td>
                                    <td className="px-4 py-2 border">
                                        {new Date(exchange.transactionDate).toLocaleString("vi-VN")}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColorMap[exchange.status] || "bg-gray-300"
                                                }`}
                                            onClick={() =>
                                                exchange.status === "PENDING"
                                                    ? handlePayClick(exchange.exchangeId)
                                                    : undefined
                                            }
                                        >
                                            {statusLabelMap[exchange.status] || exchange.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {exchanges.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-gray-500">
                                        Không có giao dịch nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ExchangeHistory;
