"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Interface cho dữ liệu phòng trọ
interface PhongTro {
  id: number;
  tenPhong: string;
  giaPhong: number;
}

// Nhóm dữ liệu theo tên phòng
const groupByTenPhong = (data: PhongTro[]) => {
  const map: Record<string, number> = {};
  data.forEach((item) => {
    if (!map[item.tenPhong]) {
      map[item.tenPhong] = item.giaPhong;
    } else {
      map[item.tenPhong] += item.giaPhong;
    }
  });
  return Object.entries(map).map(([tenPhong, giaPhong]) => ({
    tenPhong,
    giaPhong,
  }));
};

// Hàm fetch dữ liệu dùng cho SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

// Component chính
const PhongChart = () => {
  // ✅ Gọi tất cả hooks ở đầu component
  const router = useRouter();
  const { data, error } = useSWR<PhongTro[]>(
    "http://localhost:3000/api/phongtro?page=1&limit=1000",
    fetcher
  );

  // Xử lý trạng thái loading và error
  if (error) return <div className="text-red-500">Lỗi khi tải dữ liệu</div>;
  if (!data) return <div className="text-white">Đang tải dữ liệu...</div>;

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = groupByTenPhong(data);

  return (
    <div>
      <Card className="bg-[#1D2636] text-white">
        <CardHeader>
          <CardTitle className="flex justify-center items-center text-5xl">
            Biểu đồ giá phòng theo tên phòng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300} className="ml-0">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                tick={{ fill: "white" }}
                ticks={[
                  0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000,
                  3500000,
                ]}
              />
              <XAxis dataKey="tenPhong" tick={{ fill: "white" }} />
              <Tooltip />
              <Bar dataKey="giaPhong" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/dashboard/phongtro")}
        className="bg-green-700 hover:bg-green-600 text-white mt-2"
      >
        Quay lại
      </Button>
    </div>
  );
};

export default PhongChart;
