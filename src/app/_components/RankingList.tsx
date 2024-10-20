import { TOverAll } from "../_types/data"

type keys = keyof TOverAll;

interface Props {
  tableTitles : {title: string, key:keys}[]
  data : TOverAll[] 
}

export default function RankingList({tableTitles, data} :Props) {
  return <>
  
    <table className="w-full text-center">
    <thead>
                <tr className="bg-zinc-600 h-12 border-t-[1px] border-b-[1px] border-zinc-500">
                 {tableTitles.map((elem)=>(
                   <td key={elem.title}>{elem.title}</td>
                 ))}
                </tr>
              </thead>
              <tbody>
                {data.map((elem)=>(
                  <tr className="h-12 border-b-[1px] border-zinc-500" key={elem.character_name}>{
                    tableTitles.map((value)=>(<td key={value.key}>{elem[value.key] || "-"}</td>))
                  }</tr>
                ))}
              </tbody>
    </table>
  </>;
}
