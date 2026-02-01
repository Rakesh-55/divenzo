import React, { useRef, useEffect, useState } from "react";

interface ScrollDrivenStickySectionProps {
  number: string;
  title: string;
  description: string;
  points: string[];
  index: number;
  totalSections: number;
}

export const ScrollDrivenStickySection: React.FC<ScrollDrivenStickySectionProps> = ({
  number,
  title,
  description,
  points,
  index,
  totalSections,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const updateProgress = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const headerHeight = 80;

      // Calculate this section's sticky position
      const headingStackHeight = 70; // Height allocated for each stacked heading
      const thisStickyTop = headerHeight + (index * headingStackHeight);

      // Check if section has reached its sticky position
      if (rect.top > thisStickyTop) {
        setProgress(0); // Not yet sticky
      } else if (rect.bottom < thisStickyTop + headingStackHeight) {
        setProgress(1); // Fully collapsed and past
      } else {
        // Calculate progress based on scroll within this section
        const availableHeight = rect.height - headingStackHeight;
        const scrolledAmount = thisStickyTop - rect.top;
        const calculatedProgress = Math.min(1, Math.max(0, scrolledAmount / (windowHeight * 0.5)));
        setProgress(calculatedProgress);
      }
    };

    const handleScroll = () => {
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [index]);

  // Calculate positions and animations
  const headerHeight = 80;
  const headingStackHeight = 70;
  const thisStickyTop = headerHeight + (index * headingStackHeight);

  // Content collapse animations
  const contentHeight = 800 * (1 - progress); // Collapses from 800px to 0
  const contentOpacity = 1 - (progress * 1.3); // Fades out
  const contentTranslateY = progress * -30; // Slight upward motion
  
  // Heading scale down for stacking
  const headingScale = 1 - (progress * 0.25); // Reduces to 75% when collapsed

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{
        minHeight: index === totalSections - 1 ? "150vh" : "120vh",
      }}
    >
      {/* Sticky Heading */}
      <div
        className="sticky z-40 bg-black/95 backdrop-blur-md border-b border-white/10"
        style={{
          top: `${thisStickyTop}px`,
        }}
      >
        <div
          className="px-4 sm:px-10 md:px-20 py-4 md:py-5"
          style={{
            transform: `scale(${headingScale})`,
            transformOrigin: "left center",
            transition: "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          <h2
            className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[28px] sm:text-[36px] lg:text-[44px]"
            style={{
              fontSize: `clamp(22px, ${36 * headingScale}px, 44px)`,
            }}
          >
            {number}. {title}
          </h2>
        </div>
      </div>

      {/* Collapsing Content */}
      <div
        className="overflow-hidden bg-black"
        style={{
          height: `${contentHeight}px`,
          opacity: Math.max(0, contentOpacity),
          transform: `translateY(${contentTranslateY}px)`,
          transition: "height 0.15s ease-out, opacity 0.15s ease-out, transform 0.15s ease-out",
        }}
      >
        <div className="px-4 sm:px-10 md:px-20 py-8 md:py-12">
          <div className="ml-0 lg:ml-auto mb-6">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[16px] sm:text-[20px] lg:text-[28px] text-[#cccccc] max-w-[960px]">
              {description}
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 list-disc pl-6">
            {points.map((point, idx) => (
              <li
                key={idx}
                className="[font-family:'Poppins',Helvetica] font-normal text-[15px] sm:text-[18px] lg:text-[20px] text-[#ffffffcc]"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
