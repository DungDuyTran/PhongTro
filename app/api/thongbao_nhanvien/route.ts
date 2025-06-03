import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NhanVien_ThongBaoSchema = z.object({
  NhanVienId: z.number().int().positive(),
  ThongBaoId: z.number().int().positive(),
});

// {
//     "NhanVienId": 2,
//     "ThongBaoId": 5
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.nhanVien_ThongBao.findMany({
      include: {
        NhanVien: true,
        ThongBao: true,
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
    const success = NhanVien_ThongBaoSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.nhanVien_ThongBao.create({
      data: {
        NhanVienId: success.data.NhanVienId,
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
  const success = NhanVien_ThongBaoSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.nhanVien_ThongBao.updateMany({
      data: {
        NhanVienId: success.data.NhanVienId,
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
    const deleted = await prisma.nhanVien_ThongBao.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
