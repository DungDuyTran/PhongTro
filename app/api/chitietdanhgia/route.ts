import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChiTietDanhGiaSchema = z.object({
  DanhGiaId: z.number().int().positive(),
  KhachHangId: z.number().int().positive(),
});

// {
//     "DanhGiaId": 4,
//     "KhachHangId": 12
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.chiTietDanhGia.findMany({
      include: {
        DanhGia: true,
        KhachHang: true,
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
    const success = ChiTietDanhGiaSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chiTietDanhGia.create({
      data: {
        DanhGiaId: success.data.DanhGiaId,
        KhachHangId: success.data.KhachHangId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChiTietDanhGiaSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chiTietDanhGia.updateMany({
      data: {
        DanhGiaId: success.data.DanhGiaId,
        KhachHangId: success.data.KhachHangId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chiTietDanhGia.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
