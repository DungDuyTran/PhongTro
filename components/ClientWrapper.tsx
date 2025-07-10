"use client";
import { useEffect } from "react";
import React from "react";
import "aos/dist/aos.css";
import AOS from "aos";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // khởi tạo aos
  useEffect(() => {
    AOS.init({
      duration: 800, // ms
      once: false,
      offset: 100,
    });
  }, []);
  return <>{children}</>;
}
