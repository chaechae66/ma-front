"use client";

import { useKeyStore } from "@/app/_store/store";
import InputAPIKey from "../../_component/InputAPIKey";
import Info from "./Info";
import { useEffect } from "react";

export default function Starforce() {
  const { key, deleteKey } = useKeyStore();

  useEffect(() => {
    // return () => {
    //   deleteKey();
    // };
  }, []);

  return (
    <>
      {/* {key ?  */}
      <Info />
      {/* : <InputAPIKey />}*/}
    </>
  );
}
