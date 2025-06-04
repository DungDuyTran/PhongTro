import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const HopDongSchema = z.object({
  nhaCungCap: z.string().min(3),
  noiDung: z.string().min(10),
  ngayBatDau: z.string().datetime(),
  ngayKetThuc: z.string().datetime(),
  ToaNhaId: z.number().int().positive(),
});

// {
//   "nhaCungCap": "Bảo hiểm PVI",
//   "noiDung": "Bảo hiểm toàn bộ tòa nhà trong 12 tháng.",
//   "ngayBatDau": "2025-01-01T00:00:00.000Z",
//   "ngayKetThuc": "2025-12-31T23:59:59.000Z",
//   "ToaNhaId": 1
// }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const hopDongs = await prisma.hopDongBaoHiem.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        ToaNha: true,
      },
    });
    return NextResponse.json(
      { hopDongs, extraInfo: { totalRecords, totalPages, page, limit } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const valid = HopDongSchema.safeParse(data);

    if (!valid.success) {
      return NextResponse.json({ error: valid.error.errors }, { status: 400 });
    }

    const newHopDong = await prisma.hopDongBaoHiem.create({
      data: {
        ...valid.data,
        ngayBatDau: new Date(valid.data.ngayBatDau),
        ngayKetThuc: new Date(valid.data.ngayKetThuc),
      },
    });
    return NextResponse.json({ hopDong: newHopDong }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const valid = HopDongSchema.safeParse(data);

    if (!valid.success) {
      return NextResponse.json({ error: valid.error.errors }, { status: 400 });
    }

    const updated = await prisma.hopDongBaoHiem.updateMany({
      data: {
        ...valid.data,
        ngayBatDau: new Date(valid.data.ngayBatDau),
        ngayKetThuc: new Date(valid.data.ngayKetThuc),
      },
    });

    return NextResponse.json(
      { message: "Đã cập nhật tất cả hợp đồng bảo hiểm" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await prisma.hopDongBaoHiem.deleteMany();
    return NextResponse.json(
      { message: "Đã xóa tất cả hợp đồng bảo hiểm" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
