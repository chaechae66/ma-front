"use client";

import action from "@/app/actions/action";

interface Props {
  path: string;
}

export default function RefreshBtn({ path }: Props) {
  const handleRefresh = async () => {
    await action(path);
  };
  return <button onClick={handleRefresh}>새로고침</button>;
}
