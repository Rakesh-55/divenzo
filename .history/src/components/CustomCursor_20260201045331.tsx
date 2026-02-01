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
      setIsHamburgerHover(!!el?.closest("button[aria-label='Toggle menu']"));
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
            ? `h-16 w-16 border-2 ${
                isDark ? "border-black bg-white" : "border-white bg-black"
              }`
            : `h-3 w-3 ${isDark ? "bg-white" : "bg-black"}`
        }
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isHamburgerHover ? "translate(-32px, -32px)" : "translate(-6px, -6px)",
        transition: "width 0.15s ease-out, height 0.15s ease-out, border-color 0.15s ease-out, background-color 0.15s ease-out",
      }}
    />
  );
};

export default CustomCursor;
