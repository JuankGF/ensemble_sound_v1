import React from "react";

import TestimonialForm from "./TestimonialForm";
import { type SubmitProps } from "./TestimonialsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinStars } from "@fortawesome/free-regular-svg-icons";

type Props = {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
  onSubmit: (values: SubmitProps) => void;
  isLoading?: boolean;
  showSuccessMessage?: boolean;
};

export default function TestimonialModal({
  user,
  isLoading,
  showSuccessMessage,
  onSubmit,
}: Props) {
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
          {showSuccessMessage ? (
            <>
              <h3 className="absolute top-2 text-center text-lg font-bold text-primary">
                Thanks for your comments
              </h3>
              <div className="grid w-full justify-center py-8 text-center">
                <FontAwesomeIcon
                  icon={faFaceGrinStars}
                  className="flex h-16 w-16 justify-self-center text-primary"
                />
                <p className="mt-3">
                  Thanks for comment {user.name}! We are lucky to have you ;)
                </p>
              </div>
            </>
          ) : (
            <>
              <h3 className="absolute top-2 text-center text-lg font-bold text-primary">
                Share your thoughts about us
              </h3>
              <TestimonialForm
                name={user.name}
                email={user.email}
                image={user.image}
                submitTrigger={<ModalSubmit disabled={isLoading} />}
                onSubmit={onSubmit}
              />
            </>
          )}

          <a
            href="#testimonials"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </a>
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
