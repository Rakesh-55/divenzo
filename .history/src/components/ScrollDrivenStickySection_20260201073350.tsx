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
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRef.current.offsetTop;
      const scrollTop = window.scrollY;

      // Calculate progress: 0 when just entering, 1 when fully scrolled
      const triggerPoint = containerTop;
      const scrollDistance = scrollTop - triggerPoint;
      const maxScroll = 400; // Distance to fully collapse content

      const currentProgress = Math.max(0, Math.min(1, scrollDistance / maxScroll));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Content fades out as user scrolls
  const contentOpacity = Math.max(0, 1 - progress * 1.2);

  return (
    <div ref={containerRef} id={id} className="relative w-full">
      {/* STICKY HEADING - Always holds position */}
      <div
        ref={titleRef}
        className="sticky top-0 z-30 bg-black px-4 sm:px-10 md:px-20 py-6 md:py-8 border-b border-white/5"
      >
        <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-white">
          {number}. {title}
        </h2>
      </div>

      {/* COLLAPSIBLE CONTENT - Fades out on scroll */}
      <div
        ref={contentRef}
        className="px-4 sm:px-10 md:px-20 py-8 md:py-12 bg-black"
        style={{
          opacity: contentOpacity,
          transition: "opacity 0.15s ease-out",
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

      {/* Scrollable spacer */}
      <div className="h-80 bg-black"></div>
    </div>
  );
};
