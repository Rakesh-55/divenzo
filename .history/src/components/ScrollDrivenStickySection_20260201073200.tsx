import React, { useRef, useEffect, useState } from "react";

interface ScrollDrivenStickySectionProps {
  id: string;
  number: string;
  title: string;
  description: string;
  points: string[];
}

export const ScrollDrivenStickySection: React.FC<ScrollDrivenStickySectionProps> = ({
  id,
  number,
  title,
  description,
  points,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !contentRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Check if section becomes sticky (when it enters viewport)
      const shouldBeSticky = containerTop <= 0 && rect.bottom > 0;
      setIsSticky(shouldBeSticky);

      // Calculate scroll progress for this section
      const contentTop = containerRef.current.offsetTop;
      const contentBottom = contentTop + containerHeight;
      const scrollTop = window.scrollY;
      const viewportStart = scrollTop;
      const viewportEnd = scrollTop + windowHeight;

      // Calculate how much of the content is within the viewport
      const visibleStart = Math.max(viewportStart, contentTop);
      const visibleEnd = Math.min(viewportEnd, contentBottom);
      const visibleHeight = Math.max(0, visibleEnd - visibleStart);

      // Map visible height to progress (0 = fully visible, 1 = fully scrolled past)
      const relativeProgress = 1 - visibleHeight / windowHeight;
      const clampedProgress = Math.max(0, Math.min(1, relativeProgress));

      setProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate animation values
  // As progress goes from 0 → 1, content fades out
  const contentOpacity = Math.max(0, 1 - progress * 1.2); // Fades from 1 to 0
  const contentScale = Math.max(0.95, 1 - progress * 0.05); // Slight scale reduction

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full transition-all duration-0`}
    >
      <div
        className={`${
          isSticky
            ? "fixed top-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-md border-b border-white/10"
            : "relative bg-black"
        } px-4 sm:px-10 md:px-20 py-8 md:py-12`}
      >
        {/* Header: Always Visible Title/Number on Left */}
        <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-white mb-6 md:mb-8">
          {number}. {title}
        </h2>

        {/* Collapsible Content - Fades Out on Scroll */}
        <div
          ref={contentRef}
          style={{
            opacity: contentOpacity,
            transform: `scale(${contentScale})`,
            transformOrigin: "top left",
            transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
            pointerEvents: progress > 0.9 ? "none" : "auto",
          }}
        >
          {/* Description */}
          <div className="ml-0 lg:ml-auto mb-6">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[16px] sm:text-[20px] lg:text-[28px] text-[#cccccc] max-w-[960px]">
              {description}
            </p>
          </div>

          {/* Points List */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 list-disc pl-6">
            {points.map((point, index) => (
              <li
                key={index}
                className="[font-family:'Poppins',Helvetica] font-normal text-[15px] sm:text-[18px] lg:text-[20px] text-[#ffffffcc]"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Spacer to allow scrolling */}
      <div className="h-96 bg-black"></div>
    </div>
  );
};

