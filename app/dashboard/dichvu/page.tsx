"use client";
import React, { useEffect, useState } from "react";
import { Trash, Pencil } from "lucide-react";
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
import { error } from "console";
import { saveAs } from "file-saver";

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
  const [dichVus, setDichVus] = useState<PhongTroDichVu[]>([]);
  const [filteredDichvus, setFilteredDichvus] = useState<PhongTroDichVu[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/phongtro_danhsachphongtro?page=${page}&limit=${limit}`
      );

      const data = await res.json();
      setDichVus(data.data);
      setFilteredDichvus(data.data);
      setTotalPages(data.extraInfo.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = () => {
    const value = searchTerm.toLocaleLowerCase().trim();
    const filtered = dichVus.filter(
      (dv) =>
        dv.PhongTro.tenPhong.toLocaleLowerCase().includes(value) ||
        dv.PhongTro.tang.toString().includes(value) ||
        dv.DanhSachDichVu.tenDichVu.toLocaleLowerCase().includes(value) ||
        dv.soLuong.toString().includes(value) ||
        dv.ghiChu.toLocaleLowerCase().includes(value)
    );
    setFilteredDichvus(filtered);
  };

  const truoc = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  const sau = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleDelete = async (id: Number) => {
    if (confirm("ban co chac chan xoa tinh trang nay chua")) {
      try {
        const res = await fetch(`/api/phongtro_danhsachphongtro/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("da xoa thanh cong");
          fetchData();
        } else {
          alert("xoa thanh cong");
        }
      } catch (error) {
        console.error("loi roi", error);
        alert("da xay ra loi roi kia");
      }
    }
  };
  const handleExportExcel = async () => {
    try {
      const res = await fetch("/api/phongtro_danhsachphongtro/export");
      if (!res.ok) throw new Error("Xuất file thất bại");
      const blob = await res.blob();
      saveAs(blob, "dichvu.xlsx");
      alert("Bạn đã xuất file thành công");
    } catch (error) {
      alert("xuat file không thành công");
    }
  };

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DỊCH VỤ PHÒNG TRỌ
      </h1>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-white w-[200px] ml-2 mr-2"
        />
        <Button
          onClick={handleSearch}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Tìm kiếm
        </Button>
        <Button
          onClick={() => router.push("/app/add/add-phong")}
          className="ml-3 bg-green-600 hover:bg-green-700 text-white "
        >
          <Plus className="w-4 h-4 mr-1" />
          Thêm
        </Button>
        <Button
          onClick={handleExportExcel}
          className="ml-3  bg-green-600 hover:bg-green-700 text-white"
        >
          Xuất Excel
        </Button>
      </div>
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
          {filteredDichvus.map((item, index) => (
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
              <TableCell>
                <Button
                  onClick={() => handleDelete(item.PhongTroId)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <Trash />
                </Button>
              </TableCell>
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
