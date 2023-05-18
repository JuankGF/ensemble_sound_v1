import React from "react";

import { Card } from "../utils";

type Props = {
  text: string;
  rating: number;
  authorName: string;
  authorEmail: string;
  image: string;
};

export default function TestimonialCard({
  rating,
  text,
  authorEmail,
  authorName,
  image,
}: Props) {
  return (
    <Card
      title={authorName}
      subtitle={authorEmail}
      text={text}
      image={image}
      imageClass="rounded-full w-16 h-16 ml-3 object-cover"
      figureClass="px-2"
      layoutHorizontal
    >
      <div className="rating justify-start">
        {Array.from([1, 2, 3, 4, 5]).map((index) => (
          <input
            key={index}
            defaultChecked={index === rating}
            type="radio"
            name="rating-1"
            disabled
            className={`mask mask-star cursor-default ${
              index <= rating ? "bg-primary" : ""
            }`}
          />
        ))}
      </div>
    </Card>
  );
}
