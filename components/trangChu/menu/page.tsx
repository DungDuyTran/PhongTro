"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MenuTC = () => {
  const [tab, setTab] = useState("tinnoibat");

  useEffect(() => {
    AOS.init({ duration: 700, once: false });
  }, []);

  return (
    <div className="space-y-6">
      {/* MENU */}
      <div className="flex space-x-5 font-medium">
        <button
          onClick={() => setTab("tinnoibat")}
          className={`hover:text-green-700 ${
            tab === "tinnoibat" ? "text-green-700" : ""
          }`}
        >
          Tin nổi bật
        </button>
        <button
          onClick={() => setTab("camnang")}
          className={`hover:text-green-700 ${
            tab === "camnang" ? "text-green-700" : ""
          }`}
        >
          Cẩm nang
        </button>
        <button
          onClick={() => setTab("huongdan")}
          className={`hover:text-green-700 ${
            tab === "huongdan" ? "text-green-700" : ""
          }`}
        >
          Hướng dẫn
        </button>
      </div>

      {/* NỘI DUNG TỪNG TAB */}
      {tab === "tinnoibat" && (
        <div className="grid grid-cols-1 md:grid-cols-2 font-medium space-x-4">
          {/* Bên trái */}
          <div>
            <img
              src="tro1.jpg"
              alt="anh tro 1"
              className="w-full h-[400px] rounded-2xl"
              data-aos="zoom-in"
            />
            <h2 className="text-xl mt-4" data-aos="zoom-in">
              Giá thuê tại các thành phố đăng tăng cao
            </h2>
          </div>

          {/* Bên phải */}
          <div className="flex flex-col space-y-4">
            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro0"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>TPHCM: 12.000 căn trọ phải cải tạo để cho thuê</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro1"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Tân sinh viên Hà Nội sốc vì giá thuê cao</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro2"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Giá thuê tăng, người trẻ chuyển sang ngoại ô</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro3"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Nhu cầu thuê căn hộ TP.HCM tăng mạnh</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "camnang" && (
        <div className="grid grid-cols-1 md:grid-cols-2 font-medium space-x-4">
          {/* Bên trái */}
          <div>
            <img
              src="tro1.jpg"
              alt="anh tro 1"
              className="w-full h-[400px] rounded-2xl"
              data-aos="zoom-in"
            />
            <h2 className="text-xl mt-4" data-aos="zoom-in">
              Giá thuê tại các thành phố đăng tăng cao
            </h2>
          </div>

          {/* Bên phải */}
          <div className="flex flex-col space-y-4">
            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro0"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>TPHCM: 12.000 căn trọ phải cải tạo để cho thuê</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro1"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Tân sinh viên Hà Nội sốc vì giá thuê cao</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro2"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Giá thuê tăng, người trẻ chuyển sang ngoại ô</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro3"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Nhu cầu thuê căn hộ TP.HCM tăng mạnh</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "huongdan" && (
        <div className="grid grid-cols-1 md:grid-cols-2 font-medium space-x-4">
          {/* Bên trái */}
          <div>
            <img
              src="tro1.jpg"
              alt="anh tro 1"
              className="w-full h-[400px] rounded-2xl"
              data-aos="zoom-in"
            />
            <h2 className="text-xl mt-4" data-aos="zoom-in">
              Giá thuê tại các thành phố đăng tăng cao
            </h2>
          </div>

          {/* Bên phải */}
          <div className="flex flex-col space-y-4">
            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro0"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>TPHCM: 12.000 căn trọ phải cải tạo để cho thuê</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro1"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Tân sinh viên Hà Nội sốc vì giá thuê cao</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro2"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Giá thuê tăng, người trẻ chuyển sang ngoại ô</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-[130px_1fr]" data-aos="zoom-in">
              <img
                src="tro1.jpg"
                alt="anhtro3"
                className="w-[140px] h-[100px] rounded-2xl"
              />
              <div className="flex flex-col ml-5">
                <h2 className="text-gray-500">Tin nổi bật</h2>
                <h2>Nhu cầu thuê căn hộ TP.HCM tăng mạnh</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuTC;
