"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = ["Strategy!", "Design", "Code!", "Marketing!", "Strategy!"];

export const HeroSection = (): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const setupAnimations = () => {
      if (ctx) ctx.revert();

      const isDesktop = window.innerWidth >= 1024;

      ctx = gsap.context(() => {
        // ── Fade-in heading on load ──
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ── Rotating words (infinite, time-based) ──
        const wordTl = gsap.timeline({ repeat: -1 });
        const wordHeight = window.innerWidth < 640 ? 40 : 48;

        rotatingWords.forEach((_, index) => {
          wordTl.to(
            marqueeRef.current,
            { y: -index * wordHeight, duration: 0.6, ease: "power2.inOut" },
            index * 2
          );
        });

        // ── Scroll-driven hero cinematic effect ──
        if (isDesktop) {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=180%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              pinSpacing: true,
            },
          });

          // Image: subtle cinematic zoom — transform-only, stays centered
          scrollTl.fromTo(
            imageRef.current,
            { scale: 1, opacity: 1 },
            { scale: 1.12, opacity: 1, ease: "none" },
            0
          );
        } else {
          // ── Mobile: no pin, gentle scroll-linked scale on image ──
          gsap.fromTo(
            imageRef.current,
            { scale: 1 },
            {
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      }, sectionRef);
    };

    setupAnimations();

    const resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupAnimations();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(resizeTimer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
    >
      <div ref={contentRef}>
        {/* ── TITLE + ROTATING WORDS ── */}
        <div className="flex flex-col gap-12 z-10 relative px-4 sm:px-8 lg:px-[71px]">
          <h1
            ref={headingRef}
            className="
              flex items-center justify-center
              font-varela font-bold text-black text-center
              tracking-[0] whitespace-nowrap
              text-[96px] leading-[110px]
              sm:text-[160px] sm:leading-[200px]
              lg:text-[355px] lg:leading-[450px]
            "
          >
            Divenzo
          </h1>

          <div className="flex gap-2 flex-wrap sm:ml-6 lg:ml-[45px]">
            <div className="flex items-center justify-center [font-family:'Poppins',Helvetica] font-normal text-black text-[16px] sm:text-[24px] lg:text-[32px]">
              Building brands through
            </div>

            <div className="overflow-hidden w-[140px] sm:w-[160px] lg:w-[180px] h-[40px] sm:h-[48px]">
              <div ref={marqueeRef} className="flex flex-col items-start gap-0">
                {rotatingWords.map((word, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center justify-center h-[40px] sm:h-[48px]
                      [font-family:'Poppins',Helvetica] font-semibold
                      text-[16px] sm:text-[24px] lg:text-[32px]
                      text-[#2b2b2b]
                    "
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── IMAGE (left) + TEXT (right) ── */}
        <div
          className="
            relative flex flex-col lg:flex-row
            items-start lg:items-center
            max-w-[1280px] mx-auto mt-6 lg:mt-16 gap-10
            px-4 sm:px-8
          "
        >
          {/* Left column — image stays fixed in its column center */}
          <div className="relative flex-shrink-0 flex items-center justify-center lg:w-[50%]">
            <img
              ref={imageRef}
              src="/unsplash.png"
              alt="Hero visual"
              className="
                object-cover shadow-xl rounded-xl
                w-full max-w-[420px] h-auto
                will-change-transform
              "
            />
          </div>

          {/* Right column — text scrolls up and fades out */}
          <div
            ref={textRef}
            className="lg:w-[50%] will-change-transform"
          >
            <p
              className="
                [font-family:'Poppins',Helvetica]
                font-normal text-black
                text-[16px] sm:text-[20px] lg:text-[28px]
                leading-[1.4]
              "
            >
              Digital design isn&apos;t static — it&apos;s alive. Brands today need
              movement, meaning, and emotion. We blend strategy, creativity, and
              storytelling to craft experiences that capture attention, spark
              action, and leave a lasting impression.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
