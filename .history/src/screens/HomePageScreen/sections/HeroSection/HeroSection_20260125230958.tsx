"use client";
import React, { useEffect, useRef } from "react";
// import { Navbar } from "@/components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/useScrollProgress";

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = ["Strategy!",];

export const HeroSection = (): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(sectionRef);

  const textColorValue = 180 + progress * 75; // grey → white


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

      // 🎥 Image animation (DESKTOP ONLY – logic unchanged)
      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 40%",
            end: "+=50%",
            scrub: 1.05,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          imageRef.current,
          {
            width: "300px",
            height: "170px",
            borderRadius: "16px",
            scale: 1,
            transformOrigin: "left center",
          },
          {
            width: "80vw",
            height: "40vh",
            borderRadius: "12px",
            ease: "expo.inOut",
            duration: 1.2,
          },
          0
        );

        tl.to(
          imageRef.current,
          {
            width: "60vw",
            height: "40vh",
            borderRadius: "10px",
            scale: 1.08,
            ease: "power4.inOut",
            duration: 1,
          },
          0.6
        );

        tl.to(
          textRef.current,
          {
            opacity: 0.6,
            duration: 2,
            ease: "power2.out",
            marginLeft:10,
            marginBottom:20

          },
          0.4
        );
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 10%",
            end: "+=60%",
            scrub: 1.05,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          imageRef.current,
          {
            width: "300px",
            height: "170px",
            borderRadius: "16px",
            scale: 1,
            transformOrigin: "left center",
          },
          {
            width: "40vw",
            height: "40vh",
            borderRadius: "12px",
            ease: "expo.inOut",
            duration: 1.2,
          },
          0
        );

        tl.to(
          imageRef.current,
          {
            width: "80vw",
            height: "60vh",
            borderRadius: "0px",
            scale: 1.04,
            ease: "power4.inOut",
            duration: 1,
          },
          0.6
        );

        tl.to(
          textRef.current,
          {
            opacity: 0.6,
            duration: 0.8,
            ease: "power2.out",
          },
          0.4
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black dark-section overflow-hidden">
      {/* <Navbar /> */}

      {/* 🟣 TITLE + ROTATING WORDS */}
      <div
        className="
          flex flex-col gap-12 z-10 relative
          px-4 sm:px-8 lg:px-[71px]
        "
      >
        <h1
          ref={headingRef}
          style={{
            color: `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`,
          }}
          className="
            flex items-center justify-center
            font-varela font-bold text-center tracking-[0] whitespace-nowrap
            text-[96px] leading-[110px]
            sm:text-[160px] sm:leading-[200px]
            lg:text-[355px] lg:leading-[450px]
            transition-colors duration-300
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
          <div className="flex items-center justify-center [font-family:'Poppins',Helvetica] font-normal text-black text-[16px] sm:text-[24px] lg:text-[32px]">
            Building brands through
          </div>

          <div
            className="
              flex flex-col items-start gap-[3px] overflow-hidden
              w-[140px] sm:w-[160px] lg:w-[180px]
           
            "
          >
            {rotatingWords.map((word, index) => (
              <div
                key={index}
                className="
                  flex items-center justify-center 
              
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

      {/* 🖼 IMAGE + TEXT */}
      <div
        ref={imageWrapperRef}
        className="
          relative flex flex-col lg:flex-row
          justify-between items-center
          max-w-[1280px] mx-auto mt-6 lg:mt-16 gap-10
          px-4 sm:px-8
        "
      >
        {/* <p
          ref={textRef}
          className="
            [font-family:'Poppins',Helvetica]
            font-normal text-black
            text-[16px] sm:text-[20px] lg:text-[28px]
            leading-[1.4]
            w-full lg:w-[932px]
            relative z-[1] transition-all duration-700 block md:hidden
          "
        >
          Digital design isn&apos;t static — it&apos;s alive. Brands today need
          movement, meaning, and emotion. We blend strategy, creativity, and
          storytelling to craft experiences that capture attention, spark
          action, and leave a lasting impression.
        </p> */}
        <div className="relative flex-shrink-0 overflow-visible">

          <img
            ref={imageRef}
            src="/unsplash.png"
            alt="Expanding Image"
            className="
              object-cover shadow-xl z-[2] rounded-xl
              w-full max-w-md
              h-[200px] sm:h-[240px]
              lg:w-[300px] lg:h-[170px]
              will-change-transform
            "
          />
        </div>

        <p
          ref={textRef}
          className="
            [font-family:'Poppins',Helvetica]
            font-normal text-black
            text-[16px] sm:text-[20px] lg:text-[28px]
            leading-snug lg:leading-[1.4]
            w-full lg:w-[932px]
            relative z-[1] transition-all duration-700
          "
        >
          Digital design isn&apos;t static — it&apos;s alive. Brands today need
          movement, meaning, and emotion. We blend strategy, creativity, and
          storytelling to craft experiences that capture attention, spark
          action, and leave a lasting impression.
        </p>
      </div>
    </section>
  );
};
