import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema xác thực đầu vào
const PhongDangThueSchema = z.object({
  phongTroId: z.number().int().positive(),
  khachHangId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    const totalRecords = await prisma.phongDangThue.count();
    const totalPages = Math.ceil(totalRecords / limit);

    const data = await prisma.phongDangThue.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        phongTro: {
          include: { ToaNha: true }, // nếu cần
        },
        khachHang: true,
      },
    });

    return NextResponse.json(
      { data, extraInfo: { totalRecords, totalPages, page, limit } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Không thể lấy dữ liệu" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PhongDangThueSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const { phongTroId, khachHangId } = parsed.data;

    const newRecord = await prisma.phongDangThue.create({
      data: {
        phongTroId,
        khachHangId,
      },
    });

    return NextResponse.json({ data: newRecord }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Tạo mới thất bại" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PhongDangThueSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const { phongTroId, khachHangId } = parsed.data;

    const deleted = await prisma.phongDangThue.delete({
      where: {
        phongTroId_khachHangId: {
          phongTroId,
          khachHangId,
        },
      },
    });

    return NextResponse.json(
      { message: "Đã xóa thành công", data: deleted },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Xóa thất bại" }, { status: 400 });
  }
}
