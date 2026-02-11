import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "로또 일기 - 당신의 행운을 기록하세요",
  description: "매주 로또 번호를 감성적으로 기록하고, 당첨 여부를 자동으로 확인하세요. 희망 저금통으로 꿈도 함께 모아보세요.",
  manifest: "/manifest.json",
  openGraph: {
    title: "로또 일기 - 당신의 행운을 기록하세요",
    description: "매주 로또 번호를 감성적으로 기록하고, 당첨 여부를 자동으로 확인하세요.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#c9a84c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased">
        <div className="max-w-lg mx-auto min-h-dvh pb-20">
          {children}
        </div>
        <BottomNav />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
