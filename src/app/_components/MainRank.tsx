"use client";

import { useState } from "react";

import { TisShow, Tselected } from "../_types/props";

import RankTabs from "./RankTabs";
import RankingList from "./RankingList";
import Title from "./Title";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { calToday } from "../_utils/calculateDay";
import { TOverAll } from "../_types/data";

export default function MainRank() {
  const [isShow, setIsShow] = useState<TisShow>({
    allRank: true,
    dojangRank: true,
    notice: true,
  });
  const [selected, setSelected] = useState<Tselected>({
    allRank: null,
    dojangRank: "전체",
  });

  const { data : allRankdata,  isLoading : allRankIsLoading, error: allRankError } = useQuery({
    queryKey: ["overall", selected],
    queryFn: () : Promise<TOverAll[]>=> 
      axios.get("/rank/overall", {
        params: {
          date : calToday(),
          world_name: selected,
        },
      }).then((res)=>res.data.ranking.slice(0,10) ),
  });

  return (
    <div className="wrap">
      <div>
        <Title
          title="전체랭킹"
          isShow={isShow}
          setIsShow={setIsShow}
          type={"allRank"}
        />
        {isShow.allRank ? (
          <>
            <RankTabs
              selected={selected}
              setSelected={setSelected}
              type={"allRank"}
            />
            {
allRankIsLoading ? <>로딩 중입니다...</> :
            <RankingList tableTitles={[{title :"#", key :"ranking"}
                  ,{title :"캐릭터", key : "character_name"}
                  ,{title : "레벨", key : "character_level"}
                  ,{title: "직업", key: "sub_class_name"}
                  ,{title:"길드", key :"character_guildname"}]} data={allRankdata!} />
            }
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
