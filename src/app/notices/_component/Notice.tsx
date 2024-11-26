"use client";

import RankingList from "@/app/_components/RankingList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Notice() {
  const [selected, setSelected] = useState("공지");
  const selectedObj: {
    [key: string]: string;
  } = {
    공지: "notice",
    업데이트: "update",
    이벤트: "event",
    캐시샵: "cashshop",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["notice", selectedObj[selected]],
    queryFn: async () => {
      return axios
        .get(
          selectedObj[selected] === "notice"
            ? "/notice/list"
            : `/notice/${selectedObj[selected]}/list`
        )
        .then((data) =>
          data.data.result?.[
            selectedObj[selected] === "notice"
              ? "notice"
              : `${selectedObj[selected]}_notice`
          ].map(
            (
              elem: {
                url: string;
                notice_id: number;
                date: string;
                title: string;
              },
              index: number
            ) => ({ ...elem, date: elem.date.slice(0, 10), ranking: index + 1 })
          )
        );
    },
  });

  return (
    <>
      <div className="mb-4">
        <button
          onClick={(e) => {
            setSelected(e.currentTarget.textContent!);
          }}
          className={
            selected === "공지" ? "selected-btn" : "none-seleceted-btn"
          }
        >
          공지
        </button>
        <button
          onClick={(e) => {
            setSelected(e.currentTarget.textContent!);
          }}
          className={
            selected === "업데이트" ? "selected-btn" : "none-seleceted-btn"
          }
        >
          업데이트
        </button>
        <button
          onClick={(e) => {
            setSelected(e.currentTarget.textContent!);
          }}
          className={
            selected === "이벤트" ? "selected-btn" : "none-seleceted-btn"
          }
        >
          이벤트
        </button>
        <button
          onClick={(e) => {
            setSelected(e.currentTarget.textContent!);
          }}
          className={
            selected === "캐시샵" ? "selected-btn" : "none-seleceted-btn"
          }
        >
          캐시샵
        </button>
      </div>
      <RankingList
        tableTitles={[
          { title: "#", key: "ranking" },
          { title: "제목", key: "title" },
          { title: "날짜", key: "date" },
        ]}
        data={data}
      />
    </>
  );
}
