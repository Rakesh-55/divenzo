import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [isHamburgerHover, setIsHamburgerHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      const el = document.elementFromPoint(x, y);
      const navIsDark = document.body.dataset.navTheme === "dark";

      if (el?.closest(".dark-section") || navIsDark) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }

      // Detect hamburger button by aria-label
      const isHamburger = !!el?.closest("button[aria-label='Toggle menu']");
      setIsHamburgerHover(isHamburger);

      // Update line colors when hovering hamburger
      if (isHamburger) {
        const buttons = document.querySelectorAll("button[aria-label='Toggle menu']");
        buttons.forEach((btn) => {
          btn.querySelectorAll("span").forEach((span) => {
            const spanEl = span as HTMLElement;
            // Force visible color inversion
            if (isDark) {
              spanEl.style.backgroundColor = "black !important" as any;
            } else {
              spanEl.style.backgroundColor = "white !important" as any;
            }
          });
        });
      } else {
        // Reset lines
        const buttons = document.querySelectorAll("button[aria-label='Toggle menu']");
        buttons.forEach((btn) => {
          btn.querySelectorAll("span").forEach((span) => {
            const spanEl = span as HTMLElement;
            spanEl.style.backgroundColor = "";
          });
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDark]);

  return (
    <div
      className={`
        pointer-events-none fixed z-[9999]
        rounded-full transition-all duration-200 ease-out
        ${
          isHamburgerHover
            ? isDark
              ? "h-16 w-16 bg-white" // Dark bg → white circle
              : "h-16 w-16 bg-black" // Light bg → black circle
            : `h-3 w-3 ${isDark ? "bg-white" : "bg-black"}`
        }
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isHamburgerHover ? "translate(-32px, -32px)" : "translate(-6px, -6px)"
      }}
    />
  );
};

export default CustomCursor;
