import React from "react";
import Image from "next/image";

import { Hero } from "./utils";
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
    >
      <div className="relative hidden flex-1 flex-row md:flex">
        <div className="carousel-center carousel rounded-box h-96 min-w-max lg:carousel-vertical">
          <div id="banner-1" className="carousel-item h-full">
            <Image
              alt="banner-1"
              src={banner1}
              width={200}
              height={200}
              className="w-56 object-cover"
            />
          </div>
          <div id="banner-2" className="carousel-item h-full">
            <Image
              alt="banner-2"
              src={banner2}
              width={200}
              height={200}
              className="w-56 object-cover"
            />
          </div>
        </div>
        {/* <div className="hidden h-96 w-min -translate-x-4 items-center justify-center gap-2 py-2 lg:flex lg:flex-col">
          <Link
            href="#banner-1"
            className="h-6 w-2 rounded bg-secondary hover:bg-secondary-focus"
          ></Link>
          <Link
            href="#banner-2"
            className="h-6 w-2 rounded bg-secondary hover:bg-secondary-focus"
          ></Link>
        </div> */}
      </div>
    </Hero>
  );
}
