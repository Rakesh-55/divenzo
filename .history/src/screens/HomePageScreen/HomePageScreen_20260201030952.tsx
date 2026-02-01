import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutSection } from "./sections/AboutSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { ProcessSection } from "./sections/ProcessSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

gsap.registerPlugin(ScrollTrigger);

export const HomePageScreen = (): JSX.Element => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const footerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtainRef.current || !footerWrapperRef.current) return;

    // Curtain lifts up to reveal footer
    gsap.to(curtainRef.current, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: footerWrapperRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div>
      {/* Footer Wrapper */}
      <div ref={footerWrapperRef} className="relative">
        {/* Footer - stays fixed */}
        <div className="relative">
          <FooterSection />
        </div>

        {/* Main Content - curtain that moves up */}
        <main
          ref={curtainRef}
          className="absolute top-0 left-0 w-full z-10 bg-white will-change-transform"
        >
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ProcessSection />
          <ServicesSection />
          <TestimonialsSection />
        </main>
      </div>
    </div>
  );
};
