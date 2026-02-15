import React, {useRef,useEffect} from "react";
import { Separator } from "../../../../components/ui/separator";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { AnimatedText } from "../../../../components/AnimatedText";

gsap.registerPlugin(ScrollTrigger);


const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "At Divenzo, building strong client relationships is at the heart of what we do. We collaborate closely to understand complex needs and ambitious goals, gaining deep insight into every brand's story and vision. This commitment enables us to craft tailored solutions and deliver outstanding results.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Our expert team at Beyond works together to turn ideas into reality, combining design innovation with cutting-edge tech. We keep projects on track with clear communication and consistent progress checks.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "This is the stage where plans turn into results. At Beyond, we deliver solutions that reflect your brand's vision, meet defined goals, and elevate your digital presence through expert design, development, and strategy.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "The project may end, but our partnership doesn't. We're here to guide and support your growth, every step of the way.",
  },
];

interface ProcessSectionProps {
  theme?: "light" | "dark";
}

export const ProcessSection = ({ theme }: ProcessSectionProps): JSX.Element => {

    const descRef = useRef<HTMLParagraphElement>(null);

    const sectionRef = useRef<HTMLElement | null>(null);
    const progress = useScrollProgress(sectionRef);

      // header / cursor mode
      const isDark = theme ? theme === "dark" : progress > 0.5;
  

     useEffect(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            once: true,
          },
        });
  
        tl.from(
          descRef.current,
          {
            x: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.6"
        );
      },);
  
      return () => ctx.revert();
    }, []);
  return (
    <section
      ref={sectionRef}
      data-section="process"
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
      className={`
        w-full
        py-[50px] sm:py-[50px] lg:py-[150px] lg:pt-[50px]
        px-4 sm:px-8 lg:px-20
        transition-colors duration-500
        ${isDark ? "dark-section" : ""}
      `}
    >
      <div className="max-w-[1260px] mx-auto">
        {/* ================= HEADER ================= */}
        <h2
          className="
            [font-family:'Poppins',Helvetica] font-semibold text-inherit
            text-[40px] sm:text-[56px] md:text-[80px] lg:text-[120px]
            tracking-[0] leading-normal
            mb-[16px] sm:mb-[20px] lg:mb-[26px]
          "
        >
          Process
        </h2>

        <AnimatedText
          className="
            max-w-full lg:max-w-[930px]
            ml-0 lg:ml-auto
            [font-family:'Poppins',Helvetica] font-normal opacity-80
            text-[18px] sm:text-[24px] lg:text-[32px]
            tracking-[0] leading-normal
            mb-[48px] sm:mb-[64px] lg:mb-[86px]
          "
          isDarkBg={isDark}
          disableColorReveal
          slideDuration={0.8}
          slideStagger={0.08}
        >
          A flexible, adaptive process designed to help businesses launch faster and scale with confidence.
        </AnimatedText>
        

        {/* ================= STEPS GRID ================= */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-2
            gap-x-[32px] sm:gap-x-[48px] lg:gap-x-[78px]
            gap-y-[40px] sm:gap-y-[56px] lg:gap-y-[72px]
          "
        >
          {processSteps.map((step, index) => (
            <div key={index} className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 md:gap-4">
                  <AnimatedText
                    className="
                      [font-family:'Poppins',Helvetica] font-normal text-inherit
                      text-lg sm:text-xl lg:text-2xl
                    "
                    isDarkBg={isDark}
                    disableColorReveal
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {step.number}
                  </AnimatedText>

                  <AnimatedText
                    className="
                      [font-family:'Poppins',Helvetica] font-semibold text-inherit
                      text-[22px] sm:text-[26px] lg:text-[32px]
                      tracking-[0] leading-normal
                    "
                    isDarkBg={isDark}
                    disableColorReveal
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {step.title}
                  </AnimatedText>
                </div>

                <Separator className="bg-current opacity-20" />
              </div>

              <AnimatedText
                className="
                  [font-family:'Poppins',Helvetica] font-normal text-inherit opacity-70
                  text-base sm:text-lg lg:text-2xl
                  tracking-[0] leading-normal
                "
                isDarkBg={isDark}
                disableColorReveal
                slideDuration={0.8}
                slideStagger={0.08}
              >
                {step.description}
              </AnimatedText>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
