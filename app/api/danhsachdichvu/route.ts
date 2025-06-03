import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { z } from "zod";

// model DanhSachDichVu{
//     id Int @id @default(autoincrement())
//     tenDichVu String @db.VarChar(255)
//     dacTa String @db.Text
//     isActive Boolean @default(true)
//     // PhongTros PhongTro_DanhSachDichVu[]
//   }

const DanhSachDichVuSchema = z.object({
  tenDichVu: z.string(),
  dacTa: z.string(),
  isActive: z.boolean(),
});
// {
//     "tenDichVu" : "aaaaaaaaaaaaaaaa",
//     "dacTa": " bbbbbbbbbbbbbbb",
//     "isActive": true
// }

export async function GET(req: NextRequest) {
  try {
    const danhSachDichVu = await prisma.danhSachDichVu.findMany();
    return NextResponse.json({ danhSachDichVu }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const success = DanhSachDichVuSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error }, { status: 400 });
  }
  try {
    const newDSDV = await prisma.danhSachDichVu.createMany({
      data: {
        tenDichVu: success.data.tenDichVu,
        dacTa: success.data.dacTa,
        isActive: success.data.isActive,
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = DanhSachDichVuSchema.safeParse(data);
  if (!success.success) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  try {
    const update = await prisma.danhSachDichVu.updateMany({
      data: {
        tenDichVu: success.data.tenDichVu,
        dacTa: success.data.dacTa,
        isActive: success.data.isActive,
      },
    });
    return NextResponse.json(
      { message: " da cap nhat thanh cong" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const Deleted = await prisma.danhSachDichVu.deleteMany();
    return NextResponse.json({ message: "xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
