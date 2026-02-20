"use client";
import React, { useEffect, useRef } from "react";
// import { Navbar } from "@/components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/AnimatedText";
// import { useScrollProgress } from "@/hooks/useScrollProgress";

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = ["Strategy!", "Design", "Code!", "Marketing!", "Strategy!"];

export const HeroSection = (): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  // const sectionRef = useRef<HTMLElement | null>(null);
  // const progress = useScrollProgress(sectionRef);

  // const textColorValue = 180 + progress * 75; // grey → white


  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      // 🟣 Fade-in heading (UNCHANGED)
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

      // 🎯 Rotating words one at a time
      const tl = gsap.timeline({ repeat: -1 });
      const wordHeight =
        marqueeRef.current?.firstElementChild instanceof HTMLElement
          ? marqueeRef.current.firstElementChild.getBoundingClientRect().height
          : window.innerWidth < 640
          ? 40
          : 48;

      // All words - 2 seconds each with cylinder rolling effect
      rotatingWords.forEach((_, index) => {
        tl.to(
          marqueeRef.current,
          {
            y: -index * wordHeight,
            duration: 0.6,
            ease: "power2.inOut",
          },
          index * 2
        );
      });

      // 🎥 Image animation (DESKTOP ONLY)
      if (isDesktop) {
        const img = imageRef.current;
        const text = textRef.current;
        const wrapper = imageWrapperRef.current;
        const heading = headingRef.current;

        if (!img || !text || !wrapper || !heading) return;

        const headingRect = heading.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        const textRect = text.getBoundingClientRect();

        const headingWidth = headingRect.width;
        // Center image under the heading
        const headingCenterX = headingRect.left + headingRect.width / 2;
        const targetX = headingCenterX - headingWidth / 2 - imgRect.left;
        // Place image right below the text paragraph
        const targetY = textRect.bottom - imgRect.top + 50;

        // Force initial size
        gsap.set(img, {
          width: 400,
          height: 228,
          x: 0,
          y: 0,
          borderRadius: "0px",
          maxWidth: "none",
          zIndex: 2,
        });

        // No pin — just scrub the image transform as user scrolls
        gsap.to(img, {
          width: headingWidth,
          height: "80vh",
          x: targetX,
          y: targetY,
          borderRadius: "0px",
          zIndex: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 60%",
            end: "top 10%",
            scrub: 0.5,
          },
        });

        // Image wrapper appears above text during scroll (start immediately)
        gsap.to(wrapper, {
          zIndex: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 75%",
            end: "top 10%",
            scrub: 0.5,
          },
        });

        // Push text behind image during scroll (start immediately)
        gsap.to(text, {
          zIndex: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 75%",
            end: "top 10%",
            scrub: 0.5,
          },
        });
      } else {
        const img = imageRef.current;
        if (!img) return;

        // Mobile: keep layout stable (no pin), just a subtle scale/height change
        gsap.to(img, {
          width: "100%",
          height: "45vh",
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top 75%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-white overflow-visible z-10">
      {/* <Navbar /> */}

      {/* 🟣 TITLE + ROTATING WORDS */}
      <div
        className="
          flex flex-col gap-4 z-10 relative
          px-4 sm:px-8 lg:px-12 xl:px-[71px]
        "
      >
        <h1
          ref={headingRef}
          className="
            flex items-center justify-center
            font-varela font-bold text-black text-center
            tracking-[0] whitespace-nowrap
            text-[56px] leading-[70px]
            sm:text-[120px] sm:leading-[150px]
            md:text-[160px] md:leading-[200px]
            lg:text-[140px] lg:leading-[180px]
            xl:text-[355px] xl:leading-[450px]
          "
        >
          Divenzo
        </h1>

        <div
          className="
            flex gap-2 flex-wrap
             sm:ml-6 lg:ml-[45px]
          "
        >
          <AnimatedText className="flex items-center justify-center [font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[32px]"
          isDarkBg={false}
          disableColorReveal
          slideDuration={0.8}
          slideStagger={0.08}
          >
            Building brands through
          </AnimatedText>

          <div
            className="
              overflow-hidden
              w-[100px] sm:w-[140px] lg:w-[180px]
              h-[28px] sm:h-[40px] lg:h-[48px]
            "
          >
            <div
              ref={marqueeRef}
              className="flex flex-col items-start gap-0"
            >
              {rotatingWords.map((word, index) => (
                <div
                  key={index}
                  className="
                    flex items-center justify-center h-[28px] sm:h-[40px] lg:h-[48px]
                    [font-family:'Poppins',Helvetica] font-semibold
                    text-[14px] sm:text-[20px] lg:text-[32px]
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

      {/* 🖼 IMAGE + TEXT */}
      <div
        className="
          relative
          max-w-[1280px] mx-auto mt-6 lg:mt-16
          px-4 sm:px-8
          lg:pb-[80vh]
        "
      >
        {/* Row: image + text */}
        <div className="relative flex flex-col lg:block items-start gap-10">
          {/* Image — absolutely positioned on desktop so it doesn't push text */}
          <div
            ref={imageWrapperRef}
            className="relative lg:absolute lg:top-0 lg:left-[-34px] flex-shrink-0"
          >
            <img
              ref={imageRef}
              src="/hero_image.png"
              alt="Expanding Image"
              className="
                object-cover shadow-xl z-[2]
                w-full
                h-[200px] sm:h-[240px]
                lg:w-[400px] lg:h-[228px]
                will-change-transform
                flex-shrink-0
              "
            />
          </div>

          {/* Text — stays in place, not affected by image growth */}
          <div ref={textRef} className="mt-4 lg:mt-0 lg:relative lg:top-[114px]" style={{ zIndex: 3 }}>
            <AnimatedText
              className="
                [font-family:'Poppins',Helvetica]
                font-normal text-black
                text-[16px] sm:text-[20px] lg:text-[32px]
                leading-[1.4]
                lg:ml-[506px]
                relative
              "
              isDarkBg={false}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              Digital design isn&apos;t static — it&apos;s alive. Brands today need
              movement, meaning, and emotion. We blend strategy, creativity, and
              storytelling to craft experiences that capture attention, spark
              action, and leave a lasting impression.
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
};
