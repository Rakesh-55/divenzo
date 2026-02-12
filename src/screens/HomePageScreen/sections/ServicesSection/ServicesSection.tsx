"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { AnimatedText } from "../../../../components/AnimatedText";
import { useScrollProgress } from "@/hooks/useScrollProgress";

import imgResearch from "../../../../../public/client/s_research.png";
import imgMarket from "../../../../../public/client/s_marketing.png";
import imgDevelopment from "../../../../../public/client/s_evelopment.png";
import imgDesign from "../../../../../public/client/s_design.png";
import imgContentWriting from "../../../../../public/client/s_content_writing.png";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    number: "01.",
    title: "Research",
    description:
      "We improvise to provide meaningful, data-driven insights that capture the user's voice and align with business objectives, seamlessly integrating with our UI/UX design and development services.",
    image: imgResearch,
  },
  {
    number: "02.",
    title: "Design",
    description:
      "We approach design as a collaborative journey, bringing together diverse stakeholder insights to craft impactful experiences and scalable solutions through our UI/UX design and consulting expertise.",
    image: imgDesign,
  },
  {
    number: "03.",
    title: "Development",
    description:
      "We transform your ideas into functional, scalable digital products—ranging from websites and mobile apps to enterprise platforms and solutions.",
    image: imgDevelopment,
  },
  {
    number: "04.",
    title: "Content \n Writing",
    description:
      "Content creation is the craft of developing engaging digital material that resonates with your audience. It blends text, visuals, and multimedia to boost reach, SEO, and interaction.",
    image: imgContentWriting,
  },
  {
    number: "05.",
    title: "Digital \n Marketing",
    description:
      "We craft digital experiences that don't just look good they perform. Our marketing strategies blend creativity with data to drive visibility, engagement, and growth. From SEO and ads to content and social campaigns, we turn your brand into a digital powerhouse.",
    image: imgMarket,
  },
];

interface ServicesSectionProps {
  theme?: "light" | "dark";
}

export const ServicesSection = ({ theme }: ServicesSectionProps): JSX.Element => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imagePosition, setImagePosition] = useState({ top: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(sectionRef);

  const isDark = theme ? theme === "dark" : progress > 0.5;

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 1024;

  // 🟢 Header animation (unchanged)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // 🟣 Hover image (DESKTOP ONLY)
  useLayoutEffect(() => {
    if (!isDesktop) return;

    if (hoveredIndex !== null && containerRef.current) {
      const hoveredElement =
        containerRef.current.querySelectorAll(".service-item")[hoveredIndex];
      if (hoveredElement) {
        const rect = hoveredElement.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const relativeTop = rect.top - containerRect.top + rect.height / 2;
        setImagePosition({ top: relativeTop });
      }
    }
  }, [hoveredIndex, isDesktop]);

  return (
    <section
      ref={sectionRef}
      data-section="services"
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
      className={`
        relative w-full overflow-hidden
        py-[80px] sm:py-[100px] lg:py-[120px]
        px-4 sm:px-8 lg:px-20
        transition-colors duration-700
        ${isDark ? "dark-section" : ""}
      `}
    >
      <div className="max-w-[1280px] mx-auto relative" ref={containerRef}>
        {/* 🖼 Hover Image (desktop only) */}
        {isDesktop && hoveredIndex !== null && (
          <div
            className="absolute left-[220px] pointer-events-none transition-all duration-500 ease-in-out"
            style={{
              top: `${imagePosition.top}px`,
              transform: "translateY(-20%)",
            }}
          >
            <img
              src={servicesData[hoveredIndex].image}
              alt={servicesData[hoveredIndex].title}
              className="w-[200px] h-[200px] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] opacity-0 translate-x-[-40px] animate-[fadeSlideIn_0.5s_ease_forwards]"
            />
          </div>
        )}

        {/* ================= HEADER ================= */}
        <header
          ref={headerRef}
          className="flex flex-col gap-8 lg:gap-12 mb-[40px] lg:mb-[60px]"
        >
          <h2
            ref={titleRef}
            className="
              [font-family:'Poppins',Helvetica] font-semibold text-inherit
              text-[56px] sm:text-[80px] lg:text-[120px]
              tracking-[0] leading-[1]
              whitespace-nowrap
            "
          >
            Services
          </h2>

          <div className="max-w-full lg:max-w-[930px] ml-0 lg:ml-auto">
            <AnimatedText
              className="
                [font-family:'Poppins',Helvetica] font-normal text-inherit
                text-[18px] sm:text-[24px] lg:text-[32px]
                tracking-[0] leading-normal
              "
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              We start every project by listening to understand your needs so we
              can give you the time, attention and care you deserve.
            </AnimatedText>

            <Button
              variant="link"
              className="relative h-auto w-fit p-0 pb-4 mt-8 text-inherit hover:text-inherit group no-underline hover:no-underline"
            >
              <span
                className="
                  [font-family:'Poppins',Helvetica] font-normal text-inherit
                  text-[20px] sm:text-[24px] lg:text-[32px] 
                "
              >
                Discover More
              </span>
              <span
                className="
                  absolute left-0 -bottom-1 h-0.5 w-full
                  bg-current opacity-40 transition-opacity duration-300
                  group-hover:opacity-0
                "
              />
              <span
                className="
                  absolute left-0 -bottom-1 h-0.5 w-full
                  bg-current scale-x-0 origin-left
                  transition-transform duration-500 ease-out
                  group-hover:scale-x-100
                "
              />
            </Button>
          </div>
        </header>

        {/* ================= SERVICES LIST ================= */}
        <div className="flex flex-col relative">
          {servicesData.map((service, index) => (
            <React.Fragment key={index}>
              <Separator className="bg-current opacity-30 h-px" />
              <div
                className={`
                  service-item flex flex-col lg:flex-row
                  gap-6 lg:gap-12
                  min-h-[300px]
                  py-8 sm:py-10 lg:py-12
                  transition-all duration-300
                  cursor-pointer
                  ${
                    hoveredIndex !== null && hoveredIndex !== index
                      ? "opacity-30"
                      : "opacity-100"
                  }
                `}
                onMouseEnter={() => isDesktop && setHoveredIndex(index)}
                onMouseLeave={() => isDesktop && setHoveredIndex(null)}
              >
                <div className="w-full lg:w-[436px] flex-shrink-0">
                  <div className="flex flex-col gap-2">
                    <AnimatedText
                      className="
                        [font-family:'Poppins',Helvetica] font-semibold text-inherit
                        text-[28px] sm:text-[36px] lg:text-5xl
                        tracking-[0] leading-[0.5] pb-1
                      "
                      isDarkBg={isDark}
                      disableColorReveal
                      overflowHidden={false}
                      slideDuration={0.8}
                      slideStagger={0.08}
                    >
                      {service.number}
                    </AnimatedText>

                    {(() => {
                      const normalizedTitle = service.title.replace(/\s*\n\s*/g, " ").trim();
                      const words = normalizedTitle.split(/\s+/);
                      const firstLine = words[0] || "";
                      const secondLine = words.slice(1).join(" ");

                      return (
                        <>
                          <AnimatedText
                            className="
                              [font-family:'Poppins',Helvetica] font-semibold text-inherit
                              text-[28px] sm:text-[36px] lg:text-5xl
                              tracking-[0] leading-[0.5] pb-1
                            "
                            isDarkBg={isDark}
                            disableColorReveal
                            overflowHidden={false}
                            slideDuration={0.8}
                            slideStagger={0.08}
                          >
                            {firstLine}
                          </AnimatedText>

                          {secondLine && (
                            <AnimatedText
                              className="
                                [font-family:'Poppins',Helvetica] font-semibold text-inherit
                                text-[28px] sm:text-[36px] lg:text-5xl
                                tracking-[0] leading-[0.5] pb-1
                              "
                              isDarkBg={isDark}
                              disableColorReveal
                              overflowHidden={false}
                              slideDuration={0.8}
                              slideStagger={0.08}
                            >
                              {secondLine}
                            </AnimatedText>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex-1">
                  <AnimatedText
                    className="
                      [font-family:'Poppins',Helvetica] font-normal text-inherit opacity-80
                      text-base lg:text-[24px]
                      tracking-[0] leading-normal
                    "
                    isDarkBg={isDark}
                    disableColorReveal
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {service.description}
                  </AnimatedText>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 🔹 Keyframes (unchanged) */}
      <style>
        {`
          @keyframes fadeSlideIn {
            0% {
              opacity: 0;
              transform: translateX(-40px) translateY(-50%);
            }
            100% {
              opacity: 1;
              transform: translateX(0) translateY(-50%);
            }
          }
        `}
      </style>
    </section>
  );
};
