import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const noiDung = body.noiDung ?? "";
    const khachHangId = body.khachHangId ?? null;

    if (!noiDung || !khachHangId) {
      return NextResponse.json(
        { success: false, error: "Thiếu nội dung hoặc khách hàng ID" },
        { status: 400 }
      );
    }

    const newFeedback = await prisma.phanHoi.create({
      data: {
        noiDung,
        ngayPhanHoi: new Date(),
        trangThai: false,
        KhachHangId: khachHangId,
      },
      include: {
        KhachHang: true,
      },
    });

    return NextResponse.json({ success: true, data: newFeedback });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi máy chủ" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;
  const trangThaiFilter = searchParams.get("trangThai");

  try {
    const where: any = {};
    if (trangThaiFilter !== null) {
      where.trangThai = trangThaiFilter === "true";
    }

    const totalRecords = await prisma.phanHoi.count({ where });
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.phanHoi.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { ngayPhanHoi: "desc" },
      include: { KhachHang: true },
    });

    return NextResponse.json({
      data,
      extraInfo: { totalRecords, totalPages, page, limit },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi máy chủ" },
      { status: 500 }
    );
  }
}
