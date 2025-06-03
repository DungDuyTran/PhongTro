import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ThongBaoSchema = z.object({
  tieuDe: z.string().min(1),
  noiDung: z.string().min(1),
  ngayThongBao: z.coerce.date(),
});

// {
//     "tieuDe": "Cap nhat he thong",
//     "noiDung": "He thong se duoc bao tri vao 10h sang mai.",
//     "ngayThongBao": "2025-04-16T00:00:00.000Z"
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.thongBao.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = ThongBaoSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.thongBao.create({
      data: {
        tieuDe: success.data.tieuDe,
        noiDung: success.data.noiDung,
        ngayThongBao: success.data.ngayThongBao,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = ThongBaoSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.thongBao.updateMany({
      data: {
        tieuDe: success.data.tieuDe,
        noiDung: success.data.noiDung,
        ngayThongBao: success.data.ngayThongBao,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.thongBao.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
