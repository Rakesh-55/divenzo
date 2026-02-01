import React, { useRef, useEffect, useState } from "react";

interface ScrollDrivenStickySectionProps {
  number: string;
  title: string;
  description: string;
  points: string[];
}

export const ScrollDrivenStickySection: React.FC<ScrollDrivenStickySectionProps> = ({
  number,
  title,
  description,
  points,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      // When content top reaches viewport top (sticky becomes active)
      const triggerPoint = 0;
      const distanceFromTrigger = contentRect.top - triggerPoint;

      // Calculate opacity: starts fading when content hits top
      const opacity = Math.max(0, 1 - Math.max(0, -distanceFromTrigger) / 200);
      setContentOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full">
      {/* Sticky Header - Always stays */}
      <div className="sticky top-0 z-40 bg-black/98 backdrop-blur-sm border-b border-white/5">
        <div className="px-4 sm:px-10 md:px-20 py-6 md:py-8">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-white">
            {number}. {title}
          </h2>
        </div>
      </div>

      {/* Fading Content */}
      <div
        ref={contentRef}
        className="px-4 sm:px-10 md:px-20 py-8 md:py-12 bg-black"
        style={{
          opacity: contentOpacity,
          transition: "opacity 0.2s ease-out",
        }}
      >
        <div className="ml-0 lg:ml-auto mb-6">
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[16px] sm:text-[20px] lg:text-[28px] text-[#cccccc] max-w-[960px]">
            {description}
          </p>
        </div>

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

      {/* Spacer for scrolling */}
      <div className="h-64 bg-black"></div>
    </div>
  );
};
