import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DanhSachSuCoSchema = z.object({
  tenSuCo: z.string().min(1),
  soLuong: z.number().int().min(1),
  ngayBaoCao: z.coerce.date(),
  ngayXuLy: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  tinhTrang: z.string().min(1),
  moTa: z.string().min(1),
  PhongTroId: z.number().int().positive(),
});

// {
//     "tenSuCo": "Vo bong den",
//     "soLuong": 2,
//     "ngayBaoCao": "2025-04-01T00:00:00.000Z",
//     "ngayXuLy": "2025-04-02T00:00:00.000Z",
//     "ngayKetThuc": "2025-04-03T00:00:00.000Z",
//     "tinhTrang": "Da xu ly",
//     "moTa": "Thay bong den moi tai phong 204",
//     "PhongTroId": 4
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.danhSachSuCo.findMany({
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
    const success = DanhSachSuCoSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.danhSachSuCo.create({
      data: {
        tenSuCo: success.data.tenSuCo,
        soLuong: success.data.soLuong,
        ngayBaoCao: success.data.ngayBaoCao,
        ngayXuLy: success.data.ngayXuLy,
        ngayKetThuc: success.data.ngayKetThuc,
        tinhTrang: success.data.tinhTrang,
        moTa: success.data.moTa,
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
  const success = DanhSachSuCoSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.danhSachSuCo.updateMany({
      data: {
        tenSuCo: success.data.tenSuCo,
        soLuong: success.data.soLuong,
        ngayBaoCao: success.data.ngayBaoCao,
        ngayXuLy: success.data.ngayXuLy,
        ngayKetThuc: success.data.ngayKetThuc,
        tinhTrang: success.data.tinhTrang,
        moTa: success.data.moTa,
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
    const deleted = await prisma.danhSachSuCo.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
