import AdvancementSkill from "@/app/user/[username]/skill/_component/AdvancementSkill";
import LinkedSkill from "@/app/user/[username]/skill/_component/LinkedSkill";
import { TDefatulSkill, TLinkedSkill, TVmatrix } from "@/app/_types/data";
import { fetchData } from "@/app/_utils/fetchData";

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
      default: { result: defaultSkillData },
      link: { result: linkSkillData },
      vmatrix: { result: vmatrixData },
    },
    error,
  } = await fetchData<DataTypeMap>(urls);

  const enforce_core = (
    vmatrixData.character_v_core_equipment as CharacterVCoreEquipment
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
    vmatrixData.character_v_core_equipment as CharacterVCoreEquipment
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
      <h3 className="text-xl">스킬</h3>
      <hr />
      <AdvancementSkill
        initialSkills={defaultSkillData}
        core_data={core_data}
      />
      <h3 className="text-xl mt-10">링크스킬</h3>
      <hr />
      <LinkedSkill data={linkSkillData} />
    </>
  );
}
