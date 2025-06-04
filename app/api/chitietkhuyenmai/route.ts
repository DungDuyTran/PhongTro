import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChiTietKhuyenMaiSchema = z.object({
  loaiKhuyenMai: z.string().min(1),
  phantram: z.number().min(0),
  PhongTroId: z.number().int().positive(),
  KhuyenMaiId: z.number().int().positive(),
});

// {
//     "loaiKhuyenMai": "Giam gia thang 4",
//     "phantram": 10,
//     "PhongTroId": 3,
//     "KhuyenMaiId": 1
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.chiTietKhuyenMai.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        PhongTro: true,
        KhuyenMai: true,
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
    const success = ChiTietKhuyenMaiSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chiTietKhuyenMai.create({
      data: {
        loaiKhuyenMai: success.data.loaiKhuyenMai,
        phantram: success.data.phantram,
        PhongTroId: success.data.PhongTroId,
        KhuyenMaiId: success.data.KhuyenMaiId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChiTietKhuyenMaiSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chiTietKhuyenMai.updateMany({
      data: {
        loaiKhuyenMai: success.data.loaiKhuyenMai,
        phantram: success.data.phantram,
        PhongTroId: success.data.PhongTroId,
        KhuyenMaiId: success.data.KhuyenMaiId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chiTietKhuyenMai.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
