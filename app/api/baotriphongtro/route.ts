import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const BaoTriPhongTroSchema = z.object({
  loaiBaoTri: z.string().min(1),
  tenBaoTri: z.string().min(1),
  ngayBaoTri: z.coerce.date(),
  tenNhanVien: z.string().min(1),
  PhongTroId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});
// {
//     "loaiBaoTri": "Dien nuoc",
//     "tenBaoTri": "Sua ong nuoc bi ro",
//     "ngayBaoTri": "2025-04-20T00:00:00.000Z",
//     "tenNhanVien": "Nguyen Van A",
//     "PhongTroId": 1,
//     "NhanVienId": 8
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.baoTriPhongTro.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        PhongTro: true,
        NhanVien: true,
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
export async function POST(req: NextResponse) {
  try {
    const data = await req.json();
    const success = BaoTriPhongTroSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
    const newBaoTri = await prisma.baoTriPhongTro.create({
      data: {
        loaiBaoTri: success.data.loaiBaoTri,
        tenBaoTri: success.data.tenBaoTri,
        ngayBaoTri: success.data.ngayBaoTri,
        tenNhanVien: success.data.tenNhanVien,
        PhongTroId: success.data.PhongTroId,
        NhanVienId: success.data.NhanVienId,
      },
    });
    return NextResponse.json({ newBaoTri }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const success = BaoTriPhongTroSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
    const updated = await prisma.baoTriPhongTro.updateMany({
      data: {
        loaiBaoTri: success.data.loaiBaoTri,
        tenBaoTri: success.data.tenBaoTri,
        ngayBaoTri: success.data.ngayBaoTri,
        tenNhanVien: success.data.tenNhanVien,
        PhongTroId: success.data.PhongTroId,
        NhanVienId: success.data.NhanVienId,
      },
    });
    return NextResponse.json({ message: "sửa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const data = await prisma.baoTriPhongTro.deleteMany();
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
