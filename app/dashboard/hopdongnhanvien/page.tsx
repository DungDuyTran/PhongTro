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

interface NhanVien {
  id: number;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: boolean;
  soDienThoai: string;
  email: string;
  diaChi: string;
}

interface HopDongNhanVien {
  id: number;
  ngayBatDau: string;
  ngayKetThuc: string;
  luongCoBan: string;
  ghiChu: string;
  NhanVienId: number;
  NhanVien: NhanVien;
}

export default function HopDongNhanVienList() {
  const [data, setData] = useState<HopDongNhanVien[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hopdongnhanvien");
        const json = await res.json();
        const list = Array.isArray(json) ? json : json.data;

        if (Array.isArray(list)) {
          setData(list);
        } else {
          console.error("Dữ liệu trả về không hợp lệ:", json);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu hợp đồng nhân viên:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        HỢP ĐỒNG NHÂN VIÊN
      </h1>

      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên nhân viên</TableHead>
            <TableHead className="text-white">Ngày bắt đầu</TableHead>
            <TableHead className="text-white">Ngày kết thúc</TableHead>
            <TableHead className="text-white">Lương cơ bản</TableHead>
            <TableHead className="text-white">Ghi chú</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">
                {item.NhanVien?.hoTen}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayBatDau).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayKetThuc).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {parseInt(item.luongCoBan).toLocaleString()} đ
              </TableCell>
              <TableCell className="text-white">{item.ghiChu}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
