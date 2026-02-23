import React, { useRef, useEffect, useState } from "react";
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
    category: "Sports", 
  },
  {
    id: 2,
    image: "projects/projectpage_images/project_2.png",
    imageAlt: "Project 2",
    projectTitle: "RWIT",
    desc: "A Deep Dive into RWIT’s Website Redesign",
    category: "Tech",
  },
  {
    id: 3,
    image: "projects/projectpage_images/project_3.png",
    imageAlt: "Project 3",
    projectTitle: "Hitayu Dairy",
    desc: "Improving digital experience for a dairy farm",
    category: "Food & Beverage",
  },
  {
    id: 4,
    image: "projects/projectpage_images/project_4.png",
    imageAlt: "Project 4",
    projectTitle: "Bhaskara Hospitals",
    desc: "Crafting the new Brand Identity for Bhaskara Hospital",
    category: "Health & Wellness",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const gridCursorRef = useRef<HTMLDivElement>(null);
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorCurrentRef = useRef({ x: 0, y: 0 });
  const cursorActiveRef = useRef(false);

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

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

  useEffect(() => {
    if (!gridCursorRef.current) return;
    cursorActiveRef.current = false;
    gsap.set(gridCursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
    });
  }, [filteredProjects.length]);

  useEffect(() => {
    document.body.dataset.cursorHidden = "false";
    if (gridCursorRef.current) {
      cursorActiveRef.current = false;
      gsap.set(gridCursorRef.current, { scale: 0, opacity: 0 });
    }
  }, [activeCategory]);

  // Track the mouse everywhere in the grid, but keep cursor hidden unless hovering a card
  const handleGridMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cursorTargetRef.current = { x, y };

    const isOverCard = !!(event.target as HTMLElement | null)?.closest(
      "[data-project-card]"
    );

    if (isOverCard && gridCursorRef.current && !cursorActiveRef.current) {
      document.body.dataset.cursorHidden = "true";
      cursorActiveRef.current = true;
      cursorCurrentRef.current = { x, y };
      gsap.set(gridCursorRef.current, { x, y, force3D: true });
      gsap.to(gridCursorRef.current, {
        scale: 1.1,
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
      });
    }

    if (!isOverCard && gridCursorRef.current && cursorActiveRef.current) {
      document.body.dataset.cursorHidden = "false";
      cursorActiveRef.current = false;
      gsap.to(gridCursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power3.out",
      });
    }

    // Snap the current position to target if inactive so it doesn't fly across the screen when appearing
    if (!cursorActiveRef.current) {
      cursorCurrentRef.current = { x, y };
      gsap.set(gridCursorRef.current, { x, y, force3D: true });
    }
  };

  // Only trigger the scaling animation when entering a specific card
  const handleCardMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    document.body.dataset.cursorHidden = "true";
    if (gridCursorRef.current) {
      const grid = gridCursorRef.current.parentElement;
      const rect = (grid ?? event.currentTarget).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cursorTargetRef.current = { x, y };
      cursorCurrentRef.current = { x, y };
      gsap.set(gridCursorRef.current, { x, y, force3D: true });
      cursorActiveRef.current = true;
      gsap.to(gridCursorRef.current, {
        scale: 1.1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  };

  // Shrink the cursor when leaving a specific card
  const handleCardMouseLeave = () => {
    document.body.dataset.cursorHidden = "false";
    if (gridCursorRef.current) {
      cursorActiveRef.current = false;
      gsap.to(gridCursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  };

  return (
    <>
      <section className="relative w-full bg-white overflow-x-hidden min-h-screen">
        <div className="max-w-[1280px] mx-auto pt-[30px] md:pt-[80px] pb-16 px-4 lg:px-8 xl:px-0">

          {/* ===== HEADING ===== */}
          <AnimatedText className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1] mb-[36px] md:mb-[56px]" isDarkBg={false}>
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
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          {/* ===== PROJECT GRID OR EMPTY STATE ===== */}
          {filteredProjects.length > 0 ? (
            <div
              className="relative mt-12"
              onMouseMove={handleGridMouseMove}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-4 sm:gap-x-4">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                    data-project-card
                    className="cursor-none [&_*]:cursor-none" // Custom cursor applies ONLY to the card now
                  >
                    <ProjectCard
                      image={project.image}
                      title={project.projectTitle}
                      category={project.desc}
                      link={`/projects/${project.id}`}
                      disableCursorEffect={true}
                    />
                  </div>
                ))}
              </div>


              {/* Custom Cursor */}
              <div
                ref={gridCursorRef}
                className="pointer-events-none absolute z-20 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                style={{
                  left: 0,
                  top: 0,
                }}
              >
                <span className="[font-family:'Poppins',Helvetica] font-medium text-xs leading-tight">View</span>
                <span className="[font-family:'Poppins',Helvetica] font-medium text-xs leading-tight">Site</span>
              </div>
            </div>
          ) : (
            /* ===== EMPTY STATE UI ===== */
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center mt-12 bg-[#fafafa] rounded-[24px]">
              <h3 className="[font-family:'Poppins',Helvetica] text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 text-black">
                No projects found.
              </h3>
              <p className="[font-family:'Poppins',Helvetica] text-[#666] text-base sm:text-lg max-w-lg mb-8">
                We don't have any public projects listed in the "{activeCategory}" category right now. Please explore our other categories!
              </p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="[font-family:'Poppins',Helvetica] px-8 py-3 bg-black text-white rounded-full font-medium transition hover:scale-105"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </>
  );
}