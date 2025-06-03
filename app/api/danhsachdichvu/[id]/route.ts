import { prisma } from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DanhSachDichVuSchema = z.object({
  tenDichVu: z.string(),
  dacTa: z.string(),
  isActive: z.boolean(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.danhSachDichVu.findUnique({
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
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await req.json();
  const success = DanhSachDichVuSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error }, { status: 400 });
  }
  try {
    const newDSDV = await prisma.danhSachDichVu.updateMany({
      where: {
        id: Number(id),
      },
      data: {
        tenDichVu: success.data.tenDichVu,
        dacTa: success.data.dacTa,
        isActive: success.data.isActive,
      },
    });
    return NextResponse.json({ message: "update thành công" }, { status: 200 });
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
    const deleteid = await prisma.danhSachDichVu.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
