import { prisma } from "@/prisma/client";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const ChamSocKhachHangSchema = z.object({
  ngayHoTro: z.coerce.date(),
  loaiHoTro: z.string().min(1),
  tenHoTro: z.string().min(1),
  KhachHangId: z.number().int().positive(),
  NhanVienId: z.number().int().positive(),
});
// {
//     "ngayHoTro": "2025-04-16T00:00:00.000Z",
//     "loaiHoTro": "Tu van",
//     "tenHoTro": "Tu van hop dong",
//     "KhachHangId": 4,
//     "NhanVienId": 2
//   }

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await prisma.chamSocKhachHang.findUnique({
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
  const success = ChamSocKhachHangSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.chamSocKhachHang.update({
      where: {
        id: Number(id),
      },
      data: {
        ngayHoTro: success.data.ngayHoTro,
        loaiHoTro: success.data.loaiHoTro,
        tenHoTro: success.data.tenHoTro,
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
    const deleted = await prisma.chamSocKhachHang.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
