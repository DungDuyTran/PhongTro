import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";

// Schema để validate dữ liệu PUT
const PhongTroSchema = z.object({
  tenPhong: z.string().min(3),
  tang: z.number().int().positive(),
  kichThuoc: z.number().positive(),
  giaPhong: z.number().positive(),
  soNguoiToiDa: z.number().int().positive(),
  ToaNhaId: z.number().int().positive(),
});

// GET /api/phongtro/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const data = await prisma.phongTro.findUnique({
      where: { id: Number(id) },
      include: { ToaNha: true },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Không tìm thấy phòng trọ với ID này." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi lấy dữ liệu phòng trọ." },
      { status: 500 }
    );
  }
}

// PUT /api/phongtro/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const json = await req.json();
    const parsed = PhongTroSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.phongTro.update({
      where: { id: Number(id) },
      data: parsed.data,
    });

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi cập nhật phòng trọ." },
      { status: 500 }
    );
  }
}

// DELETE /api/phongtro/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const deleted = await prisma.phongTro.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ data: deleted }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi xoá phòng trọ." },
      { status: 500 }
    );
  }
}
