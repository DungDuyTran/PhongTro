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
  try {
    const data = await prisma.phanHoi.findMany({
      include: {
        KhachHang: true,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
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
