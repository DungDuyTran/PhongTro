"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "@/components/Carousel";
import Infor from "@/components/Infor";

const Contents = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div data-aos="zoom-out-right">
          <Infor />
        </div>

        <div data-aos="zoom-out-left">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Contents;
