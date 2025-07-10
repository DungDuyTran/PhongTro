// components/ui/Carousel.tsx
"use client";

import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true, // lặp vô hạn
    speed: 500, // tốc độ chuyển slide (ms)
    slidesToShow: 1, // mỗi lần hiện 1 ảnh
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // mỗi 3s đổi slide
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Slider {...settings}>
        <div>
          <img
            src="/tro1.jpg"
            alt="Ảnh 1"
            className="w-full h-100 object-cover rounded-xl"
          />
        </div>
        <div>
          <img
            src="/tro2.jpg"
            alt="Ảnh 2"
            className="w-full h-100 object-cover rounded-xl"
          />
        </div>
        {/* <div>
          <img
            src="/tro3.png"
            alt="Ảnh 3"
            className="w-full h-120 object-cover rounded-xl"
          />
        </div> */}
        <div>
          <img
            src="/tro4.jpg"
            alt="Ảnh 4"
            className="w-full h-100 object-cover rounded-xl"
          />
        </div>
        <div>
          <img
            src="/tro5.jpg"
            alt="Ảnh 5"
            className="w-full h-100 object-cover rounded-xl"
          />
        </div>
        <div>
          <img
            src="/tro6.png"
            alt="Ảnh 6"
            className="w-full h-100 object-cover rounded-xl"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
