"use client";

import { TisShow } from "../_types/props";
import { IoMdRefreshCircle } from "react-icons/io";

import arrowUp from "@/assets/images/arrow_up.svg";
import arrowDown from "@/assets/images/arrow_down.svg";

interface Props {
  title: string;
  isShow: TisShow;
  setIsShow: React.Dispatch<React.SetStateAction<TisShow>>;
  type: "allRank" | "dojangRank" | "notice";
  refetch: () => void;
}

export default function Title({
  title,
  isShow,
  setIsShow,
  type,
  refetch,
}: Props) {
  return (
    <nav className="mt-20 pb-6 flex-between border-b-[1px] border-white">
      <div className="flex flex-center">
        <h4 className="text-2xl font-bold mr-1">{title}</h4>
        <IoMdRefreshCircle size={25} onClick={refetch} />
      </div>
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
