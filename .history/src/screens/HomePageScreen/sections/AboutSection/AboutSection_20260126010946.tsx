import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/useScrollProgress";

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

export const AboutSection = (): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(sectionRef);

  const bgValue = 255 - progress * 255;
  const textValue = progress * 255;

  useEffect(() => {
    if (!headingRef.current) return;

    const el = headingRef.current;
    const fullText =
      "Our work speaks through numbers. Here’s what we’ve achieved so far.";

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
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: `rgb(${bgValue}, ${bgValue}, ${bgValue})`,
        ["--foreground" as any]: `0 0% ${textValue / 2.55}%`,
      }}
      className="
        relative w-full
        py-[40px] sm:py-[120px] lg:py-[150px]
        px-4 sm:px-8 lg:px-20
        transition-colors duration-300
        dark-section
      "
    >
      <div className="max-w-[1280px] mx-auto">
        {/* ================= ABOUT INTRO ================= */}
        <div className="mb-[56px]">
          <h2
            className="
              [font-family:'Poppins',Helvetica] font-semibold
              text-[56px] leading-[60px]
              sm:text-[80px] sm:leading-[70px]
              lg:text-[120px] lg:leading-[85px]
              mb-[32px] lg:mb-[56px]
            "
          >
            About Us
          </h2>

          <div
            className="
              ml-0
              sm:ml-[80px]
              lg:ml-[350px]
            "
          >
            <p
              className="
                [font-family:'Poppins',Helvetica] font-normal
                text-[20px] sm:text-[24px] lg:text-[40px]
               leading-normal
                mb-[32px] lg:mb-[56px]
              "
            >
              As global leaders in UX/UI design, technology and marketing
              solutions, we are dedicated to simplifying, strengthening, and
              transforming businesses of all sizes. our mission is to bridge the
              gap between creativity and technology, crafting seamless
              experiences that inspire users and drive measurable outcomes for
              our clients.
            </p>

            <Link to="/about">
              <Button
                variant="link"
                className="h-auto p-0 flex flex-col items-start gap-0.5 text-inherit"
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
                <div className="w-[160px] sm:w-[190px] lg:w-[226px] h-0.5 bg-current opacity-40" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="mt-[60px] sm:mt-[80px] lg:mt-[100px]">
          <h3
            ref={headingRef}
            className="
              [font-family:'Poppins',Helvetica] font-normal
              text-[36px] sm:text-[56px] lg:text-[80px]
              leading-[44px] sm:leading-[70px] lg:leading-[90px]
              mb-[40px] lg:mb-[72px]
            "
          >
            Our work speaks through numbers. Here&apos;s what we&apos;ve achieved
            so far.
          </h3>

          <div
            ref={cardsRef}
            className="
              grid gap-8
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {statsData.map((stat, index) => (
              <Card
                key={index}
                className="stat-card border-0 shadow-none bg-transparent"
              >
                <CardContent className="p-0 flex flex-col gap-4">
                  <div
                    className="
                      [font-family:'Poppins',Helvetica] font-semibold
                      text-5xl sm:text-6xl lg:text-7xl
                      leading-[48px] lg:leading-[56px]
                    "
                  >
                    {stat.number}
                  </div>

                  <Separator className="bg-current opacity-20" />

                  <div className="flex flex-col gap-[10px]">
                    <h4
                      className="
                        [font-family:'Poppins',Helvetica] font-bold
                        text-[18px] sm:text-[20px] lg:text-[22px]
                        leading-[28px] lg:leading-[33px]
                      "
                    >
                      {stat.title}
                    </h4>
                    <p
                      className="
                        [font-family:'Poppins',Helvetica] font-normal opacity-80
                        text-base sm:text-lg
                        leading-[24px] lg:leading-[27px]
                      "
                    >
                      {stat.description}
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
