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

interface BangChamCong {
  id: number;
  ngayChamCong: string;
  soGioLam: number;
  trangThai: string;
  NhanVienId: number;
}

interface LichLamViec {
  id: number;
  ngayLamViec: string;
  caLam: string;
  ghiChu: string;
}

interface Luong {
  hoTen: string;
  LichLamViecId: number;
  BangChamCongId: number;
  BangChamCong: BangChamCong;
  LichLamViec: LichLamViec;
}

const Page = () => {
  const [luongData, setLuongData] = useState<Luong[]>([]);

  useEffect(() => {
    const fetchLuongData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/luong");
        const result = await res.json();
        setLuongData(result.data); // Giả sử backend trả về { data: [...] }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu lương:", error);
      }
    };

    fetchLuongData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        LƯƠNG NHÂN VIÊN
      </h1>
      <Table>
        <TableCaption className="text-white text-4xl">
          Đang có vấn đề
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Họ tên</TableHead>
            <TableHead className="text-white">Ngày làm</TableHead>
            <TableHead className="text-white">Ca làm</TableHead>
            <TableHead className="text-white">Ghi chú</TableHead>
            <TableHead className="text-white">Ngày chấm công</TableHead>
            <TableHead className="text-white">Số giờ làm</TableHead>
            <TableHead className="text-white">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {luongData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{item.hoTen}</TableCell>
              <TableCell className="text-white">
                {new Date(item.LichLamViec.ngayLamViec).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {item.LichLamViec.caLam}
              </TableCell>
              <TableCell className="text-white">
                {item.LichLamViec.ghiChu}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.BangChamCong.ngayChamCong).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {item.BangChamCong.soGioLam}
              </TableCell>
              <TableCell className="text-white">
                {item.BangChamCong.trangThai}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
