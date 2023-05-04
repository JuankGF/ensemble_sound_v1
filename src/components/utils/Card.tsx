import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { type StaticImageData } from "next/image";
import React, { type PropsWithChildren } from "react";

import Button from "./Button";

type CardProps = {
  title: string;
  text: string;
  subtitle?: string;
  image?: string | StaticImageData;
  actionLabel?: string;
  actionIcon?: IconDefinition;
  layoutHorizontal?: boolean;
  imageClass?: string;
  callToAction?: () => void;
};

export default function Card({
  title,
  image,
  text,
  subtitle,
  actionIcon,
  actionLabel,
  layoutHorizontal,
  children,
  callToAction,
  imageClass = "w-full object-cover",
}: PropsWithChildren<CardProps>) {
  return (
    <div
      className={`min-w-80 card-compact card bg-base-100 shadow-lg transition-shadow duration-500 hover:shadow-2xl ease-in-out${
        layoutHorizontal ? " card-side" : ""
      }`}
    >
      {image && (
        <figure>
          <Image
            src={image}
            alt={title}
            className={imageClass}
            width={150}
            height={150}
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {subtitle && (
          <h3 className="card-title text-sm text-slate-400">{subtitle}</h3>
        )}
        <p>{text}</p>
        {children}
        {callToAction && (
          <div className="card-actions justify-end">
            <Button type="button" onClick={callToAction}>
              {actionLabel}{" "}
              {actionIcon && (
                <FontAwesomeIcon icon={actionIcon} className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
