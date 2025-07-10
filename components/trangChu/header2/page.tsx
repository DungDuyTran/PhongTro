import React from "react";
import {
  HouseIcon,
  ReceiptCent,
  ReceiptText,
  Bell,
  MessageCircleCode,
  LayoutGrid,
  Wrench,
  MessageCircleMore,
  Zap,
} from "lucide-react";

const Header2 = () => {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="flex items-center gap-7 text-black  font-medium  ">
        <a
          href="#"
          className="flex items-center gap-1 hover:text-green-700 hover:bg-white "
        >
          <LayoutGrid /> Trang chủ
        </a>
        <a
          href="./fe/phongThue"
          className="flex items-center gap-1 hover:text-green-700 "
        >
          <HouseIcon /> Phòng thuê
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-green-700 ">
          <ReceiptCent /> Hóa đơn
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-green-700 ">
          <ReceiptText /> Hợp đồng
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-green-700 ">
          <Zap /> Điện - Nước
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-green-700 ">
          <Wrench /> Sửa chữa
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-green-700 ">
          <MessageCircleMore /> Phản hồi
        </a>
      </div>
    </div>
  );
};

export default Header2;
