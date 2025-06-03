import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const HopDongNhanVienSchema = z.object({
  hoTen: z.string().min(1),
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  luongCoBan: z.number().min(0),
  ghiChu: z.string().min(1),
  NhanVienId: z.number().int().positive(),
});

// {
//     "hoTen": "Nguyen Van B",
//     "ngayBatDau": "2025-01-01T00:00:00.000Z",
//     "ngayKetThuc": "2025-12-31T00:00:00.000Z",
//     "luongCoBan": 8000000,
//     "ghiChu": "Hop dong co thoi han 1 nam",
//     "NhanVienId": 10
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.hopDongNhanVien.findMany({
      include: {
        NhanVien: true,
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
    const success = HopDongNhanVienSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.hopDongNhanVien.create({
      data: {
        hoTen: success.data.hoTen,
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        luongCoBan: success.data.luongCoBan,
        ghiChu: success.data.ghiChu,
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
  const success = HopDongNhanVienSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.hopDongNhanVien.updateMany({
      data: {
        hoTen: success.data.hoTen,
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        luongCoBan: success.data.luongCoBan,
        ghiChu: success.data.ghiChu,
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
    const deleted = await prisma.hopDongNhanVien.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
