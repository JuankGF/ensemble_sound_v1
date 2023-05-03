import Image, { type StaticImageData } from "next/image";
import React from "react";
import Carousel from "nuka-carousel";

type CarouselProps = {
  image_sources: string[] | StaticImageData[];
  indicators?: boolean;
  autoplay?: boolean;
  className?: string;
  imageClass?: string;
  vertical?: boolean;
};

export default function ImageCarousel({
  image_sources,
  className,
  vertical,
  imageClass,
  indicators = true,
  autoplay = true,
}: CarouselProps) {
  return (
    <Carousel
      withoutControls={!indicators}
      autoplay={autoplay}
      wrapAround
      autoplayInterval={8000}
      className={className}
      vertical={vertical}
      frameAriaLabel="image-carousel"
      defaultControlsConfig={{
        nextButtonClassName: "hidden",
        prevButtonClassName: "hidden",
        pagingDotsClassName: "mx-2",
      }}
    >
      {image_sources.map((image, index) => (
        <div
          id={`item${index + 1}`}
          className="carousel-item h-full w-full justify-center"
          key={`${image.toString()}-${index}`}
        >
          <Image
            className={`w-full rounded-xl object-cover ${imageClass ?? ""}`}
            src={image}
            alt={`${index + 1} slide`}
          />
        </div>
      ))}
    </Carousel>
  );
}
