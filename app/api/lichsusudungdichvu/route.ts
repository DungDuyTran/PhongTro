import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LichSuSuDungDichVuSchema = z.object({
  ngaySuDung: z.coerce.date(),
  soLuong: z.number().int().min(0),
  thanhTien: z.number().min(0),
  KhachHangId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});

// {
//     "ngaySuDung": "2025-04-16T00:00:00.000Z",
//     "soLuong": 2,
//     "thanhTien": 500000,
//     "KhachHangId": 1,
//     "NhanVienId": 3
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.lichSuSuDungDichVu.findMany({
      include: {
        KhachHang: true,
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
    const success = LichSuSuDungDichVuSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.lichSuSuDungDichVu.create({
      data: {
        ngaySuDung: success.data.ngaySuDung,
        soLuong: success.data.soLuong,
        thanhTien: success.data.thanhTien,
        KhachHangId: success.data.KhachHangId,
        NhanVienId: success.data.NhanVienId,
      },
      include: {
        KhachHang: true,
        NhanVien: true,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = LichSuSuDungDichVuSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.lichSuSuDungDichVu.updateMany({
      data: {
        ngaySuDung: success.data.ngaySuDung,
        soLuong: success.data.soLuong,
        thanhTien: success.data.thanhTien,
        KhachHangId: success.data.KhachHangId,
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
    const deleted = await prisma.lichSuSuDungDichVu.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
