"use client";

import action from "@/app/actions/action";
import { IoMdRefreshCircle } from "react-icons/io";

interface Props {
  paths: string[];
}

export default function RefreshBtn({ paths }: Props) {
  const handleRefresh = async () => {
    paths?.forEach(async (path) => {
      await action(path);
    });
  };
  return (
    <IoMdRefreshCircle className="mt-1" size={25} onClick={handleRefresh} />
  );
}
