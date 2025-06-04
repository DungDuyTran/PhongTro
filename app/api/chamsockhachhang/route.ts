import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChamSocKhachHangSchema = z.object({
  ngayHoTro: z.coerce.date(),
  loaiHoTro: z.string().min(1),
  tenHoTro: z.string().min(1),
  KhachHangId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});
// {
//     "ngayHoTro": "2025-04-16T00:00:00.000Z",
//     "loaiHoTro": "Tu van",
//     "tenHoTro": "Tu van hop dong",
//     "KhachHangId": 4,
//     "NhanVienId": 2
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.chamSocKhachHang.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        KhachHang: true,
        NhanVien: true,
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
    const success = ChamSocKhachHangSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chamSocKhachHang.create({
      data: {
        ngayHoTro: success.data.ngayHoTro,
        loaiHoTro: success.data.loaiHoTro,
        tenHoTro: success.data.tenHoTro,
        KhachHangId: success.data.KhachHangId,
        NhanVienId: success.data.NhanVienId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChamSocKhachHangSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chamSocKhachHang.updateMany({
      data: {
        ngayHoTro: success.data.ngayHoTro,
        loaiHoTro: success.data.loaiHoTro,
        tenHoTro: success.data.tenHoTro,
        KhachHangId: success.data.KhachHangId,
        NhanVienId: success.data.NhanVienId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chamSocKhachHang.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
