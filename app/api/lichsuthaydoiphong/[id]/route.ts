import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const LichSuThayDoiPhongSchema = z.object({
  idPhongCu: z.number().int().positive(),
  ngayChuyen: z.coerce.date(),
  donGia: z.number().min(0),
  ghiChu: z.string(),
  HopDongId: z.number().int().positive(),
  PhongTroId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.lichSuThayDoiPhong.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        PhongTro: true,
        HopDong: true,
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
  const success = LichSuThayDoiPhongSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.lichSuThayDoiPhong.update({
      where: {
        id: Number(id),
      },
      data: {
        idPhongCu: success.data.idPhongCu,
        ngayChuyen: success.data.ngayChuyen,
        donGia: success.data.donGia,
        ghiChu: success.data.ghiChu,
        HopDongId: success.data.HopDongId,
        PhongTroId: success.data.PhongTroId,
      },
      include: {
        PhongTro: true,
        HopDong: true,
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
    const deleted = await prisma.lichSuThayDoiPhong.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
