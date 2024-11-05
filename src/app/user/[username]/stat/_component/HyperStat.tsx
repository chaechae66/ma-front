"use client";

interface Props {
  data: THyperData;
}

import { THyperData } from "@/app/_types/data";

import { useState } from "react";

export default function HyperStat({ data }: Props) {
  const [preset, setPreset] = useState<number>(1);
  return (
    <>
      <div className="mt-4 mb-2">
        현재 <b>프리셋{preset}</b>을/를 이용 중입니다.
      </div>
      <div className="pb-4 mb-4">
        남는 포인트 : <b>{data.use_available_hyper_stat}</b>
      </div>
      <div>
        <button
          onClick={() => {
            setPreset(1);
          }}
          className={`${preset === 1 && "selected-btn"} none-seleceted-btn`}
        >
          프리셋 1
        </button>
        <button
          onClick={() => {
            setPreset(2);
          }}
          className={`${preset === 2 && "selected-btn"} none-seleceted-btn`}
        >
          프리셋 2
        </button>
        <button
          onClick={() => {
            setPreset(3);
          }}
          className={`${preset === 3 && "selected-btn"} none-seleceted-btn`}
        >
          프리셋 3
        </button>
      </div>
      <div className="mt-8 mb-2">
        남는 포인트 : {data[`hyper_stat_preset_${preset}_remain_point`]}
      </div>
      <hr />
      <div className="grid grid-cols-3 border-b-[1px] border-solid border-gray-500">
        {data[`hyper_stat_preset_${preset}`].map(
          ({ stat_type, stat_point, stat_level, stat_increase }, index) => {
            if (index > 14) {
              return (
                <div key={stat_type} className="pt-1 pb-2">
                  <div className="text-gray-400 pt-2">{stat_type}</div>
                  <div>Point : {stat_point || "없음"}</div>
                  <div>Lv. {stat_level}</div>
                  <div>상승력 : {stat_increase || "없음"}</div>
                </div>
              );
            }

            return (
              <div
                key={stat_type}
                className="border-b-[1px] border-solid border-gray-500 pt-1 pb-2"
              >
                <div className="text-gray-400 pt-2">{stat_type}</div>
                <div>Point : {stat_point || "없음"}</div>
                <div>Lv. {stat_level}</div>
                <div>상승력 : {stat_increase || "없음"}</div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}
