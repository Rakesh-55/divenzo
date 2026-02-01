import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface MagneticState {
  topOffset: number;
  bottomOffset: number;
  topScaleX: number;
  bottomScaleX: number;
}

export const useMagneticHamburger = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [magneticState, setMagneticState] = useState<MagneticState>({
    topOffset: 0,
    bottomOffset: 0,
    topScaleX: 1,
    bottomScaleX: 1,
  });

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const topLine = button.children[0] as HTMLElement;
    const bottomLine = button.children[1] as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distX = mouseX - buttonCenterX;
      const distY = mouseY - buttonCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Magnetic radius - effect only works within this distance
      const magneticRadius = 80;

      if (distance < magneticRadius) {
        // Calculate strength: stronger closer to center
        const strength = 1 - distance / magneticRadius;

        // Subtle movement: max 4px offset
        const offsetX = (distX / distance) * strength * 4;
        const offsetY = (distY / distance) * strength * 2;

        // Subtle line morphing: scale based on cursor approach
        const morphStrength = strength * 0.08;

        gsap.to(topLine, {
          x: offsetX,
          y: offsetY * -0.5,
          scaleX: 1 - morphStrength,
          duration: 0.3,
          overwrite: "auto",
        });

        gsap.to(bottomLine, {
          x: offsetX,
          y: offsetY * 0.5,
          scaleX: 1 - morphStrength,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);

      // Reset to center with elastic ease
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
  }, [isHovering]);

  return { buttonRef };
};
