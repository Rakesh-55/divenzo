import React, { useState, useRef, useEffect } from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  link?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  category,
  link = "#",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Smooth cursor follow with inertia
  useEffect(() => {
    if (!isHovered) return;

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
  }, [isHovered]);

  return (
    <a
      ref={cardRef}
      href={link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative block w-full aspect-[4/3] overflow-hidden rounded-2xl cursor-none"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Overlay */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovered ? 0.2 : 0,
          }}
        />
      </div>

      {/* Project Info */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
        <div
          className="transform transition-all duration-700 ease-out"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "150ms",
          }}
        >
          <p className="text-white/70 text-sm lg:text-base font-medium mb-2 uppercase tracking-wider">
            {category}
          </p>
          <h3 className="text-white text-2xl lg:text-4xl font-semibold [font-family:'Poppins',Helvetica]">
            {title}
          </h3>
        </div>
      </div>

      {/* Custom Cursor */}
      {isHovered && (
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
