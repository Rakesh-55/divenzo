import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [isHamburgerHover, setIsHamburgerHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const navIsDark = document.body.dataset.navTheme === "dark";

      setIsDark(!!(el?.closest(".dark-section") || navIsDark));

      // Detect hamburger button by aria-label
      const isHamburger = !!el?.closest("button[aria-label='Toggle menu']");
      
      if (isHamburger && !isHamburgerHover) {
        setIsHamburgerHover(true);
        // Invert hamburger line colors
        const hamburgerBtn = el?.closest("button[aria-label='Toggle menu']");
        if (hamburgerBtn) {
          hamburgerBtn.querySelectorAll("span").forEach((span) => {
            const spanEl = span as HTMLElement;
            if (navIsDark) {
              spanEl.style.backgroundColor = "black";
            } else {
              spanEl.style.backgroundColor = "white";
            }
          });
        }
      } else if (!isHamburger && isHamburgerHover) {
        setIsHamburgerHover(false);
        // Reset hamburger line colors
        document.querySelectorAll("button[aria-label='Toggle menu'] span").forEach((span) => {
          const spanEl = span as HTMLElement;
          spanEl.style.backgroundColor = "";
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHamburgerHover]);

  return (
    <div
      className={`
        pointer-events-none fixed z-[9999]
        rounded-full
        ${
          isHamburgerHover
            ? isDark
              ? "h-16 w-16 bg-white"
              : "h-16 w-16 bg-black"
            : `h-3 w-3 ${isDark ? "bg-white" : "bg-black"}`
        }
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isHamburgerHover ? "translate(-32px, -32px)" : "translate(-6px, -6px)",
        transition: "width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out"
      }}
    />
  );
};

export default CustomCursor;
