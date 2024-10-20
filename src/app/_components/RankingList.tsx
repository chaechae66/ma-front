interface Props<T> {
  tableTitles : {title: string, key: keyof T}[]
  data : T[]
}

export default function RankingList<T extends { ranking: number }>({tableTitles, data} :Props<T>) {
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
                  <tr className="h-12 border-b-[1px] border-zinc-500" key={elem.ranking}>{
                    tableTitles.map((value)=>(
                    <td key={value.title}>
                      {(elem[value.key]  as React.ReactNode) || "-"}
                      </td>))
                  }</tr>
                ))}
              </tbody>
    </table>
  </>;
}
