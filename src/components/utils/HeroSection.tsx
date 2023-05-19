import React from "react";
import { useRouter } from "next/router";

import Hero from "./Hero";
import ImageCarousel from "./ImageCarousel";
import bg2 from "~/assets/backgrounds/ensemble_bg2.jpg";
import bg1 from "~/assets/backgrounds/ensemble_bg1.jpg";
import bg3 from "~/assets/backgrounds/ensemble_bg3.jpg";
import bg4 from "~/assets/backgrounds/ensemble_bg4.jpg";

export default function HeroSection() {
  const router = useRouter();
  return (
    <Hero
      text="Start enjoying professional sound solutions today using the latest technologies. Contact us and we will help you. Pay when you get waht you need. There’s no upfront commitment—cancel anytime."
      className="section min-h-full lg:min-h-screen"
      button_variant="secondary"
      text_class="text-white md:text-lg"
      title_class="hidden md:block text-white"
      overlayImg={bg2.src}
      button_action={() => void router.push("/book_online")}
    >
      <ImageCarousel
        image_sources={[bg1, bg2, bg3, bg4]}
        className="h-full min-h-full"
        imageClass="h-full"
      />
    </Hero>
  );
}
