import ShowRank from "../_components/ShowRank";

export default function DojangRankPage() {
  const paramsObj = {
    difficulty: 1,
  };
  return (
    <>
      <ShowRank URL="/rank/dojang-rank" queryKey="dojang" params={paramsObj} />
    </>
  );
}
