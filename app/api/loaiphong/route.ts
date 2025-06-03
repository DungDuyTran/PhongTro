import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LoaiPhongSchema = z.object({
  tenLoaiPhong: z.string().min(3),
  moTa: z.string(),
  giaCoBan: z.number(),
});
// {
//   "tenLoaiPhong": "aaaaaaaaaaa",
//   "moTa": "bbbbbbbbbbb",
//   "giaCoBan": 10000000000
// }

// model LoaiPhong{
//     id Int @id @default(autoincrement())
//     tenLoaiPhong String @db.VarChar(255)
//     moTa String @db.Text
//     giaCoBan Float
//     PhongTro PhongTro @relation(fields: [PhongTroId], references: [id])
//     PhongTroId Int
//   }

export async function GET(req: NextRequest) {
  try {
    const loaiPhong = await prisma.loaiPhong.findMany({});
    return NextResponse.json({ loaiPhong }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const success = LoaiPhongSchema.safeParse(data);

    if (!success.success) {
      return NextResponse.json(
        { error: success.error.errors },
        { status: 400 }
      );
    }
    const newLoaiPhong = await prisma.loaiPhong.create({
      data: {
        tenLoaiPhong: success.data.tenLoaiPhong,
        moTa: success.data.moTa,
        giaCoBan: success.data.giaCoBan,
      },
    });
    return NextResponse.json({ newLoaiPhong }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const success = LoaiPhongSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json({ error: success.error.errors }, { status: 400 });
  }
  try {
    const upDate = await prisma.loaiPhong.updateMany({
      data: {
        tenLoaiPhong: success.data.tenLoaiPhong,
        moTa: success.data.moTa,
        giaCoBan: success.data.giaCoBan,
      },
    });
    return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const deleted = await prisma.loaiPhong.deleteMany();
    return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
