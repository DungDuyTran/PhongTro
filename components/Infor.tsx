import React from "react";

const Infor = () => {
  return (
    <section className="bg-[rgb(216,237,230)] p-6 rounded-xl shadow-md space-y-4">
      <h1 className="text-4xl font-bold text-green-700 flex justify-center">
        Giới thiệu khu trọ
      </h1>
      <p className="text-black">
        Hệ thống phòng trọ có đến 3 cơ sở: Đà Nẵng - Đăk Nông - Hà Nội
      </p>
      <p className="text-black">
        Khu trọ cung cấp môi trường sống an ninh, sạch sẽ và tiện nghi cho người
        thuê trọ tại khu vực thành phố.
      </p>
      <ul className="list-disc list-inside text-gray-800 space-y-1">
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
