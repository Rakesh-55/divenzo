"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PinnedTextRevealProps {
  text: string;
  className?: string;
  isDark?: boolean;
}

export const PinnedTextReveal = ({ text, className = "", isDark = false }: PinnedTextRevealProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      
      const topLayers = containerRef.current.querySelectorAll('.word-top-layer');
      
      gsap.fromTo(
        topLayers,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true, 
            start: "center center", 
            end: "+=150%", 
            scrub: 1, 
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Protects against font-load layout shifts
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }, containerRef); // Scopes the animation strictly to this component instance

    return () => ctx.revert(); // Cleans up perfectly when unmounted
  }, []);

  return (
    <div className="w-full relative">
      <div ref={containerRef} className={className}>
        {text.split(' ').map((word, index) => (
          <span key={index} className="relative inline-block mr-[0.3em]">
            <span 
              className="word-base-layer transition-colors duration-700"
              style={{ 
                opacity: 0.3,
                color: isDark ? '#999999' : '#666666'
              }}
            >
              {word}
            </span>
            <span 
              className="word-top-layer absolute inset-0 transition-colors duration-700"
              style={{ 
                opacity: 0,
                color: isDark ? '#ffffff' : '#000000'
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};