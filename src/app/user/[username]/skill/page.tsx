import AdvancementSkill from "@/app/_components/AdvancementSkill";
import LinkedSkill from "@/app/_components/LinkedSkill";
import { TDefatulSkill, TLinkedSkill } from "@/app/_types/data";
import { fetchData } from "@/app/_utils/fetchData";

interface Props {
  params: {
    username: string;
  };
}

type DataTypeMap = {
  default: { result: TDefatulSkill };
  link: { result: TLinkedSkill };
};

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
  };

  const {
    data: {
      default: { result: defaultSkillData },
      link: { result: linkSkillData },
    },
    error,
  } = await fetchData<DataTypeMap>(urls);

  console.log(666, defaultSkillData);

  return (
    <>
      <h3 className="text-xl">스킬</h3>
      <hr />
      <AdvancementSkill initialSkills={defaultSkillData} />
      <h3 className="text-xl mt-10">링크스킬</h3>
      <hr />
      <LinkedSkill data={linkSkillData} />
    </>
  );
}
