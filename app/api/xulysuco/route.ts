import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const XuLySuCoSchema = z.object({
  trangThai: z.boolean(),
  DanhSachSuCoId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});

// {
//     "trangThai": true,
//     "DanhSachSuCoId": 3,
//     "NhanVienId": 7
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.xuLySuCo.findMany({
      include: {
        NhanVien: true,
        DanhSachSuCo: true,
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
    const success = XuLySuCoSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.xuLySuCo.create({
      data: {
        trangThai: success.data.trangThai,
        DanhSachSuCoId: success.data.DanhSachSuCoId,
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
  const success = XuLySuCoSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.xuLySuCo.updateMany({
      data: {
        trangThai: success.data.trangThai,
        DanhSachSuCoId: success.data.DanhSachSuCoId,
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
    const deleted = await prisma.xuLySuCo.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
