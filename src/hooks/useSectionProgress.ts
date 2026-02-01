import { useEffect, useRef, useState } from "react";

export const useSectionProgress = (containerRef: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is sticky (entered viewport and hasn't fully exited)
      if (rect.top <= 0 && rect.bottom > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Calculate scroll progress within section
      // Progress goes from 0 to 1 as user scrolls through the section
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const viewportTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Scroll progress: 0 when element enters viewport, 1 when it leaves
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (viewportTop + viewportHeight - elementTop) / (viewportHeight + elementHeight)
        )
      );

      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return { progress, isSticky };
};
