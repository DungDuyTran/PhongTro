import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";
const LoaiPhongSchema = z.object({
  tenLoaiPhong: z.string().min(3),
  moTa: z.string(),
  giaCoBan: z.number(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.loaiPhong.findUnique({
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
  const success = LoaiPhongSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.loaiPhong.update({
      where: {
        id: Number(id),
      },
      data: {
        tenLoaiPhong: success.data.tenLoaiPhong,
        moTa: success.data.moTa,
        giaCoBan: success.data.giaCoBan,
      },
    });
    return NextResponse.json({ data: updateid }, { status: 201 });
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
    const deleteid = await prisma.loaiPhong.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ data: deleteid }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
