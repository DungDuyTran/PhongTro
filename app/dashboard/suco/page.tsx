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

interface PhongTro {
  id: number;
  tenPhong: string;
  tang: number;
  kichThuoc: number;
  giaPhong: number;
  soNguoiToiDa: number;
  ToaNhaId: number;
  loaiPhongId: number | null;
}

interface SuCo {
  id: number;
  tenSuCo: string;
  soLuong: number;
  ngayBaoCao: string;
  ngayXuLy: string;
  ngayKetThuc: string;
  tinhTrang: string;
  moTa: string;
  PhongTroId: number;
  PhongTro: PhongTro;
}

const Page = () => {
  const [data, setData] = useState<SuCo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/danhsachsuco");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sự cố:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DANH SÁCH SỰ CỐ
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên sự cố</TableHead>
            <TableHead className="text-white">Số lượng</TableHead>
            <TableHead className="text-white">Ngày báo cáo</TableHead>
            <TableHead className="text-white">Ngày xử lý</TableHead>
            <TableHead className="text-white">Ngày kết thúc</TableHead>
            <TableHead className="text-white">Tình trạng</TableHead>
            <TableHead className="text-white">Mô tả</TableHead>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên phòng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">{item.tenSuCo}</TableCell>
              <TableCell className="text-white">{item.soLuong}</TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayBaoCao).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayXuLy).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayKetThuc).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="text-white">{item.tinhTrang}</TableCell>
              <TableCell className="text-white">{item.moTa}</TableCell>
              <TableCell className="text-white">{item.PhongTro?.id}</TableCell>
              <TableCell className="text-white">
                {item.PhongTro?.tenPhong}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
