"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TisShow, Tselected } from "../_types/props";
import { TDojang, TNotice, TOverAll } from "../_types/data";

interface TNoticeRanking extends TNotice {
  ranking: number;
}

import RankTabs from "./RankTabs";
import RankingList from "./RankingList";
import Title from "./Title";
import { calToday } from "../_utils/calculateDay";
import Link from "next/link";

export default function MainRank() {
  const [isShow, setIsShow] = useState<TisShow>({
    allRank: true,
    dojangRank: true,
    notice: true,
  });
  const [selected, setSelected] = useState<Tselected>({
    allRank: null,
    dojangRank: null,
  });

  const {
    data: allRankdata,
    isLoading: allRankIsLoading,
    error: allRankError,
  } = useQuery({
    queryKey: ["overall", selected.allRank],
    queryFn: (): Promise<TOverAll[]> =>
      axios
        .get("/rank/overall", {
          params: {
            date: calToday(),
            world_name: selected.allRank,
          },
        })
        .then((res) => res.data.ranking.slice(0, 10)),
  });

  const {
    data: dojangRankData,
    isLoading: dojangRankIsLoading,
    error: dojangRankError,
  } = useQuery({
    queryKey: ["dojang", selected.dojangRank],
    queryFn: (): Promise<TOverAll[]> =>
      axios
        .get("/rank/dojang-rank", {
          params: {
            date: calToday(),
            world_name: selected.dojangRank,
            difficulty: 1,
          },
        })
        .then((res) => {
          return res.data.ranking.slice(0, 10).map((elem: TDojang) => {
            const minutes = elem.dojang_time_record / 60;
            const seconds = elem.dojang_time_record % 60;
            return {
              ...elem,
              dojang_time_record: `${Math.floor(minutes)}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`,
            };
          });
        }),
  });

  const {
    data: noticeData,
    isLoading: noticeIsLoading,
    error: noticeError,
  } = useQuery({
    queryKey: ["notice"],
    queryFn: (): Promise<TOverAll[]> =>
      axios.get("/notice/list", {}).then((res) =>
        res.data.result.notice
          .slice(0, 10)
          .map((elem: TNotice, index: number) => ({
            ...elem,
            date: elem.date.slice(0, 10),
            ranking: index + 1,
          }))
      ),
  });

  return (
    <div className="wrap">
      <div className="mb-20">
        <Title
          title="전체 랭킹"
          isShow={isShow}
          setIsShow={setIsShow}
          type={"allRank"}
        />
        {isShow.allRank ? (
          <>
            <RankTabs
              selected={selected}
              setSelected={setSelected}
              type={"allRank"}
            />
            {allRankIsLoading ? (
              <>로딩 중입니다...</>
            ) : (
              <RankingList<TOverAll>
                tableTitles={[
                  { title: "#", key: "ranking" },
                  { title: "캐릭터", key: "character_name" },
                  { title: "레벨", key: "character_level" },
                  { title: "직업", key: "sub_class_name" },
                  { title: "길드", key: "character_guildname" },
                ]}
                data={allRankdata! as unknown as TOverAll[]}
              />
            )}
          </>
        ) : (
          <></>
        )}
        <Title
          title="무릉도장 랭킹"
          isShow={isShow}
          setIsShow={setIsShow}
          type={"dojangRank"}
        />
        {isShow.dojangRank ? (
          <>
            <RankTabs
              selected={selected}
              setSelected={setSelected}
              type={"dojangRank"}
            />
            {dojangRankIsLoading ? (
              <>로딩 중입니다...</>
            ) : (
              <RankingList<TDojang>
                tableTitles={[
                  { title: "#", key: "ranking" },
                  { title: "캐릭터", key: "character_name" },
                  { title: "레벨", key: "character_level" },
                  { title: "층수", key: "dojang_floor" },
                  { title: "기록", key: "dojang_time_record" },
                ]}
                data={dojangRankData! as unknown as TDojang[]}
              />
            )}
          </>
        ) : (
          <></>
        )}
        <Title
          title="공지"
          isShow={isShow}
          setIsShow={setIsShow}
          type={"notice"}
        />
        {isShow.notice ? (
          <>
            <div className="w-full flex justify-end">
              <button className="none-seleceted-btn mr-0 mt-8 mb-4">
                <Link href={"/"}>더보기</Link>
              </button>
            </div>
            {noticeIsLoading ? (
              <>로딩 중입니다...</>
            ) : (
              <RankingList<TNoticeRanking>
                tableTitles={[
                  { title: "#", key: "ranking" },
                  { title: "제목", key: "title" },
                  { title: "날짜", key: "date" },
                ]}
                data={noticeData! as unknown as TNoticeRanking[]}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
