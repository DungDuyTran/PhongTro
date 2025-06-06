"use client";

import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Kiểu dữ liệu từ API
interface TinhTrangPhongItem {
  phongTroId: number;
  tinhTrangPhongId: number;
  tinhTrangPhong: {
    id: number;
    tinhTrang: string;
    ngayCapNhat: string;
  };
}

// Hàm đếm số lượng phòng theo tình trạng
const groupByTinhTrang = (data: TinhTrangPhongItem[]) => {
  const countMap: Record<string, number> = {};

  data.forEach((item) => {
    const tinhTrang = item.tinhTrangPhong?.tinhTrang || "Không rõ";
    countMap[tinhTrang] = (countMap[tinhTrang] || 0) + 1;
  });

  return Object.entries(countMap).map(([name, value]) => ({ name, value }));
};

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#c084fc"];

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.phongtro_tinhtrangphong);

const TinhTrangPhongChart = () => {
  const router = useRouter();

  const { data, error } = useSWR<TinhTrangPhongItem[]>(
    "http://localhost:3000/api/phongtro_tinhtrangphong?page=1&limit=1000",
    fetcher
  );

  if (error) return <div className="text-red-500">Lỗi khi tải dữ liệu.</div>;
  if (!data) return <div className="text-white">Đang tải dữ liệu...</div>;
  if (!Array.isArray(data)) {
    return <div className="text-red-500">Dữ liệu trả về không hợp lệ.</div>;
  }

  const chartData = groupByTinhTrang(data);

  return (
    <div>
      <div>
        <Card className="bg-[#1D2636] text-white">
          <CardHeader>
            <CardTitle className="flex justify-center text-3xl">
              Biểu đồ tình trạng phòng theo số phòng
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className=" flex flex-col items-start gap-2 mr-[300px] mt-[70px]">
              {chartData.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-white">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
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

export default TinhTrangPhongChart;
