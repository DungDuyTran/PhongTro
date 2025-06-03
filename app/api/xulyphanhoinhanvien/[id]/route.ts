import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const XuLyPhanHoiSchema = z.object({
  ngayXuLy: z.coerce.date(),
  noiDungPhanHoi: z.string().max(255),
  ghiChu: z.string().max(255),
  PhanHoiNhanVienId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.xuLyPhanHoi.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        PhanHoiNhanVien: true,
        NhanVien: true,
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
  const success = XuLyPhanHoiSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.xuLyPhanHoi.update({
      where: {
        id: Number(id),
      },
      data: {
        ngayXuLy: success.data.ngayXuLy,
        noiDungPhanHoi: success.data.noiDungPhanHoi,
        ghiChu: success.data.ghiChu,
        PhanHoiNhanVienId: success.data.PhanHoiNhanVienId,
        NhanVienId: success.data.NhanVienId,
      },
      include: {
        PhanHoiNhanVien: true,
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
    const deleted = await prisma.xuLyPhanHoi.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
