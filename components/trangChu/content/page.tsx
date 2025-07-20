"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "@/components/Carousel";
import Infor from "@/components/Infor";
import Header2 from "../header2/page";
import Footer from "@/components/Footer";
import FooterTC from "../footer/page";
import Image from "@/components/Image";
import MenuTC from "../menu/page";

const Contents = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="p-4">
      <div>
        <Header2 />
      </div>
      <div>
        <div className="mt-7 ">
          <h1
            className="text-4xl text-green-700 flex justify-center mb-6"
            data-aos="fade-up"
          >
            GIỚI THIỆU VỀ PHÒNG TRỌ
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 space-x-5">
            <div>
              <Infor />
            </div>
            <div data-aos="zoom-in">
              <img
                src="/tro6.png"
                alt="anh tro"
                className=" w-full h-[400px] rounded-2xl"
              />
            </div>
          </div>
        </div>
        <h1
          className="flex justify-center text-4xl mt-8 text-green-700"
          data-aos="fade-up"
        >
          HÌNH ẢNH PHÒNG TRỌ
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
          <div data-aos="zoom-in">
            <Carousel />
          </div>
          <div>
            <Image />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <MenuTC />
      </div>
      <div className="mt-8">
        <FooterTC />
      </div>
    </div>
  );
};

export default Contents;
