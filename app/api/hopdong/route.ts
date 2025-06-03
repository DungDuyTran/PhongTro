import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const HopDongSchema = z.object({
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  tienDaCoc: z.number().min(0),
  tongTien: z.number().min(0),
  noiDung: z.string().min(1),
  ghiChu: z.string().min(1),
  KhachHangId: z.number().int().positive(),
});

// {
//     "ngayBatDau": "2025-05-01T00:00:00.000Z",
//     "ngayKetThuc": "2026-05-01T00:00:00.000Z",
//     "tienDaCoc": 3000000,
//     "tongTien": 12000000,
//     "noiDung": "Hop dong thue phong trong vong 1 nam",
//     "ghiChu": "Khach hang da dong tien coc",
//     "KhachHangId": 4
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.hopDong.findMany({
      include: {
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
    const success = HopDongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.hopDong.create({
      data: {
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        tienDaCoc: success.data.tienDaCoc,
        tongTien: success.data.tongTien,
        noiDung: success.data.noiDung,
        ghiChu: success.data.ghiChu,
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
  const success = HopDongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.hopDong.updateMany({
      data: {
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        tienDaCoc: success.data.tienDaCoc,
        tongTien: success.data.tongTien,
        noiDung: success.data.noiDung,
        ghiChu: success.data.ghiChu,
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
    const deleted = await prisma.hopDong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
