import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const QuanLyPhongTroSchema = z.object({
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  PhongTroId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});

// {
//     "ngayBatDau": "2025-01-01T00:00:00.000Z",
//     "ngayKetThuc": "2025-12-31T00:00:00.000Z",
//     "PhongTroId": 1,
//     "NhanVienId": 2
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.quanLyPhongTro.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        PhongTro: true,
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
    const success = QuanLyPhongTroSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.quanLyPhongTro.create({
      data: {
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        PhongTroId: success.data.PhongTroId,
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
  const success = QuanLyPhongTroSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.quanLyPhongTro.updateMany({
      data: {
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        PhongTroId: success.data.PhongTroId,
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
    const deleted = await prisma.quanLyPhongTro.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
