"use client";

import { useState } from "react";

export default function ImportPhongTro() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Vui lòng chọn file Excel!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");
    setErrors([]);

    try {
      const res = await fetch("/api/phongtro/insertbulk", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Đã xảy ra lỗi khi import từ inserbulk");
        setErrors(data.errors || []);
      } else {
        setMessage(data.message || "Import thành công");
        setErrors(data.errors || []);
      }
    } catch (err) {
      setMessage("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded max-w-lg space-y-4">
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Đang xử lý..." : "Upload"}
      </button>

      {message && <p className="text-green-700">{message}</p>}

      {errors.length > 0 && (
        <div className="text-red-600 text-sm space-y-2">
          <p className="font-semibold">
            Có {errors.length} dòng dữ liệu không hợp lệ:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {errors.map((err, i) => (
              <li key={i}>
                <strong>Dòng {err.row}</strong>:{" "}
                {Object.entries(err.errors)
                  .map(
                    ([field, msgs]) =>
                      `${field} (${(msgs as string[]).join(", ")})`
                  )
                  .join("; ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
