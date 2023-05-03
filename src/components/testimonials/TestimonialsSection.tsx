import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { api } from "~/utils/api";
import TestimonialCard from "./TestimonialCard";
import { LoadingView } from "../utils";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = api.testimonials.getAll.useQuery({
    count: 3,
    distinct: "authorId",
  });

  if (isLoading) return <LoadingView />;

  return (
    <div
      id="testimonials"
      className="xs:px-3 w-full bg-primary py-8 md:px-10 lg:px-16"
    >
      <div className="block w-full items-center px-3 md:flex">
        <b className="flex-1 text-2xl text-white">TESTIMONIALS</b>
      </div>
      {testimonials?.length === 0 ? (
        <div className="flex w-full flex-col items-center text-xl font-semibold text-white">
          <FontAwesomeIcon
            icon={faSearch}
            className="max-w-[6rem] text-sm text-white"
          />
          No testimonials found
        </div>
      ) : (
        <div className="row-auto mt-6 grid w-full gap-3 px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {testimonials?.map(
            ({ id, rating, text, author: { email, image, name } }) => (
              <TestimonialCard
                key={id}
                text={text}
                rating={rating}
                authorEmail={email ?? ""}
                authorName={name ?? ""}
                image={image ?? ""}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
