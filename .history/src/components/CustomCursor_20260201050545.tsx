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
      const hamburgerBtn = el?.closest("button[aria-label='Toggle menu']");
      const isHamburger = !!hamburgerBtn;
      
      if (isHamburger) {
        setIsHamburgerHover(true);
        // Invert hamburger line colors with !important
        hamburgerBtn.querySelectorAll("span").forEach((span) => {
          const spanEl = span as HTMLElement;
          const color = navIsDark ? "black" : "white";
          spanEl.setAttribute("style", `background-color: ${color} !important;`);
        });
      } else {
        setIsHamburgerHover(false);
        // Reset hamburger line colors on ALL buttons
        document.querySelectorAll("button[aria-label='Toggle menu'] span").forEach((span) => {
          const spanEl = span as HTMLElement;
          spanEl.removeAttribute("style");
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
