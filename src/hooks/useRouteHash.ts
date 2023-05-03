import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useRouteHash = () => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState("/");

  const isActive = (route: string) => {
    return activeRoute === route;
  };

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      setActiveRoute(url);
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  return { isActiveRoute: isActive };
};
