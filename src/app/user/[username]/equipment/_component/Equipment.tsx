"use client";

import { useState } from "react";
import { TEquipment, TEquipmentDetail } from "@/app/_types/data";
import Tooltip from "@/app/_components/common/Tooltip";
import Star from "@/app/_components/Star/Star";

interface Props {
  data: TEquipment;
}

const equipmentInfo = [
  {
    id: 0,
    name: "STR",
    key: "str",
  },
  {
    id: 1,
    name: "DEX",
    key: "dex",
  },
  {
    id: 2,
    name: "INT",
    key: "int",
  },
  {
    id: 3,
    name: "LUK",
    key: "luk",
  },
  {
    id: 4,
    name: "STR",
    key: "str",
  },
  {
    id: 5,
    name: "공격력",
    key: "attack_power",
  },
  {
    id: 6,
    name: "마력",
    key: "magic_power",
  },
  {
    id: 7,
    name: "방어력",
    key: "armor",
  },
];

function DetailEquipment({ elem }: { elem: TEquipmentDetail }) {
  return (
    <div className="w-60 min-h-12 text-sm">
      <div className="ml-4">
        <Star starNum={Number(elem.starforce)} />
      </div>
      <div className="font-bold text-lg flex flex-wrap justify-center w-full">
        <span>{elem.item_name}</span> <span>(+{elem.scroll_upgrade})</span>
      </div>
      <div className="text-center mb-4 border-b-[1px] border-solid border-gray-600 pb-3">
        ({elem.potential_option_grade || "일반"} 장비)
      </div>
      <div className="flex items-center pb-2 border-b-[1px] border-solid border-gray-600 mb-2 ">
        <img
          src={elem.item_icon}
          alt={elem.item_name}
          className="w-12 h-12 mr-2"
        />
        <span>REQ LEV : {elem.item_base_option.base_equipment_level}</span>
      </div>
      <div>
        <div>장비분류 : {elem.item_equipment_part}</div>
        <div className="border-b-[1px] border-solid border-gray-600 pb-2 mb-2">
          <div>
            {equipmentInfo.map(({ id, name, key }) => (
              <div key={id}>
                <span className="text-cyan-500">
                  {name}+{elem.item_total_option[key]} {"  "}
                </span>
                (<span>{elem.item_base_option[key]}</span>
                <span className="text-green-300">
                  {elem.item_add_option[key] !== "0" && (
                    <span>+{elem.item_add_option[key]}</span>
                  )}
                </span>
                <span className="text-purple-400">
                  {elem.item_etc_option[key] !== "0" && (
                    <span>+{elem.item_etc_option[key]}</span>
                  )}
                </span>
                <span className="text-orange-300">
                  {elem.item_starforce_option[key] !== "0" && (
                    <span>+{elem.item_starforce_option[key]}</span>
                  )}
                </span>
                )
              </div>
            ))}
            <div>
              몬스터 방어률 무시 : +
              {elem.item_total_option.ignore_monster_armor}%
            </div>
            <div className="w-full flex flex-wrap">
              업그레이드 가능 횟수 : {elem.scroll_upgradeable_count}
              <span className="text-orange-300">
                ( 복구 가능 횟수 : {elem.scroll_resilience_count} )
              </span>
            </div>
            <div>{elem.golden_hammer_flag === "1" && "황금망치 재련 적용"}</div>
            <div className="text-orange-300">
              {elem.cuttable_count !== String(0) &&
                elem.cuttable_count !== String(255) &&
                `가위 재련 가능 횟수 : ${elem.cuttable_count}`}
            </div>
          </div>
        </div>
      </div>
      <div>
        {elem.potential_option_1 && (
          <>
            <div className="text-green-300">잠재 옵션</div>
            <ul className="text-wrap border-b-[1px] border-solid border-gray-600 pb-2 mb-2">
              <li>{elem.potential_option_1}</li>
              <li>{elem.potential_option_2}</li>
              <li>{elem.potential_option_3}</li>
            </ul>
          </>
        )}
        {elem.additional_potential_option_1 && (
          <>
            <div className="text-green-300">에디셔녈 잠재 옵션</div>
            <ul className="text-wrap">
              <li>{elem.additional_potential_option_1}</li>
              <li>{elem.additional_potential_option_2}</li>
              <li>{elem.additional_potential_option_3}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default function Equipment({ data }: Props) {
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
        {data[`item_equipment_preset_${preset}`].length === 0 ? (
          <>데이터가 없습니다.</>
        ) : (
          data[`item_equipment_preset_${preset}`].map((elem) => (
            <div key={elem.item_name}>
              <Tooltip show={<DetailEquipment elem={elem} />}>
                <div className="flex flex-col flex-center">
                  <img
                    src={elem.item_icon}
                    alt={elem.item_name}
                    className="w-14 h-14"
                  />
                  <div>
                    <h4 className="text-gray-400 w-20 text-center text-nowrap text-ellipsis break-all overflow-hidden">
                      {elem.item_name}
                    </h4>
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
