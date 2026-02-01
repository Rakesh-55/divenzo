import React from "react";
 import { AboutSection } from "./sections/AboutSection";
 import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
 import { ProcessSection } from "./sections/ProcessSection";
 import { ProjectsSection } from "./sections/ProjectsSection";
  import { ServicesSection } from "./sections/ServicesSection";
 import { TestimonialsSection } from "./sections/TestimonialsSection";


export const HomePageScreen = (): JSX.Element => {
  return (
    <div>
    <main className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
     <ProjectsSection />
       <ProcessSection />
     <ServicesSection />
      <TestimonialsSection />
       
    </main>
    {/* <FooterSection />  */}
    </div>
  );
};
