"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { AnimatedText } from "../../../../components/AnimatedText";

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

export const ServicesSection = (): JSX.Element => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imagePosition, setImagePosition] = useState({ top: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

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
      }).from(
        descRef.current,
        {
          x: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6"
      );
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
      className="
        relative w-full bg-black overflow-hidden
        py-[80px] sm:py-[100px] lg:py-[120px]
        px-4 sm:px-8 lg:px-20
        dark-section
      "
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
              [font-family:'Poppins',Helvetica] font-semibold text-white
              text-[56px] sm:text-[80px] lg:text-[120px]
              tracking-[0] leading-[1]
              whitespace-nowrap
            "
          >
            Services
          </h2>

          <div className="max-w-full lg:max-w-[930px] ml-0 lg:ml-auto">
            <p
              ref={descRef}
              className="
                [font-family:'Poppins',Helvetica] font-normal text-white
                text-[18px] sm:text-[24px] lg:text-[40px]
                tracking-[0] leading-normal
              "
            >
              We start every project by listening to understand your needs so we
              can give you the time, attention and care you deserve.
            </p>

            <Button
              variant="link"
              className="h-auto w-fit p-0 flex flex-col items-start gap-1 mt-4"
            >
              <span
                className="
                  [font-family:'Poppins',Helvetica] font-normal text-white
                  text-[20px] sm:text-[24px] lg:text-[32px]
                "
              >
                Discover More
              </span>
              <div className="w-[160px] sm:w-[190px] lg:w-[226px] h-0.5 bg-[#ffffff66]" />
            </Button>
          </div>
        </header>

        {/* ================= SERVICES LIST ================= */}
        <div className="flex flex-col relative">
          {servicesData.map((service, index) => (
            <React.Fragment key={index}>
              <Separator className="bg-[#5d5d5d] h-px" />
              <div
                className="
                  service-item flex flex-col lg:flex-row
                  gap-6 lg:gap-12
                  py-8 sm:py-10 lg:py-12
                  transition-colors duration-300
                  cursor-pointer
                "
                onMouseEnter={() => isDesktop && setHoveredIndex(index)}
                onMouseLeave={() => isDesktop && setHoveredIndex(null)}
              >
                <div className="w-full lg:w-[436px] flex-shrink-0">
                  <h3
                    className="
                      [font-family:'Poppins',Helvetica] font-semibold text-white
                      text-[28px] sm:text-[36px] lg:text-5xl
                      tracking-[0] leading-normal
                      whitespace-pre-line
                    "
                  >
                    {service.number}
                    {"\n"}
                    {service.title}
                  </h3>
                </div>

                <div className="flex-1">
                  <p
                    className="
                      [font-family:'Poppins',Helvetica] font-normal text-[#ffffffcc]
                      text-base lg:text-[32px]
                      tracking-[0] leading-normal
                    "
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
          <Separator className="bg-[#5d5d5d] h-px" />
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
