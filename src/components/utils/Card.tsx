import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { type StaticImageData } from "next/image";
import React from "react";

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
  callToAction,
}: CardProps) {
  return (
    <div
      className={`card-compact card w-96 bg-base-100 shadow-xl${
        layoutHorizontal ? " card-side" : ""
      }`}
    >
      {image && (
        <figure>
          <Image src={image} alt="Shoes" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
        {callToAction && (
          <div className="card-actions justify-end">
            <button className="btn-primary btn" onClick={callToAction}>
              {actionLabel}
              {actionIcon && <FontAwesomeIcon icon={actionIcon} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
