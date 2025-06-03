import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NhanVien_SuaChuaThietBiSchema = z.object({
  NhanVienId: z.number().int().positive(),
  SuaChuaThietBiId: z.number().int().positive(),
});

// {
//     "NhanVienId": 2,
//     "SuaChuaThietBiId": 5
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.nhanVien_SuaChuaThietBi.findMany({
      include: {
        NhanVien: true,
        SuaChuaThietBi: true,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = NhanVien_SuaChuaThietBiSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.nhanVien_SuaChuaThietBi.create({
      data: {
        NhanVienId: success.data.NhanVienId,
        SuaChuaThietBiId: success.data.SuaChuaThietBiId,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = NhanVien_SuaChuaThietBiSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.nhanVien_SuaChuaThietBi.updateMany({
      data: {
        NhanVienId: success.data.NhanVienId,
        SuaChuaThietBiId: success.data.SuaChuaThietBiId,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.nhanVien_SuaChuaThietBi.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
