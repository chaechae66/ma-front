"use client";

import { useKeyStore } from "@/app/_store/store";
import { TStarforce } from "@/app/_types/data";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Info() {
  const [startDate, setStartDate] = useState(new Date());
  const { key } = useKeyStore();

  const pathName = usePathname();
  const pathArr = pathName.split("/");
  const characterName = decodeURIComponent(pathArr[2]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["starforce"],
    queryFn: () =>
      axios
        .get("/probability/starforce", {
          params: {
            date: "2024-11-05",
            user_api_key: key,
            count: 10,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const starforce = data?.result.starforce_history.filter(
    (elem: TStarforce) => elem.character_name === characterName
  );

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date!)}
      />
      <h3 className="text-xl">스타포스 결과</h3>
      <hr />
      <div className="bg-zinc-600 h-12 border-t-[1px] border-b-[1px] border-zinc-500 grid grid-cols-4 items-center justify-items-center">
        <div>타겟 아이템</div>
        <div>전</div>
        <div>후</div>
        <div>이벤트</div>
      </div>
      {!starforce || starforce.length === 0 ? (
        <div className="mt-4">결과가 없습니다.</div>
      ) : (
        starforce?.map((elem: TStarforce) => (
          <div
            className="grid grid-cols-4 items-center justify-items-center"
            key={elem.id}
          >
            <div>{elem.target_item}</div>
            <div>{elem.before_starforce_count}</div>
            <div>{elem.after_starforce_count}</div>
            <div>{"없음"}</div>
          </div>
        ))
      )}
    </>
  );
}
