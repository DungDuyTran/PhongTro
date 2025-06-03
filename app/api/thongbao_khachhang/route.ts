import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const KhachHang_ThongBaoSchema = z.object({
  KhachHangId: z.number().int().positive(),
  ThongBaoId: z.number().int().positive(),
});
// {
//     "KhachHangId": 3,
//     "ThongBaoId": 7
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.khachHang_ThongBao.findMany({
      include: {
        ThongBao: true,
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
    const success = KhachHang_ThongBaoSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.khachHang_ThongBao.create({
      data: {
        KhachHangId: success.data.KhachHangId,
        ThongBaoId: success.data.ThongBaoId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = KhachHang_ThongBaoSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.khachHang_ThongBao.updateMany({
      data: {
        KhachHangId: success.data.KhachHangId,
        ThongBaoId: success.data.ThongBaoId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.khachHang_ThongBao.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
