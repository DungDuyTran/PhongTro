import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const LichSuSuDungDichVuSchema = z.object({
  ngaySuDung: z.coerce.date(),
  soLuong: z.number().int().min(0),
  thanhTien: z.number().min(0),
  KhachHangId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.lichSuSuDungDichVu.findUnique({
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
  const success = LichSuSuDungDichVuSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.lichSuSuDungDichVu.update({
      where: {
        id: Number(id),
      },
      data: {
        ngaySuDung: success.data.ngaySuDung,
        soLuong: success.data.soLuong,
        thanhTien: success.data.thanhTien,
        KhachHangId: success.data.KhachHangId,
        NhanVienId: success.data.NhanVienId,
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
    const deleted = await prisma.lichSuSuDungDichVu.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
