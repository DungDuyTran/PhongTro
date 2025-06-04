import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NhanVien_ChucVuSchema = z.object({
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  NhanVienId: z.number().int().positive(),
  ChucVuId: z.number().int().positive(),
});

// {
//     "ngayBatDau": "2025-01-01",
//     "ngayKetThuc": "2025-12-31",
//     "NhanVienId": 2,
//     "ChucVuId": 1
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.nhanVien_ChucVu.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        NhanVien: true,
        ChucVu: true,
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
    const success = NhanVien_ChucVuSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.nhanVien_ChucVu.create({
      data: {
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        NhanVienId: success.data.NhanVienId,
        ChucVuId: success.data.ChucVuId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = NhanVien_ChucVuSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.nhanVien_ChucVu.updateMany({
      data: {
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        NhanVienId: success.data.NhanVienId,
        ChucVuId: success.data.ChucVuId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.nhanVien_ChucVu.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
