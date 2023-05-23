import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ServiceType } from "@prisma/client";
import { toast } from "react-toastify";

import { api } from "~/utils/api";
import ServiceCard from "./ServiceCard";
import { LoadingView, ToastErrorTemplate } from "../utils";

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

  const { data: services, isLoading } = api.services.getByType.useQuery(
    {
      types: activeFilters,
    },
    {
      onError: (error) =>
        toast.error(
          <ToastErrorTemplate code={error.data?.code} message={error.message} />
        ),
    }
  );

  if (isLoading) return <LoadingView />;

  return (
    <section id="services" className="xs:px-3 my-8 w-full md:px-10 lg:px-16">
      <div className="mb-8 flex w-full flex-col items-center px-3 text-center md:flex">
        <b className="flex-1 text-2xl text-primary">
          Discover what we got to offer
        </b>
        <p>
          Start putting your ideas into action with EnsembleSound products and
          services
        </p>
        <div className="mt-5 flex flex-1 justify-end gap-2 md:mt-3">
          {Object.keys(ServiceType).map((type) => (
            <div
              key={type}
              title="Filter by"
              className={`badge-primary badge cursor-pointer py-1 lowercase transition-colors duration-300 ease-in-out hover:bg-primary-focus hover:text-white ${
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
    </section>
  );
}
