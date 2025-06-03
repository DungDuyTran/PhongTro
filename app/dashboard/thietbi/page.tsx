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

interface ThietBi {
  id: number;
  tenThietBi: string;
  loaiThietBi: string;
  soLuong: number;
}

const Page = () => {
  const [data, setData] = useState<ThietBi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/thietbi");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thiết bị:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DANH SÁCH THIẾT BỊ
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên thiết bị</TableHead>
            <TableHead className="text-white">Loại thiết bị</TableHead>
            <TableHead className="text-white">Số lượng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">{item.tenThietBi}</TableCell>
              <TableCell className="text-white">{item.loaiThietBi}</TableCell>
              <TableCell className="text-white">{item.soLuong}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
