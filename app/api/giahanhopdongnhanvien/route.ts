import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GiaHanHopDongNhanVienSchema = z.object({
  ngayGiaHan: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  dieuKhoan: z.string().min(1),
  ChiTietHopDongNhanVienId: z.number().int().positive(),
});

// {
//     "ngayGiaHan": "2025-06-01T00:00:00.000Z",
//     "ngayKetThuc": "2026-06-01T00:00:00.000Z",
//     "dieuKhoan": "Gia han hop dong them 1 nam voi muc luong giu nguyen",
//     "ChiTietHopDongNhanVienId": 5
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.giaHanHopDongNhanVien.findMany({
      include: {
        ChiTietHopDongNhanVien: true,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = GiaHanHopDongNhanVienSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.giaHanHopDongNhanVien.create({
      data: {
        ngayGiaHan: success.data.ngayGiaHan,
        ngayKetThuc: success.data.ngayKetThuc,
        dieuKhoan: success.data.dieuKhoan,
        ChiTietHopDongNhanVienId: success.data.ChiTietHopDongNhanVienId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = GiaHanHopDongNhanVienSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.giaHanHopDongNhanVien.updateMany({
      data: {
        ngayGiaHan: success.data.ngayGiaHan,
        ngayKetThuc: success.data.ngayKetThuc,
        dieuKhoan: success.data.dieuKhoan,
        ChiTietHopDongNhanVienId: success.data.ChiTietHopDongNhanVienId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.giaHanHopDongNhanVien.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
