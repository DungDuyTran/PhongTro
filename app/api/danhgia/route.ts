import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DanhGiaSchema = z.object({
  noiDung: z.string().min(1),
  ngayDanhGia: z.coerce.date(),
  soSao: z.number().int().min(1).max(5),
  PhongTroId: z.number().int().positive(),
});
// {
//     "noiDung": "Phong dep, chu nha than thien",
//     "ngayDanhGia": "2025-04-16T00:00:00.000Z",
//     "soSao": 5,
//     "PhongTroId": 8
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.danhGia.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        PhongTro: true,
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
    const success = DanhGiaSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.danhGia.create({
      data: {
        noiDung: success.data.noiDung,
        ngayDanhGia: success.data.ngayDanhGia,
        soSao: success.data.soSao,
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
  const success = DanhGiaSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.danhGia.updateMany({
      data: {
        noiDung: success.data.noiDung,
        ngayDanhGia: success.data.ngayDanhGia,
        soSao: success.data.soSao,
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
    const deleted = await prisma.danhGia.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
