import React, { type PropsWithChildren } from "react";

import Button, { type ButtonVariant } from "./Button";

type HeroProps = {
  text: string;
  title_class?: string;
  text_class?: string;
  button_variant?: ButtonVariant;
  className?: string;
  id?: string;
  overlayImg?: string;
  button_label?: string;
  button_action?: () => void;
};

export default function Hero({
  id,
  children,
  className,
  overlayImg,
  title_class = "text-5xl text-white",
  text_class = "text-white",
  button_variant = "primary",
  text = "We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist",
  button_label = "Book a Session",
  button_action,
}: PropsWithChildren<HeroProps>) {
  if (overlayImg)
    return (
      <section
        className="hero min-h-screen md:min-h-[20rem]"
        style={{
          backgroundImage: `url("${overlayImg}")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className={`text-5xl font-bold ${title_class}`}>
              Ensemble Sound
            </h1>
            <p
              className={`py-6 first-letter:align-sub first-letter:text-2xl first-letter:font-medium first-letter:text-secondary ${text_class}`}
            >
              {text}
            </p>
            {button_action && (
              <Button variant={button_variant} onClick={button_action}>
                {button_label}
              </Button>
            )}
          </div>
        </div>
      </section>
    );

  return (
    <section
      id={id}
      className={`hero min-h-fit bg-base-200 ${className ?? ""}`}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="max-w-lg rounded-lg align-middle">{children}</div>
        <div>
          <h1 className={`font-bold ${title_class}`}>Ensemble Sound</h1>
          <p
            className={`py-6 first-letter:align-sub first-letter:text-2xl first-letter:font-medium first-letter:text-secondary ${text_class}`}
          >
            {text}
          </p>
          {button_action && (
            <Button variant={button_variant} onClick={button_action}>
              {button_label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
