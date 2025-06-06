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

interface KhachHang {
  id: number;
  hoTen: string;
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
  KhachHang?: KhachHang;
}

interface ChiTietHopDong {
  HopDongId: number;
  PhongTroId: number;
  PhongTro: PhongTro;
  HopDong: HopDong;
}

export default function ChiTietHopDongList() {
  const [data, setData] = useState<ChiTietHopDong[]>([]);
  const [hopDongs, setHopDongs] = useState<HopDong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cthdRes, hdRes] = await Promise.all([
          fetch("http://localhost:3000/api/chitiethopdong_"),
          fetch("http://localhost:3000/api/hopdong"),
        ]);

        const cthdJson = await cthdRes.json();
        const hopdongJson = await hdRes.json();

        const chiTietList = Array.isArray(cthdJson) ? cthdJson : cthdJson.data;
        const hopDongList = Array.isArray(hopdongJson)
          ? hopdongJson
          : hopdongJson.data;

        // Map hợp đồng theo id để dễ truy cập
        const hopDongMap: Record<number, HopDong> = {};
        for (const hd of hopDongList) {
          hopDongMap[hd.id] = hd;
        }

        // Gắn thêm thông tin KhachHang từ HopDong map
        const enriched = chiTietList.map((item: ChiTietHopDong) => ({
          ...item,
          HopDong: {
            ...item.HopDong,
            KhachHang: hopDongMap[item.HopDongId]?.KhachHang || undefined,
          },
        }));

        setData(enriched);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        HỢP ĐỒNG KHÁCH HÀNG
      </h1>
      {
        <Table>
          <TableCaption className="text-white"></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">Khách hàng</TableHead>
              <TableHead className="text-white">Phòng trọ</TableHead>
              <TableHead className="text-white">Tầng</TableHead>
              <TableHead className="text-white">Giá phòng</TableHead>
              <TableHead className="text-white">Ngày bắt đầu</TableHead>
              <TableHead className="text-white">Ngày kết thúc</TableHead>
              <TableHead className="text-white">Tiền cọc</TableHead>
              <TableHead className="text-white">Ghi chú</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={`${item.HopDongId}-${item.PhongTroId}`}>
                <TableCell className="text-white">{item.HopDongId}</TableCell>
                <TableCell className="text-white">
                  {item.HopDong?.KhachHang?.hoTen || "Không có"}
                </TableCell>
                <TableCell className="text-white">
                  {item.PhongTro.tenPhong}
                </TableCell>
                <TableCell className="text-white">
                  {item.PhongTro.tang}
                </TableCell>
                <TableCell className="text-white">
                  {item.PhongTro.giaPhong.toLocaleString()} đ
                </TableCell>
                <TableCell className="text-white">
                  {new Date(item.HopDong.ngayBatDau).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-white">
                  {new Date(item.HopDong.ngayKetThuc).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-white">
                  {item.HopDong.tienDaCoc.toLocaleString()} đ
                </TableCell>
                <TableCell className="text-white">
                  {item.HopDong.ghiChu}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </div>
  );
}
