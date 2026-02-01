import React, { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: ReactNode;
  // Slide up animation
  slideDuration?: number;
  slideStagger?: number;
  slideStart?: string;
  slideEnd?: string;
  slideEase?: string;
  // Color transition animation
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
 * Perfect for hero headings and key messages
 * 
 * Example:
 * <AnimatedText>Our work speaks through numbers. Here's what we've achieved so far.</AnimatedText>
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  // Slide up defaults (same as About.tsx)
  slideDuration = 1.2,
  slideStagger = 0.12,
  slideStart = "top 85%",
  slideEnd = "top 50%",
  slideEase = "power4.out",
  // Color transition defaults
  startColor = "#00000066", // Light gray
  endColor = "#000000", // Black
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

    // Split text into words and wrap them
    const words = fullText.split(" ").map((word, i) =>
      i === 0
        ? // First word: black, no animation
          `<span class='word inline-block text-black overflow-hidden'>${word}</span>`
        : // Other words: gray, wrapped for slide-up animation
          `<span class='word inline-block overflow-hidden' style='color: ${startColor};'><span class='inner block translate-y-full opacity-0'>${word}</span></span>`
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
      color: endColor,
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

    // Cleanup ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
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
      style={{
        color: startColor,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedText;
