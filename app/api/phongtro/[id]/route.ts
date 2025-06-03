import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { z } from "zod";

const PhongTroSchema = z.object({
  tenPhong: z.string().min(3),
  tang: z.number().int().positive(),
  kichThuoc: z.number().positive(),
  giaPhong: z.number().positive(),
  soNguoiToiDa: z.number().int().positive(),
  ToaNhaId: z.number().int().positive(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await prisma.phongTro.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        ToaNha: true,
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
  const success = PhongTroSchema.safeParse(data);

  if (!success.success) {
    return NextResponse.json(
      { error: { message: success.error.message } },
      { status: 400 }
    );
  }
  try {
    const updateid = await prisma.phongTro.update({
      where: {
        id: Number(id),
      },
      data: {
        tenPhong: success.data.tenPhong,
        tang: success.data.tang,
        kichThuoc: success.data.kichThuoc,
        giaPhong: success.data.giaPhong,
        soNguoiToiDa: success.data.soNguoiToiDa,
        ToaNhaId: success.data.ToaNhaId,
      },
    });
    return NextResponse.json({ data: updateid }, { status: 201 });
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
    const deleteid = await prisma.phongTro.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ data: deleteid }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

// import { prisma } from "@/prisma/client";
// import { Prisma } from "@prisma/client";
// import { error } from "console";
// import exp from "constants";
// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// const PhongTroSchema = z.object({
//   tenPhong: z.string().min(3),
//   tang: z.number().int().positive(),
//   kichThuoc: z.number().positive(),
//   giaPhong: z.number().positive(),
//   soNguoiToiDa: z.number().int().positive(),
//   ToaNhaId: z.number().int().positive(),
// });

// {
//   "tenPhong": "aaaaaaaaa",
//   "tang": 9,
//   "kichThuoc": 8,
//   "giaPhong": 1000000,
//   "soNguoiToiDa": 8,
//   "ToaNhaId": 2
// }
// // hãy thkong ke sl phong trong cua nam ngoai
// // export async function GET(req: NextRequest) {
// //   try {
// //     const phongtro = await prisma.phongTro.findMany({
// //       include: {
// //         ToaNha: true,
// //       },
// //     });
// //     return NextResponse.json({ phongtro }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ error: error }, { status: 400 });
// //   }
// // }
// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const tenPhong = searchParams.get("tenPhong");
//   const tang = searchParams.get("tang");
//   const kichThuocMin = searchParams.get("kichThuocMin");
//   const kichThuocMax = searchParams.get("kichThuocMax");
//   const giaPhongMin = searchParams.get("giaPhongMin");
//   const giaPhongMax = searchParams.get("giaPhongMax");
//   const soNguoiToiDa = searchParams.get("soNguoiToiDa");
//   const toaNhaId = searchParams.get("toaNhaId");
//   const diaChi = searchParams.get("diaChi");

//   try {
//     const phongtro = await prisma.phongTro.findMany({
//       where: {
//         ...(tenPhong && {
//           tenPhong: {
//             contains: tenPhong,
//             mode: "insensitive",
//           } as Prisma.StringFilter,
//         }),
//         tang: tang ? Number(tang) : undefined,
//         kichThuoc:
//           kichThuocMin || kichThuocMax
//             ? {
//                 gte: kichThuocMin ? Number(kichThuocMin) : undefined,
//                 lte: kichThuocMax ? Number(kichThuocMax) : undefined,
//               }
//             : undefined,
//         giaPhong:
//           giaPhongMin || giaPhongMax
//             ? {
//                 gte: giaPhongMin ? Number(giaPhongMin) : undefined,
//                 lte: giaPhongMax ? Number(giaPhongMax) : undefined,
//               }
//             : undefined,
//         soNguoiToiDa: soNguoiToiDa ? Number(soNguoiToiDa) : undefined,
//         ToaNhaId: toaNhaId ? Number(toaNhaId) : undefined,
//         ...(diaChi && {
//           ToaNha: {
//             is: {
//               diaChi: {
//                 contains: diaChi,
//                 mode: "insensitive",
//               },
//             },
//           },
//         }),
//       },
//       include: {
//         ToaNha: true,
//       },
//     });

//     return NextResponse.json({ data: phongtro }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }
// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();
//     const success = PhongTroSchema.safeParse(data);

//     if (!success.success) {
//       return NextResponse.json(
//         { error: success.error.errors },
//         { status: 400 }
//       );
//     }
//     const newPhongTro = await prisma.phongTro.create({
//       data: {
//         tenPhong: success.data.tenPhong,
//         tang: success.data.tang,
//         kichThuoc: success.data.kichThuoc,
//         giaPhong: success.data.giaPhong,
//         soNguoiToiDa: success.data.soNguoiToiDa,
//         ToaNhaId: success.data.ToaNhaId,
//       },
//     });
//     return NextResponse.json({ newPhongTro }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }
// export async function PUT(req: NextRequest) {
//   const data = await req.json();
//   const success = PhongTroSchema.safeParse(data);

//   if (!success.success) {
//     return NextResponse.json({ error: success.error.errors }, { status: 400 });
//   }
//   try {
//     const upDate = await prisma.phongTro.updateMany({
//       data: {
//         tenPhong: success.data.tenPhong,
//         tang: success.data.tang,
//         kichThuoc: success.data.kichThuoc,
//         giaPhong: success.data.giaPhong,
//         soNguoiToiDa: success.data.soNguoiToiDa,
//         ToaNhaId: success.data.ToaNhaId,
//       },
//     });
//     return NextResponse.json({ message: "da cap nhat" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }
// export async function DELETE(req: NextRequest) {
//   try {
//     const deleted = await prisma.phongTro.deleteMany();
//     return NextResponse.json({ message: "da xoa thanh cong" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }
