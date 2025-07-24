"use client";
import { useEffect, useState } from "react";
import { User, MessageCircle, Bell } from "lucide-react";

export default function ThongBaoChuong() {
  const [dsThongBao, setDsThongBao] = useState<any[]>([]);
  const [hienThi, setHienThi] = useState(false);

  useEffect(() => {
    const fetchThongBao = async () => {
      const res = await fetch("/api/phanhoi?trangThai=false");
      const { data } = await res.json();
      setDsThongBao(data || []);
    };

    fetchThongBao();
    const interval = setInterval(fetchThongBao, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setHienThi(!hienThi)}>
        <Bell />
        {dsThongBao.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {dsThongBao.length}
          </span>
        )}
      </button>

      {hienThi && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-700 shadow-lg border rounded p-2 z-50 max-h-96 overflow-y-auto">
          {dsThongBao.length === 0 ? (
            <div className="text-gray-500">Không có phản hồi mới</div>
          ) : (
            dsThongBao.map((tb, index) => (
              <div key={index} className="border-b py-2">
                <div className="flex items-center gap-2 text-green-500 font-medium">
                  <User className="w-6 h-6 ml-2 mr-2" />
                  <span>{tb.KhachHang?.hoTen}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-100">
                  <MessageCircle className="w-6 h-6 ml-2 mr-2" />
                  <span>{tb.noiDung}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
