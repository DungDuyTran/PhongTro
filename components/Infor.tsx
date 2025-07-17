"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Infor = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <section className=" p-6 space-y-4">
      <p className="text-black" data-aos="zoom-in">
        Hệ thống phòng trọ có nhiều cơ sở: Đà Nẵng - Đăk Nông - Hà Nội ...
      </p>
      <p className="text-black" data-aos="zoom-in">
        Khu trọ cung cấp môi trường sống an ninh, sạch sẽ và tiện nghi cho người
        thuê trọ tại khu vực thành phố.
      </p>
      <ul
        className="list-disc list-inside text-gray-800 space-y-1"
        data-aos="zoom-in"
      >
        <li>Tổng số phòng: 20 phòng</li>
        <li>Phòng có gác: 10 phòng</li>
        <li>Diện tích trung bình: 20 - 35m²</li>
        <li>WC riêng, giờ giấc tự do, có camera an ninh</li>
        <li>Gần trường học, chợ, khu công nghiệp</li>
        <li>Hỗ trợ đăng ký tạm trú, tạm vắng cho người thuê</li>
        <li>Cùng nhiều phúc lợi khác...</li>
      </ul>
    </section>
  );
};

export default Infor;
