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

interface HopDong {
  id: number;
  ngayBatDau: string;
  ngayKetThuc: string;
  tienDaCoc: number;
  tongTien: number;
  noiDung: string;
  ghiChu: string;
  KhachHangId: number;
  KhachHang: {
    id: number;
    hoTen: string;
  };
}

interface LichSuThayDoiPhong {
  id: number;
  idPhongCu: number;
  ngayChuyen: string;
  donGia: number;
  ghiChu: string;
  HopDongId: number;
  PhongTroId: number;
  PhongTro: PhongTro;
  HopDong: HopDong;
}

const LichSuThayDoiPhongPage = () => {
  const [lichSu, setLichSu] = useState<LichSuThayDoiPhong[]>([]);
  const [khachHangMap, setKhachHangMap] = useState<
    Record<number, { khachHangId: number; tenKhachHang: string }>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "http://localhost:3000/api/lichsuthaydoiphong"
        );
        const json1 = await res1.json();
        const data1 = Array.isArray(json1) ? json1 : json1.data;
        if (Array.isArray(data1)) {
          setLichSu(data1);
        } else {
          console.error("API /lichsuthaydoiphong không trả về mảng");
        }

        const res2 = await fetch("http://localhost:3000/api/hopdong");
        const json2 = await res2.json();
        const data2 = Array.isArray(json2) ? json2 : json2.data;
        if (!Array.isArray(data2)) {
          console.error("API /hopdong không trả về mảng");
          return;
        }

        const khMap: Record<
          number,
          { khachHangId: number; tenKhachHang: string }
        > = {};
        data2.forEach((hd) => {
          if (hd.KhachHangId) {
            khMap[hd.id] = {
              khachHangId: hd.KhachHangId,
              tenKhachHang: hd?.KhachHang?.hoTen || "Chưa có tên", // <- sửa đúng key
            };
          }
        });

        setKhachHangMap(khMap);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        LỊCH SỬ THAY ĐỔI PHÒNG
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Mã KH</TableHead>
            <TableHead className="text-white">Tên KH</TableHead>
            <TableHead className="text-white">Phòng cũ</TableHead>
            <TableHead className="text-white">Phòng mới</TableHead>
            <TableHead className="text-white">Ngày chuyển</TableHead>
            <TableHead className="text-white">Đơn giá</TableHead>
            <TableHead className="text-white">Ghi chú</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lichSu.map((item) => {
            const kh = khachHangMap[item.HopDongId];
            return (
              <TableRow key={item.id}>
                <TableCell className="text-white">
                  {kh?.khachHangId || "?"}
                </TableCell>
                <TableCell className="text-white">
                  {kh?.tenKhachHang || "?"}
                </TableCell>
                <TableCell className="text-white">
                  Phòng {item.idPhongCu}
                </TableCell>
                <TableCell className="text-white">
                  {item.PhongTro?.tenPhong || "?"}
                </TableCell>
                <TableCell className="text-white">
                  {new Date(item.ngayChuyen).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-white">
                  {item.donGia.toLocaleString()}₫
                </TableCell>
                <TableCell className="text-white">{item.ghiChu}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LichSuThayDoiPhongPage;
