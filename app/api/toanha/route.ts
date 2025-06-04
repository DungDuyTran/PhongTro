import { prisma } from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ToaNhaSchema = z.object({
  tenToaNha: z.string().min(3),
  diaChi: z.string().min(3),
  soTang: z.number().int().positive(),
  DonViHanhChinhId: z.number().int().positive(),
});

// {
//   "tenToaNha": "Toa A",
//   "diaChi": "Da Nang",
//   "soTang": 5,
//   "DonViHanhChinhId": 6
//

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const toaNhas = await prisma.toaNha.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        DonViHanhChinh: true,
      },
    });
    return NextResponse.json(
      { toaNhas, extraInfo: { totalRecords, totalPages, page, limit } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const valid = ToaNhaSchema.safeParse(data);

    if (!valid.success) {
      return NextResponse.json({ error: valid.error.errors }, { status: 400 });
    }

    const newToaNha = await prisma.toaNha.create({
      data: valid.data,
    });
    return NextResponse.json({ toaNha: newToaNha }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const valid = ToaNhaSchema.safeParse(data);

    if (!valid.success) {
      return NextResponse.json({ error: valid.error.errors }, { status: 400 });
    }

    const updated = await prisma.toaNha.updateMany({
      data: valid.data,
    });
    return NextResponse.json(
      { message: "Đã cập nhật tất cả tòa nhà" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await prisma.toaNha.deleteMany();
    return NextResponse.json(
      { message: "Đã xóa tất cả tòa nhà" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
