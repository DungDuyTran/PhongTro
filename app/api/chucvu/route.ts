import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChucVuSchema = z.object({
  hoTen: z.string().min(1),
  tenChucVu: z.string().min(1),
  loaiChucVu: z.string().min(1),
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
});

// {
//     "hoTen": "Tran Thi C",
//     "tenChucVu": "Truong phong",
//     "loaiChucVu": "Quan ly",
//     "ngayBatDau": "2024-06-01T00:00:00.000Z",
//     "ngayKetThuc": "2025-06-01T00:00:00.000Z"
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.chucVu.findMany({});
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = ChucVuSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chucVu.create({
      data: {
        hoTen: success.data.hoTen,
        tenChucVu: success.data.tenChucVu,
        loaiChucVu: success.data.loaiChucVu,
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChucVuSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chucVu.updateMany({
      data: {
        hoTen: success.data.hoTen,
        tenChucVu: success.data.tenChucVu,
        loaiChucVu: success.data.loaiChucVu,
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chucVu.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
