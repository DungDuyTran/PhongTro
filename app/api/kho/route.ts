import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const KhoSchema = z.object({
  tenKho: z.string().min(1),
  diaChi: z.string().min(1),
  sucChua: z.string().min(1),
});

// {
//     "tenKho": "Kho A",
//     "diaChi": "123 Duong ABC, Quan 1",
//     "sucChua": "100m2"
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.kho.findMany({});
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = KhoSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.kho.create({
      data: {
        tenKho: success.data.tenKho,
        diaChi: success.data.diaChi,
        sucChua: success.data.sucChua,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = KhoSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.kho.updateMany({
      data: {
        tenKho: success.data.tenKho,
        diaChi: success.data.diaChi,
        sucChua: success.data.sucChua,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.kho.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
