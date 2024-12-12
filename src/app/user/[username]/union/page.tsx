import { TArtifact, TUnionDefault, TUnionRaider } from "@/app/_types/data";
import { fetchData } from "@/app/_utils/fetchData";
import UnionRadier from "./_component/UnionRadier/UnionRadier";
import RefreshBtn from "../_component/RefreshBtn";

interface Props {
  params: {
    username: string;
  };
}

type DataTypeMap = {
  default: { result: TUnionDefault };
  artifact: { result: TArtifact };
  raider: { result: TUnionRaider };
};

export default async function UnionPage({ params }: Props) {
  const urls = {
    default: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/union/union-info?character_name=${decodeURIComponent(params.username)}`,
    artifact: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/union/union-artifact-info?character_name=${decodeURIComponent(
      params.username
    )}`,
    raider: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/union/union-raider-info?character_name=${decodeURIComponent(
      params.username
    )}`,
  };

  const {
    data: {
      default: defaultUnionData,
      artifact: artifactData,
      raider: raiderUnionData,
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

  const crystal_effects: {
    [key: string]: string;
  } = {
    "올스탯 증가": "올스탯",
    "최대 HP /MP 증가": "HP / MP",
    "공격력/마력 증가": "공/마",
    "데미지 증가": "데미지",
    "보스 몬스터 공격 시 데미지 증가": "보공",
    "몬스터 방어율 무시 증가": "방무",
    "버프 지속시간 증가": "벞지",
    "재사용 대기시간 미적용 확률 증가": "재사용",
    "메소 획득량 증가": "메획",
    "아이템 드롭률 증가": "아획",
    "크리티컬 확률 증가": "크확",
    "크리티컬 데미지 증가": "크뎀",
    "추가 경험치 획득 증가": "추경",
    "상태이상 내성 증가": "내성",
    "소환수 지속시간 증가": "소환수",
    "파이널 어택류 스킬 데미지 증가": "파택",
  };

  return (
    <>
      <div className="flex-between mb-2">
        <h3 className="text-xl">유니온</h3>
        <RefreshBtn
          paths={Object.entries(urls).map(([key, value]) =>
            value.replace(process.env.NEXT_PUBLIC_BASE_URL!, "")
          )}
        />
      </div>
      <hr />
      <div className="border-b-[1px] border-solid border-gray-500 py-4 font-bold text-2xl">
        {defaultUnionData.result.union_grade}
      </div>
      <div className="border-b-[1px] border-solid border-gray-500 py-2 grid grid-cols-4 grid-rows-2">
        <div className="text-gray-400">유니온 총 레벨</div>
        <div className="text-gray-400">아티펙트 레벨</div>
        <div className="text-gray-400">이티펙트 경험치</div>
        <div className="text-gray-400">아티펙트 포인트</div>
        <div>{defaultUnionData.result.union_level}</div>
        <div>{defaultUnionData.result.union_artifact_level}</div>
        <div>{defaultUnionData.result.union_artifact_exp}</div>
        <div>{defaultUnionData.result.union_artifact_point}</div>
      </div>
      <h3 className="text-xl mt-10 mb-2">아키팩트</h3>
      <hr />
      <div className="flex mt-4 gap-4 items-baseline">
        <div className="grid grid-cols-4 w-2/3 text-center gap-4">
          {artifactData.result.union_artifact_crystal.map((elem) => (
            <div key={elem.name}>
              <h4 className="font-bold text-lg">
                {elem.name.slice(7, elem.name.length)}
              </h4>
              <div className="text-gray-400">Lv.{elem.level}</div>
              <div className="text-xs">
                <span>{crystal_effects[elem.crystal_option_name_1]} </span>
                <span>{crystal_effects[elem.crystal_option_name_2]} </span>
                <span>{crystal_effects[elem.crystal_option_name_3]}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="mb-2 text-lg font-semibold">아키팩트효과</h4>
          <div>
            {artifactData.result.union_artifact_effect.map((elem) => (
              <div className="mb-1">
                <span className="text-gray-400 text-sm">LV.{elem.level} </span>
                <span>{elem.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h3 className="text-xl mt-10 mb-2">공격대</h3>
      <hr />
      <UnionRadier
        data={raiderUnionData.result}
        level={defaultUnionData.result.union_level}
      />
    </>
  );
}
