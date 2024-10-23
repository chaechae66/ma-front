interface TStatData {
  date: null;
  character_class: string;
  final_stat: TStat[];
  remain_ap: number;
}

type DataTypeMap = {
  stat: TStatData;
  hyper: THyperData;
  propensity: TPropensity;
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

async function fetchData<T extends keyof DataTypeMap>(
  urlMap: Record<T, string>
): Promise<{ [K in T]: DataTypeMap[K] }> {
  try {
    const entries = Object.entries(urlMap) as [T, string][];
    const responses = await Promise.all(
      entries.map(([key, url]) => fetch(url))
    );

    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    });

    const data = await Promise.all(responses.map((res) => res.json()));

    const result = entries.reduce((acc, [key], index) => {
      acc[key] = data[index];
      return acc;
    }, {} as { [K in T]: DataTypeMap[K] });

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

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
    stat: jsonData,
    hyper: hyperData,
    propensity: propensityStats,
  } = await fetchData(urls);

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
