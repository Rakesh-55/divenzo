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

      // Check for dark-section class first
      if (el?.closest(".dark-section")) {
        setOnDarkSection(true);
        return;
      }

      // Check actual background color by traversing up the DOM
      let isDarkBg = false;
      let currentEl = el as HTMLElement | null;
      let depth = 0;
      
      while (currentEl && depth < 8) {
        const bgColor = window.getComputedStyle(currentEl).backgroundColor;
        
        // Skip transparent and default backgrounds
        if (!bgColor || bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") {
          currentEl = currentEl.parentElement;
          depth++;
          continue;
        }

        // Parse RGB/RGBA color
        const rgbMatch = bgColor.match(/[\d.]+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0]);
          const g = parseInt(rgbMatch[1]);
          const b = parseInt(rgbMatch[2]);
          
          // If average of RGB is less than 130, it's dark
          const brightness = (r + g + b) / 3;
          isDarkBg = brightness < 130;
        }
        
        break;
      }

      setOnDarkSection(isDarkBg);
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
