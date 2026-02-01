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

export const ProcessSection = (): JSX.Element => {

    const descRef = useRef<HTMLParagraphElement>(null);

    const sectionRef = useRef<HTMLElement | null>(null);
    const progress = useScrollProgress(sectionRef);

      // background: black → white
      const bgValue = progress * 255;

      // text: white → black
      const textValue = 255 - progress * 255;

      // header / cursor mode
      const isDark = bgValue < 128;
  

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
      style={{
        backgroundColor: `rgb(${bgValue}, ${bgValue}, ${bgValue})`,
        color: `rgb(${textValue}, ${textValue}, ${textValue})`,
      }}
      className={`
        w-full
        py-[80px] sm:py-[120px] lg:py-[150px]
        px-4 sm:px-8 lg:px-20
        transition-colors duration-500
        ${isDark ? "dark-section" : ""}
      `}
    >
      <div className="max-w-[1260px] mx-auto">
        {/* ================= HEADER ================= */}
        <h2
          className="
            [font-family:'Poppins',Helvetica] font-semibold text-black
            text-[56px] sm:text-[80px] lg:text-[120px]
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
            text-[18px] sm:text-[24px] lg:text-[40px]
            tracking-[0] leading-normal
            mb-[48px] sm:mb-[64px] lg:mb-[86px]
          "
          isDarkBg={false}
        >
          A flexible, adaptive process designed to help businesses launch faster and scale with confidence.
        </AnimatedText>
        

        {/* ================= STEPS GRID ================= */}
        <div
          className="
            grid gap-y-[48px]
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
                  <div
                    className="
                      [font-family:'Poppins',Helvetica] font-normal text-black
                      text-lg sm:text-xl lg:text-2xl
                    "
                  >
                    {step.number}
                  </div>

                  <h3
                    className="
                      [font-family:'Poppins',Helvetica] font-semibold text-black
                      text-[22px] sm:text-[26px] lg:text-[32px]
                      tracking-[0] leading-normal
                    "
                  >
                    {step.title}
                  </h3>
                </div>

                <Separator className="bg-current opacity-20" />
              </div>

              <p
                className="
                  [font-family:'Poppins',Helvetica] font-normal text-black opacity-70
                  text-base sm:text-lg lg:text-2xl
                  tracking-[0] leading-normal
                "
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
