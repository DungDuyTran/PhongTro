import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PhanHoiSchema = z.object({
  noiDung: z.string(),
  ngayPhanHoi: z.coerce.date(),
  trangThai: z.boolean(),
  KhachHangId: z.number().int().positive(),
});
// {
//     "noiDung": "Phong rat sach se va thoang mat",
//     "ngayPhanHoi": "2025-04-15T00:00:00.000Z",
//     "trangThai": true,
//     "KhachHangId": 12
//   }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.phanHoi.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        KhachHang: true,
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
    const success = PhanHoiSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.phanHoi.create({
      data: {
        noiDung: success.data.noiDung,
        ngayPhanHoi: success.data.ngayPhanHoi,
        trangThai: success.data.trangThai,
        KhachHangId: success.data.KhachHangId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const success = PhanHoiSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json({ error: error }, { status: 200 });
    }
    const update = await prisma.phanHoi.updateMany({
      data: {
        noiDung: success.data.noiDung,
        ngayPhanHoi: success.data.ngayPhanHoi,
        trangThai: success.data.trangThai,
        KhachHangId: success.data.KhachHangId,
      },
    });
    return NextResponse.json({ message: "thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.phanHoi.deleteMany();
    return NextResponse.json({ message: "xoa thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
