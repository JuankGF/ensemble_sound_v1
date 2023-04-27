import { useEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    windowSize,
    isSmallScreen: windowSize.width <= 820,
    isMobile: windowSize.width <= 480,
  };
};

export { useWindowSize };
