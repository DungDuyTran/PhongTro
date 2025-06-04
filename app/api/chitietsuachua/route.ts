import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChiTietSuaChuaSchema = z.object({
  tenSuaChua: z.string().min(1),
  soTien: z.number().min(0),
  ThietBiId: z.number().int().positive(),
  SuaChuaThietBiId: z.number().int().positive(),
});

// {
//     "tenSuaChua": "Thay pin",
//     "soTien": 150000,
//     "ThietBiId": 3,
//     "SuaChuaThietBiId": 2
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.chiTietSuaChua.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        SuaChuaThietBi: true,
        ThietBi: true,
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
    const success = ChiTietSuaChuaSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chiTietSuaChua.create({
      data: {
        tenSuaChua: success.data.tenSuaChua,
        soTien: success.data.soTien,
        ThietBiId: success.data.ThietBiId,
        SuaChuaThietBiId: success.data.SuaChuaThietBiId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChiTietSuaChuaSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chiTietSuaChua.updateMany({
      data: {
        tenSuaChua: success.data.tenSuaChua,
        soTien: success.data.soTien,
        ThietBiId: success.data.ThietBiId,
        SuaChuaThietBiId: success.data.SuaChuaThietBiId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chiTietSuaChua.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
