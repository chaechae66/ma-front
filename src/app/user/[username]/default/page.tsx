import RefreshBtn from "@/app/user/[username]/_component/RefreshBtn";
import NoImage from "@/assets/images/no_image.svg";

interface TCharacterDefault {
  result: {
    character_name: string;
    world_name: string;
    character_gender: string;
    character_class: string;
    character_class_level: string;
    character_level: number;
    character_exp: number;
    character_exp_rate: string;
    character_guild_name: string | null;
    character_image: string;
    popularity: 0;
    final_stat: {
      stat_name: string;
      stat_value: string;
    }[];
    error?: {
      name: string;
      message: string;
    };
  };
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  let result: TCharacterDefault["result"] | null = null;
  let error: string | null = null;

  try {
    const characterData = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/character/info?character_name=${decodeURIComponent(params.username)}`
    );

    const data: TCharacterDefault = await characterData.json();

    if (data.result.error) {
      throw new Error(data.result.error.message);
    }
    result = data.result;
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error occurred";
  }

  const statsObject = result?.final_stat?.reduce<Record<string, string>>(
    (acc, stat) => {
      acc[stat.stat_name] = stat.stat_value;
      return acc;
    },
    {}
  );

  if (error) {
    if (error === "Please input valid parameter") {
      return (
        <div>
          <p>해당 결과가 없습니다.</p>
        </div>
      );
    }
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h3 className="text-xl">프로필</h3>
          <div className="mb-2">
            <RefreshBtn
              paths={[
                `/character/info?character_name=${decodeURIComponent(
                  params.username
                )}`,
              ]}
            />
          </div>
        </div>
        <hr />
        <div className="flex">
          {result?.character_image ? (
            <img
              src={result?.character_image}
              alt={result?.character_name}
              className="w-32 h-42 m-8"
            />
          ) : (
            <img src={NoImage.src} alt="이미지 없음" />
          )}
          <div className="flex flex-col py-4 items-start">
            <div className="none-seleceted-btn">{result?.world_name}</div>
            <div className="mt-2">
              <span className="text-2xl mr-2">{result?.character_name}</span>
              <span className="mr-1">Lv.{result?.character_level}</span>
              <span>{result?.character_gender}</span>
            </div>
            <div className="mt-2">
              <p>
                {`직업 : ${result?.character_class}`}
                <br />
                {`인기도 : ${result?.popularity}`}
                <br />
                {`길드 : ${
                  result?.character_guild_name
                    ? result?.character_guild_name
                    : "없음"
                }`}
                <br />
                {`경험치 : ${result?.character_exp?.toLocaleString()}  경험치 비율 : ${
                  result?.character_exp_rate
                }`}
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl mt-4 mb-2">스탯</h3>
        <hr />
        <table className="w-full border-b-[1px] border-gray-500 border-solid">
          <tbody>
            <tr>
              <td className="pb-2 pl-2">{`${Number(
                statsObject?.["최소 스탯공격력"]
              ).toLocaleString()} ~ ${Number(
                statsObject?.["최대 스탯공격력"]
              ).toLocaleString()}`}</td>
              <td className="pb-2">{statsObject?.HP}</td>
              <td className="pb-2">{statsObject?.MP}</td>
              <td className="pb-2">{statsObject?.STR}</td>
              <td className="pb-2">{statsObject?.DEX}</td>
              <td className="pb-2">{statsObject?.INT}</td>
              <td className="pb-2">{statsObject?.LUK}</td>
            </tr>
          </tbody>
          <thead>
            <tr className="text-gray-400">
              <td className="pt-2 pl-2">스탯 공격력</td>
              <td className="pt-2">HP</td>
              <td className="pt-2">MP</td>
              <td className="pt-2">STR</td>
              <td className="pt-2">DEX</td>
              <td className="pt-2">INT</td>
              <td className="pt-2">LUK</td>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
