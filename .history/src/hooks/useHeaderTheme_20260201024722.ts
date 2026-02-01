import { useEffect, useState } from "react";

export const useHeaderTheme = () => {
  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // detect scroll start
      setScrolled(window.scrollY > 20);

      // detect section behind visible header
      const headers = Array.from(
        document.querySelectorAll<HTMLElement>("[data-site-header]")
      );
      const activeHeader = headers.find((h) => h.offsetParent !== null) ?? headers[0];
      const headerHeight = activeHeader?.getBoundingClientRect().height ?? 80;
      const sampleY = Math.ceil(headerHeight + 1);
      const el = document.elementFromPoint(window.innerWidth / 2, sampleY);

      if (el?.closest(".dark-section")) {
        setOnDarkSection(true);
      } else {
        setOnDarkSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return {
    scrolled,
    onDarkSection
  };
};
