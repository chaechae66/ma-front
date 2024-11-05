"use client";

interface Props {
  data: TCash;
}

import { useState } from "react";

import { CashItemEquipment, TCash } from "@/app/_types/data";
import Tooltip from "@/app/_components/common/Tooltip";

function DetailCash({ elem }: { elem: CashItemEquipment }) {
  const date = new Date(elem.date_option_expire);
  return (
    <div className="w-60 min-h-12 text-sm">
      <div className="font-bold text-lg flex flex-wrap justify-center w-full pb-2 border-b-[1px] border-solid border-gray-600 mb-2 ">
        {elem.cash_item_name}
        <div className="font-light text-xs w-full text-center">
          {elem.date_option_expire && (
            <div>{`옵션 만료 기간은 ${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDate()}일 ${date.getHours()}시 까지`}</div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center pb-2 border-b-[1px] border-solid border-gray-600 mb-2 ">
        <img
          src={elem.cash_item_icon}
          alt={elem.cash_item_name}
          className="w-12 h-12 mr-2 self-start"
        />
        {(elem.cash_item_description || elem.cash_item_option.length !== 0) && (
          <div className="w-44 text-wrap">
            <div>{elem.cash_item_description}</div>
            <div>
              {elem.cash_item_option.map(({ option_type, option_value }) => (
                <div key={option_type}>
                  {option_type} : {option_value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="pb-2 border-b-[1px] border-solid border-gray-600 mb-2">
        장비분류 : {elem.cash_item_equipment_part}
      </div>
    </div>
  );
}

export default function CashEquipment({ data }: Props) {
  const [preset, setPreset] = useState(1);
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
      </div>
      <div className="mt-8 grid grid-cols-5 gap-3">
        {data[`cash_item_equipment_preset_${preset}`].length === 0 ? (
          <>데이터가 없습니다.</>
        ) : (
          data[`cash_item_equipment_preset_${preset}`].map((elem) => (
            <div key={elem.cash_item_name}>
              <Tooltip show={<DetailCash elem={elem} />}>
                <div className="flex flex-col flex-center">
                  <img
                    src={elem.cash_item_icon}
                    alt={elem.cash_item_name}
                    className="w-14 h-14"
                  />
                  <div className="text-gray-400 w-20 text-center text-nowrap text-ellipsis break-all overflow-hidden">
                    {elem.cash_item_name}
                  </div>
                </div>
              </Tooltip>
            </div>
          ))
        )}
      </div>
    </>
  );
}
