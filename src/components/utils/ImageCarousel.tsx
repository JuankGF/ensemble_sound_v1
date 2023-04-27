import Image, { type StaticImageData } from "next/image";
import React from "react";
import {
  Carousel,
  type CarouselProps as CarouselOriginalProps,
} from "react-bootstrap";

type CarouselProps = {
  image_sources: string[] | StaticImageData[];
} & CarouselOriginalProps;

export default function ImageCarousel({
  image_sources,
  ...props
}: CarouselProps) {
  return (
    <Carousel fade {...props}>
      {image_sources.map((image, index) => (
        <Carousel.Item key={`${image.toString()}_${index}`}>
          <Image
            className="d-block w-100 rounded-sm carousel-img"
            src={image}
            alt={`${index + 1} slide`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
