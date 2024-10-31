interface Props {
  starNum: number;
}

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styles from "./Star.module.css";

export default function Star({ starNum }: Props) {
  const STARARR = Array.from(new Array(25), (x, i) => i + 1);
  return (
    <div className={`flex flex-wrap ${styles.wrap} w-[14.75rem]`}>
      {STARARR.map((elem, index) => (
        <div key={elem}>
          {index + 1 <= starNum ? (
            <AiFillStar size={12} className={elem === 16 ? "ml-10" : ""} />
          ) : (
            <AiOutlineStar size={12} className={elem === 16 ? "ml-10" : ""} />
          )}
        </div>
      ))}
    </div>
  );
}
