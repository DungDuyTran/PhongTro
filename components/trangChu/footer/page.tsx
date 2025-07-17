import React from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
const FooterTC = () => {
  return (
    <div className="relative h-[550px] w-full overflow-hidden text-white font-medium mt-6">
      {/* Ảnh nền */}
      <Image
        src="/bganh2.jpg"
        alt="Background"
        fill
        className="object-cover w-full h-full"
        priority
      />
      {/* Lớp phủ làm tối nền */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Nội dung */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 py-1 space-y-3 text-l">
        {/* Hàng 1: Danh mục */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 w-full ml-12">
          <div data-aos="fade-up-right">
            <h1 className="text-lg font-bold mb-2 text-green-500">
              PHÒNG TRỌ, NHÀ TRỌ
            </h1>
            <a href="#" className="block hover:text-green-600">
              Phòng trọ Hồ Chí Minh
            </a>
            <a href="#" className="block hover:text-green-600">
              Phòng trọ Đăk Nông
            </a>
            <a href="#" className="block hover:text-green-600">
              Phòng trọ Đà Nẵng
            </a>
            <a href="#" className="block hover:text-green-600">
              Phòng trọ Hà Nội
            </a>
            <a href="#" className="block hover:text-green-600">
              Phòng trọ Hải Phòng
            </a>
          </div>
          <div data-aos="fade-up-right">
            <h1 className="text-lg font-bold mb-2 text-green-500">
              THUÊ NHÀ NGUYÊN CĂN
            </h1>
            <a href="#" className="block hover:text-green-600">
              Thuê nhà Hồ Chí Minh
            </a>
            <a href="#" className="block hover:text-green-600">
              Thuê nhà Đăk Nông
            </a>
            <a href="#" className="block hover:text-green-600">
              Thuê nhà Đà Nẵng
            </a>
            <a href="#" className="block hover:text-green-600">
              Thuê nhà Hà Nội
            </a>
            <a href="#" className="block hover:text-green-600">
              Thuê nhà Hải Phòng
            </a>
          </div>
          <div data-aos="fade-up">
            <h1 className="text-lg font-bold mb-2 text-green-500">
              CHO THUÊ CĂN HỘ
            </h1>
            <a href="#" className="block hover:text-green-600">
              Căn hộ Hồ Chí Minh
            </a>
            <a href="#" className="block hover:text-green-600">
              Căn hộ Đăk Nông
            </a>
            <a href="#" className="block hover:text-green-600">
              Căn hộ Đà Nẵng
            </a>
            <a href="#" className="block hover:text-green-600">
              Căn hộ Hải Phòng
            </a>
          </div>
          <div data-aos="fade-left">
            <h1 className="text-lg font-bold mb-2 text-green-500">
              CHO THUÊ MẶT BẰNG
            </h1>
            <a href="#" className="block hover:text-green-600">
              Mặt bằng Hồ Chí Minh
            </a>
            <a href="#" className="block hover:text-green-600">
              Mặt bằng Đăk Nông
            </a>
            <a href="#" className="block hover:text-green-600">
              Mặt bằng Đà Nẵng
            </a>
            <a href="#" className="block hover:text-green-600">
              Mặt bằng Hà Nội
            </a>
            <a href="#" className="block hover:text-green-600">
              Mặt bằng Hải Phòng
            </a>
          </div>
          <div data-aos="fade-left">
            <h1 className="text-lg font-bold mb-2 text-green-500">
              TÌM NGƯỜI Ở GHÉP
            </h1>
            <a href="#" className="block hover:text-green-600">
              Ở ghép Hồ Chí Minh
            </a>
            <a href="#" className="block hover:text-green-600">
              Ở ghép Đăk Nông
            </a>
            <a href="#" className="block hover:text-green-600">
              Ở ghép Đà Nẵng
            </a>
            <a href="#" className="block hover:text-green-600">
              Ở ghép Hà Nội
            </a>
            <a href="#" className="block hover:text-green-600">
              Ở ghép Hải Phòng
            </a>
          </div>
        </div>

        <div className="border-t border-white/30 my-6 w-full" />

        {/* Hàng 2: 3 cột riêng biệt */}
        <div
          className="grid md:grid-cols-3 gap-3 w-full ml-18"
          data-aos="zoom-in"
        >
          {/* Cột 1: Giới thiệu */}
          <div>
            <h1 className="text-lg font-bold mb-2 text-green-500">
              VỀ PHÒNG TRỌ CỦA DŨNG
            </h1>
            <a href="#" className="block hover:text-green-600">
              Giới thiệu
            </a>
            <a href="#" className="block hover:text-green-600">
              Tầm nhìn & Sứ mệnh
            </a>
            <a href="#" className="block hover:text-green-600">
              Đội ngũ
            </a>
            <a href="#" className="block hover:text-green-600">
              Đối tác
            </a>
          </div>

          {/* Cột 2: Chính sách */}
          <div>
            <h1 className="text-lg font-bold mb-2 text-green-500">
              CHÍNH SÁCH & HỖ TRỢ
            </h1>
            <a href="#" className="block hover:text-green-600">
              Quy chế hoạt động
            </a>
            <a href="#" className="block hover:text-green-600">
              Quy định sử dụng
            </a>
            <a href="#" className="block hover:text-green-600">
              Chính sách bảo mật
            </a>
            <a href="#" className="block hover:text-green-600">
              Giải quyết khiếu nại
            </a>
          </div>

          {/* Cột 3: Liên hệ */}
          <div>
            <h1 className="text-lg font-bold mb-2 text-green-500">
              CÂU HỎI THƯỜNG GẶP
            </h1>
            <a href="#" className="block hover:text-green-600">
              Hướng dẫn đăng tin
            </a>
            <a href="#" className="block hover:text-green-600">
              Bảng giá dịch vụ
            </a>
            <a href="#" className="block hover:text-green-600">
              Quy chế đăng tin
            </a>
            <a href="#" className="block hover:text-green-600">
              phản hồi khiếu nại
            </a>
          </div>
        </div>
        {/* HÀNG 3 */}
        <div
          className="grid md:grid-cols-3 gap-3 border-t border-white/30 pt-10 text-sm ml-[150px]"
          data-aos="fade-up"
        >
          <div>
            <Image src="/logo.png" alt="Logo" width={180} height={60} />
          </div>
          <div>
            <p className="mt-2 font-semibold text-green-600 text-xl">
              CÔNG TY TNHH PHÒNG TRỌ
            </p>
            <p className="mt-1 text-white">
              11 - Nam Hiệp - Nam Đà - Krông Nô - Đăk Nông
            </p>
            <p className="mt-1">0962684418 - 0982650417</p>
          </div>

          <div>
            <h1 className="font-bold mb-2 text-green-600">LIÊN HỆ</h1>
            <p>Hỗ trợ khách hàng : Tranduydunga1@gmail.com</p>
            <p className="mt-2">
              Chăm sóc khách hàng : Tranduydunga1@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTC;
