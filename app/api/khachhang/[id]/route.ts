import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";
// coerce ép kiểu giá trị nhận được thành một kiểu Date (ngày/thời gian) hợp lệ.
const KhachHangSchema = z.object({
  hoTen: z.string().min(1),
  ngaySinh: z.coerce.date(),
  cccd: z.string().min(1, "Dia chi khong duoc de trong"),
  diaChi: z.string().min(1),
  soDienThoai: z.string().min(1),
  email: z.string().email("Email khong hop le"),
});
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.khachHang.findUnique({
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
  const success = KhachHangSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.khachHang.findUnique({
      where: { cccd: success.data.cccd },
    });

    if (existing && existing.id !== Number(id)) {
      // Nếu CCCD đã tồn tại nhưng không phải của khách hàng hiện tại
      return NextResponse.json(
        { error: "CCCD đã tồn tại trong hệ thống" },
        { status: 400 }
      );
    }

    const updateid = await prisma.khachHang.update({
      where: { id: Number(id) },
      data: {
        hoTen: success.data.hoTen,
        ngaySinh: success.data.ngaySinh,
        cccd: success.data.cccd,
        diaChi: success.data.diaChi,
        soDienThoai: success.data.soDienThoai,
        email: success.data.email,
      },
    });

    // Trả về thông báo thành công
    return NextResponse.json(
      { message: "Cập nhật thành công" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 }); // Trả về thông báo lỗi chi tiết
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleteid = await prisma.khachHang.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
