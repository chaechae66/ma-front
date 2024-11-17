"use client";

import { useKeyStore } from "@/app/_store/store";
import { TCharcterList } from "@/app/_types/data";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

export default function InputAPIKey() {
  const [APIKey, setAPIKey] = useState("");

  const pathName = usePathname();
  const pathArr = pathName.split("/");
  const title = pathArr[pathName.split("/").length - 1];
  const characterName = decodeURIComponent(pathArr[2]);

  const { updateKey } = useKeyStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getCharacterName"],
    queryFn: (): Promise<boolean> =>
      axios
        .get("/character/list", {
          params: {
            user_api_key: APIKey,
          },
        })
        .then((res) => {
          return res.data.result.account_list.some((elem: TCharcterList) =>
            elem.character_list.some(
              (data) => data.character_name === characterName
            )
          );
        })
        .catch((error) => {
          if (
            error.response.data.result.error.message ===
            "The apikey is not valid."
          )
            alert("키가 유효하지 않습니다.");
          console.error(error);
        }),
    enabled: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!APIKey) {
      alert("API key를 입력해주세요");
      return;
    }
    refetch().then((data) => {
      if (!data.data) {
        alert("키가 유효하지 않습니다.");
        return;
      }
      if (data.data === true) updateKey(APIKey);
    });
    if (error) return;
  };

  return (
    <>
      <h3 className="text-center text-lg mb-4">
        {title}을 조회할려면 API key를 입력해주세요
      </h3>
      <form
        className="flex flex-center"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      >
        <input
          placeholder="API key를 입력해주세요"
          type="text"
          onChange={(e) => {
            setAPIKey(e.target.value);
          }}
          className="w-80 px-2 py-1 border-[1px] border-solid border-white rounded-l-md"
        />
        <button
          type="submit"
          className="px-2 py-1 bg-white text-gray-800 border-[1px] border-solid border-white rounded-r-md"
        >
          로그인
        </button>
      </form>
    </>
  );
}
