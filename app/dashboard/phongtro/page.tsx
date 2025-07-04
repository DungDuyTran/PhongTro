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
import FileUploadForm from "@/components/FileUploadForm";
import FileUploadFormBulk from "@/components/FileUploadFormBulk";
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

const Page = () => {
  const [phongTros, setPhongTros] = useState<PhongTro[]>([]);
  const [filteredPhongTros, setFilteredPhongTros] = useState<PhongTro[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/phongtro?page=${page}&limit=${limit}`
      );

      const data = await res.json();
      setPhongTros(data.data);
      setFilteredPhongTros(data.data);
      setTotalPages(data.extraInfo.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearchClick = () => {
    const value = searchTerm.toLowerCase().trim();
    const filtered = phongTros.filter(
      (phong) =>
        phong.tenPhong.toLowerCase().includes(value) ||
        phong.ToaNha.tenToaNha.toLowerCase().includes(value) ||
        phong.ToaNha.diaChi.toLowerCase().includes(value) ||
        phong.tang.toString().includes(value) ||
        phong.soNguoiToiDa.toString().includes(value) ||
        phong.kichThuoc.toString().includes(value) ||
        phong.giaPhong.toLocaleString().includes(value)
    );
    setFilteredPhongTros(filtered);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xoá phòng này không?")) {
      try {
        const res = await fetch(`http://localhost:3000/api/phongtro/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Đã xoá thành công!");
          fetchData();
        } else {
          alert("Xoá thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi xoá:", error);
        alert("Đã xảy ra lỗi khi xoá.");
      }
    }
  };
  const handleExportExcel = async () => {
    try {
      const res = await fetch("/api/phongtro/export");
      if (!res.ok) throw new Error("Xuất file thất bại!");
      const blob = await res.blob();
      saveAs(blob, "phongtro.xlsx");
      alert("Bạn đã xuất file thành công!");
    } catch (error) {
      alert("Xuất file thất bại!");
      console.error(error);
    }
  };
  const handleExportPDF = async () => {
    try {
      const res = await fetch("/api/phongtro/pdf");
      console.log("Response status:", res.status);
      if (!res.ok) throw new Error("Xuất PDF thất bại!");
      const blob = await res.blob();
      saveAs(blob, "phongtro.pdf");
      alert("Bạn đã xuất file PDF thành công!");
    } catch (error) {
      alert("Xuất file PDF thất bại!");
      console.error(error);
    }
  };
  const handleExportPDFTA = async () => {
    try {
      const res = await fetch("/api/report/phongtropdf");
      const blob = await res.blob();
      saveAs(blob, "phongtro.pdf");
      alert("Bạn đã xuất file PDF thành công!");
    } catch (error) {
      alert("Xuất file PDF thất bại!");
      console.error(error);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-green-500 text-4xl font-bold text-center mb-6">
        DANH SÁCH PHÒNG TRỌ
      </h1>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-white w-[200px]"
        />
        <Button
          onClick={handleSearchClick}
          className=" bg-green-600 text-white hover:bg-green-700 ml-3"
        >
          Tìm kiếm
        </Button>
        <Button
          onClick={() => router.push("/add/add-phong")}
          className="flex justify-end items-center ml-auto bg-green-600 text-white hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Thêm
        </Button>
        <Button
          onClick={handleExportExcel}
          className="ml-3 bg-green-600 hover:bg-green-700 text-white mr-4"
        >
          Xuất Excel
        </Button>
        <FileUploadForm />
        <FileUploadFormBulk className="ml-2" />
        <Button
          onClick={handleExportPDF}
          className="ml-2 bg-green-600 hover:bg-green-700 text-white"
        >
          Xuất PDF
        </Button>
        <Button
          onClick={handleExportPDFTA}
          className="ml-2 bg-green-600 hover:bg-green-700 text-white"
        >
          Xuất PDF T
        </Button>
      </div>

      <Table>
        <TableHeader className="text-white">
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên phòng</TableHead>
            <TableHead className="text-white">Tầng</TableHead>
            <TableHead className="text-white">Kích thước</TableHead>
            <TableHead className="text-white">Giá phòng</TableHead>
            <TableHead className="text-white">Số người tối đa</TableHead>
            <TableHead className="text-white">Toà nhà</TableHead>
            <TableHead className="text-white">Địa chỉ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPhongTros.map((phong) => (
            <TableRow key={phong.id}>
              <TableCell>{phong.id}</TableCell>
              <TableCell>{phong.tenPhong}</TableCell>
              <TableCell>{phong.tang}</TableCell>
              <TableCell>{phong.kichThuoc} m²</TableCell>
              <TableCell>{phong.giaPhong.toLocaleString()} VND</TableCell>
              <TableCell>{phong.soNguoiToiDa}</TableCell>
              <TableCell>{phong.ToaNha.tenToaNha}</TableCell>
              <TableCell>{phong.ToaNha.diaChi}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    router.push(`/add/add/add-phong?id=${phong.id}`)
                  }
                  className="bg-yellow-600 text-white hover:bg-yellow-700 w-5 h-5.5"
                >
                  <Pencil />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(phong.id)}
                  className="bg-green-600 text-white hover:bg-green-700 w-5 h-5.5"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="fixed bottom-0 left-0 w-full bg-[#0D121F] py-4 flex items-center gap-4 mb-[30px] justify-end mr-[200px] pb-1">
        <Button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Trang trước
        </Button>
        <span className="text-green-400 font-semibold ml-4 mr-4">
          Trang {page} / {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
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
