import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { api } from "~/utils/api";
import ServiceCard from "./ServiceCard";

export default function ServiceSection() {
  const { data: services } = api.services.getAll.useQuery({});
  return (
    <div className="xs:px-3 my-8 w-full md:px-10 lg:px-16">
      <div className="flex w-full px-3">
        <b className="flex-1 text-2xl text-primary">SERVICES</b>
        <div className="flex flex-1 justify-end">
          {/* !TODO Filter by type*/}
        </div>
      </div>

      <div className="row-auto mt-6 grid w-full gap-3 px-8  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {services?.length === 0 ? (
          <div className="flex flex-col items-center text-xl font-semibold">
            <FontAwesomeIcon
              icon={faSearch}
              className="max-w-[6rem] text-sm text-primary"
            />
            No services found
          </div>
        ) : (
          services?.map((service) => (
            <ServiceCard
              service={service}
              key={service.id}
              mediaPath={service.media.path}
            />
          ))
        )}
      </div>
    </div>
  );
}
