import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { AnimatedText } from "@/components/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    number: "9+",
    title: "Projects launched",
    description: "Helping brands make their mark online.",
  },
  {
    number: "10K+",
    title: "Users reached",
    description: "Our designs engage millions globally",
  },
  {
    number: "98%",
    title: "Client satisfaction rate",
    description: "We build long-term partnerships through proven results.",
  },
  {
    number: "1+",
    title: "Years of expertise",
    description:
      "Decades of experience in delivering impactful digital solutions.",
  },
];

interface AboutSectionProps {
  theme?: "light" | "dark";
}

export const AboutSection = ({ theme }: AboutSectionProps): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const statsTextRef = useRef<HTMLDivElement | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(sectionRef);

  const isDark = theme ? theme === "dark" : progress < 0.5;

  useEffect(() => {
    // OLD HEADING ANIMATION CODE - Commented out for future use
    // Can be uncommented if needed for text animation on heading
    /*
    if (!headingRef.current) return;

    const el = headingRef.current;
    const fullText =
      "Our work speaks through numbers. Here's what we've achieved so far.";

    const words = fullText.split(" ").map((word, i) =>
      i === 0
        ? `<span class='word inline-block overflow-hidden'>${word}</span>`
        : `<span class='word inline-block opacity-60 overflow-hidden'><span class='inner block translate-y-full opacity-0'>${word}</span></span>`
    );

    el.innerHTML = words.join(" ");

    const innerWords = el.querySelectorAll(".inner");

    gsap.to(innerWords, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    const grayWords = el.querySelectorAll(".word:not(:first-child)");
    gsap.to(grayWords, {
      color: "inherit",
      stagger: { each: 0.1, amount: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });
    */

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".stat-card");

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Stats text word-by-word opacity reveal
    if (statsTextRef.current) {
      const topLayers = statsTextRef.current.querySelectorAll('.word-top-layer');
      
      gsap.fromTo(
        topLayers,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: statsTextRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }
  }, [isDark]);

  return (
    <section
      ref={sectionRef}
      data-section="about"
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
      className={`
        relative w-full
        py-[40px] sm:py-[50px] lg:py-[150px] lg:pb-[50px]
        px-4 sm:px-8 lg:px-8 xl:px-20
        transition-colors duration-700
        ${isDark ? "dark-section" : ""}
      `}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* ================= ABOUT INTRO ================= */}
        <div className="mb-[56px]">
          <h2
            className="
              [font-family:'Poppins',Helvetica] font-semibold
              text-[40px] leading-[48px]
              sm:text-[56px] sm:leading-[60px]
              md:text-[100px] md:leading-[70px]
              lg:text-[100px] lg:leading-[85px]
              mb-[32px] lg:mb-[56px]
              lg:mt-[50px]
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
              About Us
            </AnimatedText>
          </h2>

          <div
            className="
              ml-0
              sm:ml-[80px]
              md:ml-[120px]
              lg:ml-[200px]
              xl:ml-[350px]
            "
          >
            <AnimatedText
              className="
                [font-family:'Poppins',Helvetica] font-normal
                text-[20px] sm:text-[24px] lg:text-[32px]
               leading-normal
                mb-[32px] lg:mb-[56px]
              "
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              As global leaders in UX/UI design, technology and marketing solutions, we are dedicated to simplifying, strengthening, and transforming businesses of all sizes. our mission is to bridge the gap between creativity and technology, crafting seamless experiences that inspire users and drive measurable outcomes for our clients.
            </AnimatedText>

            <Link to="/about">
              <Button
                variant="link"
                className="relative h-auto w-fit p-0 text-inherit group no-underline hover:no-underline"
              >
                <span
                  className="
                    [font-family:'Poppins',Helvetica] font-normal
                    text-[20px] sm:text-[24px] lg:text-[32px]
                    leading-[40px] lg:leading-[51px]
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
            </Link>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="mt-[60px] sm:mt-[80px] lg:mt-[100px]">
        <div 
          ref={statsTextRef}
          className="
            [font-family:'Poppins',Helvetica] font-normal
            text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px]
            leading-[38px] sm:leading-[50px] md:leading-[70px] lg:leading-[90px]
            mb-[40px] lg:mb-[72px]
          "
        >
          {("Our work speaks through numbers. Here's what we've achieved so far.").split(' ').map((word, index) => (
            <span key={index} className="relative inline-block mr-[0.3em]">
              <span 
                className="word-base-layer"
                style={{ 
                  opacity: 0.3,
                  color: isDark ? '#999999' : '#666666'
                }}
              >
                {word}
              </span>
              <span 
                className="word-top-layer absolute inset-0"
                style={{ 
                  opacity: 0,
                  color: isDark ? '#ffffff' : '#000000'
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>


            <div
              ref={cardsRef}
              className="flex flex-wrap gap-4 lg:gap-5 justify-center w-full"
            >
              {statsData.map((stat, index) => (
                <Card
                  key={index}
                  className="
                    stat-card border-0 shadow-none rounded-none transition-all duration-700 ease-in-out flex-none
                    w-[296px] h-[372px]
                  "
                  style={{
                    backgroundColor: isDark ? "#111111" : "#fafafa",
                    color: isDark ? "#ffffff" : "#000000"
                  }}
                >
                  <CardContent className="h-full p-8 flex flex-col gap-4 justify-center text-inherit">
                    <div
                      className="
                        min-h-[80px]
                        flex items-end
                        [font-family:'Poppins',Helvetica] font-semibold
                        text-7xl
                        leading-[56px]
                        mb-10
                      "
                    >
                      {stat.number}
                    </div>

                    <div className="flex flex-col gap-[10px] min-h-[140px]">
                      <h4
                        className="
                          [font-family:'Poppins',Helvetica] font-bold
                          text-[22px]
                          leading-[33px]
                          mb-4
                        "
                      >
                        <AnimatedText
                          as="span"
                          className="inline-block"
                          isDarkBg={isDark}
                          disableColorReveal
                          slideDuration={0.6}
                          slideStagger={0.04}
                        >
                          {stat.title}
                        </AnimatedText>
                      </h4>
                      <p
                        className="
                          [font-family:'Poppins',Helvetica] font-normal opacity-80
                          text-base
                          leading-[27px]
                        "
                      >
                        <AnimatedText
                          as="span"
                          className="inline-block"
                          isDarkBg={isDark}
                          disableColorReveal
                          slideDuration={0.6}
                          slideStagger={0.04}
                        >
                          {stat.description}
                        </AnimatedText>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};
