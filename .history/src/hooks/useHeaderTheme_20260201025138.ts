import { useEffect, useState } from "react";

export const useHeaderTheme = () => {
  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // detect scroll start
      setScrolled(window.scrollY > 20);

      // detect section behind header
      const headerCheckY = 80; // header height
      const el = document.elementFromPoint(
        window.innerWidth / 2,
        headerCheckY
      );

      if (el?.closest(".dark-section")) {
        setOnDarkSection(true);
      } else {
        setOnDarkSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scrolled,
    onDarkSection
  };
};
