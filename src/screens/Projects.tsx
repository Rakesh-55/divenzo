import React, { useRef, useEffect } from "react";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimatedText } from "@/components/AnimatedText";
import gsap from "gsap";

const projectsData = [
  {
    id: 1,
    image: "projects/projectpage_images/project_1.png",
    imageAlt: "Project 1",
    projectTitle: "Practice Coach",
    desc: "Crafting conversion focus website for leading Practice Coach Company",
  },
  {
    id: 2,
    image: "projects/projectpage_images/project_2.png",
    imageAlt: "Project 2",
    projectTitle: "RWIT",
    desc: "A Deep Dive into RWIT’s Website Redesign",
  },
  {
    id: 3,
    image: "projects/projectpage_images/project_3.png",
    imageAlt: "Project 3",
    projectTitle: "Hitayu Dairy",
    desc: "Improving digital experience for a dairy farm",
  },
  {
    id: 4,
    image: "projects/projectpage_images/project_4.png",
    imageAlt: "Project 4",
    projectTitle: "Bhaskara Hospitals",
    desc: "Crafting the new Brand Identity for Bhaskara Hospital",
  },
];

export default function Projects() {
  const gridCursorRef = useRef<HTMLDivElement>(null);
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorCurrentRef = useRef({ x: 0, y: 0 });
  const cursorActiveRef = useRef(false);

  useEffect(() => {
    if (!gridCursorRef.current) return;
    gsap.set(gridCursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
    });
    const damping = 0.1;
    const tick = () => {
      if (!gridCursorRef.current || !cursorActiveRef.current) return;
      const current = cursorCurrentRef.current;
      const target = cursorTargetRef.current;
      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;
      gsap.set(gridCursorRef.current, {
        x: current.x,
        y: current.y,
        force3D: true,
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const handleGridMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    document.body.dataset.cursorHidden = "true";
    if (gridCursorRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cursorActiveRef.current = true;
      cursorTargetRef.current = { x, y };
      cursorCurrentRef.current = { x, y };
      gsap.set(gridCursorRef.current, { x, y, force3D: true });
      gsap.to(gridCursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  };

  const handleGridMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cursorTargetRef.current = { x, y };
  };

  const handleGridMouseLeave = () => {
    document.body.dataset.cursorHidden = "false";
    if (gridCursorRef.current) {
      cursorActiveRef.current = false;
      gsap.to(gridCursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0,
        ease: "none",
      });
    }
  };

  return (
    <>
      <section className="relative w-full bg-white overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto pt-6 sm:pt-8 lg:pt-10 pb-16 px-4 lg:px-8 xl:px-0">

          {/* ===== HEADING ===== */}
          <AnimatedText className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[40px] sm:text-[56px] md:text-[100px] lg:text-[100px] leading-[1.25] pb-3 mb-[40px] lg:mb-[56px]" isDarkBg={false}>
            Projects
          </AnimatedText>

          {/* ===== DESCRIPTION ===== */}
          <div className="ml-0 md:ml-[80px] lg:ml-[200px] xl:ml-[350px]">
            <AnimatedText
              className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[32px] leading-[1.3] mb-[40px] lg:mb-[56px]"
              isDarkBg={false}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              Gain exclusive insight into how our refined processes have shaped
              every project we deliver.
            </AnimatedText>
          </div>

          {/* ===== FILTER ===== */}
          <CategoryFilter />

          {/* ===== PROJECT GRID ===== */}
          <div
            className="relative mt-12 cursor-none [&_*]:cursor-none"
            onMouseEnter={handleGridMouseEnter}
            onMouseMove={handleGridMouseMove}
            onMouseLeave={handleGridMouseLeave}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-4 sm:gap-x-4">
              {projectsData.map((project) => (
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  title={project.projectTitle}
                  category={project.desc}
                  link={`/projects/${project.id}`}
                  disableCursorEffect={true}
                />
              ))}
            </div>

            {/* Custom Cursor */}
            <div
              ref={gridCursorRef}
              className="pointer-events-none absolute z-20 flex h-20 w-20 flex-col items-center justify-center rounded-full"
              style={{
                left: 0,
                top: 0,
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
            >
              <span className="[font-family:'Poppins',Helvetica] font-medium text-xs leading-tight">View</span>
              <span className="[font-family:'Poppins',Helvetica] font-medium text-xs leading-tight">Site</span>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
