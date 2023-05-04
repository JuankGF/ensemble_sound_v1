import React from "react";

import { Hero, ImageCarousel } from "./utils";
import banner1 from "~/assets/banners/session1.jpeg";
import banner2 from "~/assets/banners/session2.jpg";

export default function About() {
  return (
    <Hero
      text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
      className="section bg-white px-3 md:px-10 lg:px-16"
      text_class="text-primary"
      title_class="text-primary text-3xl md:text-center lg:text-left"
      id="about"
    >
      <ImageCarousel
        image_sources={[banner1, banner2]}
        className="h-fit max-h-72 w-12"
        imageClass="h-64"
        vertical
      />
    </Hero>
  );
}
