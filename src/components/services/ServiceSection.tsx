import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ServiceType } from "@prisma/client";

import { api } from "~/utils/api";
import ServiceCard from "./ServiceCard";
import { LoadingView } from "../utils";

export default function ServiceSection() {
  const [activeFilters, setActiveFilters] = useState<ServiceType[] | undefined>(
    undefined
  );

  const toogleFilter = (newFilter: ServiceType) => {
    const filters = [...(activeFilters ?? [])];
    const filterIndex = filters.indexOf(newFilter);
    if (filterIndex !== -1) filters.splice(filterIndex, 1);
    else filters.push(newFilter);
    setActiveFilters(filters);
  };

  const { data: services, isLoading } = api.services.getByType.useQuery({
    types: activeFilters,
  });

  if (isLoading) return <LoadingView />;

  return (
    <div id="services" className="xs:px-3 my-8 w-full md:px-10 lg:px-16">
      <div className="flex w-full items-center px-3">
        <b className="flex-1 text-2xl text-primary">SERVICES</b>
        <div className="flex flex-1 justify-end gap-2">
          {Object.keys(ServiceType).map((type) => (
            <div
              key={type}
              title="Filter by"
              className={`badge-primary badge cursor-pointer py-1 lowercase ${
                activeFilters?.includes(type as ServiceType)
                  ? ""
                  : "badge-outline"
              }`}
              onClick={() => toogleFilter(type as ServiceType)}
            >
              {type.replace("_", " ")}
            </div>
          ))}
        </div>
      </div>

      {services?.length === 0 ? (
        <div className="flex w-full flex-col items-center text-xl font-semibold">
          <FontAwesomeIcon
            icon={faSearch}
            className="max-w-[6rem] text-sm text-primary"
          />
          No services found
        </div>
      ) : (
        <div className="row-auto mt-6 grid w-full gap-3 px-8  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {services?.map((service) => (
            <ServiceCard
              service={service}
              key={service.id}
              mediaPath={service.media.path}
            />
          ))}
        </div>
      )}
    </div>
  );
}
