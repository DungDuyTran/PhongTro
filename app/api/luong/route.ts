import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LuongSchema = z.object({
  hoTen: z.string().min(1),
  LichLamViecId: z.number().int().positive(),
  BangChamCongId: z.number().int().positive(),
});

// {
//     "hoTen": "Nguyen Van A",
//     "LichLamViecId": 1,
//     "BangChamCongId": 2
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.luong.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        BangChamCong: true,
        LichLamViec: true,
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
    const success = LuongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.luong.create({
      data: {
        hoTen: success.data.hoTen,
        LichLamViecId: success.data.LichLamViecId,
        BangChamCongId: success.data.BangChamCongId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = LuongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.luong.updateMany({
      data: {
        hoTen: success.data.hoTen,
        LichLamViecId: success.data.LichLamViecId,
        BangChamCongId: success.data.BangChamCongId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.luong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
