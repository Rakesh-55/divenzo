"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { useScrollProgress } from "@/hooks/useScrollProgress";


gsap.registerPlugin(ScrollTrigger, Observer);

const projectsData = [
  {
    id: 1,
    image: "projects/project_1.png",
    imageAlt: "Project 1",
    title: "Practice Coach",
    desc: "Crafting conversion focus website for leading Practice Coach Company",
  },
  {
    id: 2,
    image: "projects/project_2.png",
    imageAlt: "Project 2",
    title: "RWIT",
    desc: "A Deep Dive into RWIT’s Website Redesign",
  },
  {
    id: 3,
    image: "projects/project_3.png",
    imageAlt: "Project 3",
    title: "Hitayu Dairy",
    desc: "Improving digital experience for a dairy farm",
  },
  {
    id: 4,
    image: "projects/project_4.png",
    imageAlt: "Project 4",
    title: "Bhaskara Hospitals",
    desc: "Crafting the new Brand Identity for Bhaskara Hospital",
  },
];

export const ProjectsSection = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const cardsWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(sectionRef);

  // Background: black → white
  const bgValue = progress * 255;
  // Text: white → black
  const textValue = 255 - progress * 255;

  const isDark = bgValue < 128;


  useEffect(() => {
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
      function tweenToLabel(label?: string) {
  if (!label || animating) return;

  animating = true;
  tl.tweenTo(label, {
    onComplete: () => {
      animating = false;

      // ✅ Allow scroll AFTER last card is fully visible
      if (label === "end") {
        cardsObserver.disable();
        ScrollTrigger.refresh();
      }
    },
  });
}


      const cardsObserver = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        tolerance: 10,
        preventDefault: true,
        onUp: () => tweenToLabel(tl.nextLabel()),
        onDown: () => tweenToLabel(tl.previousLabel()),
      });

      cardsObserver.disable();

      ScrollTrigger.create({
        trigger: cardsWrapperRef.current,
        start: "top top",
        end: `+=${cards.length * 10}%`,
        pin: true,
        scrub: false,
        onEnter: () => cardsObserver.enable(),
        onEnterBack: () => cardsObserver.enable(),
        onLeave: () => cardsObserver.disable(),
        onLeaveBack: () => cardsObserver.disable(),
      });
    }, cardsWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: `rgb(${bgValue}, ${bgValue}, ${bgValue})`,
        color: `rgb(${textValue}, ${textValue}, ${textValue})`,
      }}
      className="
        relative w-full overflow-hidden
        pt-[80px] sm:pt-[120px] lg:pt-[150px]
        pb-[40px]
        px-4 sm:px-8 lg:px-20
        transition-colors duration-500
         ${isDark ? "dark-section" : ""}
      "
    >
      {/* ================= HEADER ================= */}
      <header
        ref={headerRef}
        className="flex flex-col gap-[26px] mb-[40px] lg:mb-[60px] z-20 relative"
      >
        <h2
          ref={titleRef}
          className="
            [font-family:'Poppins',Helvetica] font-semibold text-white
            text-[56px] sm:text-[80px] lg:text-[120px]
            tracking-[0] leading-normal
          "
        >
          Projects
        </h2>

        <p
          ref={descRef}
          className="
            max-w-full lg:max-w-[930px]
            ml-0 lg:ml-auto
            [font-family:'Poppins',Helvetica] font-normal text-white
            text-[18px] sm:text-[24px] lg:text-[40px]
            tracking-[0] leading-normal
          "
        >
          Dive into our design journey. Our portfolio showcases how we transform
          concepts into real-world success through thoughtful, tailored design.
        </p>
      </header>

           {/* ================= MOBILE & TABLET ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4 lg:hidden">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-1  overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-[240px] sm:h-[280px] object-contain rounded-[20px]"
            />

            <div className="flex flex-col gap-2">
              <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[20px]">
                {project.title}
              </h3>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffcc] text-[16px]">
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
            h-[420px] sm:h-[520px] lg:h-[600px]
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
                rounded-[20px] overflow-hidden
                flex items-center justify-center
                shadow-2xl
              "
              style={{ zIndex: 100 + index }}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full object-contain rounded-[20px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
