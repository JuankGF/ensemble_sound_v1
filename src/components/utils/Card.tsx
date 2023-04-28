import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { type StaticImageData } from "next/image";
import React, { type PropsWithChildren } from "react";

import Button from "./Button";

type CardProps = {
  title: string;
  text: string;
  image?: string | StaticImageData;
  actionLabel?: string;
  actionIcon?: IconDefinition;
  layoutHorizontal?: boolean;
  callToAction?: () => void;
};

export default function Card({
  title,
  image,
  text,
  actionIcon,
  actionLabel,
  layoutHorizontal,
  children,
  callToAction,
}: PropsWithChildren<CardProps>) {
  return (
    <div
      className={`card-compact card w-96 bg-base-100 shadow-xl${
        layoutHorizontal ? " card-side" : ""
      }`}
    >
      {image && (
        <figure>
          <Image
            src={image}
            alt={title}
            className="w-full object-cover"
            width={200}
            height={200}
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
        {children}
        {callToAction && (
          <div className="card-actions justify-end">
            <Button onClick={callToAction}>
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
