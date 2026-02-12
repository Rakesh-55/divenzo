import React, { useEffect, useRef, ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  as?: "div" | "span";
  overflowHidden?: boolean;
  // Background detection
  isDarkBg?: boolean; // true = black bg (white text), false = white bg (black text)
  // Disable color reveal
  disableColorReveal?: boolean;
  // Slide up animation
  slideDuration?: number;
  slideStagger?: number;
  slideStart?: string;
  slideEnd?: string;
  slideEase?: string;
  // Color transition animation (overrides auto-detection if provided)
  startColor?: string;
  endColor?: string;
  colorStart?: string;
  colorEnd?: string;
  colorScrub?: boolean;
  // Styling
  className?: string;
}

/**
 * AnimatedText Component
 * Line-by-line reveal using measured rendered lines and IntersectionObserver.
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  as = "div",
  overflowHidden = true,
  // Background detection
  isDarkBg,
  disableColorReveal = false,
  // Slide up defaults
  slideDuration = 0.8,
  slideStagger = 0.08,
  slideStart = "top 85%",
  slideEnd = "top 50%",
  slideEase = "power4.out",
  // Color transition defaults (auto-adjusted based on background)
  startColor,
  endColor,
  colorStart = "top center",
  colorEnd = "bottom top",
  colorScrub = true,
  // Styling
  className = "",
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const lineRefs = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const revealedRef = useRef(false);

  const getEase = (ease: string) => {
    switch (ease) {
      case "power4.out":
        return "cubic-bezier(0.2, 1, 0.3, 1)";
      case "power3.out":
        return "cubic-bezier(0.22, 1, 0.36, 1)";
      case "power2.out":
        return "cubic-bezier(0.25, 0.8, 0.25, 1)";
      default:
        return "cubic-bezier(0.22, 1, 0.36, 1)";
    }
  };

  const revealLines = (immediate = false) => {
    lineRefs.current.forEach((line, index) => {
      line.style.transform = "translateY(0)";
      line.style.opacity = "1";
      if (immediate) {
        line.style.transitionDelay = "0s";
      } else {
        line.style.transitionDelay = `${index * slideStagger}s`;
      }
    });
  };

  useEffect(() => {
    if (!elementRef.current) return;

    const el = elementRef.current;
    const fullText = el.textContent || "";

    // Auto-detect background if not provided
    let finalIsDarkBg = isDarkBg;
    if (finalIsDarkBg === undefined) {
      const bgColor = window.getComputedStyle(el.parentElement || el).backgroundColor;
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
        finalIsDarkBg = brightness < 128;
      }
    }

    let finalStartColor = startColor;
    let finalEndColor = endColor;

    if (!startColor || !endColor) {
      if (finalIsDarkBg) {
        finalStartColor = finalStartColor || "#ffffff99";
        finalEndColor = finalEndColor || "#ffffff";
      } else {
        finalStartColor = finalStartColor || "#00000066";
        finalEndColor = finalEndColor || "#000000";
      }
    }

    const wordStartColor = disableColorReveal
      ? finalEndColor || "#000000"
      : finalStartColor || "#000000";
    const wordEndColor = finalEndColor || "#000000";
    const transitionEase = getEase(slideEase);

    const buildLines = () => {
      if (!el) return;
      const text = fullText.trim();
      if (!text) return;

      el.innerHTML = "";
      lineRefs.current = [];

      const tokens = text.match(/\S+\s*/g) || [];
      const fragment = document.createDocumentFragment();

      tokens.forEach((token) => {
        const word = document.createElement("span");
        word.className = "line-word";
        word.style.display = "inline-block";
        word.style.whiteSpace = "pre";
        word.textContent = token;
        fragment.appendChild(word);
      });

      el.appendChild(fragment);

      const wordSpans = Array.from(el.querySelectorAll(".line-word")) as HTMLElement[];
      const lines: HTMLElement[][] = [];
      let currentTop: number | null = null;

      wordSpans.forEach((word) => {
        const top = word.offsetTop;
        if (currentTop === null || Math.abs(top - currentTop) > 1) {
          lines.push([word]);
          currentTop = top;
        } else {
          lines[lines.length - 1].push(word);
        }
      });

      el.innerHTML = "";

      lines.forEach((line, index) => {
        const lineWrapper = document.createElement("span");
        lineWrapper.style.display = "block";
        lineWrapper.style.overflow = overflowHidden ? "hidden" : "visible";

        const lineInner = document.createElement("span");
        lineInner.style.display = "inline-block";
        lineInner.style.transform = "translateY(100%)";
        lineInner.style.opacity = "0";
        lineInner.style.color = wordStartColor;
        lineInner.style.transitionProperty = "transform, opacity, color";
        lineInner.style.transitionDuration = `${slideDuration}s`;
        lineInner.style.transitionTimingFunction = transitionEase;
        lineInner.style.transitionDelay = `${index * slideStagger}s`;

        line.forEach((word) => lineInner.appendChild(word));
        lineWrapper.appendChild(lineInner);
        el.appendChild(lineWrapper);
        lineRefs.current.push(lineInner);
      });

      if (revealedRef.current) {
        lineRefs.current.forEach((line) => {
          line.style.transform = "translateY(0)";
          line.style.opacity = "1";
          line.style.color = wordEndColor;
        });
      }
    };

    buildLines();

    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealedRef.current = true;
          lineRefs.current.forEach((line) => {
            line.style.transform = "translateY(0)";
            line.style.opacity = "1";
            line.style.color = wordEndColor;
          });
          if (observerRef.current) observerRef.current.disconnect();
        });
      },
      { threshold: 0.2 }
    );

    observerRef.current.observe(el);

    if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    resizeObserverRef.current = new ResizeObserver(() => {
      buildLines();
    });
    resizeObserverRef.current.observe(el);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, [
    isDarkBg,
    slideDuration,
    slideStagger,
    slideStart,
    slideEnd,
    slideEase,
    disableColorReveal,
    startColor,
    endColor,
    colorStart,
    colorEnd,
    colorScrub,
  ]);

  return React.createElement(
    as,
    {
      ref: elementRef,
      className,
    },
    children
  );
};

export default AnimatedText;
