import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const KhuyenMaiSchema = z.object({
  tenKhuyenMai: z.string().min(3),
  moTa: z.string(),
  phanTramGiamGia: z.number(),
  ngayBatDau: z.string().datetime(),
  ngayKetThuc: z.string().datetime(),
});
// {
//     "tenKhuyenMai": "aaaaaaaaaaaaaaaaa",
//     "moTa": "bbbbbbbbbbbbbbbbbbb",
//     "phanTramGiamGia": 0.2,
//     "ngayBatDau": "2025-01-01T00:00:00.000Z",
//     "ngayKetThuc": "2026-01-01T00:00:00.000Z"
//   }

// model KhuyenMai{
//     id Int @id @default(autoincrement())
//     tenKhuyenMai String @db.VarChar(255)
//     moTa String @db.Text
//     phanTramGiamGia Float
//     ngayBatDau DateTime
//     ngayKetThuc DateTime
//     // PhongTros ChiTietKhuyenMai[]
//   }
export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.khuyenMai.findMany({
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
  const data = await req.json();
  const success = KhuyenMaiSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const newKhuyenMai = await prisma.khuyenMai.create({
      data: {
        tenKhuyenMai: success.data.tenKhuyenMai,
        moTa: success.data.moTa,
        phanTramGiamGia: success.data.phanTramGiamGia,
        ngayBatDau: new Date(success.data.ngayBatDau),
        ngayKetThuc: new Date(success.data.ngayKetThuc),
      },
    });
    return NextResponse.json({ newKhuyenMai }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = KhuyenMaiSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.khuyenMai.updateMany({
      data: {
        tenKhuyenMai: success.data.tenKhuyenMai,
        moTa: success.data.moTa,
        phanTramGiamGia: success.data.phanTramGiamGia,
        ngayBatDau: new Date(success.data.ngayBatDau),
        ngayKetThuc: new Date(success.data.ngayKetThuc),
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.khuyenMai.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
