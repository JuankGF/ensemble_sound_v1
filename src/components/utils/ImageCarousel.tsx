import Image, { type StaticImageData } from "next/image";
import React from "react";

type CarouselProps = {
  image_sources: string[] | StaticImageData[];
  indicators?: boolean;
  className?: string;
};

export default function ImageCarousel({
  image_sources,
  className,
  indicators = true,
}: CarouselProps) {
  return (
    <div>
      <div
        className={`carousel rounded-box w-full bg-neutral shadow-xl ${
          className ?? ""
        }`}
      >
        {image_sources.map((image, index) => (
          <div
            id={`item${index + 1}`}
            className="carousel-item w-full justify-center"
            key={`${image.toString()}-${index}`}
          >
            <Image
              className="w-full object-cover"
              src={image}
              alt={`${index + 1} slide`}
            />
          </div>
        ))}
      </div>
      {indicators && (
        <div className="flex w-full justify-center gap-2 py-2">
          {image_sources.map((image, index) => (
            <a
              href={`#item${index + 1}`}
              className="btn-xs btn"
              key={`${image.toString()}-${index}`}
            >
              {index + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
