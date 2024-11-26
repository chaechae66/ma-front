"use client";

interface Props {
  world: string;
  setWorld: (world: string) => void;
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function SelectedWorld({ world, setWorld }: Props) {
  const { data: worldName } = useQuery({
    queryKey: ["worldName"],
    queryFn: async () => {
      return axios.get(`/guild/world-info`).then((data) => data.data);
    },
  });

  return (
    <>
      <div className="mb-4">
        {worldName?.world.sort().map((elem: string) => (
          <button
            key={elem}
            className={`${
              world === elem ? "selected-btn" : "none-seleceted-btn"
            } mb-2`}
            onClick={(e) => {
              setWorld(elem);
            }}
          >
            {elem}
          </button>
        ))}
      </div>
    </>
  );
}
