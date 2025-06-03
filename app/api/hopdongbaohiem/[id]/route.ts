import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";

const HopDongSchema = z.object({
  nhaCungCap: z.string().min(3),
  noiDung: z.string().min(10),
  ngayBatDau: z.string().datetime(),
  ngayKetThuc: z.string().datetime(),
  ToaNhaId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const hopDong = await prisma.hopDongBaoHiem.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        ToaNha: true,
      },
    });
    return NextResponse.json({ hopDong }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await req.json();
  const validate = HopDongSchema.safeParse(data);

  if (!validate.success) {
    return NextResponse.json({ error: validate.error.errors }, { status: 400 });
  }

  try {
    const updatedHopDong = await prisma.hopDongBaoHiem.update({
      where: {
        id: Number(id),
      },
      data: {
        ...validate.data,
        ngayBatDau: new Date(validate.data.ngayBatDau),
        ngayKetThuc: new Date(validate.data.ngayKetThuc),
      },
    });
    return NextResponse.json({ data: updatedHopDong }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deletedHopDong = await prisma.hopDongBaoHiem.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ data: deletedHopDong }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
