import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const Kho_ThietBiSchema = z.object({
  soLuong: z.number().int().min(0),
  ghiChu: z.string().min(1),
  ThietBiId: z.number().int().positive(),
  KhoId: z.number().int().positive(),
});

// {
//     "soLuong": 10,
//     "ghiChu": "Thiet bi duoc bao quan tot",
//     "ThietBiId": 2,
//     "KhoId": 1
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.kho_ThietBi.findMany({
      include: {
        Kho: true,
        ThietBi: true,
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
    const success = Kho_ThietBiSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.kho_ThietBi.create({
      data: {
        soLuong: success.data.soLuong,
        ghiChu: success.data.ghiChu,
        ThietBiId: success.data.ThietBiId,
        KhoId: success.data.KhoId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = Kho_ThietBiSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.kho_ThietBi.updateMany({
      data: {
        soLuong: success.data.soLuong,
        ghiChu: success.data.ghiChu,
        ThietBiId: success.data.ThietBiId,
        KhoId: success.data.KhoId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.kho_ThietBi.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
