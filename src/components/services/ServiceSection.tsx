import { faLink, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";
import ServiceCard from "./ServiceCard";

export default function ServiceSection() {
  const { data: services } = api.services.getAll.useQuery();
  return (
    <div className="my-8 w-full md:px-10 lg:px-16">
      <div className="flex w-full">
        <b className="flex-1 text-2xl text-primary">Services</b>
        <div className="flex flex-1 justify-end">
          <Link
            href="/book-online/services"
            title="Services"
            className="inline-flex w-20 items-center gap-1 whitespace-nowrap text-sm text-secondary underline"
          >
            See more
            <FontAwesomeIcon icon={faLink} size="xs" />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid w-full px-8 sm:grid-cols-1 md:gap-3 lg:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
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
