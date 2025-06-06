"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface PhongTro {
  tenPhong: string;
  tang: number;
  kichThuoc: number;
  giaPhong: number;
  soNguoiToiDa: number;
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
  const [data, setData] = useState<PhongTroTinhTrang[]>([]);
  const [filteredData, setFilteredData] = useState<PhongTroTinhTrang[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/phongtro_tinhtrangphong?page=${page}&limit=${limit}`
      );
      const result = await res.json();
      setData(result.phongtro_tinhtrangphong);
      setFilteredData(result.phongtro_tinhtrangphong);
      setTotalPages(result.extraInfo.totalPages);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = () => {
    const value = searchTerm.toLowerCase().trim();
    const filtered = data.filter(
      (item) =>
        item.phongTro.tenPhong.toLowerCase().includes(value) ||
        item.tinhTrangPhong.tinhTrang.toLowerCase().includes(value) ||
        item.phongTro.tang.toString().includes(value)
    );
    setFilteredData(filtered);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handDelete = async (id: number) => {
    if (confirm("Bạn có muốn xóa tình trạng phòng này không?")) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/phongtro_tinhtrangphong/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          alert("Đã xóa thành công");
          fetchData();
        } else {
          alert("Xóa thất bại");
        }
      } catch (error) {
        alert("Đã xảy ra lỗi khi xóa");
      }
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-green-500 text-4xl font-bold text-center mb-6">
        DANH SÁCH TÌNH TRẠNG PHÒNG TRỌ
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
          onClick={handleSearch}
          className="bg-[#1D2636] text-green-600 ml-2 hover:bg-amber-50"
        >
          Tìm kiếm
        </Button>
        <Button
          onClick={() => router.push("/add/add-tinhtrang")}
          className="flex justify-end items-center ml-auto bg-green-600 text-white hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Thêm
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
            <TableHead className="text-white">Tình trạng</TableHead>
            <TableHead className="text-white">Ngày cập nhật</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.phongTroId}>
              <TableCell>{item.phongTroId}</TableCell>
              <TableCell>{item.phongTro.tenPhong}</TableCell>
              <TableCell>{item.phongTro.tang}</TableCell>
              <TableCell>{item.phongTro.kichThuoc} m²</TableCell>
              <TableCell>
                {item.phongTro.giaPhong.toLocaleString()} VND
              </TableCell>
              <TableCell>{item.phongTro.soNguoiToiDa}</TableCell>
              <TableCell>{item.tinhTrangPhong.tinhTrang}</TableCell>
              <TableCell>
                {new Date(item.tinhTrangPhong.ngayCapNhat).toLocaleString()}
              </TableCell>
              <TableCell>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700 w-16 h-5.5"
                  onClick={() => handDelete(item.phongTroId)}
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="fixed bottom-0 left-0 w-full bg-[#0D121F] py-4 flex items-center gap-4 mb-[40px] justify-end mr-[200px] pb-2">
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
