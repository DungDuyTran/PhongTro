import {
  CakeSlice,
  Calendar,
  Camera,
  CandyOff,
  AlignJustify,
  House,
  LayoutGrid,
  Award,
  Ticket,
  MessagesSquare,
  ReceiptText,
  FileClock,
  CarFront,
  Users,
  FolderClock,
  FileText,
  History,
  User,
  Sheet,
  HandCoins,
  KeyboardMusic,
  CalendarDays,
  Warehouse,
  Wrench,
  MessageCircle,
  HandHelping,
  Settings,
} from "lucide-react";

type SidebarMenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: SidebarMenuItem[];
};
export const menuItems: SidebarMenuItem[] = [
  {
    title: "Phòng Trọ",
    icon: House,
    children: [
      {
        title: "Danh Sách",
        icon: AlignJustify,
        href: "/dashboard/phongtro",
      },
      {
        title: "Tình trạng",
        icon: LayoutGrid,
        href: "/dashboard/tinhtrang",
      },
      {
        title: "Dịch vụ",
        icon: Award,
        href: "/dashboard/dichvu",
      },
      {
        title: "Khuyến mãi",
        icon: Ticket,
        href: "/dashboard/khuyenmai",
      },
      {
        title: "Đánh giá - Phản hồi",
        icon: MessagesSquare,
        href: "/dashboard/danhgiaphanhoi",
      },
    ],
  },
  {
    title: "Khách hàng",
    icon: User,
    children: [
      {
        title: "Danh sách",
        icon: AlignJustify,
        href: "/dashboard/khachhang",
      },
      {
        title: "Hóa Đơn",
        icon: ReceiptText,
        href: "/dashboard/hoadon",
      },

      {
        title: "Phương Tiện Đi Lại",
        icon: CarFront,
        href: "/dashboard/phuongtiendichuyen",
      },
      // {
      //   title: "Đánh giá - Phản hồi",
      //   icon: MessagesSquare,
      //   href: "/dashboard/danhgiaphanhoi",
      // },

      {
        title: "Lịch sử sử dụng dịch vụ",
        icon: FolderClock,
        href: "/dashboard/lichsusudungdichvu",
      },
    ],
  },
  {
    title: "Hợp đồng",
    icon: ReceiptText,
    children: [
      {
        title: "Tạo hợp đồng",
        icon: ReceiptText,
        href: "/dashboard/taohopdongkh",
      },

      {
        title: "Lịch Sử Thay Đổi Phòng",
        icon: History,
        href: "/dashboard/lichsuthaydoiphong",
      },
      {
        title: "Hợp Đồng Khách Hàng",
        icon: User,
        href: "/dashboard/hopdong",
      },
      {
        title: "Hợp Đồng Nhân Viên",
        icon: Users,
        href: "/dashboard/hopdongnhanvien",
      },
    ],
  },
  {
    title: "Nhân Viên",
    icon: Users,
    children: [
      {
        title: "Danh Sách",
        icon: AlignJustify,
        href: "/dashboard/nhanvien",
      },
      {
        title: "Bảng Chấm Công",
        icon: Sheet,
        href: "/dashboard/bangchamcong",
      },
      {
        title: "Lương",
        icon: HandCoins,
        href: "/dashboard/luong",
      },
      {
        title: "Lịch Làm Việc",
        icon: CalendarDays,
        href: "/dashboard/lichlamviec",
      },
    ],
  },
  {
    title: "Sự Cố - Thiết Bị",
    icon: KeyboardMusic,
    children: [
      {
        title: "Sự Cố",
        icon: Camera,
        href: "/dashboard/suco",
      },
      {
        title: "Thiết Bị",
        icon: KeyboardMusic,
        href: "/dashboard/thietbi",
      },
      {
        title: "Kho Thiết Bị",
        icon: Warehouse,
        href: "/dashboard/kho",
      },
      {
        title: "Lịch Sử Sữ Dụng Dịch Vụ",
        icon: History,
        href: "/dashboard/lichsusudungdichvu",
      },
      {
        title: "Sửa Chữa",
        icon: Wrench,
        href: "/dashboard/suachua",
      },
    ],
  },
  {
    title: "Chăm Sóc Khách Hàng",
    icon: HandHelping,
    children: [
      {
        title: "Thông báo Khách Hàng",
        icon: MessageCircle,
        href: "/dashboard/thongbaokhachhang",
      },
      {
        title: "Thông báo Nhân Viên",
        icon: MessageCircle,
        href: "/dashboard/thongbaonhanvien",
      },

      {
        title: "Phản Hồi Phòng Trọ",
        icon: House,
        href: "/dashboard/phanhoiphongtro",
      },
      {
        title: "Phản Hồi Nhân Viên",
        icon: MessagesSquare,
        href: "/dashboard/phanhoinhanvien",
      },
      {
        title: "Nhân Viên Chăm Sóc",
        icon: Users,
        href: "/dashboard/nhanvienchamsoc",
      },
      {
        title: "Nhân Viên Phản Hồi",
        icon: Users,
        href: "/dashboard/nhanvienphanhoi",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/setting",
    children: [],
  },
];
