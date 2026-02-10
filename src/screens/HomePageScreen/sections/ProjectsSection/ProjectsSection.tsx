"use client";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { AnimatedText } from "@/components/AnimatedText";


gsap.registerPlugin(ScrollTrigger, Observer);

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

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      document.body.style.overflow = "";
    };
        const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      // 🟢 HEADER ANIMATION (UNCHANGED)
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

      // ❗ Heavy stacked animation → DESKTOP ONLY
      if (!isDesktop) return;

      const cards = cardsRef.current;
      const duration = 0.8;
      let animating = false;

      gsap.set(cards, {
        y: (i) => i * 30,
        transformOrigin: "top top",
        opacity: 1,
      });

      const tl = gsap.timeline({ paused: true });

      cards.forEach((_, i) => {
        if (i === 0) return;
        const label = `card${i + 1}`;
        tl.add(label);
        tl.to(cards[i - 1], {
          duration,
          ease: "power2.out",
        });
        tl.from(
          cards[i],
          {
            y: "100vh",
            duration,
            ease: "power4.out",
          },
          "<"
        );
      });
      tl.add("end");

      // function tweenToLabel(label: string | undefined) {
      //   if (!label) {
      //     cardsObserver.disable();
      //     gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
      //     return;
      //   }
      //   if (!animating) {
      //     animating = true;
      //     tl.tweenTo(label, {
      //       onComplete: () => {
      //         animating = false;
      //       },
      //     });
      //   }
      // }
      const exitStack = (direction: "up" | "down") => {
        cardsObserver.disable();
        unlockScroll();
        disableKeys();
        window.scrollBy({
          top: direction === "down" ? 60 : -60,
          behavior: "instant",
        });
        ScrollTrigger.refresh();
      };

      function tweenToLabel(label: string | undefined, direction: "up" | "down") {
        if (!label) {
          exitStack(direction);
          return;
        }
        if (animating) return;

        animating = true;
        tl.tweenTo(label, {
          onComplete: () => {
            animating = false;

            // ✅ release scroll ONLY after last card
            if (label === "end") {
              cardsObserver.disable();
              unlockScroll();
              ScrollTrigger.refresh();
            }
          },
        });
      }

      const onKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement | null;
        if (target?.closest("input, textarea, select, [contenteditable='true']")) {
          return;
        }

        if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
          event.preventDefault();
          tweenToLabel(tl.nextLabel(), "down");
        }

        if (event.key === "ArrowUp" || event.key === "PageUp") {
          event.preventDefault();
          tweenToLabel(tl.previousLabel(), "up");
        }
      };

      let keysActive = false;
      const enableKeys = () => {
        if (keysActive) return;
        window.addEventListener("keydown", onKeyDown, { passive: false });
        keysActive = true;
      };
      const disableKeys = () => {
        if (!keysActive) return;
        window.removeEventListener("keydown", onKeyDown);
        keysActive = false;
      };


      const cardsObserver = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: 1,
        tolerance: 6,
        preventDefault: true,
        onUp: () => tweenToLabel(tl.previousLabel(), "up"),
        onDown: () => tweenToLabel(tl.nextLabel(), "down"),
      });

      cardsObserver.disable();

      ScrollTrigger.create({
        trigger: cardsWrapperRef.current,
        start: "top top",
        end: `+=${cards.length * 60}%`, // 👈 more breathing room
        pin: true,
        scrub: false,
        anticipatePin: 1,

        onEnter: () => {
          lockScroll();
          animating = false;
          tl.progress(0).pause();
          cardsObserver.enable();
          enableKeys();
        },

        onEnterBack: () => {
          lockScroll();
          animating = false;
          tl.progress(1).pause();
          cardsObserver.enable();
          enableKeys();
        },

        onLeave: () => {
          cardsObserver.disable();
          unlockScroll();
          disableKeys();
        },

        onLeaveBack: () => {
          cardsObserver.disable();
          unlockScroll();
          disableKeys();
        },
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
          h-[60vh] sm:h-[70vh] lg:h-[80vh]
          hidden lg:flex items-center justify-center

        "
      >
        <div
          className="
            relative w-full sm:w-[90%]
            h-[460px] sm:h-[560px] lg:h-[650px]
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
     