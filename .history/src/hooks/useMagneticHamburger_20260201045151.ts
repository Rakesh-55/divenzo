import { useEffect, useRef } from "react";

export const useMagneticHamburger = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const topLine = button.querySelector("span:nth-child(1)") as HTMLElement;
    const bottomLine = button.querySelector("span:nth-child(2)") as HTMLElement;

    if (!topLine || !bottomLine) return;

    const handleMouseEnter = () => {
      button.classList.add("hamburger-hover");
      // Invert line colors on hover
      topLine.classList.add("invert-color");
      bottomLine.classList.add("invert-color");
    };

    const handleMouseLeave = () => {
      button.classList.remove("hamburger-hover");
      // Remove color inversion
      topLine.classList.remove("invert-color");
      bottomLine.classList.remove("invert-color");
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { buttonRef };
};
