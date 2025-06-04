import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChiTietHopDongSchema = z.object({
  // ngayBatDau: z.coerce.date(),
  // ngayKetThuc: z.coerce.date(),
  // dieuKhoan: z.string().min(1),
  // ghiChu: z.string().min(1),
  HopDongId: z.number().int().positive(),
  PhongTroId: z.number().int().positive(),
});

// {
//     "ngayBatDau": "2025-04-01",
//     "ngayKetThuc": "2026-04-01",
//     "dieuKhoan": "Khach hang khong duoc tu y thay doi noi that",
//     "ghiChu": "Can kiem tra trang thai phong truoc khi giao",
//     "HopDongId": 3,
//     "PhongTroId": 7
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.chiTietHopDong.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        PhongTro: true,
        HopDong: true,
      },
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
    const success = ChiTietHopDongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chiTietHopDong.create({
      data: {
        // ngayBatDau: success.data.ngayBatDau,
        // ngayKetThuc: success.data.ngayKetThuc,
        // dieuKhoan: success.data.dieuKhoan,
        // ghiChu: success.data.ghiChu,
        HopDongId: success.data.HopDongId,
        PhongTroId: success.data.PhongTroId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChiTietHopDongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chiTietHopDong.updateMany({
      data: {
        // ngayBatDau: success.data.ngayBatDau,
        // ngayKetThuc: success.data.ngayKetThuc,
        // dieuKhoan: success.data.dieuKhoan,
        // ghiChu: success.data.ghiChu,
        HopDongId: success.data.HopDongId,
        PhongTroId: success.data.PhongTroId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chiTietHopDong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
