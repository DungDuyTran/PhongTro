import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChiTietHopDongNhanVienSchema = z.object({
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  HopDongNhanVienId: z.number().int().positive(),
});

// {
//     "ngayBatDau": "2025-01-01T00:00:00.000Z",
//     "ngayKetThuc": "2025-12-31T00:00:00.000Z",
//     "HopDongNhanVienId": 3
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.bangChamCong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.chiTietHopDongNhanVien.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        HopDongNhanVien: true,
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
    const success = ChiTietHopDongNhanVienSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chiTietHopDongNhanVien.create({
      data: {
        // ngayBatDau: success.data.ngayBatDau,
        // ngayKetThuc: success.data.ngayKetThuc,
        HopDongNhanVienId: success.data.HopDongNhanVienId,
      },
      include: {
        HopDongNhanVien: true,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChiTietHopDongNhanVienSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chiTietHopDongNhanVien.updateMany({
      data: {
        // ngayBatDau: success.data.ngayBatDau,
        // ngayKetThuc: success.data.ngayKetThuc,
        HopDongNhanVienId: success.data.HopDongNhanVienId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chiTietHopDongNhanVien.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
