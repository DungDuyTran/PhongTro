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

interface ThongBao {
  id: number;
  tieuDe: string;
  noiDung: string;
  ngayThongBao: string;
}

interface KhachHang {
  id: number;
  hoTen: string;
}

interface ThongBaoKhachHang {
  ThongBaoId: number;
  KhachHangId: number;
  ThongBao: ThongBao;
  KhachHang: KhachHang;
}

export default function ThongBaoKhachHangList() {
  const [data, setData] = useState<ThongBaoKhachHang[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/thongbao_khachhang")
      .then((res) => res.json())
      .then((resData) => {
        // Kiểm tra nếu dữ liệu là mảng, nếu không thì lấy từ resData.data hoặc trả về []
        const danhSach = Array.isArray(resData)
          ? resData
          : Array.isArray(resData.data)
          ? resData.data
          : [];

        setData(danhSach);
      })
      .catch((error) =>
        console.error("Lỗi khi tải dữ liệu ThongBaoKhachHang:", error)
      );
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        THÔNG BÁO KHÁCH HÀNG
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tiêu đề</TableHead>
            <TableHead className="text-white">Ngày thông báo</TableHead>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên khách hàng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.ThongBaoId}-${item.KhachHangId}`}>
              <TableCell className="text-white">{item.ThongBao.id}</TableCell>
              <TableCell className="text-white">
                {item.ThongBao.tieuDe}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.ThongBao.ngayThongBao).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">{item.KhachHang.id}</TableCell>
              <TableCell className="text-white">
                {item.KhachHang.hoTen}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
