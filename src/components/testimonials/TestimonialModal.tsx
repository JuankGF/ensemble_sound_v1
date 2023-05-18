import React from "react";

import TestimonialForm from "./TestimonialForm";
import { type SubmitProps } from "./TestimonialsSection";

type Props = {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
  onSubmit: (values: SubmitProps) => void;
  isLoading?: boolean;
};

export default function TestimonialModal({ user, isLoading, onSubmit }: Props) {
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
            submitTrigger={<ModalSubmit disabled={isLoading} />}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}

const ModalSubmit = ({ disabled }: { disabled?: boolean }) => (
  <div className="modal-action">
    <a href="#testimonials" className="btn-outline btn-primary btn">
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </a>
  </div>
);
