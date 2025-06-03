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

interface PhanHoiNhanVien {
  id: number;
  PhanHoiId: number;
}

interface XuLyPhanHoiNhanVien {
  id: number;
  ngayXuLy: string;
  noiDungPhanHoi: string;
  ghiChu: string;
  PhanHoiNhanVienId: number;
  NhanVienId: number;
  PhanHoiNhanVien: PhanHoiNhanVien;
  NhanVien: NhanVien;
}

export default function XuLyPhanHoiNhanVienList() {
  const [data, setData] = useState<XuLyPhanHoiNhanVien[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/xulyphanhoinhanvien")
      .then((res) => res.json())
      .then((resData) => {
        const danhSach = Array.isArray(resData)
          ? resData
          : Array.isArray(resData.data)
          ? resData.data
          : [];
        setData(danhSach);
      })
      .catch((err) =>
        console.error("Lỗi khi tải dữ liệu xử lý phản hồi nhân viên:", err)
      );
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        NHÂN VIÊN PHẢN HỒI
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Ngày xử lý</TableHead>
            <TableHead className="text-white">Nội dung phản hồi</TableHead>
            <TableHead className="text-white">Ghi chú</TableHead>
            <TableHead className="text-white">ID Phản hồi NV</TableHead>
            <TableHead className="text-white">ID Nhân viên</TableHead>
            <TableHead className="text-white">Tên nhân viên</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayXuLy).toLocaleString()}
              </TableCell>
              <TableCell className="text-white">
                {item.noiDungPhanHoi}
              </TableCell>
              <TableCell className="text-white">{item.ghiChu}</TableCell>
              <TableCell className="text-white">
                {item.PhanHoiNhanVienId}
              </TableCell>
              <TableCell className="text-white">{item.NhanVien?.id}</TableCell>
              <TableCell className="text-white">
                {item.NhanVien?.hoTen}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
