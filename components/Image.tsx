"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Image = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <div className="space-y-4">
          <div data-aos="zoom-in">
            <img
              src="/anhtro1.jpg"
              alt="Ảnh 1"
              className="w-full h-48 object-cover rounded-xl drop-shadow-2xl"
            />
          </div>
          <div data-aos="zoom-in">
            <img
              src="/anhtro2.jpg"
              alt="Ảnh 1"
              className="w-full h-48 object-cover rounded-xl shadow-2xl"
            />
          </div>
        </div>
        <div className="space-y-4">
          {" "}
          <div data-aos="zoom-in">
            <img
              src="/anhtro3.jpg"
              alt="Ảnh 1"
              className="w-full h-48 object-cover rounded-xl shadow-2xl"
            />
          </div>
          <div data-aos="zoom-in">
            <img
              src="/anhtro4.jpg"
              alt="Ảnh 1"
              className="w-full h-48 object-cover rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
