"use client";

import { TPet } from "@/app/_types/data";
import Tooltip from "@/app/_components/common/Tooltip";
import NoImage from "@/assets/images/no_image.svg";
import { useState } from "react";
import Image from "next/image";

interface ItemOption {
  option_type: string;
  option_value: string;
}

interface PetEquipment {
  item_name: string;
  item_icon: string;
  item_description: string;
  item_option: ItemOption[];
  scroll_upgrade: number;
  scroll_upgradable: number;
  item_shape: string;
  item_shape_icon: string;
}

interface Pet {
  name: string | null;
  icon: string;
  description: string;
  equipment: PetEquipment;
  pet_type: string;
  date_expire: string;
}

interface Props {
  data: TPet;
}

function DetailPet({ elem }: { elem: Pet }) {
  const [isError, setIsError] = useState(false);
  const date = new Date(elem.date_expire);
  return (
    <div className="w-60 min-h-12 text-sm">
      <div className="font-bold text-lg flex flex-wrap justify-center w-full pb-2 border-b-[1px] border-solid border-gray-600 mb-2 ">
        {elem.name}
        <div className="font-light text-xs w-full text-center">
          {elem.date_expire && (
            <div>{`만료 기간은 ${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDate()}일 ${date.getHours()}시 까지`}</div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center pb-2 border-b-[1px] border-solid border-gray-600 mb-2 ">
        {isError ? (
          <Image
            width={12}
            height={12}
            src={elem.icon}
            alt={elem.name!}
            onError={() => {
              setIsError(true);
            }}
            className="mr-2 self-start"
          />
        ) : (
          <Image
            width={45}
            height={45}
            src={NoImage.src}
            alt="이미지 없음"
            className="mr-2 self-start"
          />
        )}
        {elem.description && (
          <div className="w-44 text-wrap">
            <div>{elem.description}</div>
          </div>
        )}
      </div>
      <div className="pb-2 border-b-[1px] border-solid border-gray-600 mb-2">
        펫종류 : {elem.pet_type}
      </div>
    </div>
  );
}

function DetailEquipment({ elem }: { elem: Pet }) {
  return (
    <div className="w-60 min-h-12 text-sm">
      <div className="font-bold text-lg flex flex-wrap justify-center w-full pb-2 border-b-[1px] border-solid border-gray-600 mb-2 ">
        {elem.equipment.item_name}
      </div>
      <div className="flex flex-wrap justify-center items-center pb-2 border-b-[1px] border-solid border-gray-600 mb-2 ">
        {elem.equipment.item_icon ? (
          <img
            src={elem.equipment.item_icon}
            alt={elem.equipment.item_name}
            className="w-12 h-12 mr-2 self-start"
          />
        ) : (
          <img src={NoImage.src} alt="이미지 없음" />
        )}
        {elem.equipment.item_description && (
          <div className="w-44 text-wrap">
            <div>{elem.equipment.item_description}</div>
          </div>
        )}
      </div>

      <div className="border-b-[1px] border-solid border-gray-600 pb-2 mb-2">
        {elem.equipment.item_option.map(({ option_type, option_value }) => (
          <div key={option_type}>
            {option_type} : +{option_value}
          </div>
        ))}
      </div>
      <div>업그레이드 횟수 : {elem.equipment.scroll_upgrade}</div>
    </div>
  );
}

function ShowPet({ elem }: { elem: Pet }) {
  const [isError, setIsError] = useState(false);
  return (
    <div className="flex flex-col flex-center w-full">
      {isError ? (
        <Image
          width={12}
          height={12}
          src={elem.icon}
          alt={elem.name!}
          onError={() => {
            setIsError(true);
          }}
          className="w-14 h-14"
        />
      ) : (
        <Image
          width={45}
          height={45}
          src={NoImage.src}
          alt="이미지 없음"
          className="mr-2"
        />
      )}
      <div>
        <h4 className="text-gray-400 w-20 text-center text-nowrap text-ellipsis break-all overflow-hidden">
          {elem.name}
        </h4>
      </div>
    </div>
  );
}

export default function PetEquipment({ data }: Props) {
  const transformPetData = (): Pet[] => {
    const pets: Pet[] = [];

    for (let i = 1; i <= 3; i++) {
      const pet = {
        name: data[`pet_${i}_name` as keyof TPet] as string,
        icon: data[`pet_${i}_icon` as keyof TPet] as string,
        description: data[`pet_${i}_description` as keyof TPet] as string,
        equipment: data[`pet_${i}_equipment` as keyof TPet] as PetEquipment,
        pet_type: data[`pet_${i}_pet_type` as keyof TPet] as string,
        date_expire: data[`pet_${i}_date_expire` as keyof TPet] as string,
      };
      pets.push(pet);
    }

    return pets;
  };
  return (
    <>
      <div className="grid grid-cols-3 justify-items-center">
        {transformPetData().map((elem, index) =>
          !elem.name ? (
            <div key={index} className="text-center mt-8">
              {index + 1}번 펫 없음
            </div>
          ) : (
            <div key={elem.name} className="mt-8 flex flex-col">
              <Tooltip show={<DetailPet elem={elem}></DetailPet>}>
                <ShowPet elem={elem} />
              </Tooltip>
              <Tooltip show={<DetailEquipment elem={elem}></DetailEquipment>}>
                <div className="flex flex-col flex-center mt-5 w-full">
                  {elem.equipment.item_icon ? (
                    <img
                      src={elem.equipment.item_icon}
                      alt={elem.equipment.item_name}
                      className="w-14 h-14"
                    />
                  ) : (
                    <img src={NoImage.src} alt="이미지 없음" />
                  )}
                  <div>
                    <h4 className="text-gray-400 w-20 text-center text-nowrap text-ellipsis break-all overflow-hidden">
                      {elem.equipment.item_name}
                    </h4>
                  </div>
                </div>
              </Tooltip>
            </div>
          )
        )}
      </div>
    </>
  );
}
