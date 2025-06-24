import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  try {
    const khachHangs = await prisma.khachHang.findMany();
    return NextResponse.json(khachHangs, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
