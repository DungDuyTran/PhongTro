import React from "react";
import { Bell, MessageCircleCode } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between h-full px-1 mr-4">
      <div className="font-medium  flex items-center gap-5">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="h-15 w-auto ml-5 " />
        </a>
        <a href="/" className="hover:text-green-700">
          Phòng trọ
        </a>
        <a href="#" className="hover:text-green-700">
          Nhà nguyên căn{" "}
        </a>
        <a href="#" className="hover:text-green-700">
          Căn hộ
        </a>
        <a href="#" className="hover:text-green-700">
          Mặt bằng
        </a>
        <a href="#" className="hover:text-green-700">
          Tìm người ở ghép
        </a>
        <a href="#" className="hover:text-green-700">
          Tin tức
        </a>
        <a href="#" className="hover:text-green-700">
          Bảng giá
        </a>
      </div>
      <div className="flex items-center gap-3  font-medium ">
        <button className="bg-gray-200 hover:bg-gray-300 w-[100px] h-[40px] rounded-md">
          Yêu thích
        </button>
        <button className="bg-gray-200  hover:bg-gray-300  w-[100px] h-[40px] rounded-md">
          Đăng nhập
        </button>
        <button className="bg-gray-200  hover:bg-gray-300  w-[100px] h-[40px] rounded-md">
          Đăng ký
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white w-[90px] h-[40px] rounded-md">
          Đăng tin
        </button>
      </div>
    </div>
  );
};

export default Header;
