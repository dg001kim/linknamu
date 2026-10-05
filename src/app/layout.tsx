import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

// 저장된 테마가 있으면 그 값을, 없으면 OS 설정을 따른다
const themeInitScript = `(function () {
  var theme = null;
  try { theme = localStorage.getItem("theme"); } catch (e) {}
  var dark = theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (dark) document.documentElement.classList.add("dark");
})();`;

// 한글까지 고르게 보이도록 Pretendard 가변 폰트를 직접 호스팅한다
const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: "링크나무",
  description: "내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 첫 화면이 그려지기 전에 테마를 적용해 깜빡임 방지 */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${pretendard.variable} antialiased`}
      >
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
