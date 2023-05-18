import React from "react";
import { useRouter } from "next/router";

import TestimonialForm from "./TestimonialForm";
import { api } from "~/utils/api";

type Props = {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

export type SubmitProps = {
  opinion: string;
  authorName: string;
  authorEmail: string;
  authorImage?: string | undefined;
  rating: number;
};

export default function TestimonialModal({ user }: Props) {
  const router = useRouter();
  const { mutate } = api.testimonials.create.useMutation();
  const onSubmit = (values: SubmitProps) => {
    mutate(values);
    void router.push("/#testimonials");
  };
  return (
    <>
      <a
        href="#my-modal-2"
        className="btn-outline btn-secondary btn mt-8 justify-self-center"
      >
        Share your thoughts
      </a>
      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <h3 className="absolute top-2 text-center text-lg font-bold text-primary">
            Share your thoughts about us
          </h3>
          <a
            href="#testimonials"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </a>
          <TestimonialForm
            name={user.name}
            email={user.email}
            image={user.image}
            submitTrigger={ModalSubmit()}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}

const ModalSubmit = () => (
  <div className="modal-action">
    <a href="#testimonials" className="btn-outline btn-primary btn">
      <button type="submit">Submit</button>
    </a>
  </div>
);
