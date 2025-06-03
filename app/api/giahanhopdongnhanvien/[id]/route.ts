import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const GiaHanHopDongNhanVienSchema = z.object({
  ngayGiaHan: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  dieuKhoan: z.string().min(1),
  ChiTietHopDongNhanVienId: z.number().int().positive(),
});
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.giaHanHopDongNhanVien.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        ChiTietHopDongNhanVien: true,
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
  const success = GiaHanHopDongNhanVienSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.giaHanHopDongNhanVien.update({
      where: {
        id: Number(id),
      },
      data: {
        ngayGiaHan: success.data.ngayGiaHan,
        ngayKetThuc: success.data.ngayKetThuc,
        dieuKhoan: success.data.dieuKhoan,
        ChiTietHopDongNhanVienId: success.data.ChiTietHopDongNhanVienId,
      },
      include: {
        ChiTietHopDongNhanVien: true,
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
    const deleted = await prisma.giaHanHopDongNhanVien.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
