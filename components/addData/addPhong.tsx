"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
//zodResolver giúp kết nối giữa react-hook-form và zod
//coi xong không hiểu luôn :))

const schema = z.object({
  tenPhong: z.string().min(3),
  tang: z.number().int().positive(),
  kichThuoc: z.number().positive(),
  giaPhong: z.number().positive(),
  soNguoiToiDa: z.number().int().positive(),
  ToaNhaId: z.number().int().positive(),
});

type FormData = z.infer<typeof schema>;
// lấy dữ liệu từ schemas ( không cần định nghĩa lại)

const AddPhongForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  // FormData : lấy dữ liệu từ chema
  // register : dùng để gắn các input với form
  // handleSubmit: Xữ lý khi NHẤN submit
  // errors: chưa thông tin lỗi từng trường nếu nhập sai

  const router = useRouter();
  // useRouter: dùng để chuyển trang
  const [loading, setLoading] = useState(false);
  // loading:  trạng thái đang submit form

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/phongtro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Thêm phòng thành công!");
        router.push("/dashboard/phongtro");
      } else {
        alert("Thêm thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen text-white bg-[#0D121F] flex justify-center items-center">
      <div className="p-6 max-w-xl w-full bg-[#1A1F2E] rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Thêm Phòng Trọ</h1>
        {/* giao diện form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Input placeholder="Tên phòng" {...register("tenPhong")} />
          {errors.tenPhong && (
            <p className="text-red-500">{errors.tenPhong.message}</p>
          )}
          <Input
            type="number"
            placeholder="Tầng"
            {...register("tang", { valueAsNumber: true })}
          />
          {errors.tang && <p className="text-red-500">{errors.tang.message}</p>}
          <Input
            type="number"
            placeholder="Kích thước"
            {...register("kichThuoc", { valueAsNumber: true })}
          />
          {errors.kichThuoc && (
            <p className="text-red-500">{errors.kichThuoc.message}</p>
          )}
          <Input
            type="number"
            placeholder="Giá phòng"
            {...register("giaPhong", { valueAsNumber: true })}
          />
          {errors.giaPhong && (
            <p className="text-red-500">{errors.giaPhong.message}</p>
          )}
          <Input
            type="number"
            placeholder="Số người tối đa"
            {...register("soNguoiToiDa", { valueAsNumber: true })}
          />
          {errors.soNguoiToiDa && (
            <p className="text-red-500">{errors.soNguoiToiDa.message}</p>
          )}
          <Input
            type="number"
            placeholder="ID Tòa nhà"
            {...register("ToaNhaId", { valueAsNumber: true })}
          />
          {errors.ToaNhaId && (
            <p className="text-red-500">{errors.ToaNhaId.message}</p>
          )}
          <Button
            disabled={loading}
            type="submit"
            className="w-[200px] bg-green-700  hover:bg-green-600 text-white mr-[70px] ml-[80px]"
          >
            {loading ? "Đang thêm..." : "Thêm phòng"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/phongtro")}
            className="bg-green-700 hover:bg-green-600 text-white "
          >
            Quay lại
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPhongForm;
