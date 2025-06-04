import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const LichSuThanhToanSchema = z.object({
  ngayThanhToan: z.coerce.date(),
  soTien: z.number().positive("Số tiền phải lớn hơn 0"),
});
// {
//     "ngayThanhToan": "2025-04-15T00:00:00.000Z",
//     "soTien": 1500000
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.lichSuThanhToan.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {},
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
    const success = LichSuThanhToanSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newLichSu = await prisma.lichSuThanhToan.create({
      data: {
        ngayThanhToan: success.data.ngayThanhToan,
        soTien: success.data.soTien,
      },
    });
    return NextResponse.json({ newLichSu }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = LichSuThanhToanSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.lichSuThanhToan.updateMany({
      data: {
        ngayThanhToan: success.data.ngayThanhToan,
        soTien: success.data.soTien,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.lichSuThanhToan.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
