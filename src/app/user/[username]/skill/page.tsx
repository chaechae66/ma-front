import AdvancementSkill from "@/app/user/[username]/skill/_component/AdvancementSkill";
import LinkedSkill from "@/app/user/[username]/skill/_component/LinkedSkill";
import { TDefatulSkill, TLinkedSkill, TVmatrix } from "@/app/_types/data";
import { fetchData } from "@/app/_utils/fetchData";
import RefreshBtn from "../_component/RefreshBtn";

interface Props {
  params: {
    username: string;
  };
}

type DataTypeMap = {
  default: { result: TDefatulSkill };
  link: { result: TLinkedSkill };
  vmatrix: { result: TVmatrix };
};

type CharacterVCoreEquipment = TVmatrix["character_v_core_equipment"];

export default async function SkillPage({ params }: Props) {
  const urls = {
    default: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/skill-info?character_name=${decodeURIComponent(
      params.username
    )}&advancementLevel=5`,
    link: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/link-skill-info?character_name=${decodeURIComponent(
      params.username
    )}`,
    vmatrix: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/vmatrix-info?character_name=${decodeURIComponent(
      params.username
    )}`,
  };

  const {
    data: {
      default: defaultSkillData,
      link: linkSkillData,
      vmatrix: vmatrixData,
    },
    error,
  } = await fetchData<DataTypeMap>(urls);

  if (error?.details?.result.error.message === "Please input valid parameter") {
    return (
      <>
        <p>해당 결과가 없습니다.</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>Error {error.message}</p>
      </>
    );
  }

  const enforce_core = (
    vmatrixData.result.character_v_core_equipment as CharacterVCoreEquipment
  ).reduce((acc, cur) => {
    if (cur.v_core_type === "강화코어") {
      if (!acc.some((item) => item === cur.v_core_skill_1)) {
        acc.push(cur.v_core_skill_1);
      }
      if (!acc.some((item) => item === cur.v_core_skill_2)) {
        acc.push(cur.v_core_skill_2);
      }
      if (!acc.some((item) => item === cur.v_core_skill_3)) {
        acc.push(cur.v_core_skill_3);
      }
    }
    return acc;
  }, [] as string[]);

  const skill_core = (
    vmatrixData.result.character_v_core_equipment as CharacterVCoreEquipment
  ).reduce((acc, cur) => {
    if (cur.v_core_type === "스킬코어") {
      if (!acc.some((item) => item === cur.v_core_name)) {
        acc.push(cur.v_core_name);
      }
    }
    return acc;
  }, [] as string[]);

  const core_data = {
    enforce_core,
    skill_core,
  };

  return (
    <>
      <div className="mb-2 flex-between">
        <h3 className="text-xl">스킬</h3>
        <RefreshBtn
          paths={Object.entries(urls).map(([key, value]) =>
            value.replace(process.env.NEXT_PUBLIC_BASE_URL!, "")
          )}
        />
      </div>
      <hr />
      <AdvancementSkill
        initialSkills={defaultSkillData.result}
        core_data={core_data}
      />
      <h3 className="text-xl mt-10 mb-2">링크스킬</h3>
      <hr />
      <LinkedSkill data={linkSkillData.result} />
    </>
  );
}
