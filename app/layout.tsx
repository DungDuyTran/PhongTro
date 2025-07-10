import type { Metadata } from "next";
import "./globals.css";

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

      <body className="antialiased">{children}</body>
    </html>
  );
}
