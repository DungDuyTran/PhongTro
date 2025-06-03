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

interface ThietBi {
  id: number;
  tenThietBi: string;
  loaiThietBi: string;
  soLuong: number;
}

interface SuaChuaThietBi {
  id: number;
  tenSuaChua: string;
  tenNhanVien: string;
}

interface ChiTietSuaChua {
  tenSuaChua: string;
  soTien: number;
  ThietBiId: number;
  SuaChuaThietBiId: number;
  ThietBi: ThietBi;
  SuaChuaThietBi: SuaChuaThietBi;
}

const Page = () => {
  const [data, setData] = useState<ChiTietSuaChua[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/chitietsuachua");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu chi tiết sửa chữa:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        SỬA CHỮA
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID Thiết Bị</TableHead>
            <TableHead className="text-white">Tên Thiết Bị</TableHead>
            <TableHead className="text-white">Loại</TableHead>
            <TableHead className="text-white">Số lượng</TableHead>
            <TableHead className="text-white">Tên Sửa Chữa</TableHead>
            <TableHead className="text-white">Số Tiền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{item.ThietBi.id}</TableCell>
              <TableCell className="text-white">
                {item.ThietBi.tenThietBi}
              </TableCell>
              <TableCell className="text-white">
                {item.ThietBi.loaiThietBi}
              </TableCell>
              <TableCell className="text-white">
                {item.ThietBi.soLuong}
              </TableCell>
              <TableCell className="text-white">
                {item.SuaChuaThietBi.tenSuaChua}
              </TableCell>

              <TableCell className="text-white">
                {item.soTien.toLocaleString("vi-VN")} ₫
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
