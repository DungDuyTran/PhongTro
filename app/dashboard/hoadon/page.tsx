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

interface HoaDon {
  id: number;
  ngayLap: string;
  loaiHoaDon: string;
  tinhTrang: string;
  soTien: number | string;
  LichSuThanhToanId?: number;
  KhachHangId: number;
  KhachHang?: {
    id: number;
    hoTen: string;
    ngaySinh: string;
    cccd: string;
    diaChi: string;
    soDienThoai: string;
    email: string;
  };
  LichSuThanhToan?: {
    id: number;
    ngayThanhToan: string;
    soTien: number;
  };
}

const Page = () => {
  const [data, setData] = useState<HoaDon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hoadon");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu hóa đơn:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        HÓA ĐƠN PHÒNG TRỌ
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Ngày lập</TableHead>
            <TableHead className="text-white">Loại hóa đơn</TableHead>
            <TableHead className="text-white">Tình trạng</TableHead>
            <TableHead className="text-white">Số tiền</TableHead>

            <TableHead className="text-white">Khách hàng ID</TableHead>
            <TableHead className="text-white">Tên khách hàng</TableHead>
            <TableHead className="text-white">Ngày thanh toán</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayLap).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">{item.loaiHoaDon}</TableCell>
              <TableCell className="text-white">{item.tinhTrang}</TableCell>
              <TableCell className="text-white">{item.soTien}</TableCell>

              <TableCell className="text-white">{item.KhachHangId}</TableCell>
              <TableCell className="text-white">
                {item.KhachHang?.hoTen ?? "—"}
              </TableCell>
              <TableCell className="text-white">
                {item.LichSuThanhToan
                  ? new Date(
                      item.LichSuThanhToan.ngayThanhToan
                    ).toLocaleDateString()
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
