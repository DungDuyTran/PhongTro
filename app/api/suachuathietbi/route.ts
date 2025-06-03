import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SuaChuaThietBiSchema = z.object({
  tenSuaChua: z.string().min(1),
  tenNhanVien: z.string().min(1),
});

// {
//     "tenSuaChua": "Thay the bo nguon",
//     "tenNhanVien": "Nguyen Van A"
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.suaChuaThietBi.findMany({});
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = SuaChuaThietBiSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.suaChuaThietBi.create({
      data: {
        tenSuaChua: success.data.tenSuaChua,
        tenNhanVien: success.data.tenNhanVien,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = SuaChuaThietBiSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.suaChuaThietBi.updateMany({
      data: {
        tenSuaChua: success.data.tenSuaChua,
        tenNhanVien: success.data.tenNhanVien,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.suaChuaThietBi.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
