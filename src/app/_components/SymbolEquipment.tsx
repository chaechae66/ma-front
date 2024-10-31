"use client";

import { TDetailSymbol, TSymbolEquipment } from "../_types/data";
import Tooltip from "./Tooltip";

interface Props {
  data: TSymbolEquipment;
}

function DetailEquipment({ elem }: { elem: TDetailSymbol }) {
  const percent = Math.floor(
    (elem.symbol_growth_count / elem.symbol_require_growth_count) * 100
  );
  return (
    <div className="w-60 min-h-12 text-sm">
      <div className="font-bold text-lg flex flex-wrap justify-center w-full">
        <span>{elem.symbol_name}</span>
      </div>
      <div className="flex items-center justify-center pb-2 border-b-[1px] border-solid border-gray-600 mb-2 ">
        <img
          src={elem.symbol_icon}
          alt={elem.symbol_name}
          className="w-12 h-12 mr-2"
        />
      </div>
      <div>
        <div className="border-b-[1px] border-solid border-gray-600 pb-2 mb-2">
          <div>
            <div>
              <span className="text-orange-300">
                성장 레벨 : {elem.symbol_level}
              </span>
              <br />
              <span className="text-orange-300">
                {" "}
                성장치 : {elem.symbol_growth_count} /{" "}
                {elem.symbol_require_growth_count} ( {percent}% )
              </span>
              <br />
              <span>STR : +{elem.symbol_str}</span>
              <br />
              <span>ARC : +{elem.symbol_force}</span>
            </div>
          </div>
        </div>
        <div className="w-full text-wrap">
          <span>{elem.symbol_description}</span>
        </div>
      </div>
    </div>
  );
}

export default function SymbolEquipment({ data }: Props) {
  return (
    <>
      <div className="mt-8 grid grid-cols-5 gap-3">
        {data.symbol.length === 0 ? (
          <>데이터가 없습니다.</>
        ) : (
          data.symbol.map((elem) => (
            <div key={elem.symbol_name}>
              <Tooltip show={<DetailEquipment elem={elem} />}>
                <div className="flex flex-col flex-center">
                  <img
                    src={elem.symbol_icon}
                    alt={elem.symbol_name}
                    className="w-14 h-14"
                  />
                  <div>
                    <h4 className="text-gray-400 w-20 text-center text-nowrap text-ellipsis break-all overflow-hidden">
                      {elem.symbol_name}
                    </h4>
                  </div>
                </div>
              </Tooltip>
            </div>
          ))
        )}
      </div>
    </>
  );
}
