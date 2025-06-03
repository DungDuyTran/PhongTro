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

interface NhanVien {
  id: number;
  hoTen: string;
}

interface ThongBaoNhanVien {
  ThongBaoId: number;
  NhanVienId: number;
  ThongBao: ThongBao;
  NhanVien: NhanVien;
}

export default function ThongBaoNhanVienList() {
  const [data, setData] = useState<ThongBaoNhanVien[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/thongbao_nhanvien")
      .then((res) => res.json())
      .then((resData) => {
        const danhSach = Array.isArray(resData)
          ? resData
          : Array.isArray(resData.data)
          ? resData.data
          : [];

        setData(danhSach);
      })
      .catch((error) =>
        console.error("Lỗi khi tải dữ liệu ThongBaoNhanVien:", error)
      );
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        THÔNG BÁO NHÂN VIÊN
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tiêu đề</TableHead>
            <TableHead className="text-white">Ngày thông báo</TableHead>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên nhân viên</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.ThongBaoId}-${item.NhanVienId}`}>
              <TableCell className="text-white">{item.ThongBao.id}</TableCell>
              <TableCell className="text-white">
                {item.ThongBao.tieuDe}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.ThongBao.ngayThongBao).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">{item.NhanVien.id}</TableCell>
              <TableCell className="text-white">
                {item.NhanVien.hoTen}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
