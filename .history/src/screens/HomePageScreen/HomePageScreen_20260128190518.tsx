import React from "react";
import { useEffect, useRef } from "react";
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

    // Animate the curtain (main content) to move up
    gsap.to(curtainRef.current, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: footerWrapperRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        pin: false,
      },
    });
  }, []);

  return (
    <div>
      {/* Curtain Wrapper - This creates the reveal space */}
      <div ref={footerWrapperRef} className="relative min-h-screen">
        
        {/* Main Content - This is the curtain that lifts */}
        <main
          ref={curtainRef}
          className="relative z-10 bg-white dark:bg-gray-900 will-change-transform"
        >
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ProcessSection />
          <ServicesSection />
          <TestimonialsSection />
        </main>

        {/* Footer - Stays fixed below the curtain */}
        <div className="absolute top-0 left-0 w-full">
          <FooterSection />
        </div>
      </div>
    </div>
  );
};