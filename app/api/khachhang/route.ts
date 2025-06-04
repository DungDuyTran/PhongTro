import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const KhachHangSchema = z.object({
  hoTen: z.string().min(1, "Ho ten khong duoc de trong"),
  ngaySinh: z.coerce.date(),
  cccd: z.string().min(1, "Dia chi khong duoc de trong"),
  diaChi: z.string().min(1, "Dia chi khong duoc de trong"),
  soDienThoai: z.string().min(1, "So dien thoai khong duoc de trong"),
  email: z.string().email("Email khong hop le"),
});
// {
//     "hoTen": "Tran Thi B",
//     "ngaySinh": "1990-12-12T00:00:00.000Z",
//     "cccd": 123456789012,
//     "diaChi": "456 Duong XYZ, Quan 3, TP.HCM",
//     "soDienThoai": "0912345678",
//     "email": "tranthib@example.com"
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.khachHang.findMany({
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
    const success = KhachHangSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newKhachHang = await prisma.khachHang.create({
      data: {
        hoTen: success.data.hoTen,
        ngaySinh: success.data.ngaySinh,
        cccd: success.data.cccd,
        diaChi: success.data.diaChi,
        soDienThoai: success.data.soDienThoai,
        email: success.data.email,
      },
    });
    return NextResponse.json({ newKhachHang }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = KhachHangSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }

  try {
    // Cập nhật thông tin khách hàng
    const upDate = await prisma.khachHang.updateMany({
      data: {
        hoTen: success.data.hoTen,
        ngaySinh: success.data.ngaySinh,
        cccd: success.data.cccd,
        diaChi: success.data.diaChi,
        soDienThoai: success.data.soDienThoai,
        email: success.data.email,
      },
    });

    // Trả về phản hồi khi cập nhật thành công
    return NextResponse.json(
      { message: "Cập nhật thông tin khách hàng thành công" },
      { status: 200 }
    );
  } catch (error) {
    // Trả về thông báo lỗi khi gặp sự cố
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.khachHang.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
