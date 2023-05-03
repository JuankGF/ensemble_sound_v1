import React from "react";
import { type Testimonial } from "@prisma/client";

import { Card } from "../utils";

export default function TestimonialCard({
  rating,
  text,
  authorEmail,
  authorName,
  image,
}: Testimonial & { authorName: string; authorEmail: string; image: string }) {
  return (
    <Card
      title={authorName}
      subtitle={authorEmail}
      text={text}
      image={image}
      imageClass="rounded-full w-16 ml-3"
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
