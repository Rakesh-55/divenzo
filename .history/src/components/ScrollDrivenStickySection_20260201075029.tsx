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
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Fixed header is 80px
      const HEADER_HEIGHT = 80;
      const HEADING_HEIGHT = 80;
      
      // This section's sticky position
      const targetTop = HEADER_HEIGHT + (index * HEADING_HEIGHT);
      
      // Calculate progress
      if (rect.top > targetTop) {
        // Section hasn't reached sticky point yet
        setProgress(0);
      } else {
        // Section is at or past sticky point
        const scrolledAmount = targetTop - rect.top;
        const maxScroll = 500; // Pixels to scroll for full collapse
        setProgress(Math.min(1, scrolledAmount / maxScroll));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  const HEADER_HEIGHT = 80;
  const HEADING_HEIGHT = 80;
  const stickyPosition = HEADER_HEIGHT + (index * HEADING_HEIGHT);

  // Content collapse
  const contentHeight = 800 * (1 - progress);
  const contentOpacity = 1 - (progress * 1.4);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "150vh",
        paddingBottom: index === totalSections - 1 ? "100vh" : "0",
      }}
    >
      {/* Sticky Heading */}
      <div
        style={{
          position: "sticky",
          top: `${stickyPosition}px`,
          zIndex: 40,
          backgroundColor: "rgba(0, 0, 0, 0.98)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="px-4 sm:px-10 md:px-20 py-5">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[28px] sm:text-[36px] lg:text-[44px]">
            {number}. {title}
          </h2>
        </div>
      </div>

      {/* Collapsing Content */}
      <div
        style={{
          height: `${contentHeight}px`,
          opacity: Math.max(0, contentOpacity),
          overflow: "hidden",
          transition: "height 0.2s ease-out, opacity 0.2s ease-out",
        }}
      >
        <div className="px-4 sm:px-10 md:px-20 py-8 bg-black">
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
