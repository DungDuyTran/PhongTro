import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NhanVien_ChiTraLuongSchema = z.object({
  NhanVienId: z.number().int().positive(),
  ChiTraLuongId: z.number().int().positive(),
});

// {
//     "NhanVienId": 1,
//     "ChiTraLuongId": 2
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.nhanVien_ChiTraLuong.findMany({
      include: {
        NhanVien: true,
        ChiTraLuong: true,
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
    const success = NhanVien_ChiTraLuongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.nhanVien_ChiTraLuong.create({
      data: {
        NhanVienId: success.data.NhanVienId,
        ChiTraLuongId: success.data.ChiTraLuongId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = NhanVien_ChiTraLuongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.nhanVien_ChiTraLuong.updateMany({
      data: {
        NhanVienId: success.data.NhanVienId,
        ChiTraLuongId: success.data.ChiTraLuongId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.nhanVien_ChiTraLuong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
