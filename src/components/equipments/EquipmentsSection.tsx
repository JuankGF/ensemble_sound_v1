import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { LoadingView } from "../utils";
import { useEquipmentByType } from "./hooks/useEquipmentByType";
import Image from "next/image";

export default function EquipmentsSection() {
  const { equipmentsByType, isLoading } = useEquipmentByType();
  if (isLoading) return <LoadingView />;

  return (
    <div
      id="equipments"
      className="xs:px-3 w-full bg-primary py-8 md:px-10 lg:px-16"
    >
      <div className="block w-full items-center px-3 md:flex">
        <b className="flex-1 text-2xl text-white">EQUIPMENTS</b>
      </div>
      {equipmentsByType?.length === 0 ? (
        <div className="flex-div flex w-full items-center text-xl font-semibold text-white">
          <FontAwesomeIcon
            icon={faSearch}
            className="max-w-[6rem] text-sm text-white"
          />
          No equipments found
        </div>
      ) : (
        <div className="mt-6 grid w-full place-items-center items-start gap-3 px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {equipmentsByType.map(({ equipments, type }, index) => (
            <div
              key={type}
              className={`card-compact card w-full justify-center rounded-none bg-transparent text-white ${
                index === equipmentsByType.length - 1 && (index + 1) % 2 !== 0
                  ? "md:col-span-full lg:col-start-2 lg:col-end-3"
                  : ""
              }`}
            >
              <figure>
                <Image
                  src={`/icons/${type.toLowerCase()}.png`}
                  alt={type}
                  className="h-16 w-20 object-contain"
                  width={150}
                  height={150}
                />
              </figure>

              <div className="card-body">
                <h4 className="card-title m-auto text-center text-base">
                  {type.replace("_", " ")}
                </h4>
                <ul className="px-0">
                  {equipments.map(({ id, name, quantity, description }) => (
                    <li
                      key={id}
                      className="justify-content-center text-sm text-white"
                    >
                      <div className="grid grid-flow-col-dense gap-1">
                        <span className="text-secondary">{name}</span>
                        <span>{description}</span>
                        <span className="flex justify-end text-secondary">
                          x{quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
