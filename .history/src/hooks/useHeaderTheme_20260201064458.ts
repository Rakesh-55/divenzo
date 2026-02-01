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

      // Check for dark-section class first (home page)
      if (el?.closest(".dark-section")) {
        setOnDarkSection(true);
        return;
      }

      // For other pages, check the actual background color
      let isDarkBg = false;
      
      if (el) {
        // Check the element's computed background
        const computedStyle = window.getComputedStyle(el);
        const bgColor = computedStyle.backgroundColor;
        
        // Parse RGB color
        const rgbMatch = bgColor.match(/[\d.]+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0]);
          const g = parseInt(rgbMatch[1]);
          const b = parseInt(rgbMatch[2]);
          
          // Calculate brightness (0-255)
          const brightness = (r + g + b) / 3;
          isDarkBg = brightness < 128;
        }
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
