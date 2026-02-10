import React, { useState, useRef, useEffect } from "react";
import { AnimatedText } from "@/components/AnimatedText";

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  link?: string;
  disableCursorEffect?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  category,
  link = "#",
  disableCursorEffect = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disableCursorEffect || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Smooth cursor follow with inertia
  useEffect(() => {
    if (!isHovered || disableCursorEffect) return;

    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.15);

      setCursorPos({
        x: currentPos.current.x,
        y: currentPos.current.y,
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovered, disableCursorEffect]);

  return (
    <a
      ref={cardRef}
      href={link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`group relative block w-full ${
        disableCursorEffect ? "cursor-pointer" : "cursor-none"
      }`}
    >
      {/* Image */}
      <div className="relative w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Project Info (always visible below) */}
      <div className="mt-6">
        <p className="[font-family:'Poppins',Helvetica] font-normal text-[18px] sm:text-[20px] lg:text-[24px] text-black">
          <AnimatedText
            as="span"
            className="inline-block"
            disableColorReveal
            startColor="currentColor"
            endColor="currentColor"
            slideDuration={0.8}
            slideStagger={0.08}
          >
            {title}
          </AnimatedText>
        </p>
        <p className="[font-family:'Poppins',Helvetica] font-normal text-[14px] sm:text-[16px] lg:text-[18px] text-[#000000cc]">
          <AnimatedText
            as="span"
            className="inline-block"
            disableColorReveal
            startColor="currentColor"
            endColor="currentColor"
            slideDuration={0.8}
            slideStagger={0.08}
          >
            {category}
          </AnimatedText>
        </p>
      </div>

      {/* Custom Cursor */}
      {!disableCursorEffect && isHovered && (
        <div
          ref={cursorRef}
          className="pointer-events-none absolute z-50 mix-blend-difference"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="relative flex items-center justify-center bg-white rounded-full transition-all duration-500"
            style={{
              width: isHovered ? "120px" : "0px",
              height: isHovered ? "120px" : "0px",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <span
              className="text-black text-sm font-medium tracking-wide transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                transitionDelay: isHovered ? "100ms" : "0ms",
              }}
            >
              View Case
            </span>
          </div>
        </div>
      )}
    </a>
  );
};
