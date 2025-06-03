import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const HopDongNhanVienSchema = z.object({
  hoTen: z.string().min(1),
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  luongCoBan: z.number().min(0),
  ghiChu: z.string().min(1),
  NhanVienId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.hopDongNhanVien.findUnique({
      where: {
        id: Number(id),
      },
      include: {
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
  const success = HopDongNhanVienSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updated = await prisma.hopDongNhanVien.update({
      where: {
        id: Number(id),
      },
      include: {
        NhanVien: true,
      },
      data: {
        hoTen: success.data.hoTen,
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        luongCoBan: success.data.luongCoBan,
        ghiChu: success.data.ghiChu,
        NhanVienId: success.data.NhanVienId,
      },
    });
    return NextResponse.json({ message: " thanh cong" }, { status: 201 });
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
    const deleted = await prisma.hopDongNhanVien.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
