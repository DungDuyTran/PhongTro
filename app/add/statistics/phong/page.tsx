"use client";
import React, { useState } from "react";
import PhongChart from "@/components/recharts/PhongChart";
import TinhTrangPhongChart from "@/components/recharts/TinhTrangPhongChart";
import { Button } from "@/components/ui/button";

const page = () => {
  const [activeTab, setActiveTab] = useState("phong");

  return (
    <div className="h-screen bg-black  ">
      <div className="pt-[20px] p-[10px] text-center ">
        <h1 className="text-green-300 text-5xl flex justify-center mb-3">
          Thống kê phòng trọ
        </h1>
        <div className="mb-3 text-xl text-white">
          <button
            className={`mr-4   ${
              activeTab === "phong"
                ? "border-green-400 text-green-400"
                : "border-transparent text-green-600"
            }`}
            onClick={() => setActiveTab("phong")}
          >
            Giá phòng
          </button>
          <button
            className={` mr-4  ${
              activeTab === "tinhtrang"
                ? "border-green-400 text-green-400"
                : "border-transparent text-green-600"
            }`}
            onClick={() => setActiveTab("tinhtrang")}
          >
            Tình trạng
          </button>
          <button
            className={` mr-4  ${
              activeTab === "tinhtrang"
                ? "border-green-400 text-green-400"
                : "border-transparent text-green-600"
            }`}
            onClick={() => setActiveTab("doanhthu")}
          >
            Doanh Thu
          </button>
        </div>

        {activeTab === "phong" && <PhongChart />}
        {activeTab === "tinhtrang" && <TinhTrangPhongChart />}
      </div>
    </div>
  );
};

export default page;
