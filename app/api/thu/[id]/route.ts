import { prisma } from "@/prisma/client";
import { error } from "console";
import { Princess_Sofia } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";
import { number, z } from "zod";

const LoaiPhongSchema = z.object({
  tenLoaiPhong: z.string(),
  moTa: z.string(),
  giaCoBan: z.number(),
});

export async function GET(
  req: NextRequest,
  { param }: { param: { id: string } }
) {
  const { id } = param;
  try {
    const data = await prisma.loaiPhong.findUnique({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
export async function PUT(
  req: NextRequest,
  { param }: { param: { id: string } }
) {
  const { id } = param;
  const data = await req.json();
  const success = LoaiPhongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error }, { status: 400 });
  }
  try {
    const newdata = await prisma.loaiPhong.update({
      where: {
        id: Number(id),
      },
      data: {
        tenLoaiPhong: success.data.tenLoaiPhong,
        moTa: success.data.moTa,
        giaCoBan: success.data.giaCoBan,
      },
    });
    return NextResponse.json({ newdata }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
export async function DELETE(
  req: NextRequest,
  { param }: { param: { id: string } }
) {
  const { id } = param;
  try {
    const deleteid = await prisma.loaiPhong.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
