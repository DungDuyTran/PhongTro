import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";

const ToaNhaSchema = z.object({
  tenToaNha: z.string().min(3),
  diaChi: z.string().min(3),
  soTang: z.number().int().positive(),
  DonViHanhChinhId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const toaNha = await prisma.toaNha.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        DonViHanhChinh: true,
      },
    });
    return NextResponse.json({ toaNha }, { status: 200 });
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
  const validate = ToaNhaSchema.safeParse(data);

  if (!validate.success) {
    return NextResponse.json({ error: validate.error.errors }, { status: 400 });
  }

  try {
    const updatedToaNha = await prisma.toaNha.update({
      where: {
        id: Number(id),
      },
      data: validate.data,
    });
    return NextResponse.json({ data: updatedToaNha }, { status: 200 });
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
    const deletedToaNha = await prisma.toaNha.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ data: deletedToaNha }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
