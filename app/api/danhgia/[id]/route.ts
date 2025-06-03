import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const DanhGiaSchema = z.object({
  noiDung: z.string().min(1),
  ngayDanhGia: z.coerce.date(),
  soSao: z.number().int().min(1).max(5),
  PhongTroId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.danhGia.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        PhongTro: true,
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
  const success = DanhGiaSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.danhGia.update({
      where: {
        id: Number(id),
      },
      data: {
        noiDung: success.data.noiDung,
        ngayDanhGia: success.data.ngayDanhGia,
        soSao: success.data.soSao,
        PhongTroId: success.data.PhongTroId,
      },
      include: {
        PhongTro: true,
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
    const deleted = await prisma.danhGia.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong id" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
