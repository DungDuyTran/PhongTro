import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";

const NhanVienSchema = z.object({
  hoTen: z.string().min(1, "Họ tên không được để trống"),
  ngaySinh: z.coerce.date(),
  gioiTinh: z.boolean(),
  soDienThoai: z.string().min(1, "Số điện thoại không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  diaChi: z.string().min(1, "Địa chỉ không được để trống"),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.nhanVien.findUnique({
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
  const success = NhanVienSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.nhanVien.update({
      where: {
        id: Number(id),
      },
      data: {
        hoTen: success.data.hoTen,
        ngaySinh: success.data.ngaySinh,
        gioiTinh: success.data.gioiTinh,
        soDienThoai: success.data.soDienThoai,
        email: success.data.email,
        diaChi: success.data.diaChi,
      },
    });
    return NextResponse.json({ message: "update thanh cong" }, { status: 201 });
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
    const deleteid = await prisma.nhanVien.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
