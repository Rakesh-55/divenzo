import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCursor } from "@/hooks/useCursor";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { isHovering } = useCursor();

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursorEl, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursorEl, "y", {
      duration: 0.2,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    gsap.to(cursorEl, {
      scale: isHovering ? 3 : 1,
      duration: 0.35,
      ease: isHovering ? "power3.out" : "power3.inOut",
    });
  }, [isHovering]);


  // uncoment this to hide the default cursor and use only the custom one
  // useEffect(() => {
  //   const previousCursor = document.body.style.cursor;
  //   document.body.style.cursor = "none";

  //   return () => {
  //     document.body.style.cursor = previousCursor;
  //   };
  // }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white mix-blend-difference"
    />
  );
};

export default CustomCursor;
