import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useMagneticHamburger = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const topLine = button.children[0] as HTMLElement;
    const bottomLine = button.children[1] as HTMLElement;

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
        const offsetX = (distX / distance) * strength * 6;
        const offsetY = (distY / distance) * strength * 3;
        const morphStrength = strength * 0.1;

        gsap.to(topLine, {
          x: offsetX,
          y: offsetY * -0.6,
          scaleX: 1 - morphStrength,
          duration: 0.25,
          overwrite: "auto",
        });

        gsap.to(bottomLine, {
          x: offsetX,
          y: offsetY * 0.6,
          scaleX: 1 - morphStrength,
          duration: 0.25,
          overwrite: "auto",
        });
      } else {
        // Smoothly return when outside radius
        gsap.to([topLine, bottomLine], {
          x: 0,
          y: 0,
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      gsap.to([topLine, bottomLine], {
        x: 0,
        y: 0,
        scaleX: 1,
        duration: 0.6,
        ease: "elastic.out(1.2)",
        overwrite: "auto",
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
