"use client";
import React, { useEffect, useState } from "react";
import page from "../page";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PhuongTien {
  id: number;
  loaiPhuongTien: string;
  bienSo: string;
  soLuong: number;
  KhachHangId: number;
  KhachHang?: {
    id: number;
    hoTen: string;
    ngaySinh: string;
    cccd: string;
    diaChi: string;
    soDienThoai: string;
    email: string;
  };
}

const Page = () => {
  const [data, setData] = useState<PhuongTien[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/phuongtiendichuyen");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phương tiện:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        PHƯƠNG TIỆN DI CHUYỂN
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Khách hàng ID</TableHead>
            <TableHead className="text-white">Tên khách hàng</TableHead>
            <TableHead className="text-white">Loại phương tiện</TableHead>
            <TableHead className="text-white">Biển số</TableHead>
            <TableHead className="text-white">Số lượng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.KhachHangId}</TableCell>
              <TableCell className="text-white">
                {item.KhachHang?.hoTen ?? "—"}
              </TableCell>
              <TableCell className="text-white">
                {item.loaiPhuongTien}
              </TableCell>
              <TableCell className="text-white">{item.bienSo}</TableCell>
              <TableCell className="text-white">{item.soLuong}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
