import React, { useRef, ReactNode } from "react";
import { useSectionProgress } from "@/hooks/useSectionProgress";

interface ScrollDrivenSectionProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const ScrollDrivenSection: React.FC<ScrollDrivenSectionProps> = ({
  children,
  title,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { progress } = useSectionProgress(containerRef);

  // Animation values
  // Progress: 0 = full content, 0.5 = mid-collapse, 1 = fully collapsed
  const scale = Math.max(0.85, 1 - progress * 0.15); // Scales from 1 to 0.85
  const opacity = Math.max(0, 1 - progress * 1.5); // Fades out faster than scale
  const translateY = progress * 60; // Moves up as it collapses

  return (
    <div
      ref={containerRef}
      className={`relative w-full transition-all duration-300 ${className}`}
    >
      {/* Title - Always visible, never animates */}
      {title && (
        <div className="sticky top-0 z-40 bg-gradient-to-b from-black to-black/90 backdrop-blur-sm py-6 lg:py-8">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[56px] sm:text-[80px] lg:text-[120px] tracking-[0] leading-[1] whitespace-nowrap">
            {title}
          </h2>
        </div>
      )}

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className="origin-top px-4 sm:px-8 lg:px-20 py-8 lg:py-12"
        style={{
          transform: `scale(${scale}) translateY(-${translateY}px)`,
          opacity: Math.max(0.3, opacity),
          transformOrigin: "top center",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out",
        }}
      >
        {children}
      </div>

      {/* Debug Progress Bar (Remove in production) */}
      <div className="fixed bottom-4 right-4 z-50 hidden">
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="text-white text-xs mt-2 text-right">{(progress * 100).toFixed(0)}%</p>
      </div>
    </div>
  );
};
