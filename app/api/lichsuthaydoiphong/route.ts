import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LichSuThayDoiPhongSchema = z.object({
  idPhongCu: z.number().int().positive(),
  ngayChuyen: z.coerce.date(),
  donGia: z.number().min(0),
  ghiChu: z.string(),
  HopDongId: z.number().int().positive(),
  PhongTroId: z.number().int().positive(),
});

// {
//     "idPhongCu": 1,
//     "ngayChuyen": "2025-04-16T00:00:00.000Z",
//     "donGia": 2500000,
//     "ghiChu": "Khach chuyen vi phong cu bi hu may lanh",
//     "HopDongId": 3,
//     "PhongTroId": 2
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.lichSuThayDoiPhong.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        PhongTro: true,
        HopDong: true,
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
    const success = LichSuThayDoiPhongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.lichSuThayDoiPhong.create({
      data: {
        idPhongCu: success.data.idPhongCu,
        ngayChuyen: success.data.ngayChuyen,
        donGia: success.data.donGia,
        ghiChu: success.data.ghiChu,
        HopDongId: success.data.HopDongId,
        PhongTroId: success.data.PhongTroId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = LichSuThayDoiPhongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.lichSuThayDoiPhong.updateMany({
      data: {
        idPhongCu: success.data.idPhongCu,
        ngayChuyen: success.data.ngayChuyen,
        donGia: success.data.donGia,
        ghiChu: success.data.ghiChu,
        HopDongId: success.data.HopDongId,
        PhongTroId: success.data.PhongTroId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.lichSuThayDoiPhong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
