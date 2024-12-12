import CashEquipment from "@/app/user/[username]/equipment/_component/CashEquipment";
import Equipment from "@/app/user/[username]/equipment/_component/Equipment";
import PetEquipment from "@/app/user/[username]/equipment/_component/PetEquipment";
import SymbolEquipment from "@/app/user/[username]/equipment/_component/SymbolEquipment";
import {
  TAD,
  TCash,
  TEquipment,
  TPet,
  TSymbolEquipment,
} from "@/app/_types/data";
import { fetchData } from "@/app/_utils/fetchData";
import RefreshBtn from "../_component/RefreshBtn";

interface Props {
  params: {
    username: string;
  };
}

type DataTypeMap = {
  default: { result: TEquipment };
  symbol: { result: TSymbolEquipment };
  cash: { result: TCash };
  pet: { result: TPet };
};

export default async function EquipmentPage({ params }: Props) {
  const urls = {
    default: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/item-equipment-info?character_name=${decodeURIComponent(
      params.username
    )}&advancementLevel=5`,
    symbol: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/symbol-equipment-info?character_name=${decodeURIComponent(
      params.username
    )}&advancementLevel=5`,
    cash: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/cashitem-equipment-info?character_name=${decodeURIComponent(
      params.username
    )}`,
    pet: `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/character/pet-equipment-info?character_name=${decodeURIComponent(
      params.username
    )}`,
  };

  const {
    data: {
      default: defaultData,
      symbol: symbolData,
      cash: cashData,
      pet: petData,
    },
    error,
  } = await fetchData<DataTypeMap>(urls);

  if (error?.details?.result.error.message === "Please input valid parameter") {
    return (
      <>
        <p>해당 결과가 없습니다.</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>Error {error.message}</p>
      </>
    );
  }

  return (
    <>
      <div className="flex-between mb-2">
        <h3 className="text-xl">장비</h3>
        <RefreshBtn
          paths={Object.entries(urls).map(([key, value]) =>
            value.replace(process.env.NEXT_PUBLIC_BASE_URL!, "")
          )}
        />
      </div>
      <hr />
      <Equipment data={defaultData.result} />
      <h3 className="text-xl mt-8 mb-2">심볼</h3>
      <hr />
      <SymbolEquipment data={symbolData.result} />
      <h3 className="text-xl mt-8 mb-2">캐쉬</h3>
      <hr />
      <CashEquipment data={cashData.result} />
      <h3 className="text-xl mt-8 mb-2">펫</h3>
      <hr />
      <PetEquipment data={petData.result} />
    </>
  );
}
