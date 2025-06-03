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

interface ChiTietDanhGia {
  DanhGiaId: number;
  KhachHangId: number;
  DanhGia: {
    id: number;
    noiDung: string;
    ngayDanhGia: string;
    soSao: number;
    PhongTroId: number;
  };
  KhachHang: {
    id: number;
    hoTen: string;
  };
}

const Page = () => {
  const [data, setData] = useState<ChiTietDanhGia[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/chitietdanhgia");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        ĐÁNH GIÁ PHẢN HỒI PHÒNG TRỌ
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID Phòng</TableHead>
            <TableHead className="text-white">ID KH</TableHead>
            <TableHead className="text-white">Khách hàng</TableHead>
            <TableHead className="text-white">Ngày đánh giá</TableHead>
            <TableHead className="text-white">Số sao</TableHead>
            <TableHead className="text-white">Nội dung</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.DanhGiaId}-${item.KhachHangId}`}>
              <TableCell className="text-white">
                {item.DanhGia?.PhongTroId}
              </TableCell>

              <TableCell className="text-white">{item.KhachHang?.id}</TableCell>
              <TableCell className="text-white">
                {item.KhachHang?.hoTen}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.DanhGia.ngayDanhGia).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {item.DanhGia.soSao} ⭐
              </TableCell>
              <TableCell className="text-white">
                {item.DanhGia.noiDung}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
