import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";
const PhuongThucThanhToanSchema = z.object({
  loaiGiaoDich: z.string().min(1),
  moTa: z.string().min(1),
  ghiChu: z.string().min(1),
  LichSuThanhToanId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.phuongThucThanhToan.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!data) {
      return NextResponse.json(
        { error: "khong tim thay voi id nay." },
        { status: 404 }
      );
    }
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ errors: error }, { status: 400 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await req.json();
  const success = PhuongThucThanhToanSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.phuongThucThanhToan.update({
      where: {
        id: Number(id),
      },
      data: {
        loaiGiaoDich: success.data.loaiGiaoDich,
        moTa: success.data.moTa,
        ghiChu: success.data.ghiChu,
        LichSuThanhToanId: success.data.LichSuThanhToanId,
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
    const deleteid = await prisma.phuongThucThanhToan.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
