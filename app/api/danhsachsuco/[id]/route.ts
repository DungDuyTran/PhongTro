import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const DanhSachSuCoSchema = z.object({
  tenSuCo: z.string().min(1),
  soLuong: z.number().int().min(1),
  ngayBaoCao: z.coerce.date(),
  ngayXuLy: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  tinhTrang: z.string().min(1),
  moTa: z.string().min(1),
  PhongTroId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.danhSachSuCo.findUnique({
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
  const success = DanhSachSuCoSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.danhSachSuCo.update({
      where: {
        id: Number(id),
      },
      data: {
        tenSuCo: success.data.tenSuCo,
        soLuong: success.data.soLuong,
        ngayBaoCao: success.data.ngayBaoCao,
        ngayXuLy: success.data.ngayXuLy,
        ngayKetThuc: success.data.ngayKetThuc,
        tinhTrang: success.data.tinhTrang,
        moTa: success.data.moTa,
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
    const deleted = await prisma.danhSachSuCo.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
