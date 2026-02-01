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
      // Progress starts when content top reaches viewport, ends when it leaves
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
  // As progress goes from 0 → 1, content compresses
  const descriptionScale = Math.max(0.4, 1 - progress * 0.6); // Scales from 1 to 0.4
  const descriptionOpacity = Math.max(0, 1 - progress * 1.2); // Fades from 1 to 0
  const pointsScale = Math.max(0.3, 1 - progress * 0.7); // Points scale more aggressively
  const pointsOpacity = Math.max(0, 1 - progress * 1.5); // Points fade faster
  const gapReduce = progress * 1.5; // Reduce gaps between elements
  const translateDown = progress * -20; // Slight upward movement

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full transition-all duration-0 ${
        isSticky ? "sticky top-0 z-30" : ""
      }`}
    >
      {/* Always Visible Title/Number */}
      <div
        className={`flex flex-col gap-4 md:gap-8 px-4 sm:px-10 md:px-20 py-8 md:py-12 ${
          isSticky
            ? "bg-black/95 backdrop-blur-md border-b border-white/10"
            : "bg-black"
        }`}
      >
        <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-white">
          {number}. {title}
        </h2>

        {/* Collapsible Content */}
        <div
          ref={contentRef}
          style={{
            transform: `translateY(${translateDown}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* Description */}
          <div
            style={{
              transform: `scale(${descriptionScale})`,
              opacity: descriptionOpacity,
              transformOrigin: "top left",
              transition:
                "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.1s ease-out",
            }}
            className="ml-0 lg:ml-auto mb-4"
          >
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[16px] sm:text-[20px] lg:text-[28px] text-[#cccccc] max-w-[960px]">
              {description}
            </p>
          </div>

          {/* Points List */}
          <ul
            style={{
              transform: `scale(${pointsScale})`,
              opacity: pointsOpacity,
              marginTop: `${Math.max(12, 24 - gapReduce * 8)}px`,
              transformOrigin: "top left",
              transition:
                "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.1s ease-out, margin-top 0.1s ease-out",
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 list-disc pl-6"
          >
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

      {/* Progress indicator for debugging (hidden) */}
      {false && (
        <div className="fixed bottom-4 left-4 z-50 text-white text-xs">
          <div>Section: {title}</div>
          <div>Progress: {(progress * 100).toFixed(1)}%</div>
          <div>Sticky: {isSticky ? "Yes" : "No"}</div>
          <div className="w-32 h-1 bg-white/20 mt-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
