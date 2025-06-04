import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GiaHanHopDongSchema = z.object({
  ngayGiaHan: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  HopDongId: z.number().int().positive(),
});

// {
//     "ngayGiaHan": "2025-05-01T00:00:00.000Z",
//     "ngayKetThuc": "2026-05-01T00:00:00.000Z",
//     "HopDongId": 3
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.giaHanHopDong.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
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
    const success = GiaHanHopDongSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.giaHanHopDong.create({
      data: {
        ngayGiaHan: success.data.ngayGiaHan,
        ngayKetThuc: success.data.ngayKetThuc,
        HopDongId: success.data.HopDongId,
      },
    });

    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = GiaHanHopDongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.giaHanHopDong.updateMany({
      data: {
        ngayGiaHan: success.data.ngayGiaHan,
        ngayKetThuc: success.data.ngayKetThuc,
        HopDongId: success.data.HopDongId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.giaHanHopDong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
