"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Header2 = () => {
  const [category, setCategory] = useState("Phòng trọ");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  return (
    <div className="relative h-[647px] w-full overflow-hidden mt-[-100px] mr-0 ml-0">
      <Image
        src="/anhbg.png"
        alt="Background"
        fill
        className="object-cover w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-black/20 z-0" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 flex flex-col justify-center h-full text-white mt-6">
        <div
          className="bg-[#229453]/90 backdrop-blur-md rounded-xl p-6 shadow-xl space-y-4 overflow-hidden"
          data-aos="fade-up"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-md px-4 py-3 gap-4 md:gap-0">
            <div className="flex items-center flex-grow">
              <MapPin className="text-black mr-2" />
              <input
                type="text"
                placeholder="Trên toàn quốc"
                className="flex-grow text-black bg-transparent outline-none"
              />
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 w-full md:w-auto justify-center">
              <Search size={18} /> Tìm kiếm
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="relative"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#12783e] text-white p-3 rounded-md appearance-none"
              >
                <option className="bg-white text-green-800">Phòng trọ</option>
                <option className="bg-white text-green-800">Nguyên căn</option>
                <option className="bg-white text-green-800">Căn hộ</option>
                <option className="bg-white text-green-800">Mặt bằng</option>
              </select>
              <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-white pointer-events-none" />
            </div>

            <div className="relative" data-aos="fade-up" data-aos-delay="200">
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#12783e] text-white p-3 rounded-md appearance-none"
              >
                <option value="" className="bg-white text-green-800">
                  Mức giá
                </option>
                <option className="bg-white text-green-800">
                  &lt; 1 triệu
                </option>
                <option className="bg-white text-green-800">1 - 3 triệu</option>
                <option className="bg-white text-green-800">3 - 5 triệu</option>
                <option className="bg-white text-green-800">
                  5 - 10 triệu
                </option>
                <option className="bg-white text-green-800">
                  &gt; 10 triệu
                </option>
              </select>
              <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-white pointer-events-none" />
            </div>

            <div className="relative" data-aos="fade-left" data-aos-delay="300">
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#12783e] text-white p-3 rounded-md appearance-none"
              >
                <option className="bg-white text-green-800" value="">
                  Diện tích
                </option>
                <option className="bg-white text-green-800">&lt; 15m²</option>
                <option className="bg-white text-green-800">15 - 25m²</option>
                <option className="bg-white text-green-800">25 - 35m²</option>
                <option className="bg-white text-green-800">35 - 50m²</option>
                <option className="bg-white text-green-800">&gt; 50m²</option>
              </select>
              <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-white pointer-events-none" />
            </div>
          </div>
        </div>

        <div
          className="text-center mt-12 space-y-2"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <h2 className="text-4xl md:text-4xl font-bold">
            Website đăng tin miễn phí tốt nhất Việt Nam
          </h2>
          <p className="text-xl md:text-2xl font-medium">
            Cho thuê phòng trọ, giá rẻ, tiện nghi ...
          </p>
          <Link
            href="/dang-ky"
            className="inline-block mt-4 bg-green-900 text-white text-lg px-6 py-2 rounded-full hover:scale-105 transition"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header2;
