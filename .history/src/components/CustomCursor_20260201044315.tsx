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
        ${
          isHamburgerHover
            ? `h-16 w-16 border-2 bg-transparent ${
                isDark ? "border-white" : "border-black"
              }`
            : `h-3 w-3 ${
                isDark ? "bg-white" : "bg-black"
              }`
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
