"use client";

import { useState } from "react";

export default function StripeButton({
  soTien,
  hoaDonId,
}: {
  soTien: number;
  hoaDonId: number;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soTien, hoaDonId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Có lỗi xảy ra: " + data.error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      {loading ? "LOADING..." : "Thanh toán"}
    </button>
  );
}
