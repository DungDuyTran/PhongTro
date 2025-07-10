import React from "react";
import { Bell, MessageCircleCode } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between h-full px-4">
      <div data-aos="zoom-in">
        <a href="#">
          <img src="/logo.png" alt="Logo" className="h-20 w-auto ml-5 " />
        </a>
      </div>
      <div className="flex items-center gap-5 mr-[50px] font-medium ">
        <a href="#" className="flex items-center gap-1 hover:text-green-700 ">
          Thông báo
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-green-700 ">
          Hướng dẫn
        </a>
        <a href="#">
          <img src="/anh1.jpg" alt="avatar" className="w-9 h-9 rounded-full " />
        </a>
      </div>
    </div>
  );
};

export default Header;
