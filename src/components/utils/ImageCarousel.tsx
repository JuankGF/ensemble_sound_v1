import Image, { type StaticImageData } from "next/image";
import React from "react";

type CarouselProps = {
  image_sources: string[] | StaticImageData[];
  indicators?: boolean;
};

export default function ImageCarousel({
  image_sources,
  indicators = true,
}: CarouselProps) {
  return (
    <>
      <div className="carousel-center carousel rounded-box max-w-md space-x-4 bg-neutral p-4">
        {image_sources.map((image, index) => (
          <div
            id={`item${index + 1}`}
            className="carousel-item"
            key={`${image.toString()}-${index}`}
          >
            <div className="carousel-item">
              <Image
                className="carousel-img rounded-box"
                src={image}
                alt={`${index + 1} slide`}
              />
            </div>
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
    </>
  );
}
