import { ColumnDef } from "@tanstack/react-table";
import { PhongTroRecordType } from "@/types/phongtro-record";

export const phongTroColumns: ColumnDef<PhongTroRecordType>[] = [
  {
    header: "Mã phòng",
    accessorKey: "id",
  },
  {
    header: "Tên phòng",
    accessorKey: "tenPhong",
  },
  {
    header: "Tầng",
    accessorKey: "tang",
  },
  {
    header: "Kích thước (m²)",
    accessorKey: "kichThuoc",
  },
  {
    header: "Giá phòng (VND)",
    accessorKey: "giaPhong",
  },
  {
    header: "Số người tối đa",
    accessorKey: "soNguoiToiDa",
  },
  {
    header: "Tòa nhà",
    accessorKey: "ToaNha.tenToaNha",
  },
  {
    header: "Địa chỉ",
    accessorKey: "ToaNha.diaChi",
  },
];
