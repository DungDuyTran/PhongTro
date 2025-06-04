import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const HoaDonSchema = z.object({
  ngayLap: z.coerce.date(),
  loaiHoaDon: z.string().min(1),
  tinhTrang: z.string().min(1),
  soTien: z.coerce.number().min(0),
  LichSuThanhToanId: z.number().int().positive().optional(),
  KhachHangId: z.number().int().positive(),
});
// {
//   "ngayLap": "2025-04-10T00:00:00.000Z",
//   "loaiHoaDon": "Hóa đơn tiền phòng",
//   "tinhTrang": "Đã thanh toán",
//   "soTien": 2500000,
//   "LichSuThanhToanId": 3,
//   "KhachHangId": 7
// }

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.hoaDon.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        KhachHang: true,
        LichSuThanhToan: true,
      },
    });
    return NextResponse.json(
      { data, extraInfo: { totalRecords, totalPages, page, limit } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = HoaDonSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newHoaDon = await prisma.hoaDon.create({
      data: {
        ngayLap: success.data.ngayLap,
        loaiHoaDon: success.data.loaiHoaDon,
        tinhTrang: success.data.tinhTrang,
        soTien: success.data.soTien,
        LichSuThanhToanId: success.data.LichSuThanhToanId,
        KhachHangId: success.data.KhachHangId,
      },
    });
    return NextResponse.json({ newHoaDon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = HoaDonSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.hoaDon.updateMany({
      data: {
        ngayLap: success.data.ngayLap,
        loaiHoaDon: success.data.loaiHoaDon,
        tinhTrang: success.data.tinhTrang,
        soTien: success.data.soTien,
        LichSuThanhToanId: success.data.LichSuThanhToanId,
        KhachHangId: success.data.KhachHangId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.hoaDon.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
