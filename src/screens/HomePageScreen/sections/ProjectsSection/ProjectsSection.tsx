"use client";
import { useEffect, useRef, type JSX } from "react";
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
    title: "RWIT",
    desc: "A Deep Dive into RWIT’s Website Redesign",
    mobileBg: "projects/mobile_projectcards/mobile_1_bg.png",
    mobileImage: "projects/mobile_projectcards/mobile_1_image.png",
    mobileLogo: "projects/mobile_projectcards/mobile_1_logo.png",
  },
  {
    id: 2,
    image: "projects/project_2.png",
    headerImage: "projects/project_2_header.png",
    imageAlt: "Project 2",
    title: "Practice Coach",
    desc: "Crafting conversion focus website for leading Practice Coach Company",
    mobileBg: "projects/mobile_projectcards/mobile_2_bg.png",
    mobileImage: "projects/mobile_projectcards/mobile_2_image.png",
    mobileLogo: "projects/mobile_projectcards/mobile_2_logo.png",
  },
  {
    id: 3,
    image: "projects/project_3.png",
    headerImage: "projects/project_3_header.png",
    imageAlt: "Project 3",
    title: "Bhaskara Hospitals",
    desc: "Crafting the new Brand Identity for Bhaskara Hospital",
    mobileBg: "projects/mobile_projectcards/mobile_3_bg.png",
    mobileImage: "projects/mobile_projectcards/mobile_3_image.png",
    mobileLogo: "projects/mobile_projectcards/mobile_3_logo.png",
  },
  {
    id: 4,
    image: "projects/project_4.png",
    headerImage: "projects/project_4_header.png",
    imageAlt: "Project 4",
    title: "Hitayu Dairy",
    desc: "Improving digital experience for a dairy farm",
    mobileBg: "projects/mobile_projectcards/mobile_4_bg.png",
    // mobile image/logo not provided for item 4
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
    // I DELETED the `if (window.innerWidth <= 425) return;` here so your cards actually work.
    const ctx = gsap.context(() => {
      // 🟢 HEADER ANIMATION
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: false,
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

      // ❗ Stacked card animation → ALL SCREENS
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length < 2) return;

      const isDesktop = window.innerWidth >= 1024;
      const stackOffset = isDesktop ? 40 : 24; 

      // Set initial positions
      gsap.set(cards[0], { y: 0, scale: 1 });
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], { y: "120%", scale: 1 });
      }

      // Build timeline
      const tl = gsap.timeline();
      const snapPoints: number[] = [0];

      for (let i = 1; i < cards.length; i++) {
        tl.to(
          cards[i],
          {
            y: i * stackOffset, 
            duration: 1,
            ease: "none",
          },
          i === 1 ? 0 : "+=0" 
        );

        for (let j = 0; j < i; j++) {
          tl.to(
            cards[j],
            {
              scale: 1 - ((i - j) * 0.04), 
              duration: 1,
              ease: "none",
              transformOrigin: "top center", 
            },
            "<" 
          );
        }

        snapPoints.push(i / (cards.length - 1));
      }

      // Scroll-driven with snap
      ScrollTrigger.create({
        trigger: cardsWrapperRef.current,
        start: "top top",
        end: () => `+=${(cards.length - 1) * 150}%`,
        pin: true,
        scrub: 0.5, 
        snap: {
          snapTo: snapPoints,
          duration: { min: 0.2, max: 0.5 },
          delay: 0.1,
          ease: "power1.inOut",
        },
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

    }, sectionRef);

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
        pt-[40px] sm:pt-[50px] lg:pt-[150px]
        pb-[50px] sm:pb-[50px] lg:pb-[50px]
        px-4 sm:px-8 lg:px-8 xl:px-20
        transition-colors duration-700
        ${isDark ? "dark-section" : ""}
      `}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* ================= HEADER ================= */}
        <header
          ref={headerRef}
          className="flex flex-col gap-[26px] mb-[40px] lg:mb-[60px] z-20 relative"
        >
          <h2
            ref={titleRef}
            className="
              [font-family:'Poppins',Helvetica] font-semibold 
              text-[40px] sm:text-[56px] md:text-[100px] lg:text-[100px]
              tracking-[0] leading-normal
            "
          >
            <AnimatedText
              as="span"
              className="block"
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              Projects
            </AnimatedText>
          </h2>

          <div className="max-w-full lg:max-w-[930px] ml-0 lg:ml-auto">
            <AnimatedText
              className="
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
          </div>
        </header>
      </div>

      {/* ================= STACKED CARDS ================= */}
      <div
        ref={cardsWrapperRef}
        className="
          relative w-full
          h-screen
          flex items-start justify-center
          overflow-hidden
          pt-[10vh] lg:pt-[5vh]
        "
      >
        <div
          className="
            relative w-full max-w-[1280px] mx-auto
            h-[65vh] sm:h-[75vh] lg:h-[95vh]
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
                shadow-2xl bg-[#0a0a0a]
              "
              style={{
                zIndex: 100 + index,
              }}
            >
              {/* DESKTOP IMAGE */}
              <img
                src={project.image}
                alt={project.imageAlt}
                className="hidden md:block w-full h-full rounded-[0px] object-cover object-bottom"
              />

              {/* MOBILE VARIANT */}
              <div className="block md:hidden relative w-full h-full">
                {project.mobileBg && (
                  <img
                    src={project.mobileBg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {project.mobileLogo && (
                  <img
                    src={project.mobileLogo}
                    alt="logo"
                    className={`absolute top-12 h-auto ${
                      index === 0 ? "w-[60px] left-8" :  "w-[108px] left-8"
                    }`}
                  />
                )}
                <div className="absolute inset-0 flex flex-col justify-between items-center p-4 pt-28">
                  <div className="max-w-[90%] w-full">
                    <div
                      className={`text-white text-base md:text-lg mb-4 [font-family:'Poppins',Helvetica] text-left ${
                        project.id === 4 ? "hidden md:block" : ""
                      }`}
                    >
                      {project.desc}
                    </div>
                  </div>
                  {project.mobileImage && (
                    <div className={`bg-transparent p-0 mb-4 flex items-end justify-center ${
                      index === 1 ? "w-full max-w-[90%] pb-4 h-[140px]" : index === 2 ? "max-w-[65%] h-[50px]" : "w-full max-w-[90%] h-[140px]"
                    }`}>
                      <img
                        src={project.mobileImage}
                        alt=""
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* CARD 4 OVERLAY */}
              {project.id === 4 && (
                <div className="absolute inset-0 z-20 flex flex-col justify-center gap-24 lg:justify-center lg:gap-[150px] p-6 sm:p-8 lg:p-12 xl:p-16 lg:pb-[150px]">
                  <h3 className="[font-family:'Poppins',Helvetica] font-normal text-white text-3xl sm:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl min-[1440px]:text-[120px] min-[1440px]:leading-[1.1] leading-tight lg:-mt-20">
                    <AnimatedText
                      as="span"
                      className="inline-block"
                      isDarkBg
                      disableColorReveal
                      slideDuration={0.8}
                      slideStagger={0.08}
                    >
                      Explore Projects
                    </AnimatedText>
                  </h3>
                  <div className="max-w-2xl xl:max-w-4xl space-y-4 lg:space-y-0">
                    <p className="[font-family:'Poppins',Helvetica] font-normal text-white/90 leading-normal text-[15px] sm:text-[18px] lg:text-[32px]">
                      These aren't just projects they're stories. Stories of our clients, our craft, and the impact we've created together.{" "}
                      
                      <Link
                        to="/projects"
                        className="inline-block text-white group relative w-fit transition-transform duration-300 hover:scale-105 origin-left lg:ml-2"
                      >
                        <span className="font-medium">View all Projects</span>
                        <span className="absolute left-0 -bottom-1 h-[1px] lg:h-[2px] w-full bg-white/30 transition-opacity duration-300 group-hover:opacity-0" />
                        <span className="absolute left-0 -bottom-1 h-[1px] lg:h-[2px] w-full bg-current scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};