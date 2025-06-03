import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const XuLyPhanHoiSchema = z.object({
  ngayXuLy: z.coerce.date(),
  noiDungPhanHoi: z.string().max(255),
  ghiChu: z.string().max(255),
  PhanHoiNhanVienId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});

// {
//     "ngayXuLy": "2025-04-16T10:30:00.000Z",
//     "noiDungPhanHoi": "Da xu ly phan hoi ve dich vu",
//     "ghiChu": "Khach hang da hai long",
//     "PhanHoiNhanVienId": 1,
//     "NhanVienId": 3
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.xuLyPhanHoi.findMany({
      include: {
        PhanHoiNhanVien: true,
        NhanVien: true,
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
    const success = XuLyPhanHoiSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.xuLyPhanHoi.create({
      data: {
        ngayXuLy: success.data.ngayXuLy,
        noiDungPhanHoi: success.data.noiDungPhanHoi,
        ghiChu: success.data.ghiChu,
        PhanHoiNhanVienId: success.data.PhanHoiNhanVienId,
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
  const success = XuLyPhanHoiSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.xuLyPhanHoi.updateMany({
      data: {
        ngayXuLy: success.data.ngayXuLy,
        noiDungPhanHoi: success.data.noiDungPhanHoi,
        ghiChu: success.data.ghiChu,
        PhanHoiNhanVienId: success.data.PhanHoiNhanVienId,
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
    const deleted = await prisma.xuLyPhanHoi.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
