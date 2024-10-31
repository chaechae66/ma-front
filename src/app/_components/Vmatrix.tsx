"use client";

import { useState } from "react";
import { TVmatrix } from "../_types/data";

export default function Vmatrix({ data }: { data: TVmatrix }) {
  const [selected, setSelected] = useState("강화코어");
  return (
    <>
      <div>
        <p className="mt-4">
          남은 포인트는{" "}
          <b>{data.character_v_matrix_remain_slot_upgrade_point}</b> 입니다.
        </p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            setSelected("강화코어");
          }}
          className={`${
            selected === "강화코어" && "selected-btn"
          } none-seleceted-btn`}
        >
          강화코어
        </button>
        <button
          onClick={() => {
            setSelected("스킬코어");
          }}
          className={`${
            selected === "스킬코어" && "selected-btn"
          } none-seleceted-btn`}
        >
          스킬코어
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-4">
        {data.character_v_core_equipment
          .filter((elem) => elem.v_core_type === selected)
          .map((elem) => (
            <div key={elem.slot_id}>
              <div className="mb-1">
                <b>{elem.v_core_name}</b> <span>Lv.{elem.slot_level}</span>
              </div>
              {elem.v_core_skill_1 && elem.v_core_skill_2 && (
                <ul>
                  <li>{elem.v_core_skill_1}</li>
                  <li>{elem.v_core_skill_2}</li>
                  <li>{elem.v_core_skill_3}</li>
                </ul>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
