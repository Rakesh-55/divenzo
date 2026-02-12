
"use client";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { AnimatedText } from "@/components/AnimatedText";


gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    image: "projects/project_1.png",
    headerImage: "projects/project_1_header.png",
    imageAlt: "Project 1",
    title: "Practice Coach",
    desc: "Crafting conversion focus website for leading Practice Coach Company",
  },
  {
    id: 2,
    image: "projects/project_2.png",
    headerImage: "projects/project_2_header.png",
    imageAlt: "Project 2",
    title: "RWIT",
    desc: "A Deep Dive into RWIT’s Website Redesign",
  },
  {
    id: 3,
    image: "projects/project_3.png",
    headerImage: "projects/project_3_header.png",
    imageAlt: "Project 3",
    title: "Hitayu Dairy",
    desc: "Improving digital experience for a dairy farm",
  },
  {
    id: 4,
    image: "projects/project_4.png",
    headerImage: "projects/project_4_header.png",
    imageAlt: "Project 4",
    title: "Bhaskara Hospitals",
    desc: "Crafting the new Brand Identity for Bhaskara Hospital",
  },
];

interface ProjectsSectionProps {
  theme?: "light" | "dark";
}

export const ProjectsSection = ({ theme }: ProjectsSectionProps): JSX.Element => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const cardsWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(sectionRef);

  const isDark = theme ? theme === "dark" : progress > 0.5;


  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      // 🟢 HEADER ANIMATION
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      headerTimeline
        .from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          descRef.current,
          {
            x: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // ❗ Stacked card animation → DESKTOP ONLY
      if (!isDesktop) return;

      const cards = cardsRef.current.filter(Boolean);
      if (cards.length < 2) return;

      // First card visible, rest hidden below
      gsap.set(cards[0], { yPercent: 0 });
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], { yPercent: 100 });
      }

      // Build timeline — each card slides up to cover the previous
      const tl = gsap.timeline();
      const snapPoints: number[] = [0];

      for (let i = 1; i < cards.length; i++) {
        tl.to(cards[i], {
          yPercent: 0,
          duration: 1,
          ease: "none",
        });
        snapPoints.push(i / (cards.length - 1));
      }

      // Scroll-driven with snap — works with every scroll method
      ScrollTrigger.create({
        trigger: cardsWrapperRef.current,
        start: "top top",
        end: () => `+=${(cards.length - 1) * 300}%`,
        pin: true,
        scrub: 0.6,
        snap: {
          snapTo: snapPoints,
          duration: { min: 0.25, max: 0.6 },
          delay: 0.1,
          ease: "power1.inOut",
        },
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, cardsWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="projects"
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
      className={`
        relative w-full overflow-hidden
        pt-[80px] sm:pt-[120px] lg:pt-[150px]
        pb-[40px]
        px-4 sm:px-8 lg:px-20
        transition-colors duration-700
        ${isDark ? "dark-section" : ""}
      `}
    >
      {/* ================= HEADER ================= */}
      <header
        ref={headerRef}
        className="flex flex-col gap-[26px] mb-[40px] lg:mb-[60px] z-20 relative"
      >
        <h2
          ref={titleRef}
          className="
            [font-family:'Poppins',Helvetica] font-semibold 
            text-[56px] sm:text-[80px] lg:text-[120px]
            tracking-[0] leading-normal
          "
        >
          Projects
        </h2>

        <AnimatedText
          className="
            max-w-full lg:max-w-[930px]
            ml-0 lg:ml-auto
            [font-family:'Poppins',Helvetica] font-normal 
            text-[18px] sm:text-[24px] lg:text-[32px]
            tracking-[0] leading-normal
          "
          isDarkBg={isDark}
          disableColorReveal
          slideDuration={0.8}
          slideStagger={0.08}
        >
          Dive into our design journey. Our portfolio showcases how we transform concepts into real-world success through thoughtful, tailored design.
        </AnimatedText>
      </header>

           {/* ================= MOBILE & TABLET ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4 lg:hidden">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-1  overflow-hidden"
          >
            <div className="relative w-full h-[240px] sm:h-[280px]">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full object-cover rounded-none sm:rounded-[20px]"
              />
              {project.id === 4 && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="relative z-20 h-full w-full flex flex-col justify-between px-6 py-6">
                    <h3 className="[font-family:'Poppins',Helvetica] font-normal text-white text-[28px] sm:text-[36px] leading-tight">
                      Explore Projects
                    </h3>
                    <p className="[font-family:'Poppins',Helvetica] font-normal text-white/90 text-[14px] sm:text-[16px] max-w-[320px]">
                      These aren’t just projects they’re stories. Stories of our clients, our craft, and the impact we’ve created together.
                      <Link
                        to="/projects"
                        className="ml-2 inline-block text-white group relative"
                      >
                        View all Projects
                        <span
                          className="
                            absolute left-0 -bottom-1 h-[1.5px] w-full
                            bg-neutral-400/70 transition-opacity duration-300
                            group-hover:opacity-0
                          "
                        />
                        <span
                          className="
                            absolute left-0 -bottom-1 h-[1.5px] w-full
                            bg-current scale-x-0 origin-left
                            transition-transform duration-500 ease-out
                            group-hover:scale-x-100
                          "
                        />
                      </Link>
                    </p>
                  </div>
                </div>
              )}
              {project.headerImage && (
                <img
                  src={project.headerImage}
                  alt=""
                  className="absolute top-0 left-0 right-0 z-10 w-full h-auto object-contain pointer-events-none"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="[font-family:'Poppins',Helvetica] font-semibold  text-[20px]">
                {project.title}
              </h3>
              <p className="[font-family:'Poppins',Helvetica] font-normal opacity-80 text-[16px]">
                {project.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= STACKED CARDS ================= */}
      <div
        ref={cardsWrapperRef}
        className="
          relative w-full
          h-screen
          hidden lg:flex items-start justify-center
          overflow-hidden
          pt-[5vh]
        "
      >
        <div
          className="
            relative w-full sm:w-[90%]
            h-[460px] sm:h-[560px] lg:h-[85vh]
            overflow-hidden
          "
        >
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="
                absolute top-0 left-0 w-full h-full
                rounded-[0px] overflow-hidden
                flex items-center justify-center
                shadow-2xl
              "
              style={{ zIndex: 100 + index }}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full object-cover rounded-[0px]"
              />
              {project.id === 4 && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-20 h-full w-full flex flex-col justify-between px-20 py-20">
                    <h3 className="[font-family:'Poppins',Helvetica] font-normal text-white text-[62px] sm:text-[78px] lg:text-[105px] leading-tight">
                      Explore Projects
                    </h3>
                    <p className="[font-family:'Poppins',Helvetica] font-normal text-white/90 text-[18px] sm:text-[24px] lg:text-[32px] max-w-[860px]">
                      These aren’t just projects they’re stories. Stories of our clients, our craft, and the impact we’ve created together.
                      <Link
                        to="/projects"
                        className="ml-2 inline-block text-white group relative"
                      >
                        View all Projects
                        <span
                          className="
                            absolute left-0 -bottom-1 h-[1.5px] w-full
                            bg-neutral-400/70 transition-opacity duration-300
                            group-hover:opacity-0
                          "
                        />
                        <span
                          className="
                            absolute left-0 -bottom-1 h-[1.5px] w-full
                            bg-current scale-x-0 origin-left
                            transition-transform duration-500 ease-out
                            group-hover:scale-x-100
                          "
                        />
                      </Link>
                    </p>
                  </div>
                </div>
              )}
              {project.headerImage && (
                <img
                  src={project.headerImage}
                  alt=""
                  className="absolute top-0 left-0 right-0 z-10 w-full h-auto object-contain pointer-events-none"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
     