"use client"

import Link from "next/link"
import { useParams, useSelectedLayoutSegment } from "next/navigation"

export default function CharacterTab(){
    const params = useParams();
    const segment = useSelectedLayoutSegment();

    return(
        <div className="mb-12">
            <Link className={`mr-6 text-xl ${segment === "default" && `underline`}`} href={`/user/${params.username}/default`}>기본</Link>
            <Link className={`mr-6 text-xl ${segment === "union" && `underline`}`} href={`/user/${params.username}/union`}>유니온</Link>
            <Link className={`mr-6 text-xl ${segment === "stat" && `underline`}`} href={`/user/${params.username}/stat`}>스탯</Link>
            <Link className={`mr-6 text-xl ${segment === "equipment" && `underline`}`} href={`/user/${params.username}/equipment`}>장비</Link>
            <Link className={`mr-6 text-xl ${segment === "skill" && `underline`}`} href={`/user/${params.username}/skill`}>스킬</Link>
            <Link className={`mr-6 text-xl ${segment === "cube" && `underline`}`} href={`/user/${params.username}/cube`}>큐브</Link>
            <Link className={`mr-6 text-xl ${segment === "startforce" && `underline`}`} href={`/user/${params.username}/startforce`}>스타포스</Link>
        </div>
    )
}