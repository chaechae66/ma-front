"use client";

import { useState } from "react";
import { TStat } from "../_types/data";
import arrowDown from "../../assets/images/arrow_down.svg";
import arrowUp from "../../assets/images/arrow_up.svg";

export default function StatShow({ data }: { data: TStat[] }) {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="mb-20">
      {!isShow ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-3 mb-10">
            {data.slice(0, 6).map(({ stat_name, stat_value }) => (
              <div
                key={stat_name}
                className="border-b-[1px] border-solid border-gray-500 pt-1 pb-2"
              >
                <div className="text-gray-400 pt-2">{stat_name}</div>
                <div>{stat_value}</div>
              </div>
            ))}
          </div>
          <button
            className="none-seleceted-btn flex-center self-center"
            onClick={() => {
              setIsShow(true);
            }}
          >
            더보기
            <img src={arrowDown.src} alt="더보기버튼" className="ml-1" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="grid grid-cols-3 mb-10">
              {data.map(({ stat_name, stat_value }) => (
                <div
                  key={stat_name}
                  className="border-b-[1px] border-solid border-gray-500 pt-1 pb-2"
                >
                  <div className="text-gray-400 pt-2">{stat_name}</div>
                  <div>{stat_value}</div>
                </div>
              ))}
              <div></div>
            </div>
            <button
              className="none-seleceted-btn flex-center self-center"
              onClick={() => {
                setIsShow(false);
              }}
            >
              닫기
              <img src={arrowUp.src} alt="닫기버튼" className="ml-1" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
