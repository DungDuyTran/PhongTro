"use client";
import { useState } from "react";

export default function PhanHoiForm({ khachHangId }: { khachHangId: number }) {
  const [noiDung, setNoiDung] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/phanhoi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noiDung, khachHangId }),
      });

      const result = await res.json();
      if (!result.success) throw new Error("Gửi phản hồi thất bại");

      setNoiDung("");
      alert("Phản hồi đã được gửi!");
    } catch (error) {
      console.error("Lỗi gửi phản hồi:", error);
      alert("Gửi phản hồi thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 text-white ">
        <textarea
          value={noiDung}
          onChange={(e) => setNoiDung(e.target.value)}
          className="w-full h-[100px] border-2 border-gray-700 focus:border-green-500 p-2 text-black rounded-2xl outline-none"
          placeholder="Nhập nội dung phản hồi"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className=" flex justify-center items-center bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50  "
        >
          {loading ? "Đang gửi..." : "Gửi phản hồi"}
        </button>
      </form>
    </div>
  );
}
