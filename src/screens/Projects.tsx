import React from "react";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimatedText } from "@/components/AnimatedText";

const projectsData = [
  {
    id: 1,
    image: "projects/project_1.png",
    imageAlt: "Project 1",
    projectTitle: "Practice Coach",
    desc: "Crafting conversion focus website for leading Practice Coach Company",
  },
  {
    id: 2,
    image: "projects/project_2.png",
    imageAlt: "Project 2",
    projectTitle: "RWIT",
    desc: "A Deep Dive into RWIT’s Website Redesign",
  },
  {
    id: 3,
    image: "projects/project_3.png",
    imageAlt: "Project 3",
    projectTitle: "Hitayu Dairy",
    desc: "Improving digital experience for a dairy farm",
  },
  {
    id: 4,
    image: "projects/project_4.png",
    imageAlt: "Project 4",
    projectTitle: "Bhaskara Hospitals",
    desc: "Crafting the new Brand Identity for Bhaskara Hospital",
  },
];

export default function Projects() {
  return (
    <>
      <section className="relative w-full bg-white overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto pt-6 sm:pt-8 lg:pt-10 pb-16 px-4 lg:px-0">

          {/* ===== HEADING ===== */}
          <AnimatedText className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] leading-[1.25] pb-3 mb-[40px] lg:mb-[56px]" isDarkBg={false}>
            Projects
          </AnimatedText>

          {/* ===== DESCRIPTION ===== */}
          <div className="ml-0 lg:ml-[350px]">
            <AnimatedText className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[32px] leading-[1.3] mb-[40px] lg:mb-[56px]" isDarkBg={false}>
              Gain exclusive insight into how our refined processes have shaped
              every project we deliver.
            </AnimatedText>
          </div>

          {/* ===== FILTER ===== */}
          <CategoryFilter />

          {/* ===== PROJECT GRID ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.projectTitle}
                category={project.desc}
                link={`/projects/${project.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
