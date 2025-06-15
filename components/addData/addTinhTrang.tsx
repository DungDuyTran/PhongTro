"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { error } from "console";
import { ok } from "assert";
import { FileVideo } from "lucide-react";

const PhongTroTinhTrangSchema = z.object({
  PhongTroId: z.number().int().positive(),
  TinhTrangPhongId: z.number().int().positive(),
});

type FormData = z.infer<typeof PhongTroTinhTrangSchema>;

const addTinhTrang = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(PhongTroTinhTrangSchema) });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/phongtro_tinhtrangphong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Thêm tinh trang phong thành công");
        router.push("dashboard/tinhtrang");
      } else {
        alert("Thêm thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("loi server");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen text-white bg-[#0D121F] flex justify-center items-center"></div>
  );
};

export default addTinhTrang;
