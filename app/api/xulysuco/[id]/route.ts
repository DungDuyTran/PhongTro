import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const XuLySuCoSchema = z.object({
  trangThai: z.boolean(),
  DanhSachSuCoId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.xuLySuCo.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        NhanVien: true,
        DanhSachSuCo: true,
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
  const success = XuLySuCoSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.xuLySuCo.update({
      where: {
        id: Number(id),
      },
      data: {
        trangThai: success.data.trangThai,
        DanhSachSuCoId: success.data.DanhSachSuCoId,
        NhanVienId: success.data.NhanVienId,
      },
      include: {
        NhanVien: true,
        DanhSachSuCo: true,
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
    const deleted = await prisma.xuLySuCo.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
