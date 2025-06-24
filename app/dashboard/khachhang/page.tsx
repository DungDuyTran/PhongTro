"use client";

import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
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

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/khachhang?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      console.log(data);
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

  const truoc = () => setPage((prev) => Math.max(prev - 1, 1));
  const sau = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const handleExportPDF = async () => {
    try {
      const res = await fetch("/api/khachhang/pdf");
      const data: KhachHang[] = await res.json();

      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit);

      const fontUrl = "/fonts/Roboto-Regular.ttf";
      const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
      const customFont = await pdfDoc.embedFont(fontBytes);

      const page = pdfDoc.addPage([595, 842]);
      const { height } = page.getSize();

      let y = height - 50;

      page.drawText("DANH SÁCH KHÁCH HÀNG", {
        x: 50,
        y,
        size: 18,
        font: customFont,
        color: rgb(0, 0.53, 0),
      });

      y -= 30;

      data.forEach((khach, index) => {
        const line = `${index + 1}. ${khach.hoTen} | ${new Date(
          khach.ngaySinh
        ).toLocaleDateString()} | CCCD: ${khach.cccd} | Địa chỉ: ${
          khach.diaChi
        } | SĐT: ${khach.soDienThoai} | Email: ${khach.email}`;

        page.drawText(line, {
          x: 50,
          y,
          size: 10,
          font: customFont,
          color: rgb(0, 0, 0),
        });

        y -= 20;
        if (y < 50) {
          y = height - 50;
          pdfDoc.addPage([595, 842]);
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });

      saveAs(blob, "khachhang.pdf");
    } catch (err) {
      console.error("Lỗi khi xuất PDF:", err);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-green-500 text-4xl mt-3 mb-3 text-center">
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
        <Button
          onClick={handleExportPDF}
          className="ml-2 bg-green-600 hover:bg-green-700 text-white"
        >
          Xuất PDF
        </Button>
      </div>

      <Table>
        <TableCaption className="text-white" />
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

      <div className="flex justify-end gap-3 mt-4 mb-10">
        <Button onClick={truoc} disabled={page === 1}>
          Trang trước
        </Button>
        <span className="text-green-400 font-semibold">
          Trang {page} / {totalPages}
        </span>
        <Button onClick={sau} disabled={page === totalPages}>
          Trang sau
        </Button>
      </div>
    </div>
  );
};

export default Page;
