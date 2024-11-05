"use client";

interface Props {
  initialSkills: TDefatulSkill;
  core_data: {
    enforce_core: string[];
    skill_core: string[];
  };
}

import { useState } from "react";
import { useParams } from "next/navigation";
import Tooltip from "@/app/_components/common/Tooltip";
import { TDefatulSkill, TDetailSkill } from "@/app/_types/data";

export const DetailSkill = ({
  elem,
  remain_level,
}: {
  elem: TDetailSkill & {
    skill_effect: string | null;
  };
  remain_level: number | null;
}) => {
  return (
    <div className="w-60 min-h-12">
      <h5>{elem.skill_name}</h5>
      <div>
        현재레벨 : {elem.skill_level}{" "}
        {remain_level ? (
          <span className="text-red-400">( - {remain_level})</span>
        ) : (
          ""
        )}
      </div>
      {elem.skill_effect && (
        <>
          <br />
          <p className="text-wrap">{elem.skill_effect}</p>
        </>
      )}
      <br />
      <p className="w-full text-wrap">{elem.skill_description}</p>
      {elem.skill_effect_next && (
        <>
          <br />
          <p className="text-wrap">{elem.skill_effect_next}</p>
        </>
      )}
    </div>
  );
};

export default function AdvancementSkill({ initialSkills, core_data }: Props) {
  const [advancementLevel, setAdvancementLevel] = useState(5);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(initialSkills);
  const { username }: { username: string } = useParams();

  const changeAdvancementLevel = async (level: number) => {
    setAdvancementLevel(level);
    setLoading(true);

    const data = await fetch(
      `/character/skill-info?character_name=${decodeURIComponent(
        username
      )}&advancementLevel=${level}`
    );

    const jsonData = await data.json();

    setSkills(jsonData.result);
    setLoading(false);
  };

  return (
    <>
      <div className="mt-4">
        <button
          onClick={() => {
            changeAdvancementLevel(5);
          }}
          className={`${
            advancementLevel === 5 ? "selected-btn" : "none-seleceted-btn"
          }`}
        >
          5차 스킬
        </button>
        <button
          onClick={() => {
            changeAdvancementLevel(6);
          }}
          className={`${
            advancementLevel === 6 ? "selected-btn" : "none-seleceted-btn"
          }`}
        >
          6차 스킬
        </button>
      </div>
      <div className="grid grid-cols-5 mt-8 gap-3">
        {loading ? (
          <p>로딩 중입니다...</p>
        ) : skills.character_skill.length === 0 ? (
          <>스킬이 없습니다.</>
        ) : (
          skills.character_skill.map((elem) => {
            const remain_level = core_data.enforce_core.some(
              (core) => core == elem.skill_name
            )
              ? 60 - elem.skill_level
              : core_data.skill_core.some((core) => core == elem.skill_name)
              ? 30 - elem.skill_level
              : null;
            return (
              <div key={elem.skill_name}>
                <Tooltip
                  show={<DetailSkill elem={elem} remain_level={remain_level} />}
                >
                  <div className={`flex flex-col flex-center`}>
                    <img
                      src={elem.skill_icon}
                      alt={elem.skill_name}
                      className="w-14"
                    />
                    <div>
                      <h4 className="text-gray-400 w-20 text-center text-nowrap text-ellipsis break-all overflow-hidden">
                        {elem.skill_name}
                      </h4>
                    </div>
                  </div>
                </Tooltip>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
