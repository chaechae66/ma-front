import CashEquipment from "@/app/_components/CashEquipment";
import Equipment from "@/app/_components/Equipment";
import SymbolEquipment from "@/app/_components/SymbolEquipment";
import { TCash, TEquipment, TSymbolEquipment } from "@/app/_types/data";
import { fetchData } from "@/app/_utils/fetchData";

interface Props {
  params: {
    username: string;
  };
}

type DataTypeMap = {
  default: { result: TEquipment };
  symbol: { result: TSymbolEquipment };
  cash: { result: TCash };
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
  };

  const {
    data: {
      default: { result: defaultData },
      symbol: { result: symbolData },
      cash: { result: cashData },
    },
    error,
  } = await fetchData<DataTypeMap>(urls);

  return (
    <>
      <h3 className="text-xl">장비</h3>
      <hr />
      <Equipment data={defaultData} />
      <h3 className="text-xl mt-8">심볼</h3>
      <hr />
      <SymbolEquipment data={symbolData} />
      <h3 className="text-xl mt-8">캐쉬</h3>
      <hr />
      <CashEquipment data={cashData} />
    </>
  );
}
