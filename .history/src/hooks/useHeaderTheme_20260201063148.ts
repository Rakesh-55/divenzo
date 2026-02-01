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

      // Check for dark-section class
      const isDarkSection = el?.closest(".dark-section");
      
      // Check actual background color by traversing up the DOM
      let isDarkBg = false;
      let currentEl = el as HTMLElement | null;
      let depth = 0;
      
      while (currentEl && depth < 10) {
        const bgColor = window.getComputedStyle(currentEl).backgroundColor;
        
        // Check if background color is explicitly set (not transparent)
        if (bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
          const rgbMatch = bgColor.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const [r, g, b] = rgbMatch.map(Number);
            // If average of RGB is less than 128, it's dark
            isDarkBg = (r + g + b) / 3 < 128;
            break;
          }
        }
        
        currentEl = currentEl.parentElement;
        depth++;
      }

      if (isDarkSection || isDarkBg) {
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
