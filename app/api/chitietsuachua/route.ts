import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChiTietSuaChuaSchema = z.object({
  tenSuaChua: z.string().min(1),
  soTien: z.number().min(0),
  ThietBiId: z.number().int().positive(),
  SuaChuaThietBiId: z.number().int().positive(),
});

// {
//     "tenSuaChua": "Thay pin",
//     "soTien": 150000,
//     "ThietBiId": 3,
//     "SuaChuaThietBiId": 2
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.chiTietSuaChua.findMany({
      include: {
        SuaChuaThietBi: true,
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
    const success = ChiTietSuaChuaSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.chiTietSuaChua.create({
      data: {
        tenSuaChua: success.data.tenSuaChua,
        soTien: success.data.soTien,
        ThietBiId: success.data.ThietBiId,
        SuaChuaThietBiId: success.data.SuaChuaThietBiId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ChiTietSuaChuaSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.chiTietSuaChua.updateMany({
      data: {
        tenSuaChua: success.data.tenSuaChua,
        soTien: success.data.soTien,
        ThietBiId: success.data.ThietBiId,
        SuaChuaThietBiId: success.data.SuaChuaThietBiId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.chiTietSuaChua.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
