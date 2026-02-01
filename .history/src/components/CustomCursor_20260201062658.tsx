import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [isProjectHover, setIsProjectHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      const el = document.elementFromPoint(x, y);
      const navIsDark = document.body.dataset.navTheme === "dark";

      // Check for dark-section class
      const isDarkSection = el?.closest(".dark-section");
      
      // Check actual background color
      let isDarkBg = false;
      if (el instanceof HTMLElement) {
        const bgColor = window.getComputedStyle(el).backgroundColor;
        // Parse RGB color
        const rgbMatch = bgColor.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const [r, g, b] = rgbMatch.map(Number);
          // If average of RGB is less than 128, it's dark
          isDarkBg = (r + g + b) / 3 < 128;
        }
      }

      if (isDarkSection || navIsDark || isDarkBg) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }

      // detect hamburger / X hover ONLY
      if (el?.closest(".hamburger-btn")) {
        setIsProjectHover(true);
      } else {
        setIsProjectHover(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`
        pointer-events-none fixed z-[9999]
        rounded-full transition-all duration-200 ease-out
        ${isProjectHover ? "h-16 w-16 border border-white bg-transparent" : "h-3 w-3"}
        ${isDark ? "bg-white" : "bg-black"}
      `}
      style={{
        transform: `translate(${position.x - 8}px, ${position.y - 8}px)`
      }}
    />
  );
};

export default CustomCursor;
