"use client";

interface Props {
  data: TUnionRaider;
  level: number;
}

interface Position {
  x: number;
  y: number;
}

import { useState } from "react";

import { TUnionRaider } from "@/app/_types/data";
import style from "./UnionRadier.module.css";

export default function UnionRadier({ data, level }: Props) {
  const [preset, setPreset] = useState<number>(1);
  const position: Position[] = data[
    `union_raider_preset_${preset}`
  ].union_block.reduce<Position[]>((acc, cur) => {
    cur.block_position.map((elem) => {
      acc.push(elem);
    });
    return acc;
  }, []);

  const innerPos = [
    { x: -2, y: 4 },
    { x: 1, y: 4 },
    { x: 3.5, y: 2 },
    { x: 3.5, y: -1 },
    { x: 1, y: -3 },
    { x: -2, y: -3 },
    { x: -5, y: -1 },
    { x: -5, y: 2 },
  ];

  const leftPos1 = Array.from({ length: 10 }, (_, index) => ({
    x: -2 - index,
    y: 1 + index,
  }));

  const leftPos2 = Array.from({ length: 9 }, (_, index) => ({
    x: 1 + index,
    y: -(1 + index),
  }));

  const rightPos1 = Array.from({ length: 9 }, (_, index) => ({
    x: -index - 2,
    y: -index - 1,
  }));

  const rightPos2 = Array.from({ length: 10 }, (_, index) => ({
    x: index + 1,
    y: index + 1,
  }));

  const leftLinePos = [...leftPos1, ...leftPos2];

  const rightLinePos = [...rightPos1, ...rightPos2];

  const innerKey = data[`union_raider_preset_${preset}`].union_inner_stat.map(
    (elem, index) => {
      return {
        stat_field_effect: elem.stat_field_effect.slice(
          4,
          elem.stat_field_effect.length
        ),
        x: innerPos[index].x,
        y: innerPos[index].y,
      };
    }
  );

  const outerKey = [
    { outer_effect: "상태이상내성", x: -5, y: 9 },
    { outer_effect: "획득경험치", x: 3, y: 9 },
    { outer_effect: "크리티컬\n확률", x: 7, y: 5 },
    { outer_effect: "보스데미지", x: 7, y: -3.5 },
    { outer_effect: "일반데미지", x: 3, y: -8 },
    { outer_effect: "버프지속시간", x: -5, y: -8 },
    { outer_effect: "방어율무시", x: -10.5, y: -3.5 },
    { outer_effect: "크리티컬\n데미지", x: -10.5, y: 5 },
  ];

  const openedLevel = (_level: number) => {
    let levelNum = 5;

    if (_level < 2000) {
      levelNum = 0;
    } else if (Number(_level) >= 2000 && Number(_level) < 3000) {
      levelNum = 1;
    } else if (Number(_level) >= 3000 && Number(_level) < 4000) {
      levelNum = 2;
    } else if (Number(_level) >= 4000 && Number(_level) < 5000) {
      levelNum = 3;
    } else if (Number(_level) >= 5000 && Number(_level) < 6000) {
      levelNum = 4;
    }

    return levelNum;
  };

  const characterJobs = data[`union_raider_preset_${preset}`].union_block.map(
    (elem) => ({
      block_class: elem.block_class,
      block_level: elem.block_level,
    })
  );

  return (
    <>
      <div className="mt-4">
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
        <button
          onClick={() => {
            setPreset(4);
          }}
          className={`${preset === 4 && "selected-btn"} none-seleceted-btn`}
        >
          프리셋 4
        </button>
        <button
          onClick={() => {
            setPreset(5);
          }}
          className={`${preset === 5 && "selected-btn"} none-seleceted-btn`}
        >
          프리셋 5
        </button>
      </div>
      <div className="w-full flex flex-center mt-8">
        <div
          className={`w-[22rem] h-[20rem] border-[1px] border-solid border-gray-500 relative ${style.check}`}
        >
          {position.map((elem, index) => (
            <div
              key={index}
              className={`w-4 h-4 border-[1px] border-solid border-gray-500 absolute bg-orange-200`}
              style={{
                top: 10 - elem.y + "rem",
                left: 11 + elem.x + "rem",
              }}
            ></div>
          ))}
          {innerKey.map((elem) => (
            <div
              className="absolute text-xs font-bold drop-shadow [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]"
              key={elem.stat_field_effect}
              style={{
                top: 10 - elem.y + "rem",
                left: 11 + elem.x + "rem",
              }}
            >
              {elem.stat_field_effect.includes("최대")
                ? elem.stat_field_effect.slice(3, 5)
                : elem.stat_field_effect}
            </div>
          ))}
          {outerKey.map((elem) => (
            <div
              className="absolute text-xs font-bold drop-shadow [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)] whitespace-pre text-center"
              key={elem.outer_effect}
              style={{
                top: 10 - elem.y + "rem",
                left: 11 + elem.x + "rem",
              }}
            >
              {elem.outer_effect}
            </div>
          ))}
          <div className="bg-transparent w-[12rem] h-[10rem] absolute top-[5rem] left-[5rem] border-[1px] border-solid border-gray-400"></div>
          <div className="absolute bg-transparent w-[11rem] h-[10rem] top-0 left-0 border-r-[1px] border-b-[1px] border-solid border-gray-400"></div>
          <div className="absolute bg-transparent w-[11rem] h-[10rem] top-0 left-[11rem] border-b-[1px] border-solid border-gray-400"></div>
          <div className="absolute bg-transparent w-[11rem] h-[10rem] top-[10rem] left-11rem] border-r-[1px] border-solid border-gray-400"></div>
          <div className="bg-transparent w-[2rem] h-[2rem] absolute top-[9rem] left-[10rem] border-[1px] border-solid border-gray-400"></div>
          {leftLinePos.map((elem, index) => (
            <div
              key={`${elem.x} + ${index}`}
              className={`w-4 h-4 border-r-[1px] border-t-[1px] border-gray-400 border-solid absolute`}
              style={{
                top: 10 - elem.y + "rem",
                left: 11 + elem.x + "rem",
              }}
            ></div>
          ))}
          {rightLinePos.map((elem, index) => (
            <div
              key={`${elem.y} + ${index}`}
              className={`w-4 h-4 border-t-[1px] border-l-[1px] border-gray-400 border-solid absolute`}
              style={{
                top: 10 - elem.y + "rem",
                left: 11 + elem.x + "rem",
              }}
            ></div>
          ))}
          <div
            className={`absolute ${style.shadow} ${level > 4 && "hidden"}`}
            style={{
              width: `${12 + openedLevel(level) * 2}` + "rem",
              height: `${10 + openedLevel(level) * 2}` + "rem",
              top: `${5 - openedLevel(level)}` + "rem",
              left: `${5 - openedLevel(level)}` + "rem",
              boxShadow: `0 0 0 ${
                -openedLevel(level) + 5
              }rem #00000060, 0 0 0 0 transparent`,
            }}
          ></div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-xl mb-4 font-bold">캐릭터 종류</h4>
        <div className="grid grid-cols-5">
          {characterJobs.length === 0
            ? "없음"
            : characterJobs.map((elem) => (
                <div key={elem.block_class} className="mb-3">
                  <b>{elem.block_class}</b>
                  <div className="text-gray-400">Lv.{elem.block_level}</div>
                </div>
              ))}
        </div>
      </div>
      <div className="flex mt-2 gap-4 w-full">
        <div>
          <h4 className="text-xl mb-4 font-bold">공격대원 효과</h4>
          <div className="grid grid-cols-2">
            {data[`union_raider_preset_${preset}`].union_raider_stat.length ===
            0
              ? "없음"
              : data[`union_raider_preset_${preset}`].union_raider_stat
                  .sort()
                  .map((elem, index) => (
                    <div key={elem + index} className="mt-2">
                      {elem}
                    </div>
                  ))}
          </div>
        </div>
        <div>
          <h4 className="text-xl mb-4 font-bold">공격대 점령 효과</h4>
          <div>
            {data[`union_raider_preset_${preset}`].union_occupied_stat
              .length === 0
              ? "없음"
              : data[`union_raider_preset_${preset}`].union_occupied_stat
                  .sort()
                  .map((elem, index) => (
                    <div key={elem + index} className="mt-2">
                      {elem}
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </>
  );
}
