"use server";

import { revalidatePath } from "next/cache";

export default async function action(path: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (res.status === 200) revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
