"use client";

interface TOverAll {
  date: string;
  world_name: string;
  ranking: number;
  character_name: string;
  character_level: number;
  character_exp: number;
  class_name: string;
  sub_class_name: string;
  character_popularity: number;
  character_guildname: string;
}

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import arrowUp from "@/assets/images/arrow_up.svg";
import arrowDown from "@/assets/images/arrow_down.svg";

import { calToday } from "../_utils/calculateDay";
import Link from "next/link";

export default function RankingItem({ title }: { title: string }) {
  const today = calToday();
  const [isShow, setIsShow] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["overall", selected],
    queryFn: () =>
      axios.get(`/rank/overall`, {
        params: {
          date: today,
          world_name: selected,
        },
      }),
  });

  return (
    <>
      <nav className="mt-20 pb-6 flex-between border-b-[1px] border-white">
        <h4 className="text-2xl">{title}</h4>
        {isShow ? (
          <Image
            onClick={() => {
              setIsShow(false);
            }}
            src={arrowUp}
            alt="아코디언 닫기 버튼"
            width={18}
            height={10}
          />
        ) : (
          <Image
            onClick={() => {
              setIsShow(true);
            }}
            src={arrowDown}
            alt="아코디언 열기 버튼"
            width={18}
            height={10}
          />
        )}
      </nav>
      {isShow && (
        <>
          <div className="flex-between mt-8 mb-4">
            <div>
              <button
                onClick={(e) => {
                  setSelected(null);
                }}
                className={!selected ? "selected-btn" : "none-seleceted-btn"}
              >
                전체
              </button>
              <button
                onClick={(e) => {
                  setSelected(e.currentTarget.textContent);
                }}
                className={
                  selected === "루나" ? "selected-btn" : "none-seleceted-btn"
                }
              >
                루나
              </button>
              <button
                onClick={(e) => {
                  setSelected(e.currentTarget.textContent);
                }}
                className={
                  selected === "스카니아"
                    ? "selected-btn"
                    : "none-seleceted-btn"
                }
              >
                스카니아
              </button>
              <button
                onClick={(e) => {
                  setSelected(e.currentTarget.textContent);
                }}
                className={
                  selected === "엘리시움"
                    ? "selected-btn"
                    : "none-seleceted-btn"
                }
              >
                엘리시움
              </button>
              <button
                onClick={(e) => {
                  setSelected(e.currentTarget.textContent);
                }}
                className={
                  selected === "리부트" ? "selected-btn" : "none-seleceted-btn"
                }
              >
                리부트
              </button>
            </div>
            <button className="none-seleceted-btn mr-0">
              <Link href={"/"}>더보기</Link>
            </button>
          </div>
          <section>
            <table className="w-full text-center">
              <thead>
                <tr className="bg-zinc-600 h-12 border-t-[1px] border-b-[1px] border-zinc-500">
                  <td>#</td>
                  <td>캐릭터</td>
                  <td>레벨</td>
                  <td>직업</td>
                  <td>길드</td>
                </tr>
              </thead>
              <tbody>
                {
                  <>
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="text-left h-12">
                          로딩 중입니다.
                        </td>
                      </tr>
                    ) : (
                      data?.data.ranking.slice(0, 10).map((elem: TOverAll) => {
                        return (
                          <tr
                            key={elem.ranking}
                            className="h-12 border-b-[1px] border-zinc-500"
                          >
                            <td>{elem.ranking}</td>
                            <td>{elem.character_name}</td>
                            <td>{elem.character_level}</td>
                            <td>
                              {elem.sub_class_name
                                ? elem.sub_class_name
                                : elem.class_name}
                            </td>
                            <td>
                              {elem.character_guildname
                                ? elem.character_guildname
                                : "-"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </>
                }
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );
}
