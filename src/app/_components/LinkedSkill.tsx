"use client";

import { useState } from "react";

import { TDetailSkill, TLinkedSkill } from "../_types/data";
import Tooltip from "./Tooltip";

interface Props {
  data: TLinkedSkill;
}

function DetailSkill({
  elem,
}: {
  elem: Omit<TDetailSkill, "skill_effect_next"> & {
    skill_effect?: string;
  };
}) {
  return (
    <div className="w-60 min-h-12">
      <h5>{elem.skill_name}</h5>
      <div>현재레벨 : {elem.skill_level}</div>
      {elem.skill_effect && (
        <>
          <br />
          <p className="text-wrap">{elem.skill_effect}</p>
        </>
      )}
      <br />
      <p className="w-full text-wrap">{elem.skill_description}</p>
    </div>
  );
}

export default function LinkedSkill({ data }: Props) {
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
      <div className="mt-8 grid grid-cols-5">
        {data[`character_link_skill_preset_${preset}`].length === 0 ? (
          <>데이터가 없습니다.</>
        ) : (
          data[`character_link_skill_preset_${preset}`].map((item) => (
            <div key={item.skill_name}>
              <Tooltip show={<DetailSkill elem={item} />}>
                <div className="flex flex-col flex-center">
                  <img
                    src={item.skill_icon}
                    alt={item.skill_name}
                    className="w-14"
                  />
                  <div>
                    <h4 className="text-gray-400 w-20 text-center text-nowrap text-ellipsis break-all overflow-hidden">
                      {item.skill_name}
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
