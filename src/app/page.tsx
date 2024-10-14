import Image from "next/image";

import searchIcon from "@/assets/images/search.svg";
import MainRank from "./_components/MainRank";

export default function Home() {
  return (
    <>
      <div className=" wrap w-full h-96 relative">
        <div className="flex-center">
          <div className="mt-20">
            <h4 className="font-semibold text-3xl text-center text-white">
              메이플 스토리
              <br />
              닉네임 및 길드를 검색해주세요
            </h4>
            <div className="relative w-[28rem] h-12 mt-8">
              <select className="absolute w-28 rounded-l-full h-full px-4 border-r-[1px] border-white">
                <option>캐릭터</option>
                <option>길드</option>
              </select>
              <input
                type="text"
                className="w-full h-full border-[1px] border-white rounded-full p-1 pl-32"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                <Image src={searchIcon} alt="검색버튼" width={17} height={18} />
              </button>
            </div>
          </div>
          <div className="bg-[url('../assets/images/bg_banner01.png')] w-full h-full absolute -z-20"></div>
          <div className="from-zinc-900 bg-gradient-to-t w-full h-96 absolute -z-10"></div>
        </div>
      </div>
      <MainRank />
    </>
  );
}
