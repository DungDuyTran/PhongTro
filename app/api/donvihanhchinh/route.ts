import { prisma } from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DVHCSchema = z.object({
  tenDonVi: z.string().min(3),
});

export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const limit: number = Number(searchParams.get("limit")) || 10;
  const page: number = Number(searchParams.get("page")) || 1;

  try {
    const totalRecords = await prisma.tinhTrangPhong.count();
    const totalPages = Math.ceil(totalRecords / limit);
    const DVHC = await prisma.donViHanhChinh.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return NextResponse.json(
      {
        DVHC: DVHC,
        extraInfo: { totalRecords, totalPages, page, limit },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const DVHC = await req.json();
  const { tenDonVi } = DVHC;
  const successful = DVHCSchema.safeParse(DVHC);
  if (!successful.success) {
    return NextResponse.json(
      { error: successful.error?.errors },
      {
        status: 400,
      }
    );
  }
  try {
    const newDVHC = await prisma.donViHanhChinh.create({
      data: {
        tenDonVi: successful.data.tenDonVi,
      },
    });
    return NextResponse.json({ DVHC: newDVHC }, { status: 201 });
  } catch (error) {
    if (!successful.success) {
      return NextResponse.json({ errors: error }, { status: 400 });
    }
  }
}

export async function PUT(req: NextRequest) {
  const DVHC = await req.json();
  const successfull = DVHCSchema.safeParse(DVHC);

  if (!successfull.success) {
    return NextResponse.json(
      { error: successfull.error.errors },
      { status: 400 }
    );
  }
  try {
    const upDated = await prisma.donViHanhChinh.updateMany({
      data: {
        tenDonVi: successfull.data.tenDonVi,
      },
    });
    return NextResponse.json({ message: "Da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ errors: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.donViHanhChinh.deleteMany();

    return NextResponse.json({ message: "Xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ errors: error }, { status: 400 });
  }
}
