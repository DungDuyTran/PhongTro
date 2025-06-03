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

interface PhongTroDichVu {
  soLuong: number;
  loaiDichVu: string;
  ghiChu: string;
  PhongTroId: number;
  DanhSachDichVuId: number;
  PhongTro: {
    id: number;
    tenPhong: string;
    tang: number;
    kichThuoc: number;
    giaPhong: number;
    soNguoiToiDa: number;
    ToaNhaId: number;
    loaiPhongId: number | null;
  };
  DanhSachDichVu: {
    id: number;
    tenDichVu: string;
    dacTa: string;
    isActive: boolean;
  };
}

const Page = () => {
  const [data, setData] = useState<PhongTroDichVu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/phongtro_danhsachphongtro"
        );
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DỊCH VỤ PHÒNG TRỌ
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>

            <TableHead className="text-white">Tên phòng</TableHead>
            <TableHead className="text-white">Tầng</TableHead>
            <TableHead className="text-white">Dịch vụ</TableHead>
            <TableHead className="text-white">Số lượng</TableHead>
            <TableHead className="text-white">Ghi chú</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{item.PhongTro.id}</TableCell>
              <TableCell className="text-white">
                {item.PhongTro.tenPhong}
              </TableCell>
              <TableCell className="text-white">{item.PhongTro.tang}</TableCell>
              <TableCell className="text-white">
                {item.DanhSachDichVu.tenDichVu}
              </TableCell>
              <TableCell className="text-white">{item.soLuong}</TableCell>
              <TableCell className="text-white">{item.ghiChu}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
