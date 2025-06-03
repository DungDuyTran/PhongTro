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

interface LichLamViec {
  id: number;
  ngayLamViec: string;
  caLam: string;
  ghiChu: string;
}

interface PhanCong {
  NhanVienId: number;
  LichLamViecId: number;
  NhanVien: NhanVien;
  LichLamViec: LichLamViec;
}

const Page = () => {
  const [data, setData] = useState<PhanCong[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/nhanvien_lichlamviec"
        );
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phân công lịch làm việc:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        LỊCH LÀM VIỆC NHÂN VIÊN
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID Nhân viên</TableHead>
            <TableHead className="text-white">Tên nhân viên</TableHead>
            <TableHead className="text-white">ID Lịch làm</TableHead>
            <TableHead className="text-white">Ngày làm việc</TableHead>
            <TableHead className="text-white">Ca làm</TableHead>
            <TableHead className="text-white">Ghi chú</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{item.NhanVien.id}</TableCell>
              <TableCell className="text-white">
                {item.NhanVien.hoTen}
              </TableCell>
              <TableCell className="text-white">
                {item.LichLamViec.id}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.LichLamViec.ngayLamViec).toLocaleDateString(
                  "vi-VN"
                )}
              </TableCell>
              <TableCell className="text-white">
                {item.LichLamViec.caLam}
              </TableCell>
              <TableCell className="text-white">
                {item.LichLamViec.ghiChu}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
