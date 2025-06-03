import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// put có vấn đề khi call

const PhongTroTinhTrangSchema = z.object({
  PhongTroId: z.number().int().positive(),
  TinhTrangPhongId: z.number().int().positive(),
});
// {
//   "PhongTroId": 1,
//   "TinhTrangPhongId": 5
// }

export async function GET(req: NextRequest) {
  try {
    const phongtro_tinhtrangphong =
      await prisma.phongTro_TinhTrangPhong.findMany({
        include: {
          phongTro: true,
          tinhTrangPhong: true,
        },
      });
    return NextResponse.json({ phongtro_tinhtrangphong }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = PhongTroTinhTrangSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newPTTTP = await prisma.phongTro_TinhTrangPhong.create({
      data: {
        phongTroId: success.data.PhongTroId,
        tinhTrangPhongId: success.data.TinhTrangPhongId,
      },
    });
    return NextResponse.json({ newPTTTP }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = PhongTroTinhTrangSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.phongTro_TinhTrangPhong.updateMany({
      data: {
        phongTroId: success.data.PhongTroId,
        tinhTrangPhongId: success.data.TinhTrangPhongId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.phongTro_TinhTrangPhong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
