import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChiTraLuongSchema = z.object({
  soTien: z.number().min(0),
  ngayPhatLuong: z.coerce.date(),
  LuongId: z.number().int().positive(),
});

// {
//     "soTien": 10000000,
//     "ngayPhatLuong": "2025-04-01",
//     "LuongId": 1
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.chiTraLuong.findMany({
      include: {
        Luong: true,
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
    const success = ChiTraLuongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chiTraLuong.create({
      data: {
        soTien: success.data.soTien,
        ngayPhatLuong: success.data.ngayPhatLuong,
        LuongId: success.data.LuongId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChiTraLuongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chiTraLuong.updateMany({
      data: {
        soTien: success.data.soTien,
        ngayPhatLuong: success.data.ngayPhatLuong,
        LuongId: success.data.LuongId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chiTraLuong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
