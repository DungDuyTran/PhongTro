import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const ThongBaoSchema = z.object({
  tieuDe: z.string().min(1),
  noiDung: z.string().min(1),
  ngayThongBao: z.coerce.date(),
});
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.thongBao.findUnique({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await req.json();
  const success = ThongBaoSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.thongBao.update({
      where: {
        id: Number(id),
      },
      data: {
        tieuDe: success.data.tieuDe,
        noiDung: success.data.noiDung,
        ngayThongBao: success.data.ngayThongBao,
      },
    });
    return NextResponse.json({ message: "update thanh cong" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleted = await prisma.thongBao.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
