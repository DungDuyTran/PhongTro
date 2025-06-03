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

interface LichSuSuDungDichVu {
  id: number;
  ngaySuDung: string;
  soLuong: number;
  thanhTien: number;
  KhachHangId: number;
  NhanVienId: number;
  KhachHang?: {
    id: number;
    hoTen: string;
    ngaySinh: string;
    cccd: string;
    diaChi: string;
    soDienThoai: string;
    email: string;
  };
  NhanVien?: {
    id: number;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: boolean;
    soDienThoai: string;
    email: string;
    diaChi: string;
  };
}

const Page = () => {
  const [data, setData] = useState<LichSuSuDungDichVu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/lichsusudungdichvu");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu lịch sử sữ dụng dịch vụ:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        LỊCH SỬ SỮ DỤNG DỊCH VỤ
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Ngày sử dụng</TableHead>
            <TableHead className="text-white">Số lượng</TableHead>
            <TableHead className="text-white">Thành tiền</TableHead>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên Khách hàng</TableHead>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên Nhân viên</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">
                {new Date(item.ngaySuDung).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">{item.soLuong}</TableCell>
              <TableCell className="text-white">{item.thanhTien}</TableCell>
              <TableCell className="text-white">{item.KhachHangId}</TableCell>
              <TableCell className="text-white">
                {item.KhachHang?.hoTen ?? "—"}
              </TableCell>
              <TableCell className="text-white">{item.NhanVienId}</TableCell>
              <TableCell className="text-white">
                {item.NhanVien?.hoTen ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
