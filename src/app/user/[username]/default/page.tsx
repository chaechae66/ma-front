interface TCharacterDefault {
  "character_name": string,
  "world_name": string,
  "character_gender": string,
  "character_class": string,
  "character_class_level": string,
  "character_level": number,
  "character_exp": number,
  "character_exp_rate": string,
  "character_guild_name": string | null,
  "character_image": string,
  "popularity": 0,
  "final_stat": 
      {
          "stat_name": string,
          "stat_value": string
      }[]
}

export default async function Page({ params }: { params: { username: string } }) {
  const characterData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/character/info?character_name=${decodeURIComponent(params.username)}`, { next: { tags: ["basic"] } })

  const jsonData : TCharacterDefault = await characterData.json();
  const statsObject = jsonData.final_stat.reduce<Record<string, string>>((acc, stat) => {
    acc[stat.stat_name] = stat.stat_value;
    return acc;
}, {});


  
  return <>
    <div>
      <h3 className="text-xl">프로필</h3>
      <hr />
      <div className="flex">
      <img src={jsonData.character_image} alt={jsonData.character_name} className="w-32 h-42 m-8" />
      <div className="flex flex-col py-4 items-start">
        <div className="none-seleceted-btn">{jsonData.world_name}</div>
        <div className="mt-2"><span className="text-2xl mr-2">{jsonData.character_name}</span><span className="mr-1">Lv.{jsonData.character_level}</span><span>{jsonData.character_gender}</span></div>
        <div className="mt-2">
        <p>
         { `Class Lv.${jsonData.character_class_level} ${jsonData.character_class}`}<br />
         {`인기도 : ${jsonData.popularity}`}
         <br />
         {`길드 명 : ${jsonData.character_guild_name ? jsonData.character_guild_name : "없음" }`}
         <br />
         {`경험치 : ${jsonData.character_exp}  경험치 비율 : ${jsonData.character_exp_rate}`}
        </p>
      </div>
      </div>
      </div>

      <h3 className="text-xl mt-4">스탯</h3>
      <hr />
      <table className="w-full border-b-[1px] border-gray-500 border-solid">
        <tbody>
        <tr>
          <td className="pb-2 pl-2">{`${statsObject["최소 스탯공격력"]} ~ ${statsObject["최대 스탯공격력"]}`}</td>
          <td className="pb-2">{statsObject.HP}</td>
          <td className="pb-2">{statsObject.MP}</td>
          <td className="pb-2">{statsObject.STR}</td>
          <td className="pb-2">{statsObject.DEX}</td>
          <td className="pb-2">{statsObject.INT}</td>
          <td className="pb-2">{statsObject.LUK}</td>
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
}