import React from "react";
import { BriefcaseBusiness } from "lucide-react";

const SidebarHeader = () => {
  return (
    <div className="w-full flex justify-center items-center mt-[10px]">
      <a href="#" className="flex items-center">
        <BriefcaseBusiness className="w-7 h-7 mr-[10px] text-green-600 " />
        <span className="text-2xl ">Dashboard</span>
      </a>
    </div>
  );
};

export default SidebarHeader;
