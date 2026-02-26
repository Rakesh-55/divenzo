
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
    title: "Bhaskara Hospitals",
    desc: "Crafting the new Brand Identity for Bhaskara Hospital",
  },
  {
    id: 4,
    image: "projects/project_4.png",
    headerImage: "projects/project_4_header.png",
    imageAlt: "Project 4",
    title: "Hitayu Dairy",
    desc: "Improving digital experience for a dairy farm",
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

      // ❗ Stacked card animation → DESKTOP ONLY

      if (!isDesktop) return;

      const cards = cardsRef.current.filter(Boolean);
      if (cards.length < 2) return;

      // The distance (in pixels) each card peaks out from under the one above it
      const stackOffset = 40; 

      // Set initial positions
      gsap.set(cards[0], { y: 0, scale: 1 });
      for (let i = 1; i < cards.length; i++) {
        // Hide subsequent cards completely off-screen to start
        gsap.set(cards[i], { y: window.innerHeight, scale: 1 });
      }

      // Build timeline — each card slides up and scales down the ones behind it
      const tl = gsap.timeline();
      const snapPoints: number[] = [0];

      for (let i = 1; i < cards.length; i++) {
        // 1. Animate the NEW card coming up
        tl.to(
          cards[i],
          {
            y: i * stackOffset, // Stop slightly lower than the previous card
            duration: 1,
            ease: "none",
          },
          i === 1 ? 0 : "+=0" // Sequence them consecutively
        );

        // 2. Scale down ALL previously stacked cards simultaneously
        for (let j = 0; j < i; j++) {
          tl.to(
            cards[j],
            {
              scale: 1 - ((i - j) * 0.04), // Shrink 4% for every card stacked on top
              duration: 1,
              ease: "none",
              transformOrigin: "top center", // Crucial: scale from the top edge to keep the top pinned
            },
            "<" // Run at the exact same time as the new card coming up
          );
        }

        snapPoints.push(i / (cards.length - 1));
      }

      // Scroll-driven with snap
      ScrollTrigger.create({
        trigger: cardsWrapperRef.current,
        start: "top top",
        end: () => `+=${(cards.length - 1) * 150}%`, // Reduced end distance slightly so it feels faster
        pin: true,
        scrub: 0.5, // Smoother scrub
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
      {/* ================= HEADER & MOBILE CONTENT CONTAINER ================= */}
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

        <AnimatedText
          className="
            max-w-full
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-4 sm:gap-x-4 mb-4 lg:hidden">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-1  overflow-hidden"
          >
            <div className="relative w-full h-[240px] sm:h-[280px]">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full rounded-none object-contain"
              /> 
              
              {project.id === 4 && (
                <div className="absolute inset-0 z-20 flex flex-col gap-12 sm:gap-16 md:gap-12 lg:justify-between items-start justify-center lg:justify-between p-4 sm:p-6">
                  <h3 className="[font-family:'Poppins',Helvetica] font-normal text-white text-lg sm:text-2xl md:text-2xl leading-tight text-left lg:text-left">
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
                  <div className="space-y-1">
                    <p className="[font-family:'Poppins',Helvetica] font-normal text-white/90 text-xs sm:text-sm md:text-sm leading-snug text-left lg:text-left">
                      These aren't just projects they're stories. Stories of our clients, our craft, and the impact we've created together.
                    </p>
                    <Link
                      to="/projects"
                      className="[font-family:'Poppins',Helvetica] inline-block text-white text-xs sm:text-sm md:text-xs group relative"
                    >
                      View all Projects
                      <span className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-neutral-400/70 transition-opacity duration-300 group-hover:opacity-0" />
                      <span className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-current scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Hide title/description for the 4th card since it has the overlay CTA */}
            {project.id !== 4 && (
              <div className="flex flex-col gap-2">
                <h3 className="[font-family:'Poppins',Helvetica] font-semibold  text-[20px]">
                  <AnimatedText
                    as="span"
                    className="inline-block"
                    isDarkBg={isDark}
                    disableColorReveal
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {project.title}
                  </AnimatedText>
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal opacity-80 text-[16px]">
                  {project.desc}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
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
            relative w-full max-w-[1280px] mx-auto
            h-[460px] sm:h-[560px] lg:h-[95vh]
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
                absolute top-0 left-0 w-full
                rounded-[0px] overflow-hidden
                flex items-center justify-center
                shadow-2xl
              "
              style={{
                zIndex: 100 + index,
              }}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full rounded-[0px] object-contain"
              />
              
              {project.id === 4 && (
                <div className="absolute inset-0 z-20 flex flex-col justify-between lg:justify-center lg:gap-[160px] p-8 lg:p-12 xl:p-16">
                  <h3 className="[font-family:'Poppins',Helvetica] font-normal text-white text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl min-[1440px]:text-[120px] min-[1440px]:leading-[1.1] leading-tight">
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
                  <div className="space-y-2 max-w-2xl xl:max-w-3xl">
                    <p className="[font-family:'Poppins',Helvetica] font-normal text-white/90 text-base lg:text-xl xl:text-2xl min-[1440px]:text-[30px] min-[1440px]:leading-relaxed leading-relaxed">
                      These aren't just projects they're stories. Stories of our clients, our craft, and the impact we've created together.
                    </p>
                    <Link
                      to="/projects"
                      className="[font-family:'Poppins',Helvetica] inline-block text-white text-base lg:text-xl group relative"
                    >
                      View all Projects
                      <span className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-neutral-400/70 transition-opacity duration-300 group-hover:opacity-0" />
                      <span className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-current scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </Link>
                  </div>
                </div>
              )}
              {/* {project.headerImage && (
                <img
                  src={project.headerImage}
                  alt=""
                  className="absolute top-0 left-0 right-0 z-10 w-full h-auto object-contain pointer-events-none"
                />
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
     