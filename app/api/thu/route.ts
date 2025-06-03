import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import { Princess_Sofia } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";
import { z, date } from "zod";
const LoaiPhongSchema = z.object({
  tenLoaiPhong: z.string(),
  moTa: z.string(),
  giaCoBan: z.number(),
});
// const LoaiPhongSchema = z.object({
//     tenLoaiPhong: z.string().min(3),
//     moTa: z.string(),
//     giaCoBan: z.number(),
//   });
export async function GET(req: NextRequest) {
  try {
    const data = await prisma.loaiPhong.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = LoaiPhongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json({ error }, { status: 400 });
    }
    const newData = await prisma.loaiPhong.create({
      data: {
        tenLoaiPhong: success.data.tenLoaiPhong,
        moTa: success.data.moTa,
        giaCoBan: success.data.giaCoBan,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const susscess = LoaiPhongSchema.safeParse(data);
    if (!susscess.success) {
      return NextResponse.json({ error }, { status: 400 });
    }
    const updated = await prisma.loaiPhong.updateMany({
      data: {
        tenLoaiPhong: susscess.data.tenLoaiPhong,
        moTa: susscess.data.moTa,
        giaCoBan: susscess.data.giaCoBan,
      },
    });
    return NextResponse.json(
      { message: "cap nhat thanh cong" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const xoa = await prisma.loaiPhong.deleteMany();
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
