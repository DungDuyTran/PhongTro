import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";

const HoaDonSchema = z.object({
  ngayLap: z.coerce.date(),
  loaiHoaDon: z.string().min(1),
  tinhTrang: z.string().min(1),
  soTien: z.coerce.number().min(0),
  KhachHangId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.hoaDon.findUnique({
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
  const success = HoaDonSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.hoaDon.update({
      where: {
        id: Number(id),
      },
      data: {
        ngayLap: success.data.ngayLap,
        loaiHoaDon: success.data.loaiHoaDon,
        tinhTrang: success.data.tinhTrang,
        soTien: success.data.soTien,
        KhachHang: {
          connect: { id: success.data.KhachHangId },
        },
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
    const deleteid = await prisma.hoaDon.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
