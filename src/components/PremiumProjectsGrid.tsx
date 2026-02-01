import React from "react";
import { ProjectCard } from "@/components/ProjectCard";

const PREMIUM_PROJECTS = [
  {
    id: 1,
    image: "/projects/project_1.png",
    title: "Practice Coach",
    category: "Brand Identity",
  },
  {
    id: 2,
    image: "/projects/project_2.png",
    title: "RWIT",
    category: "Web Design",
  },
  {
    id: 3,
    image: "/projects/project_3.png",
    title: "Hitayu Dairy",
    category: "Digital Experience",
  },
  {
    id: 4,
    image: "/projects/project_4.png",
    title: "Bhaskara Hospitals",
    category: "Healthcare",
  },
];

export const PremiumProjectsGrid = (): JSX.Element => {
  return (
    <section className="w-full bg-white py-20 lg:py-32 px-4 sm:px-8 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[56px] sm:text-[80px] lg:text-[120px] text-black mb-6">
            Our Work
          </h2>
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[18px] sm:text-[24px] lg:text-[32px] text-black/70 max-w-3xl">
            Crafting digital experiences that captivate, convert, and leave lasting impressions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {PREMIUM_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              category={project.category}
              link={`/projects/${project.id}`}
            />
          ))}
        </div>
      </div>

      {/* Hide default cursor on this section */}
      <style>{`
        section:has(.group) {
          cursor: none;
        }
        section:has(.group) * {
          cursor: none !important;
        }
      `}</style>
    </section>
  );
};
