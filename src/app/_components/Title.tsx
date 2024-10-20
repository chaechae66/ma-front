"use client";

import { TisShow } from "../_types/props";
import arrowUp from "@/assets/images/arrow_up.svg";
import arrowDown from "@/assets/images/arrow_down.svg";

interface Props {
  title: string;
  isShow: TisShow;
  setIsShow: React.Dispatch<React.SetStateAction<TisShow>>;
  type: "allRank" | "dojangRank" | "notice";
}

export default function Title({ title, isShow, setIsShow, type }: Props) {
  return (
    <nav className="mt-20 pb-6 flex-between border-b-[1px] border-white">
      <h4 className="text-2xl font-bold">{title}</h4>
      {isShow[type] ? (
        <img
          onClick={() => {
            setIsShow((prev) => ({ ...prev, [type]: false }));
          }}
          src={arrowUp.src}
          alt="아코디언 닫기 버튼"
          width={18}
          height={10}
        />
      ) : (
        <img
          onClick={() => {
            setIsShow((prev) => ({ ...prev, [type]: true }));
          }}
          src={arrowDown.src}
          alt="아코디언 열기 버튼"
          width={18}
          height={10}
        />
      )}
    </nav>
  );
}
