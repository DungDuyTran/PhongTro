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
  ToaNha: {
    tenToaNha: string;
    diaChi: string;
  };
}

interface TinhTrangPhong {
  tinhTrang: string;
  ngayCapNhat: string;
}

interface PhongTroTinhTrang {
  phongTroId: number;
  tinhTrangPhongId: number;
  phongTro: PhongTro;
  tinhTrangPhong: TinhTrangPhong;
}

const Page = () => {
  const [phongData, setPhongData] = useState<PhongTroTinhTrang[]>([]);

  useEffect(() => {
    const fetchPhongData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/phongtro_tinhtrangphong"
        );
        const result = await res.json();
        setPhongData(result.phongtro_tinhtrangphong);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPhongData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DANH SÁCH TÌNH TRẠNG PHÒNG TRỌ
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow className="text-white">
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên phòng</TableHead>
            <TableHead className="text-white">Tầng</TableHead>
            <TableHead className="text-white">Kích thước (m²)</TableHead>
            <TableHead className="text-white">Giá phòng</TableHead>
            <TableHead className="text-white">Số người tối đa</TableHead>
            <TableHead className="text-white">Tình trạng</TableHead>
            <TableHead className="text-white">Ngày cập nhật</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {phongData.map((item) => (
            <TableRow key={item.phongTroId} className="text-white">
              <TableCell className="text-white">{item.phongTro.id}</TableCell>
              <TableCell className="text-white">
                {item.phongTro.tenPhong}
              </TableCell>
              <TableCell className="text-white">{item.phongTro.tang}</TableCell>
              <TableCell className="text-white">
                {item.phongTro.kichThuoc} m²
              </TableCell>
              <TableCell className="text-white">
                {item.phongTro.giaPhong.toLocaleString()} VND
              </TableCell>
              <TableCell className="text-white">
                {item.phongTro.soNguoiToiDa}
              </TableCell>
              <TableCell className="text-white">
                {item.tinhTrangPhong.tinhTrang}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.tinhTrangPhong.ngayCapNhat).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
