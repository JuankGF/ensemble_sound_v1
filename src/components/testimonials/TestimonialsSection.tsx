import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import TestimonialCard from "./TestimonialCard";
import { LoadingView } from "../utils";
import TestimonialModal from "./TestimonialModal";

export type SubmitProps = {
  opinion: string;
  authorName: string;
  authorEmail: string;
  authorImage?: string | undefined;
  rating: number;
};

export default function TestimonialsSection() {
  const router = useRouter();
  const { status, data } = useSession();
  const {
    data: testimonials,
    isLoading,
    refetch,
    isRefetching,
  } = api.testimonials.getAll.useQuery({
    count: 6,
    distinct: "authorId",
  });

  const { mutate, isSuccess } = api.testimonials.create.useMutation({
    onSuccess: () => refetch(),
  });

  const onSubmit = (values: SubmitProps) => {
    mutate(values);
    void router.push("/#testimonials");
  };

  if (isLoading) return <LoadingView />;

  return (
    <section
      id="testimonials"
      className="xs:px-3 grid min-h-[12rem] w-full bg-primary py-8 md:px-10 lg:px-16"
    >
      <div className="mb-8 flex w-full flex-col items-center px-3 text-center md:flex">
        <b className="flex-1 text-2xl text-white">
          Proudly making people happy with our services
        </b>
        <p className="text-white">See our customers testimonials</p>
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
                image={
                  image ??
                  `https://api.dicebear.com/5.x/fun-emoji/svg?seed=${
                    name ?? "avatar"
                  }`
                }
              />
            )
          )}
        </div>
      )}
      {status === "authenticated" && (
        <TestimonialModal
          user={data.user}
          onSubmit={onSubmit}
          isLoading={isRefetching}
          showSuccessMessage={isSuccess}
        />
      )}
    </section>
  );
}
