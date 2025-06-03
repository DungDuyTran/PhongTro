import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";
const KhuyenMaiSchema = z.object({
  tenKhuyenMai: z.string().min(3),
  moTa: z.string(),
  phanTramGiamGia: z.number(),
  ngayBatDau: z.string().datetime(),
  ngayKetThuc: z.string().datetime(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.khuyenMai.findUnique({
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
  const success = KhuyenMaiSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.khuyenMai.update({
      where: {
        id: Number(id),
      },
      data: {
        tenKhuyenMai: success.data.tenKhuyenMai,
        moTa: success.data.moTa,
        phanTramGiamGia: success.data.phanTramGiamGia,
        ngayBatDau: new Date(success.data.ngayBatDau),
        ngayKetThuc: new Date(success.data.ngayKetThuc),
      },
    });
    return NextResponse.json(
      { message: "da update thanh cong" },
      { status: 201 }
    );
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
    const deleteid = await prisma.khuyenMai.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
