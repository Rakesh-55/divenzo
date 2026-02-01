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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much the section has been scrolled
      // Progress: 0 = just entered viewport, 1 = content fully collapsed
      const sectionTop = rect.top;
      const headerHeight = 80; // Approximate header height
      const startPoint = windowHeight - headerHeight;
      const endPoint = headerHeight * (index + 1);

      if (sectionTop > startPoint) {
        setScrollProgress(0);
      } else if (sectionTop <= endPoint) {
        setScrollProgress(1);
      } else {
        const progress = (startPoint - sectionTop) / (startPoint - endPoint);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  // Calculate animation values
  const contentHeight = Math.max(0, 1 - scrollProgress) * 100; // 100% to 0%
  const contentOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const headingSize = Math.max(0.5, 1 - (scrollProgress * 0.5)); // Scale down heading when collapsed

  // Calculate sticky position - each heading stacks below previous ones
  const stickyTop = 80 + (index * 60); // 80px for navbar, 60px for each previous heading

  return (
    <div
      ref={sectionRef}
      className="relative bg-black"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* Sticky Heading - Stacks below previous headings */}
      <div
        className="sticky z-30 bg-black/95 backdrop-blur-sm border-b border-white/10 px-4 sm:px-10 md:px-20 py-4 transition-all duration-300"
        style={{
          top: `${stickyTop}px`,
          transform: `scale(${headingSize})`,
          transformOrigin: "left center",
        }}
      >
        <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[24px] sm:text-[32px] lg:text-[40px] text-white whitespace-nowrap">
          {number}. {title}
        </h2>
      </div>

      {/* Shrinking Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: `${contentHeight}vh`,
          opacity: contentOpacity,
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
