import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PhongTro_ThietBiSchema = z.object({
  soLuong: z.number().int().min(0),
  tinhTrang: z.string().min(1),
  PhongTroId: z.number().int().positive(),
  ThietBiId: z.number().int().positive(),
});

// {
//     "soLuong": 3,
//     "tinhTrang": "Tot",
//     "PhongTroId": 1,
//     "ThietBiId": 5
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.phongTro_ThietBi.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        PhongTro: true,
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
    const success = PhongTro_ThietBiSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.phongTro_ThietBi.create({
      data: {
        soLuong: success.data.soLuong,
        tinhTrang: success.data.tinhTrang,
        PhongTroId: success.data.PhongTroId,
        ThietBiId: success.data.ThietBiId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = PhongTro_ThietBiSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.phongTro_ThietBi.updateMany({
      data: {
        soLuong: success.data.soLuong,
        tinhTrang: success.data.tinhTrang,
        PhongTroId: success.data.PhongTroId,
        ThietBiId: success.data.ThietBiId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.phongTro_ThietBi.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
