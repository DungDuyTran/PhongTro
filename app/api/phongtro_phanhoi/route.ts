import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PhanHoi_PhongTroSchema = z.object({
  PhanHoiId: z.number().int().positive(),
  PhongTroId: z.number().int().positive(),
});

// {
//     "PhanHoiId": 3,
//     "PhongTroId": 7
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.phanHoi_PhongTro.findMany({
      include: {
        PhongTro: true,
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
    const success = PhanHoi_PhongTroSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.phanHoi_PhongTro.create({
      data: {
        PhanHoiId: success.data.PhanHoiId,
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
  const success = PhanHoi_PhongTroSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.phanHoi_PhongTro.updateMany({
      data: {
        PhanHoiId: success.data.PhanHoiId,
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
    const deleted = await prisma.phanHoi_PhongTro.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
