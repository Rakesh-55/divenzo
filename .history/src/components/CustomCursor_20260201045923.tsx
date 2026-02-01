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

      // Detect hamburger hover - looks for buttons with "Toggle menu" label
      const hamburgerBtn = el?.closest("button[aria-label='Toggle menu']");
      
      if (hamburgerBtn) {
        setIsHamburgerHover(true);
        
        // Invert hamburger line colors on hover
        hamburgerBtn.querySelectorAll("span").forEach((span: Element) => {
          const spanEl = span as HTMLElement;
          if (isDark) {
            // Dark section → lines become black
            spanEl.style.color = "black";
            spanEl.style.backgroundColor = "black";
          } else {
            // Light section → lines become white
            spanEl.style.color = "white";
            spanEl.style.backgroundColor = "white";
          }
        });
      } else {
        setIsHamburgerHover(false);
        
        // Reset hamburger lines to original colors
        document.querySelectorAll("button[aria-label='Toggle menu'] span").forEach((span: Element) => {
          const spanEl = span as HTMLElement;
          spanEl.style.color = "";
          spanEl.style.backgroundColor = "";
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
              ? "h-16 w-16 bg-white" // Dark section: white circle
              : "h-16 w-16 bg-black" // Light section: black circle
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
