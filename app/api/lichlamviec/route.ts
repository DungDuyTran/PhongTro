import { prisma } from "@/prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LichLamViecSchema = z.object({
  ngayLamViec: z.coerce.date(),
  caLam: z.string().min(1),
  ghiChu: z.string().min(1),
});

// {
//     "ngayLamViec": "2025-05-01T00:00:00.000Z",
//     "caLam": "Sang",
//     "ghiChu": "Lam ca sang thu 5"
//   }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.lichLamViec.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = LichLamViecSchema.safeParse(data);
    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newData = await prisma.lichLamViec.create({
      data: {
        ngayLamViec: success.data.ngayLamViec,
        caLam: success.data.caLam,
        ghiChu: success.data.ghiChu,
      },
    });
    return NextResponse.json({ newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = LichLamViecSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const update = await prisma.lichLamViec.updateMany({
      data: {
        ngayLamViec: success.data.ngayLamViec,
        caLam: success.data.caLam,
        ghiChu: success.data.ghiChu,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.lichLamViec.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
