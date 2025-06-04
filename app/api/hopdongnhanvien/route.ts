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
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.bangChamCong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.hopDongNhanVien.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
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
    const success = HopDongNhanVienSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.hopDongNhanVien.create({
      data: {
        // hoTen: success.data.hoTen,
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
        // hoTen: success.data.hoTen,
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
