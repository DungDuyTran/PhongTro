import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const HopDongSchema = z.object({
  ngayBatDau: z.coerce.date(),
  ngayKetThuc: z.coerce.date(),
  tienDaCoc: z.number().min(0),
  tongTien: z.number().min(0),
  noiDung: z.string().min(1),
  ghiChu: z.string().min(1),
  KhachHangId: z.number().int().positive(),
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.hopDong.count(); // Đổi từ TinhTrangPhong sang HopDong
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await prisma.hopDong.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        KhachHang: true,
      },
    });
    return NextResponse.json(
      { data, extraInfo: { totalRecords, totalPages, page, limit } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách hợp đồng:", error); // Thêm log lỗi
    return NextResponse.json(
      { error: "Lỗi server khi lấy dữ liệu hợp đồng" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = HopDongSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.hopDong.create({
      data: {
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        tienDaCoc: success.data.tienDaCoc,
        tongTien: success.data.tongTien,
        noiDung: success.data.noiDung,
        ghiChu: success.data.ghiChu,
        KhachHangId: success.data.KhachHangId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi tạo hợp đồng:", error); // Thêm log lỗi
    return NextResponse.json(
      { error: "Lỗi server khi tạo hợp đồng" },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const hopDongId = searchParams.get("id"); // Lấy ID từ query params để cập nhật

  if (!hopDongId) {
    return NextResponse.json(
      { error: "Thiếu ID hợp đồng để cập nhật" },
      { status: 400 }
    );
  }

  const data = await req.json();
  const success = HopDongSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.hopDong.update({
      // Sử dụng update thay vì updateMany cho 1 bản ghi
      where: { id: Number(hopDongId) },
      data: {
        ngayBatDau: success.data.ngayBatDau,
        ngayKetThuc: success.data.ngayKetThuc,
        tienDaCoc: success.data.tienDaCoc,
        tongTien: success.data.tongTien,
        noiDung: success.data.noiDung,
        ghiChu: success.data.ghiChu,
        KhachHangId: success.data.KhachHangId,
      },
    });
    return NextResponse.json(
      { message: "Đã cập nhật thành công", data: update },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật hợp đồng:", error); // Thêm log lỗi
    return NextResponse.json(
      { error: "Lỗi server khi cập nhật hợp đồng" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const hopDongId = searchParams.get("id"); // Lấy ID từ query params để xóa

  if (!hopDongId) {
    return NextResponse.json(
      { error: "Thiếu ID hợp đồng để xóa" },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.hopDong.delete({
      // Sử dụng delete thay vì deleteMany cho 1 bản ghi
      where: { id: Number(hopDongId) },
    });
    return NextResponse.json(
      { message: "Đã xóa thành công", data: deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi xóa hợp đồng:", error); // Thêm log lỗi
    return NextResponse.json(
      { error: "Lỗi server khi xóa hợp đồng" },
      { status: 400 }
    );
  }
}
