import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PhanHoiNhanVienSchema = z.object({
  // ngayPhanHoi: z.coerce.date(),
  // trangThai: z.boolean(),
  PhanHoiId: z.number().int().positive(),
});

// {
//     "ngayPhanHoi": "2025-04-16T09:00:00.000Z",
//     "trangThai": true,
//     "PhanHoiId": 1
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.phanHoiNhanVien.findMany({
      include: {
        PhanHoi: true,
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
    const success = PhanHoiNhanVienSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.phanHoiNhanVien.create({
      data: {
        // ngayPhanHoi: success.data.ngayPhanHoi,
        // trangThai: success.data.trangThai,
        PhanHoiId: success.data.PhanHoiId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = PhanHoiNhanVienSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.phanHoiNhanVien.updateMany({
      data: {
        // ngayPhanHoi: success.data.ngayPhanHoi,
        // trangThai: success.data.trangThai,
        PhanHoiId: success.data.PhanHoiId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.phanHoiNhanVien.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
