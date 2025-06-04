import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PhuongTienDiChuyenSchema = z.object({
  loaiPhuongTien: z.string().min(1, "Loai phuong tien khong duoc de trong"),
  bienSo: z.string().min(1, "Bien so khong duoc de trong"),
  soLuong: z.number().int().positive("So luong phai la so nguyen duong"),
  KhachHangId: z.number().int().positive(),
});
// {
//     "loaiPhuongTien": "O to",
//     "bienSo": "79A-12345",
//     "soLuong": 5,
//     "KhachHangId": 123
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.phuongTienDiChuyen.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { KhachHang: true },
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
    const success = PhuongTienDiChuyenSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }

    // Tạo mới phương tiện di chuyển với KhachHangId
    const newPhuongTien = await prisma.phuongTienDiChuyen.create({
      data: {
        loaiPhuongTien: success.data.loaiPhuongTien,
        bienSo: success.data.bienSo,
        soLuong: success.data.soLuong,
        KhachHangId: success.data.KhachHangId, // Liên kết qua KhachHangId
      },
    });

    return NextResponse.json({ newPhuongTien }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = PhuongTienDiChuyenSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.phuongTienDiChuyen.updateMany({
      data: {
        loaiPhuongTien: success.data.loaiPhuongTien,
        bienSo: success.data.bienSo,
        soLuong: success.data.soLuong,
        KhachHangId: success.data.KhachHangId, // Liên kết qua KhachHangId
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.phuongTienDiChuyen.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
