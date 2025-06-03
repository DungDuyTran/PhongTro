import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema validate đầu vào
const PhongTroSchema = z.object({
  tenPhong: z.string().min(3),
  tang: z.number().int().positive(),
  kichThuoc: z.number().positive(),
  giaPhong: z.number().positive(),
  soNguoiToiDa: z.number().int().positive(),
  ToaNhaId: z.number().int().positive(),
});

// GET: Lọc phòng trọ
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;

  const whereFilter: Prisma.PhongTroWhereInput = {
    ...(searchParams.get("tenPhong") && {
      tenPhong: { contains: searchParams.get("tenPhong") || "" },
    }),
    tang: searchParams.get("tang")
      ? Number(searchParams.get("tang"))
      : undefined,
    kichThuoc:
      searchParams.get("kichThuocMin") || searchParams.get("kichThuocMax")
        ? {
            gte: searchParams.get("kichThuocMin")
              ? Number(searchParams.get("kichThuocMin"))
              : undefined,
            lte: searchParams.get("kichThuocMax")
              ? Number(searchParams.get("kichThuocMax"))
              : undefined,
          }
        : undefined,
    giaPhong:
      searchParams.get("giaPhongMin") || searchParams.get("giaPhongMax")
        ? {
            gte: searchParams.get("giaPhongMin")
              ? Number(searchParams.get("giaPhongMin"))
              : undefined,
            lte: searchParams.get("giaPhongMax")
              ? Number(searchParams.get("giaPhongMax"))
              : undefined,
          }
        : undefined,
    soNguoiToiDa: searchParams.get("soNguoiToiDa")
      ? Number(searchParams.get("soNguoiToiDa"))
      : undefined,
    ToaNhaId: searchParams.get("toaNhaId")
      ? Number(searchParams.get("toaNhaId"))
      : undefined,
    ...(searchParams.get("diaChi") && {
      ToaNha: {
        diaChi: { contains: searchParams.get("diaChi") || "" },
      },
    }),
  };

  try {
    const totalRecords = await prisma.phongTro.count({ where: whereFilter });
    const totalPages = Math.ceil(totalRecords / limit);

    const phongtro = await prisma.phongTro.findMany({
      where: whereFilter,
      include: { ToaNha: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json(
      {
        data: phongtro,
        extraInfo: {
          totalRecords,
          totalPages,
          page,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST: Thêm phòng trọ mới
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validated = PhongTroSchema.safeParse(data);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors },
        { status: 400 }
      );
    }

    const newPhongTro = await prisma.phongTro.create({
      data: validated.data,
    });

    return NextResponse.json({ newPhongTro }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// PUT: Cập nhật nhiều phòng trọ
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const validated = PhongTroSchema.safeParse(data);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors },
        { status: 400 }
      );
    }

    await prisma.phongTro.updateMany({
      data: validated.data,
    });

    return NextResponse.json(
      { message: "Đã cập nhật thành công." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// DELETE: Xóa toàn bộ phòng trọ
export async function DELETE(req: NextRequest) {
  try {
    await prisma.phongTro.deleteMany();
    return NextResponse.json(
      { message: "Đã xóa thành công." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// import { prisma } from "@/prisma/client";
// import { Prisma } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// // http://localhost:3000/api/phongtro?diaChi=Da Nang&tenPhong=bbbbbbbb&tang=9&kichThuoc>5

// // Schema validate dữ liệu phòng trọ
// const PhongTroSchema = z.object({
//   tenPhong: z.string().min(3),
//   tang: z.number().int().positive(),
//   kichThuoc: z.number().positive(),
//   giaPhong: z.number().positive(),
//   soNguoiToiDa: z.number().int().positive(),
//   ToaNhaId: z.number().int().positive(),
// });

// // {
// //   "tenPhong": "aaaaaaaaa",
// //   "tang": 9,
// //   "kichThuoc": 8,
// //   "giaPhong": 1000000,
// //   "soNguoiToiDa": 8,
// //   "ToaNhaId": 2
// // }

// // export async function GET(req: NextRequest) {
// //   const { searchParams } = new URL(req.url);
// //   const limit: number = Number(searchParams.get("limit")) || 10;
// //   const page: number = Number(searchParams.get("page")) || 1;
// //   const totalRecords: number = await prisma.phongTro.count();
// //   const totalPages = Math.ceil(totalRecords / limit);
// //   const phongtro = await prisma.phongTro.findMany({
// //     skip: (page - 1) * limit,
// //     take: limit,
// //   });

// //   const tenPhong = searchParams.get("tenPhong");
// //   const tang = searchParams.get("tang");
// //   const kichThuocMin = searchParams.get("kichThuocMin");
// //   const kichThuocMax = searchParams.get("kichThuocMax");
// //   const giaPhongMin = searchParams.get("giaPhongMin");
// //   const giaPhongMax = searchParams.get("giaPhongMax");
// //   const soNguoiToiDa = searchParams.get("soNguoiToiDa");
// //   const toaNhaId = searchParams.get("toaNhaId");
// //   const diaChi = searchParams.get("diaChi");

// //   try {
// //     const phongtro = await prisma.phongTro.findMany({
// //       where: {
// //         ...(tenPhong && {
// //           tenPhong: {
// //             contains: tenPhong,
// //           } as Prisma.StringFilter,
// //         }),
// //         tang: tang ? Number(tang) : undefined,
// //         kichThuoc:
// //           kichThuocMin || kichThuocMax
// //             ? {
// //                 gte: kichThuocMin ? Number(kichThuocMin) : undefined,
// //                 lte: kichThuocMax ? Number(kichThuocMax) : undefined,
// //               }
// //             : undefined,
// //         giaPhong:
// //           giaPhongMin || giaPhongMax
// //             ? {
// //                 gte: giaPhongMin ? Number(giaPhongMin) : undefined,
// //                 lte: giaPhongMax ? Number(giaPhongMax) : undefined,
// //               }
// //             : undefined,
// //         soNguoiToiDa: soNguoiToiDa ? Number(soNguoiToiDa) : undefined,
// //         ToaNhaId: toaNhaId ? Number(toaNhaId) : undefined,
// //         ...(diaChi && {
// //           ToaNha: {
// //             diaChi: {
// //               contains: diaChi,
// //             },
// //           },
// //         }),
// //       },
// //       include: {
// //         ToaNha: true,
// //       },
// //     });

// //     return NextResponse.json(
// //       {
// //         data: phongtro,
// //         extraInfo: {
// //           totalRecords,
// //           totalPages,
// //           page,
// //           limit,
// //         },
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     return NextResponse.json({ error: String(error) }, { status: 500 });
// //   }
// // }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);

//   const limit = Number(searchParams.get("limit")) || 10;
//   const page = Number(searchParams.get("page")) || 1;

//   const tenPhong = searchParams.get("tenPhong");
//   const tang = searchParams.get("tang");
//   const kichThuocMin = searchParams.get("kichThuocMin");
//   const kichThuocMax = searchParams.get("kichThuocMax");
//   const giaPhongMin = searchParams.get("giaPhongMin");
//   const giaPhongMax = searchParams.get("giaPhongMax");
//   const soNguoiToiDa = searchParams.get("soNguoiToiDa");
//   const toaNhaId = searchParams.get("toaNhaId");
//   const diaChi = searchParams.get("diaChi");

//   const whereFilter: Prisma.PhongTroWhereInput = {
//     ...(tenPhong && {
//       tenPhong: {
//         contains: tenPhong,
//       } as Prisma.StringFilter,
//     }),
//     tang: tang ? Number(tang) : undefined,
//     kichThuoc:
//       kichThuocMin || kichThuocMax
//         ? {
//             gte: kichThuocMin ? Number(kichThuocMin) : undefined,
//             lte: kichThuocMax ? Number(kichThuocMax) : undefined,
//           }
//         : undefined,
//     giaPhong:
//       giaPhongMin || giaPhongMax
//         ? {
//             gte: giaPhongMin ? Number(giaPhongMin) : undefined,
//             lte: giaPhongMax ? Number(giaPhongMax) : undefined,
//           }
//         : undefined,
//     soNguoiToiDa: soNguoiToiDa ? Number(soNguoiToiDa) : undefined,
//     ToaNhaId: toaNhaId ? Number(toaNhaId) : undefined,
//     ...(diaChi && {
//       ToaNha: {
//         diaChi: {
//           contains: diaChi,
//         },
//       },
//     }),
//   };

//   try {
//     const totalRecords = await prisma.phongTro.count({
//       where: whereFilter,
//     });

//     const totalPages = Math.ceil(totalRecords / limit);

//     const phongtro = await prisma.phongTro.findMany({
//       where: whereFilter,
//       include: {
//         ToaNha: true,
//       },
//       skip: (page - 1) * limit,
//       take: limit,
//     });

//     return NextResponse.json(
//       {
//         data: phongtro,
//         extraInfo: {
//           totalRecords,
//           totalPages,
//           page,
//           limit,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }

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
