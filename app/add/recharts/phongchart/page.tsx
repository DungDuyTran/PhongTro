"use client";
import PhongChart from "@/components/recharts/PhongChart";
import { useRouter } from "next/navigation";

export default function AddPhongPage() {
  const router = useRouter();
  return (
    <div className="h-screen bg-black justify-center items-center">
      <div className="pt-[80px] p-[10px]">
        <PhongChart />
      </div>
    </div>
  );
}
