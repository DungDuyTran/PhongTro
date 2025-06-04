import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PhuongThucThanhToanSchema = z.object({
  loaiGiaoDich: z.string().min(1),
  moTa: z.string().min(1),
  ghiChu: z.string().min(1),
  LichSuThanhToanId: z.number().int().positive(),
});

// {
//   "loaiGiaoDich": "Chuyen khoan",
//   "moTa": "Thanh toan tien phong thang 4",
//   "ghiChu": "Da chuyen khoan qua ngan hang ACB",
//   "LichSuThanhToanId": 5
// }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.phuongThucThanhToan.findMany({
      skip: (page - 1) * limit,
      take: limit,
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
    const success = PhuongThucThanhToanSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newPhuongthucthanhtoan = await prisma.phuongThucThanhToan.create({
      data: {
        loaiGiaoDich: success.data.loaiGiaoDich,
        moTa: success.data.moTa,
        ghiChu: success.data.ghiChu,
        LichSuThanhToanId: success.data.LichSuThanhToanId,
      },
    });
    return NextResponse.json({ newPhuongthucthanhtoan }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = PhuongThucThanhToanSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.phuongThucThanhToan.updateMany({
      data: {
        loaiGiaoDich: success.data.loaiGiaoDich,
        moTa: success.data.moTa,
        ghiChu: success.data.ghiChu,
        LichSuThanhToanId: success.data.LichSuThanhToanId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.phuongThucThanhToan.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
