"use client";

import searchIcon from "@/assets/images/search.svg";
import useDebounce from "../_hook/useDebounce";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("캐릭터");

  const goToUserPage = () => {
    if (category === "캐릭터") {
      router.push(`/user/${inputValue}/default`);
    } else if (category === "길드") {
      router.push(`/guilds/${inputValue}`);
    }
  };

  return (
    <div className="relative w-[28rem] h-12 mt-8">
      <select
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className="absolute w-28 rounded-l-full h-full px-4 border-r-[1px] border-white"
      >
        <option>캐릭터</option>
        <option>길드</option>
      </select>
      <input
        type="text"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            goToUserPage();
          }
        }}
        className="w-full h-full border-[1px] border-white rounded-full p-1 pl-32 pr-8 font-light"
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
        onClick={() => {
          goToUserPage();
        }}
      >
        <Image src={searchIcon} alt="검색버튼" width={17} height={18} />
      </button>
    </div>
  );
}
