import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const HinhAnhSchema = z.object({
  moTa: z.string().min(3),
  hinhAnh: z.string().min(3),
  PhongTroId: z.number().int().positive(),
});

// {
//   "moTa": "aaaaaaaaaaaaaaa",
//   "hinhAnh": "aaaaaaaaaaaaaaaaabb",
//   "PhongTroId": 1
// }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.hinhAnhPhongTro.findMany({
      include: {
        PhongTro: true,
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
    const success = HinhAnhSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.hinhAnhPhongTro.create({
      data: {
        moTa: success.data.moTa,
        hinhAnh: success.data?.hinhAnh,
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
  const success = HinhAnhSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.hinhAnhPhongTro.updateMany({
      data: {
        moTa: success.data.moTa,
        hinhAnh: success.data?.hinhAnh,
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
    const deleted = await prisma.hinhAnhPhongTro.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
