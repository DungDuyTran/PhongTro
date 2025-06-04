import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const BangChamCongSchema = z.object({
  ngayChamCong: z.coerce.date(),
  soGioLam: z.number().int().min(0),
  trangThai: z.string().min(1),
  NhanVienId: z.number().int().positive(),
});

// {
//     "ngayChamCong": "2025-05-02T00:00:00.000Z",
//     "soGioLam": 8,
//     "trangThai": "Da cham cong",
//     "NhanVienId": 1
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.bangChamCong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.bangChamCong.findMany({
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
    const success = BangChamCongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.bangChamCong.create({
      data: {
        ngayChamCong: success.data.ngayChamCong,
        soGioLam: success.data.soGioLam,
        trangThai: success.data.trangThai,
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
  const success = BangChamCongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.bangChamCong.updateMany({
      data: {
        ngayChamCong: success.data.ngayChamCong,
        soGioLam: success.data.soGioLam,
        trangThai: success.data.trangThai,
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
    const deleted = await prisma.bangChamCong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
