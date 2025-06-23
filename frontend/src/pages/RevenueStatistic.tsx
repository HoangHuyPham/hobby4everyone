import React, { useEffect, useState } from "react";
import Header from "@/layouts/navigation/Header";
import Footer from "@/layouts/navigation/Footer";
import Cookies from "js-cookie";
import { DatePicker, Button } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";

const { RangePicker } = DatePicker;

interface Revenue {
  date: string;
  total: number;
}

function RevenueStatistic() {
  const [data, setData] = useState<Revenue[]>([]);
  const [range, setRange] = useState<[moment.Moment | null, moment.Moment | null]>([null, null]);

  const fetchRevenue = async () => {
    const token = Cookies.get("token");
    const params = new URLSearchParams();

    if (range[0] && range[1]) {
      params.append("startDate", range[0].toISOString());
      params.append("endDate", range[1].toISOString());
    }

    try {
      const res = await fetch(`http://localhost:8080/api/statistics/revenue?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        credentials: "include",
      });

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header />
      <div className="w-full max-w-5xl mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">Thống kê doanh thu</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <RangePicker
            value={range}
            onChange={(dates) => setRange(dates as any)}
            format="YYYY-MM-DD"
          />
          <Button type="primary" onClick={fetchRevenue}>
            Thống kê
          </Button>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">Không có dữ liệu doanh thu</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RevenueStatistic;
