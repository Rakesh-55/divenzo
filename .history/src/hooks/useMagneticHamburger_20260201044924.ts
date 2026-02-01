import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useMagneticHamburger = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const topLine = button.querySelector("span:nth-child(1)") as HTMLElement;
    const bottomLine = button.querySelector("span:nth-child(2)") as HTMLElement;

    if (!topLine || !bottomLine) {
      console.warn("Hamburger lines not found");
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHoveringRef.current) return;

      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distX = mouseX - buttonCenterX;
      const distY = mouseY - buttonCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const magneticRadius = 80;

      if (distance < magneticRadius) {
        const strength = 1 - distance / magneticRadius;
        const offsetX = (distX / distance) * strength * 8;
        const offsetY = (distY / distance) * strength * 4;
        const morphStrength = strength * 0.12;

        // Force inline styles to override Tailwind transitions
        topLine.style.transition = "none";
        bottomLine.style.transition = "none";

        gsap.to(topLine, {
          x: offsetX,
          y: offsetY * -0.7,
          scaleX: 1 - morphStrength,
          duration: 0.2,
          overwrite: "auto",
        });

        gsap.to(bottomLine, {
          x: offsetX,
          y: offsetY * 0.7,
          scaleX: 1 - morphStrength,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      // Disable Tailwind transitions to avoid conflicts
      topLine.style.transition = "none";
      bottomLine.style.transition = "none";
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      
      // Reset with elastic bounce
      gsap.to([topLine, bottomLine], {
        x: 0,
        y: 0,
        scaleX: 1,
        duration: 0.7,
        ease: "elastic.out(1.2)",
        overwrite: "auto",
        onComplete: () => {
          // Re-enable transitions after animation
          topLine.style.transition = "";
          bottomLine.style.transition = "";
        },
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return { buttonRef };
};
