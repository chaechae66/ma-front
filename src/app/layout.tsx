import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import "./globals.css";
import searchIcon from "@/assets/images/search.svg";
import Provider from "./_components/Provider";

const notoSansKr = Noto_Sans_KR({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "메이플스토리 정보",
  description:
    "메이플스토리의 캐릭터 정보나 길드 정보를 알려주는 사이트 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={`bg-zinc-900 text-white ${notoSansKr.className} font-light`}
        >
          <div className="top-0 left-0 right-0 fixed z-10">
            <header className="h-20 bg-zinc-700 w-full wrap flex-center">
              <div className="flex-between">
                <h2>
                  <Link href={"/"} className="font-extrabold text-2xl">
                    LOGO
                  </Link>
                </h2>
                <div className="relative w-72">
                  <input
                    type="text"
                    className="w-full h-10 border-[1px] border-white rounded-full p-1 pl-4"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                    <Image
                      src={searchIcon}
                      alt="검색버튼"
                      width={15}
                      height={18}
                    />
                  </button>
                </div>
              </div>
            </header>
            <header className="h-12 bg-gray-500 wrap">
              <div className="flex items-center">
                <Link className="text-white" href={"/"} legacyBehavior={true}>
                  <a className="mr-4">메인</a>
                </Link>
                <Link
                  className="text-white mr-12"
                  href={"/rank"}
                  legacyBehavior={true}
                >
                  <a className="mr-4">랭킹</a>
                </Link>
              </div>
            </header>
          </div>
          <main className="min-h-[calc(100vh_-_theme('spacing.20'))]">
            {children}
          </main>
          <footer className="wrap h-20 bg-zinc-700">
            <div className="flex-center">
              <span>© 2024. YEON SANG, CHAE YEON Co. all rights reserved.</span>
            </div>
          </footer>
        </body>
      </Provider>
    </html>
  );
}
