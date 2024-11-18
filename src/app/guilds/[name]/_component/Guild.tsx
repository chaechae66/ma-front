"use client";

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";

interface Props {
  guild: string;
}

export default function Guild({ guild }: Props) {
  const fame = [
    { level: 1, fame: 15000 },
    { level: 2, fame: 45000 + 15000 },
    { level: 3, fame: 75000 + 60000 },
    { level: 4, fame: 105000 + 135000 },
    { level: 5, fame: 135000 + 240000 },
    { level: 6, fame: 165000 + 375000 },
    { level: 7, fame: 195000 + 540000 },
    { level: 8, fame: 225000 + 735000 },
    { level: 9, fame: 255000 + 960000 },
    { level: 10, fame: 285000 + 1215000 },
    { level: 11, fame: 315000 + 1500000 },
    { level: 12, fame: 345000 + 1815000 },
    { level: 13, fame: 375000 + 2160000 },
    { level: 14, fame: 405000 + 2535000 },
    { level: 15, fame: 435000 + 2940000 },
    { level: 16, fame: 465000 + 3375000 },
    { level: 17, fame: 496000 + 3840000 },
    { level: 18, fame: 525000 + 4335000 },
    { level: 19, fame: 555000 + 4860000 },
    { level: 20, fame: 585000 + 5415000 },
    { level: 21, fame: 615000 + 6000000 },
    { level: 22, fame: 645000 + 6615000 },
    { level: 23, fame: 675000 + 7260000 },
    { level: 24, fame: 705000 + 7935000 },
    { level: 25, fame: 3888000 + 8640000 },
    { level: 26, fame: 5637600 + 12528000 },
    { level: 27, fame: 8174520 + 18165600 },
    { level: 28, fame: 11853050 + 26340120 },
    { level: 29, fame: 30554530 + 38193170 },
  ];
  const [world, setWorld] = useState("엘리시움");
  const { data: worldName } = useQuery({
    queryKey: ["worldName"],
    queryFn: async () => {
      return axios.get(`/guild/world-info`).then((data) => data.data);
    },
  });
  const {
    data: guildinfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guild", guild, world],
    queryFn: async () => {
      return axios
        .get(`/guild/basic-info`, {
          params: {
            guild_name: decodeURIComponent(guild),
            world_name: world,
          },
        })
        .then((data) => data.data.result);
    },
  });

  const totalFame = fame.filter(
    (elem) => elem.level === guildinfo?.guild_level
  )[0]?.fame;

  if (isLoading) {
    return <>로딩 중입니다.</>;
  }

  if (
    ((error as AxiosError)?.response?.data as unknown as { result: string })
      ?.result === "Invalid Guild ID"
  ) {
    return (
      <>
        <div className="mb-4">
          {worldName?.world.sort().map((elem: string) => (
            <button
              key={elem}
              className={`${
                world === elem ? "selected-btn" : "none-seleceted-btn"
              } mb-2`}
              onClick={(e) => {
                setWorld(elem);
              }}
            >
              {elem}
            </button>
          ))}
        </div>
        <div>길드 정보가 없습니다.</div>
      </>
    );
  }

  if (error) {
    return <>에러가 발생하였습니다 {error.message}</>;
  }

  return (
    <>
      <div className="mb-4">
        {worldName?.world.sort().map((elem: string) => (
          <button
            key={elem}
            className={`${
              world === elem ? "selected-btn" : "none-seleceted-btn"
            } mb-2`}
            onClick={(e) => {
              setWorld(elem);
            }}
          >
            {elem}
          </button>
        ))}
      </div>
      <section>
        <h3 className="text-xl">길드 정보</h3>
        <hr />
        {
          <div>
            <div className="mt-6 flex">
              <h4 className="mr-4 text-gray-400">길드명</h4>
              <span>{guildinfo?.guild_name}</span>
            </div>
            <div className="mt-2 flex">
              <h4 className="mr-4 text-gray-400">레벨</h4>
              <span>{guildinfo?.guild_level}</span>
            </div>
            <div className="mt-2 flex">
              <h4 className="mr-4 text-gray-400">길드 명성</h4>
              <div className="w-3/4 bg-slate-500 h-1 self-center relative">
                <div
                  className={`absoult h-1 bg-cyan-500 top-0 z-10`}
                  style={{
                    width: (guildinfo?.guild_fame / totalFame) * 100 + "%",
                  }}
                ></div>
              </div>
            </div>
            <div className="mt-2 flex">
              <h4 className="mr-4 text-gray-400">길드 포인트</h4>
              <span>{guildinfo?.guild_point}</span>
            </div>
            <div className="mt-2 flex">
              <h4 className="mr-4 text-gray-400">길드 인원수</h4>
              <span>{guildinfo?.guild_member_count}</span>
            </div>
            <div className="mt-6">
              <h4 className="mr-4 text-gray-400 mb-2">길드 멤버</h4>
              <div className="grid grid-cols-4">
                {guildinfo?.guild_member.map((elem: string) => (
                  <div className="mb-1" key={elem}>
                    {elem}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </section>
    </>
  );
}
