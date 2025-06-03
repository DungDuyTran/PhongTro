import { prisma } from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DVHCSchema = z.object({
  tenDonVi: z.string().min(3),
});

// model DonViHanhChinh{
//     id Int @id @default(autoincrement())
//     tenDonVi String @db.VarChar(255)
//     idCha Int?
//     // 1 đơn vị hành chính có nhìu tòa nhà
//     ToaNhas ToaNha[]
//   }

// GET: http://localhost:3000/api/donvihanhchinh
// POST :
// {
//   "tenDonVi": "Ha Noi"
// }

export async function GET(req: NextRequest) {
  try {
    const DVHC = await prisma.donViHanhChinh.findMany();
    return NextResponse.json(
      {
        DVHC: DVHC,
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
