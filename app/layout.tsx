import type { Metadata } from "next";
import "aos/dist/aos.css";
import "./globals.css";
import Header from "@/components/trangChu/header/page"; // Header chính

export const metadata: Metadata = {
  title: "Phòng trọ của Dũng",
  description: "Phòng Trọ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        {/* Dùng flex-col và min-h-screen để tránh tràn */}
        <main className="flex flex-col min-h-screen bg-white text-black font-bold">
          {/* Header top */}
          <div className="bg-white sticky top-0 z-40">
            <Header />
          </div>

          {/* Nội dung chính */}
          <div className="flex-grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
