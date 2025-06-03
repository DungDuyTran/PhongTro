import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const BaoTriPhongTroSchema = z.object({
  loaiBaoTri: z.string().min(1),
  tenBaoTri: z.string().min(1),
  ngayBaoTri: z.coerce.date(),
  tenNhanVien: z.string().min(1),
  PhongTroId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.baoTriPhongTro.findUnique({
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
  const success = BaoTriPhongTroSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  try {
    const updateid = await prisma.baoTriPhongTro.update({
      where: {
        id: Number(id),
      },
      data: {
        loaiBaoTri: success.data.loaiBaoTri,
        tenBaoTri: success.data.tenBaoTri,
        ngayBaoTri: success.data.ngayBaoTri,
        tenNhanVien: success.data.tenNhanVien,
        PhongTroId: success.data.PhongTroId,
        NhanVienId: success.data.NhanVienId,
      },
      include: {
        PhongTro: true,
        NhanVien: true,
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
    const deleted = await prisma.baoTriPhongTro.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
