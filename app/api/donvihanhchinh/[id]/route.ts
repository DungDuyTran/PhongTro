import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";
import { z } from "zod";
import { prisma } from "@/prisma/client";
import { error } from "console";
import { Prisma } from "@prisma/client";

const DVHCSchema = z.object({
  tenDonVi: z.string().min(3),
});

// {
//   "tenDonVi": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
// }
// 1 2 3
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const DVHC = await prisma.donViHanhChinh.findUnique({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ DVHC }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ errors: error }, { status: 400 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const DVHC = await req.json();
  const validate = DVHCSchema.safeParse(DVHC);

  if (!validate.success) {
    return NextResponse.json(
      {
        error: { message: validate.error.message },
      },
      { status: 400 }
    );
  }
  try {
    const updateDVHC = await prisma.donViHanhChinh.update({
      where: {
        id: Number(id),
      },
      data: {
        tenDonVi: validate.data.tenDonVi,
      },
    });
    return NextResponse.json({ data: updateDVHC }, { status: 400 });
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
    const deletedDVHC = await prisma.donViHanhChinh.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ data: deletedDVHC }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
