"use client";

import { Tselected } from "../_types/props";

import { MouseEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { getRankData } from "./MainRank";

interface Props {
  selected: Tselected;
  setSelected: React.Dispatch<React.SetStateAction<Tselected>>;
  type: "allRank" | "dojangRank";
}

export default function RankTabs({ selected, setSelected, type }: Props) {
  const [localSelected, setLocalSelected] = useState(selected[type]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setSelected((prev) => ({ ...prev, [type]: localSelected }));
  }, [localSelected, setSelected, type]);

  const handleSelected: MouseEventHandler<HTMLButtonElement> = (e) => {
    const tabValue =
      e.currentTarget.textContent === "전체" ? "" : e.currentTarget.textContent;
    setLocalSelected(tabValue || "");
  };

  const prefetch: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const selected =
      e.currentTarget.textContent === "전체" ? "" : e.currentTarget.textContent;
    queryClient.prefetchQuery({
      queryKey: [type, selected],
      queryFn: () => getRankData(selected),
    });
  };

  return (
    <div className="flex-between mt-8 mb-4">
      <div>
        <button
          onClick={handleSelected}
          onMouseEnter={prefetch}
          className={!selected[type] ? "selected-btn" : "none-seleceted-btn"}
        >
          전체
        </button>
        <button
          onClick={handleSelected}
          onMouseEnter={prefetch}
          className={
            selected[type] === "루나" ? "selected-btn" : "none-seleceted-btn"
          }
        >
          루나
        </button>
        <button
          onClick={handleSelected}
          onMouseEnter={prefetch}
          className={
            selected[type] === "스카니아"
              ? "selected-btn"
              : "none-seleceted-btn"
          }
        >
          스카니아
        </button>
        <button
          onClick={handleSelected}
          onMouseEnter={prefetch}
          className={
            selected[type] === "엘리시움"
              ? "selected-btn"
              : "none-seleceted-btn"
          }
        >
          엘리시움
        </button>
        <button
          onClick={handleSelected}
          onMouseEnter={prefetch}
          className={
            selected[type] === "리부트" ? "selected-btn" : "none-seleceted-btn"
          }
        >
          리부트
        </button>
      </div>
      <button className="none-seleceted-btn mr-0">
        <Link href={"/"}>더보기</Link>
      </button>
    </div>
  );
}
