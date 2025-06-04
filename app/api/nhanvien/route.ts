import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NhanVienSchema = z.object({
  hoTen: z.string().min(1, "Họ tên không được để trống"),
  ngaySinh: z.coerce.date(),
  gioiTinh: z.boolean(),
  soDienThoai: z.string().min(1, "Số điện thoại không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  diaChi: z.string().min(1, "Địa chỉ không được để trống"),
});
// {
//     "hoTen": "aaaaaaaaaaaaaaaaaaaa",
//     "ngaySinh": "1995-05-20T00:00:00.000Z",
//     "gioiTinh": true,
//     "soDienThoai": "0901234567",
//     "email": "nguyenvana@example.com",
//     "diaChi": "123 Đường ABC"
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.nhanVien.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return NextResponse.json(
      { data, extraInfo: { totalRecords, totalPages, page, limit } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = NhanVienSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newNhanVien = await prisma.nhanVien.create({
      data: {
        hoTen: success.data.hoTen,
        ngaySinh: success.data.ngaySinh,
        gioiTinh: success.data.gioiTinh,
        soDienThoai: success.data.soDienThoai,
        email: success.data.email,
        diaChi: success.data.diaChi,
      },
    });
    return NextResponse.json({ newNhanVien }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = NhanVienSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.nhanVien.updateMany({
      data: {
        hoTen: success.data.hoTen,
        ngaySinh: success.data.ngaySinh,
        gioiTinh: success.data.gioiTinh,
        soDienThoai: success.data.soDienThoai,
        email: success.data.email,
        diaChi: success.data.diaChi,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.nhanVien.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
