import React, { type PropsWithChildren } from "react";
import Image from "next/image";

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
  text = "",
  button_label = "Book a Session",
  button_action,
}: PropsWithChildren<HeroProps>) {
  if (overlayImg)
    return (
      <section className={`hero relative ${className ?? ""}`}>
        <div className="hero-overlay relative h-full w-full rounded-lg bg-opacity-60 align-middle">
          {children}
        </div>
        <div className="hero-content z-20 flex-col rounded-lg bg-primary-focus/70 text-center text-neutral-content md:flex-row-reverse md:text-left">
          <div className="hidden md:flex">
            <Image
              alt="logo"
              src={"/logo192.png"}
              width={200}
              height={200}
            ></Image>
          </div>
          <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className={`text-2xl font-bold md:text-7xl ${title_class}`}>
              Ensemble Sound
            </h1>
            <p className={`py-6 ${text_class}`}>{text}</p>
            {button_action && (
              <Button variant={button_variant} outline onClick={button_action}>
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
          <p className={`py-6 ${text_class}`}>{text}</p>
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
