"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import SelectedWorld from "@/app/_components/SelectedWorld";
import { calToday } from "@/app/_utils/calculateDay";
import RankingList from "./RankingList";

interface Props {
  URL: string;
  queryKey: string;
  params?: Object;
}

export default function ShowRank({ URL, queryKey, params }: Props) {
  const [world, setWorld] = useState("엘리시움");
  const [page, setPage] = useState(1);
  const [curPage, setCurPage] = useState(0);
  const {
    data: rankinfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rank", queryKey, world, page],
    queryFn: async () => {
      return axios
        .get(URL, {
          params: {
            ...params,
            date: calToday(),
            world_name: decodeURIComponent(world),
            page: page,
          },
        })
        .then((data) => data.data.result.ranking);
    },
  });

  return (
    <>
      <SelectedWorld world={world} setWorld={setWorld} />
      <RankingList
        tableTitles={[
          { title: "#", key: "ranking" },
          { title: "캐릭터", key: "character_name" },
          { title: "레벨", key: "character_level" },
          { title: "직업", key: "sub_class_name" },
          { title: "길드", key: "character_guildname" },
        ]}
        data={rankinfo?.slice(curPage, curPage + 50)}
      />
      {rankinfo?.length === 0 && <div className="mt-4">데이터가 없습니다.</div>}
      <div className="flex-between mt-4">
        <div
          className="flex-center"
          onClick={() => {
            if (rankinfo?.length === 0 || (curPage === 0 && page === 1)) {
              alert("이전 페이지는 없습니다.");
              return;
            }
            setPage((prev) => {
              if (curPage === 0) {
                setCurPage(200);
                return prev - 1;
              }
              return prev;
            });
            setCurPage((prev) => prev - 50);
          }}
        >
          <IoIosArrowBack />
          <button>이전</button>
        </div>
        <div
          className="flex-center"
          onClick={() => {
            if (rankinfo.length === 0) {
              alert("다음 페이지가 없습니다.");
              return;
            }
            setPage((prev) => {
              if (curPage !== 0 && curPage % 150 === 0) {
                setCurPage(0);
                return prev + 1;
              }
              return prev;
            });
            setCurPage((prev) => prev + 50);
          }}
        >
          <button>다음</button>
          <IoIosArrowForward />
        </div>
      </div>
    </>
  );
}
