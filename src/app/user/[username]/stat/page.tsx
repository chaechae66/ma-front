interface TStatData {
  date: null;
  character_class: string;
  final_stat: TStat[];
  remain_ap: number;
}

type DataTypeMap = {
  stat: { result: TStatData };
  hyper: { result: THyperData };
  propensity: { result: TPropensity };
};

interface TPropensity {
  date: null;
  charisma_level: number;
  sensibility_level: number;
  insight_level: number;
  willingness_level: number;
  handicraft_level: number;
  charm_level: number;
}

import HyperStat from "@/app/_components/HyperStat";
import StatShow from "@/app/_components/StatShow";
import { THyperData, TStat } from "@/app/_types/data";
import { fetchData } from "@/app/_utils/fetchData";

export default async function StatPage({
  params,
}: {
  params: { username: string };
}) {
  const urls = {
    stat: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/stat-info?character_name=${decodeURIComponent(
      params.username
    )}`,
    hyper: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/hyper-stat-info?character_name=${decodeURIComponent(
      params.username
    )}`,
    propensity: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/propensity-info?character_name=${decodeURIComponent(
      params.username
    )}`,
  };

  const {
    data: {
      stat: { result: jsonData },
      hyper: { result: hyperData },
      propensity: { result: propensityStats },
    },
    error,
  } = await fetchData<DataTypeMap>(urls);

  const requiredStats = [
    "최소 스탯공격력",
    "최대 스탯공격력",
    "HP",
    "STR",
    "DEX",
    "INT",
    "LUK",
    "MP",
  ];

  const [neededStats, otherStats] = jsonData.final_stat.reduce<
    [TStat[], TStat[]]
  >(
    (acc, stat) => {
      if (requiredStats.includes(stat.stat_name)) {
        acc[0].push(stat);
      } else {
        acc[1].push(stat);
      }
      return acc;
    },
    [[], []]
  );
  const propensityKey = [
    "",
    "카리스마",
    "감성",
    "통찰력",
    "의지",
    "손재주",
    "매력",
  ];

  return (
    <>
      <h3 className="text-xl">스탯</h3>
      <hr />
      <div className="py-4 pb-8 text-lg border-b-[1px] border-solid border-gray-500">
        남은 AP : <b>{jsonData.remain_ap}</b>
      </div>
      <table className="w-full border-b-[1px] border-slid border-gray-500">
        <thead>
          <tr>
            {neededStats.map(({ stat_name }) => (
              <td key={stat_name} className="text-gray-400 pt-2">
                {stat_name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {neededStats.map(({ stat_name, stat_value }) => (
              <td key={stat_name} className="pb-2">
                {stat_value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <StatShow data={otherStats} />
      <h3 className="text-xl">하이퍼 스탯</h3>
      <hr />
      <HyperStat data={hyperData} />
      <h3 className="text-xl mt-8">성향</h3>
      <hr />
      <div className="grid grid-cols-6">
        {Object.entries(propensityStats).map(([, value], index) => {
          if (index === 0) return;

          return (
            <div className="border-b-[1px] border-solid border-gray-500 py-2">
              <div className="text-gray-400">{propensityKey[index]}</div>
              <div>Lv.{value}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
