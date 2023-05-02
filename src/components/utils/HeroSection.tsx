import React from "react";
import { useRouter } from "next/router";

import Hero from "./Hero";
import { useWindowSize } from "~/hooks/useWindowSize";
import ImageCarousel from "./ImageCarousel";
import bg2 from "~/assets/backgrounds/ensemble_bg2.jpg";
import bg1 from "~/assets/backgrounds/ensemble_bg1.jpg";
import bg3 from "~/assets/backgrounds/ensemble_bg3.jpg";
import bg4 from "~/assets/backgrounds/ensemble_bg4.jpg";

export default function HeroSection() {
  const router = useRouter();
  const { isSmallScreen } = useWindowSize();
  return (
    <Hero
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      className="section bg-primary"
      button_variant="secondary"
      text_class="text-white"
      title_class="text-white"
      overlayImg={isSmallScreen ? bg2.src : undefined}
      button_action={() => void router.push("/book_online")}
    >
      {!isSmallScreen && (
        <ImageCarousel
          image_sources={[bg1, bg2, bg3, bg4]}
          className="max-h-96"
        />
      )}
    </Hero>
  );
}
