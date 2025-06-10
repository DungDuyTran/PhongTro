"use client";
import { saveAs } from "file-saver";
import { Trash, Pencil } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface KhachHang {
  id: number;
  hoTen: string;
  ngaySinh: string;
  cccd: number;
  diaChi: string;
  soDienThoai: string;
  email: string;
}

const Page = () => {
  const [khachHangs, setKhachHangs] = useState<KhachHang[]>([]);
  const [filteredKhachHangs, setFilteredKhachHangs] = useState<KhachHang[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/khachhang?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      console.log(data); // Kiểm tra dữ liệu
      setKhachHangs(data.data);
      setFilteredKhachHangs(data.data);
      setTotalPages(data.extraInfo.totalPages);
    } catch (error) {
      console.error("Loi khi lay du lieu", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = () => {
    const value = searchTerm.toLowerCase().trim();
    const filtered = khachHangs.filter(
      (khach) =>
        khach.hoTen.toLowerCase().includes(value) ||
        new Date(khach.ngaySinh).toLocaleDateString().includes(value) ||
        khach.cccd.toString().includes(value) ||
        khach.soDienThoai.toString().includes(value) ||
        khach.diaChi.toLowerCase().includes(value) ||
        khach.email.toLowerCase().includes(value)
    );
    setFilteredKhachHangs(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, khachHangs]);

  const truoc = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const sau = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DANH SÁCH KHÁCH HÀNG
      </h1>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[200px] text-white ml-3"
        />
        <Button
          onClick={handleSearch}
          className="bg-green-600 text-white hover:bg-green-700 ml-2 mr-2"
        >
          Tìm kiếm
        </Button>
      </div>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Họ tên</TableHead>
            <TableHead className="text-white">Ngày sinh</TableHead>
            <TableHead className="text-white">CCCD</TableHead>
            <TableHead className="text-white">Địa chỉ</TableHead>
            <TableHead className="text-white">SĐT</TableHead>
            <TableHead className="text-white">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredKhachHangs.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">{item.hoTen}</TableCell>
              <TableCell className="text-white">
                {new Date(item.ngaySinh).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">{item.cccd}</TableCell>
              <TableCell className="text-white">{item.diaChi}</TableCell>
              <TableCell className="text-white">{item.soDienThoai}</TableCell>
              <TableCell className="text-white">{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="fixed bottom-0 left-0 w-full bg-[#0D121F] py-4 flex items-center gap-4 mb-[40px] justify-end mr-[200px] pb-1">
        <Button
          onClick={truoc}
          disabled={page === 1}
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Trang trước
        </Button>
        <span className="text-green-400 font-semibold ml-4 mr-4">
          Trang {page} / {totalPages}
        </span>
        <Button
          onClick={sau}
          disabled={page === totalPages}
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Trang sau
        </Button>
      </div>
    </div>
  );
};

export default Page;
