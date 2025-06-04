import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// {
//     "tinhTrang": "Trống",
//     "ngayCapNhat": "2025-04-14T13:45:00.000Z"
//
//   }

const TinhTrangPhongSchema = z.object({
  tinhTrang: z.string(),
  ngayCapNhat: z.string().datetime(),
});
// tinhTrang String @db.VarChar(255)
// ngayCapNhat DateTime
export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const TinhTrangPhong = await prisma.tinhTrangPhong.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return NextResponse.json(
      { TinhTrangPhong, extraInfo: { totalRecords, totalPages, page, limit } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = TinhTrangPhongSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newTinhTrangPhong = await prisma.tinhTrangPhong.create({
      data: {
        tinhTrang: success.data.tinhTrang,
        ngayCapNhat: success.data.ngayCapNhat,
      },
    });
    return NextResponse.json({ newTinhTrangPhong }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = TinhTrangPhongSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.tinhTrangPhong.updateMany({
      data: {
        tinhTrang: success.data.tinhTrang,
        ngayCapNhat: success.data.ngayCapNhat,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.tinhTrangPhong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
