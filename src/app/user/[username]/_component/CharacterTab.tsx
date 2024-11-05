"use client";

import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function CharacterTab() {
  const params = useParams();
  const segment = useSelectedLayoutSegment();

  return (
    <div className="mb-12">
      <Link
        className={`mr-6 text-xl ${
          segment === "default" && `underline underline-offset-8`
        }`}
        href={`/user/${params.username}/default`}
      >
        기본
      </Link>
      <Link
        className={`mr-6 text-xl ${
          segment === "union" && `underline underline-offset-8`
        }`}
        href={`/user/${params.username}/union`}
      >
        유니온
      </Link>
      <Link
        className={`mr-6 text-xl ${
          segment === "stat" && `underline underline-offset-8`
        }`}
        href={`/user/${params.username}/stat`}
      >
        스탯
      </Link>
      <Link
        className={`mr-6 text-xl ${
          segment === "equipment" && `underline underline-offset-8`
        }`}
        href={`/user/${params.username}/equipment`}
      >
        장비
      </Link>
      <Link
        className={`mr-6 text-xl ${
          segment === "skill" && `underline underline-offset-8`
        }`}
        href={`/user/${params.username}/skill`}
      >
        스킬
      </Link>
      <Link
        className={`mr-6 text-xl ${
          segment === "cube" && `underline underline-offset-8`
        }`}
        href={`/user/${params.username}/cube`}
      >
        큐브
      </Link>
      <Link
        className={`mr-6 text-xl ${
          segment === "startforce" && `underline underline-offset-8`
        }`}
        href={`/user/${params.username}/startforce`}
      >
        스타포스
      </Link>
    </div>
  );
}
