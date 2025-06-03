import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";

const TinhTrangPhongSchema = z.object({
  tinhTrang: z.string(),
  ngayCapNhat: z.string().datetime(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.tinhTrangPhong.findUnique({
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
  const success = TinhTrangPhongSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.tinhTrangPhong.update({
      where: {
        id: Number(id),
      },
      data: {
        tinhTrang: success.data.tinhTrang,
        ngayCapNhat: success.data.ngayCapNhat,
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
    const deleteid = await prisma.tinhTrangPhong.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ data: deleteid }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
