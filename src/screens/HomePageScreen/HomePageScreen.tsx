import React, { useEffect, useState } from "react";
import { AboutSection } from "./sections/AboutSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
 import { ProcessSection } from "./sections/ProcessSection";
 import { ProjectsSection } from "./sections/ProjectsSection";
  import { ServicesSection } from "./sections/ServicesSection";
 import { TestimonialsSection } from "./sections/TestimonialsSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export const HomePageScreen = (): JSX.Element => {
  const [projectsDark, setProjectsDark] = useState(false);
  const [servicesLight, setServicesLight] = useState(false);

  useEffect(() => {
    const projectsSection = document.querySelector<HTMLElement>(
      "[data-section='projects']"
    );
    const servicesSection = document.querySelector<HTMLElement>(
      "[data-section='services']"
    );
    const testimonialsSection = document.querySelector<HTMLElement>(
      "[data-section='testimonials']"
    );

    if (!projectsSection || !servicesSection || !testimonialsSection) return;

    const triggers = [
      ScrollTrigger.create({
        trigger: projectsSection,
        start: "top 50%",
        onEnter: () => setProjectsDark(true),
        onEnterBack: () => setProjectsDark(true),
        onLeaveBack: () => setProjectsDark(false),
      }),
      ScrollTrigger.create({
        trigger: testimonialsSection,
        start: "top 50%",
        onEnter: () => setServicesLight(true),
        onEnterBack: () => setServicesLight(true),
        onLeaveBack: () => setServicesLight(false),
      }),
    ];

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <AboutSection theme={projectsDark ? "dark" : "light"} />
     <ProjectsSection theme={projectsDark ? "dark" : "light"} />
       <ProcessSection theme="dark" />
     <ServicesSection theme={servicesLight ? "light" : "dark"} />
      <TestimonialsSection theme={servicesLight ? "light" : "dark"} />
       <FooterSection /> 
    </main>
  );
};
