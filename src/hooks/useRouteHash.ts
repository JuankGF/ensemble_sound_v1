import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useRouteHash = () => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState("/");

  const isActive = (route: string) => {
    return activeRoute === route;
  };

  useEffect(() => {
    const onRouteChangeStart = (url: string) => {
      setActiveRoute(url);
    };

    router.events.on("hashChangeStart", onRouteChangeStart);
    router.events.on("routeChangeStart", onRouteChangeStart);

    return () => {
      router.events.off("hashChangeStart", onRouteChangeStart);
      router.events.off("routeChangeStart", onRouteChangeStart);
    };
  }, [router.events]);

  return { isActiveRoute: isActive, pathname: router.pathname };
};
