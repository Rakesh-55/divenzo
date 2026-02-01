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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [collapseProgress, setCollapseProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Header height (navbar)
      const headerOffset = 80;
      
      // Calculate the sticky position for this section's heading
      const headingHeight = 80; // Approximate height of each heading
      const myStickyTop = headerOffset + (index * headingHeight);
      
      // When section heading reaches its sticky position
      const reachedStickyPoint = rect.top <= myStickyTop;
      
      if (!reachedStickyPoint) {
        // Not yet reached sticky point - fully expanded
        setCollapseProgress(0);
      } else {
        // Calculate collapse progress based on how far we've scrolled past sticky point
        const scrolledPastSticky = myStickyTop - rect.top;
        const collapseDistance = viewportHeight * 0.6; // Distance to fully collapse
        const progress = Math.min(1, Math.max(0, scrolledPastSticky / collapseDistance));
        setCollapseProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  // Animation calculations
  const headerOffset = 80; // Navbar height
  const headingHeight = 80;
  const stickyTopPosition = headerOffset + (index * headingHeight);
  
  // Content animations
  const contentMaxHeight = 1000 * (1 - collapseProgress); // Shrinks from 1000px to 0
  const contentOpacity = Math.max(0, 1 - (collapseProgress * 1.2));
  const contentScale = 1 - (collapseProgress * 0.05);
  
  // Heading size reduction when collapsed (for fitting all headings)
  const headingScale = 1 - (collapseProgress * 0.3);

  return (
    <div
      ref={sectionRef}
      className="relative bg-black"
      style={{
        paddingBottom: index === totalSections - 1 ? "50vh" : "0",
      }}
    >
      {/* Sticky Heading - Stacks below previous headings */}
      <div
        className="sticky z-30 bg-black/98 backdrop-blur-sm border-b border-white/5 px-4 sm:px-10 md:px-20 transition-all duration-100"
        style={{
          top: `${stickyTopPosition}px`,
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
        }}
      >
        <h2
          className="[font-family:'Poppins',Helvetica] font-semibold text-white"
          style={{
            fontSize: `clamp(20px, ${32 * headingScale}px, 48px)`,
            transform: `scale(${headingScale})`,
            transformOrigin: "left center",
            transition: "transform 0.1s ease-out, font-size 0.1s ease-out",
          }}
        >
          {number}. {title}
        </h2>
      </div>

      {/* Shrinking/Collapsing Content */}
      <div
        className="overflow-hidden bg-black"
        style={{
          maxHeight: `${contentMaxHeight}px`,
          opacity: contentOpacity,
          transform: `scale(${contentScale})`,
          transformOrigin: "top left",
          transition: "max-height 0.1s ease-out, opacity 0.1s ease-out, transform 0.1s ease-out",
        }}
      >
        <div className="px-4 sm:px-10 md:px-20 py-8 md:py-12">
          {/* Description */}
          <div className="ml-0 lg:ml-auto mb-6">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[16px] sm:text-[20px] lg:text-[28px] text-[#cccccc] max-w-[960px]">
              {description}
            </p>
          </div>

          {/* Points List */}
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
