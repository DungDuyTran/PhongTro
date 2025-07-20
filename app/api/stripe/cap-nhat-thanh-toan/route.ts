// /app/api/cap-nhat-thanh-toan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { maHoaDon } = await req.json();

  // Cập nhật hóa đơn trong database
  await db.hoaDon.update({
    where: { id: Number(maHoaDon) },
    data: { trangThai: "Đã thanh toán" },
  });

  return NextResponse.json({ success: true });
}
