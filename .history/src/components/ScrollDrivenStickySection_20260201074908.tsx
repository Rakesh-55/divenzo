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
      const headerHeight = 80;

      // Calculate sticky position for this heading
      const headingStackHeight = 70; // Space each heading takes when stacked
      const myStickyPosition = headerHeight + (index * headingStackHeight);

      // Calculate collapse progress for content
      if (rect.top > myStickyPosition) {
        // Not yet reached sticky position
        setCollapseProgress(0);
      } else {
        // At or past sticky position - calculate how far past
        const distancePast = myStickyPosition - rect.top;
        const collapseDistance = 400; // Distance in pixels to fully collapse
        const progress = Math.min(1, Math.max(0, distancePast / collapseDistance));
        setCollapseProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  // Animation values
  const headerHeight = 80;
  const headingStackHeight = 70;
  const stickyTop = headerHeight + (index * headingStackHeight);

  // Content animations - collapses to 0
  const contentMaxHeight = 700 * (1 - collapseProgress);
  const contentOpacity = Math.max(0, 1 - (collapseProgress * 1.5));
  const contentScale = Math.max(0.95, 1 - (collapseProgress * 0.05));

  // Heading size reduces as more stack
  const headingSizeMultiplier = 1 - (Math.min(index, 3) * 0.08); // Reduce by 8% for each stacked item

  return (
    <div
      ref={sectionRef}
      className="relative bg-black"
      style={{
        // Give enough height for scrolling and stacking
        minHeight: "100vh",
        paddingBottom: index === totalSections - 1 ? "60vh" : "0",
      }}
    >
      {/* Sticky Heading - MUST stay visible and stack below previous ones */}
      <div
        className="sticky z-40 bg-black/98 backdrop-blur-md border-b border-white/5"
        style={{
          top: `${stickyTop}px`,
        }}
      >
        <div className="px-4 sm:px-10 md:px-20 py-4 md:py-5">
          <h2
            className="[font-family:'Poppins',Helvetica] font-semibold text-white transition-all duration-200"
            style={{
              fontSize: `clamp(20px, ${42 * headingSizeMultiplier}px, 48px)`,
            }}
          >
            {number}. {title}
          </h2>
        </div>
      </div>

      {/* Collapsing Content - Shrinks and fades below heading */}
      <div
        className="bg-black"
        style={{
          maxHeight: `${contentMaxHeight}px`,
          opacity: contentOpacity,
          transform: `scale(${contentScale})`,
          transformOrigin: "top left",
          overflow: "hidden",
          transition: "max-height 0.25s ease-out, opacity 0.25s ease-out, transform 0.25s ease-out",
        }}
      >
        <div className="px-4 sm:px-10 md:px-20 py-6 md:py-10">
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
