"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HopDong {
  id: number;
  ngayBatDau: string;
  ngayKetThuc: string;
  tienDaCoc: number;
  tongTien: number;
  noiDung: string;
  ghiChu: string;
  KhachHangId: number;
}

const Page = () => {
  const [data, setData] = useState<HopDong[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hopdong");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải hợp đồng:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        TẠO HỢP ĐỒNG KHÁCH HÀNG
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Ngày bắt đầu</TableHead>
            <TableHead className="text-white">Ngày kết thúc</TableHead>
            <TableHead className="text-white">Tiền đặt cọc</TableHead>
            <TableHead className="text-white">Tổng tiền</TableHead>
            <TableHead className="text-white">Nội dung</TableHead>
            <TableHead className="text-white">Ghi chú</TableHead>
            <TableHead className="text-white">Khách hàng ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayBatDau).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayKetThuc).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">{item.tienDaCoc}</TableCell>
              <TableCell className="text-white">{item.tongTien}</TableCell>
              <TableCell className="text-white">{item.noiDung}</TableCell>
              <TableCell className="text-white">{item.ghiChu}</TableCell>
              <TableCell className="text-white">{item.KhachHangId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
