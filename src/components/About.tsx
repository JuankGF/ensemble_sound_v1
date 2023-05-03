import React from "react";
import Image from "next/image";

import { Hero } from "./utils";
import banner1 from "~/assets/banners/session1.jpeg";
import banner2 from "~/assets/banners/session2.jpeg";

export default function About() {
  return (
    <Hero
      text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
      className="section bg-base-100"
      text_class="text-primary-content"
      title_class="text-primary"
    >
      <div className="container relative w-full">
        <Image
          alt="banner-1"
          src={banner1}
          width={100}
          height={100}
          className=""
        />
        <Image
          alt="banner-2"
          src={banner2}
          width={100}
          height={100}
          className=""
        />
      </div>
    </Hero>
  );
}
