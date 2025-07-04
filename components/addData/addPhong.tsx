"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const schema = z.object({
  tenPhong: z.string().min(3),
  tang: z.number().int().positive(),
  kichThuoc: z.number().positive(),
  giaPhong: z.number().positive(),
  soNguoiToiDa: z.number().int().positive(),
  ToaNhaId: z.number().int().positive(),
});

type FormData = z.infer<typeof schema>;

const AddPhongForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(false);

  // Nếu có id => lấy thông tin phòng để sửa
  useEffect(() => {
    if (id) {
      fetch(`/api/phongtro/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const phong = data.data;
          setValue("tenPhong", phong.tenPhong);
          setValue("tang", phong.tang);
          setValue("kichThuoc", phong.kichThuoc);
          setValue("giaPhong", phong.giaPhong);
          setValue("soNguoiToiDa", phong.soNguoiToiDa);
          setValue("ToaNhaId", phong.ToaNhaId); // bạn phải đảm bảo API trả về có ToaNhaId
        });
    }
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(id ? `/api/phongtro/${id}` : `/api/phongtro`, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert(id ? "Cập nhật thành công!" : "Thêm phòng thành công!");
        router.push("/dashboard/phongtro");
      } else {
        alert("Thao tác thất bại!");
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
        <h1 className="text-2xl font-bold mb-4">
          {id ? "Chỉnh sửa Phòng Trọ" : "Thêm Phòng Trọ"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            className="w-[200px] bg-green-700 hover:bg-green-600 text-white mr-[70px] ml-[80px]"
          >
            {loading
              ? id
                ? "Đang cập nhật..."
                : "Đang thêm..."
              : id
              ? "Cập nhật"
              : "Thêm phòng"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/phongtro")}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            Quay lại
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPhongForm;
