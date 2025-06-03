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

interface ChamCong {
  id: number;
  ngayChamCong: string;
  soGioLam: number;
  trangThai: string;
  NhanVienId: number;
  NhanVien?: {
    hoTen: string;
  };
}

const Page = () => {
  const [data, setData] = useState<ChamCong[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/bangchamcong");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu chấm công:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        BẢNG CHẤM CÔNG NHÂN VIÊN
      </h1>

      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Mã NV</TableHead>
            <TableHead className="text-white">Nhân viên</TableHead>
            <TableHead className="text-white">Ngày chấm công</TableHead>
            <TableHead className="text-white">Số giờ làm</TableHead>
            <TableHead className="text-white">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.NhanVienId}</TableCell>
              <TableCell className="text-white">
                {item.NhanVien?.hoTen || "Không rõ"}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayChamCong).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="text-white">{item.soGioLam}</TableCell>
              <TableCell className="text-white">{item.trangThai}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
