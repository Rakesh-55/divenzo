import React, { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: ReactNode;
  // Background detection
  isDarkBg?: boolean; // true = black bg (white text), false = white bg (black text)
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
 * Animates text word-by-word with slide-up and color transition effects
 * Automatically detects background color (black/white) and adjusts text colors
 * 
 * Examples:
 * <AnimatedText>Our work speaks through numbers...</AnimatedText>
 * <AnimatedText isDarkBg={true}>Text on black background</AnimatedText>
 * <AnimatedText isDarkBg={false}>Text on white background</AnimatedText>
 * <AnimatedText startColor="#999" endColor="#fff">Custom colors</AnimatedText>
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  // Background detection
  isDarkBg,
  // Slide up defaults
  slideDuration = 1.2,
  slideStagger = 0.12,
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
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const el = elementRef.current;
    const fullText = el.textContent || "";

    // Auto-detect background if not provided
    let finalIsDarkBg = isDarkBg;
    if (finalIsDarkBg === undefined) {
      // Check parent or element background
      const bgColor = window.getComputedStyle(el.parentElement || el).backgroundColor;
      // Simple detection: if background is dark, assume dark bg
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
        finalIsDarkBg = brightness < 128;
      }
    }

    // Determine colors based on background
    let finalStartColor = startColor;
    let finalEndColor = endColor;

    if (!startColor || !endColor) {
      if (finalIsDarkBg) {
        // Dark background: light gray → white
        finalStartColor = finalStartColor || "#ffffff99"; // White with opacity
        finalEndColor = finalEndColor || "#ffffff"; // White
      } else {
        // Light/white background: light gray → black
        finalStartColor = finalStartColor || "#00000066"; // Black with opacity (gray)
        finalEndColor = finalEndColor || "#000000"; // Black
      }
    }

    const ctx = gsap.context(() => {
      // Split text into words and wrap them
      const words = fullText.split(" ").map((word, i) =>
        i === 0
          ? // First word: visible, no animation
            `<span class='word inline-block overflow-hidden' style='color: ${finalIsDarkBg ? "#ffffff" : "#000000"};'>${word}</span>`
          : // Other words: wrapped for slide-up animation with start color
            `<span class='word inline-block overflow-hidden' style='color: ${finalStartColor};'><span class='inner block translate-y-full opacity-0'>${word}</span></span>`
      );

      el.innerHTML = words.join(" ");

      // ============ ANIMATION 1: SLIDE UP ============
      const innerWords = el.querySelectorAll(".inner");
      gsap.to(innerWords, {
        y: 0,
        opacity: 1,
        duration: slideDuration,
        ease: slideEase,
        stagger: {
          each: slideStagger,
          from: "start",
        },
        scrollTrigger: {
          trigger: el,
          start: slideStart,
          end: slideEnd,
          toggleActions: "play none none reverse",
        },
      });

      // ============ ANIMATION 2: COLOR TRANSITION ============
      const grayWords = el.querySelectorAll(".word:not(:first-child)");
      gsap.to(grayWords, {
        color: finalEndColor,
        stagger: {
          each: slideStagger * 0.8,
          amount: slideDuration,
        },
        scrollTrigger: {
          trigger: el,
          start: colorStart,
          end: colorEnd,
          scrub: colorScrub ? true : false,
        },
      });
    }, el);

    // Cleanup ScrollTrigger instances created by this component
    return () => {
      ctx.revert();
    };
  }, [
    isDarkBg,
    slideDuration,
    slideStagger,
    slideStart,
    slideEnd,
    slideEase,
    startColor,
    endColor,
    colorStart,
    colorEnd,
    colorScrub,
  ]);

  return (
    <div
      ref={elementRef}
      className={className}
    >
      {children}
    </div>
  );
};

export default AnimatedText;
