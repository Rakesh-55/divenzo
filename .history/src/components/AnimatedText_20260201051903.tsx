import React, { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: ReactNode;
  type?: "slideUpAndColor" | "slideUp" | "colorTransition" | "fadeInUp";
  duration?: number;
  stagger?: number;
  startColor?: string;
  endColor?: string;
  triggerStart?: string;
  triggerEnd?: string;
  ease?: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  type = "slideUpAndColor",
  duration = 1.2,
  stagger = 0.12,
  startColor = "#00000066",
  endColor = "#000000",
  triggerStart = "top 85%",
  triggerEnd = "top 50%",
  ease = "power4.out",
  className = "",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const el = elementRef.current;
    const fullText = el.textContent || "";

    // Split text into words and wrap them
    const words = fullText.split(" ").map((word, i) => {
      if (type === "slideUpAndColor" || type === "slideUp") {
        // First word stays visible, others wrapped for animation
        return i === 0
          ? `<span class='word inline-block overflow-hidden'>${word}</span>`
          : `<span class='word inline-block overflow-hidden'><span class='inner block translate-y-full opacity-0'>${word}</span></span>`;
      } else if (type === "colorTransition") {
        // All words wrapped for color transition
        return `<span class='word inline-block'>${word}</span>`;
      } else if (type === "fadeInUp") {
        // Words wrapped with opacity and transform
        return `<span class='word inline-block opacity-0 block' style='transform: translateY(30px);'>${word}</span>`;
      }
      return `<span class='word inline-block'>${word}</span>`;
    });

    el.innerHTML = words.join(" ");

    // Animation logic based on type
    if (type === "slideUpAndColor") {
      // Slide up animation
      const innerWords = el.querySelectorAll(".inner");
      gsap.to(innerWords, {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger: { each: stagger },
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none reverse",
        },
      });

      // Color transition animation
      const grayWords = el.querySelectorAll(".word:not(:first-child)");
      gsap.to(grayWords, {
        color: endColor,
        stagger: { each: stagger * 0.8, amount: duration },
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });
    } else if (type === "slideUp") {
      // Only slide up without color change
      const innerWords = el.querySelectorAll(".inner");
      gsap.to(innerWords, {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger: { each: stagger },
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none reverse",
        },
      });
    } else if (type === "colorTransition") {
      // Only color transition
      const words = el.querySelectorAll(".word");
      gsap.to(words, {
        color: endColor,
        duration: duration * 0.8,
        stagger: { each: stagger },
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          end: triggerEnd,
          scrub: true,
        },
      });
    } else if (type === "fadeInUp") {
      // Fade in and slide up
      const words = el.querySelectorAll(".word");
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger: { each: stagger },
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none reverse",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [type, duration, stagger, startColor, endColor, triggerStart, triggerEnd, ease]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        color: type === "colorTransition" || type === "slideUpAndColor" ? startColor : "inherit",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedText;
