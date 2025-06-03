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

const Page = () => {
  const [data, setData] = useState<NhanVien[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/nhanvien");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu nhân viên:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DANH SÁCH NHÂN VIÊN
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Họ tên</TableHead>
            <TableHead className="text-white">Ngày sinh</TableHead>
            <TableHead className="text-white">Giới tính</TableHead>
            <TableHead className="text-white">SĐT</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Địa chỉ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">{item.hoTen}</TableCell>
              <TableCell className="text-white">
                {new Date(item.ngaySinh).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {item.gioiTinh ? "Nam" : "Nữ"}
              </TableCell>
              <TableCell className="text-white">{item.soDienThoai}</TableCell>
              <TableCell className="text-white">{item.email}</TableCell>
              <TableCell className="text-white">{item.diaChi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
