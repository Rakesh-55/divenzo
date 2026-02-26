"use client";
import React, { useEffect, useRef, useState } from "react";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import service_img from "../assets/service_img.png";
import * as Separator from "@radix-ui/react-separator";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedText } from "@/components/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */

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
      "Our expert team at Divenzo works together to turn ideas into reality, combining design innovation with cutting-edge tech. We keep projects on track with clear communication and consistent progress checks.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "This is the stage where plans turn into results. At Divenzo, we deliver solutions that reflect your brand's vision, meet defined goals, and elevate your digital presence through expert design, development, and strategy.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "The project may end, but our partnership doesn't. We're here to guide and support your growth, every step of the way.",
  },
];

const testimonials = [
  {
    quote:
      "The divenzo team has been exceptional throughout our project. Their dedication and attention to detail resulted in an outstanding final product. We're absolutely thrilled with the outcome and couldn't have asked for better. I would highly recommend them to anyone seeking top-notch services.",
    name: "Vijaya Bhaskar",
    title: "Founder, Bhaskara Hospitals",
    image: "/ellipse-9-2.svg",
  },
  {
    quote:
      "We're grateful to Divenzo for their exceptional work on our project website. Their responsiveness, creativity, and dedication led to an outstanding result. It's been a pleasure collaborating, and we wholeheartedly recommend them.",
    name: "Jaswinder Singh",
    title: "Founder, RW Infotech",
    image: "/ellipse-9.svg",
  },
  {
    quote:
      "The Divenzo team delivered exceptional UI/UX design for our app. Their creativity and attention to detail truly stood out. Excited to collaborate again in the future!",
    name: "Vijay Kumar",
    title: "Co-Founder, Hitayu Dairy",
    image: "/ellipse-9-1.svg",
  },
];

const servicesData = [
  {
    id: 1,
    title: "Research",
    description:
      "We improvise to provide meaningful, data-driven insights that capture the user's voice and align with business objectives, seamlessly integrating with our UI/UX design and development services.",
    points: [
      "Heuristic Analysis",
      "Design Audit",
      "Usability Testing",
      "Ethnographic Research",
      "Emerging Trends",
      "UX Research",
    ],
  },
  {
    id: 2,
    title: "Design",
    description:
      "We approach design as a collaborative journey, bringing together diverse stakeholder insights to craft impactful experiences and scalable solutions through our UI/UX design and consulting expertise.",
    points: [
      "Digital Branding",
      "User Experience Design",
      "User Interface Design",
      "Interaction Design",
      "AI Design Solutions",
      "Digital Prototyping",
      "Motion Graphics",
      "Digital Illustrations",
      "Data Visualization",
      "Intelligent Design",
    ],
  },
  {
    id: 3,
    title: "Development",
    description:
      "We transform your ideas into functional, scalable digital products—ranging from websites and mobile apps to enterprise platforms and solutions.",
    points: [
      "Front-End Development",
      "Web Application",
      "Mobile Application",
      "Custom Application",
      "SAAS Implementation",
      "CMS Integration",
      "No-Code Development",
      "MVP Development",
    ],
  },
  {
    id: 4,
    title: "Content Writing",
    description:
      "Content creation is the craft of developing engaging digital material that resonates with your audience. It blends text, visuals, and multimedia to boost reach, SEO, and interaction.",
    points: [
      "Blog Post Writing",
      "Social Media Content",
      "Video Production",
      "Infographic Design",
      "Ebook Creation",
      "Website Copywriting",
    ],
  },
  {
    id: 5,
    title: "Digital Marketing",
    description:
      "We craft digital experiences that don't just look good they perform. Our marketing strategies blend creativity with data to drive visibility, engagement, and growth. From SEO and ads to content and social campaigns, we turn your brand into a digital powerhouse.",
    points: [
      "SEO",
      "SMM",
      "PPC",
      "Email Marketing",
      "E-Commerce Marketing",
      "Content Marketing",
      "Affiliate Marketing",
      "Video Marketing",
      "Marketing Automation",
    ],
  },
];

/* ============ STICKY-STACK SERVICES ============ */

interface StickyStackServicesProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  isDark: boolean;
}

function StickyStackServices({ sectionRef, isDark }: StickyStackServicesProps) {
  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 lg:px-8 xl:px-20">
      <div className="max-w-[1260px] mx-auto pt-4 pb-2 md:py-20">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="mb-8 md:mb-12"
          >
            <div className="relative">
              <div className="py-4 md:py-5">
                <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[28px] sm:text-[36px] lg:text-[44px]">
                  <AnimatedText
                    className="[font-family:'Poppins',Helvetica] font-semibold text-[28px] sm:text-[36px] lg:text-[44px]"
                    isDarkBg={isDark}
                    disableColorReveal
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {service.id}. {service.title}
                  </AnimatedText>
                </h2>
              </div>
              <div
                className="absolute bottom-0 h-px pointer-events-none transition-all duration-700"
                style={{
                  left: "50%",
                  width: "100vw",
                  marginLeft: "-50vw",
                  background: isDark 
                    ? "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)"
                    : "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                }}
              />
            </div>

            <div className="pointer-events-auto select-text">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 py-5 md:py-8">
                <div className="hidden lg:block lg:w-[280px] xl:w-[340px] shrink-0" />

                <div className="flex-1">
                  <AnimatedText
                    className="[font-family:'Poppins',Helvetica] font-normal text-[16px] sm:text-[20px] lg:text-[26px] opacity-80 max-w-[900px] leading-relaxed"
                    isDarkBg={isDark}
                    disableColorReveal
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {service.description}
                  </AnimatedText>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mt-6 list-none left-0">
                    {service.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="[font-family:'Poppins',Helvetica] font-normal text-[15px] sm:text-[18px] lg:text-[20px] opacity-80 flex items-center gap-3"
                      >
                        <span className="flex-shrink-0 text-[18px] sm:text-[22px] lg:text-[24px] leading-none">•</span>
                        <AnimatedText
                          as="span"
                          className="inline-block [font-family:'Poppins',Helvetica] font-normal text-[15px] sm:text-[18px] lg:text-[20px]"
                          isDarkBg={isDark}
                          disableColorReveal
                          slideDuration={0.8}
                          slideStagger={0.08}
                        >
                          {point}
                        </AnimatedText>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= PAGE ================= */

export default function Services() {
  const carouselCursorRef = useRef<HTMLDivElement | null>(null);
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorCurrentRef = useRef({ x: 0, y: 0 });
  const cursorActiveRef = useRef(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [carouselCursorDir, setCarouselCursorDir] = useState<"left" | "right">("right");

  // State to track if the page should be dark
  const [isDark, setIsDark] = useState(false);
  const darkSectionRef = useRef<HTMLElement | null>(null);

  // Scroll transition logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (darkSectionRef.current) {
        ScrollTrigger.create({
          trigger: darkSectionRef.current,
          start: "top 50%", // Fades to black when Sticky section reaches mid-screen
          end: "bottom 50%", // Fades to white when Sticky section leaves mid-screen
          onEnter: () => setIsDark(true),
          onLeave: () => setIsDark(false),
          onEnterBack: () => setIsDark(true),
          onLeaveBack: () => setIsDark(false),
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!carouselCursorRef.current) return;
    gsap.set(carouselCursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
    });
    const damping = 0.1;
    const tick = () => {
      if (!carouselCursorRef.current || !cursorActiveRef.current) return;
      const current = cursorCurrentRef.current;
      const target = cursorTargetRef.current;
      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;
      gsap.set(carouselCursorRef.current, {
        x: current.x,
        y: current.y,
        force3D: true,
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  useEffect(() => {
    return () => {
      document.body.dataset.cursorHidden = "false";
    };
  }, []);

  return (
    <main
      className={`relative w-full overflow-x-hidden transition-colors duration-700 ${
        isDark ? "dark-section" : ""
      }`}
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
    >
      {/* HERO */}
      <section className="relative w-full">
        <div className="max-w-[1280px] mx-auto pt-[30px] md:pt-[80px] pb-4 md:pb-16 px-4 lg:px-8 xl:px-0">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1] mb-[36px] md:mb-[56px]">
            <AnimatedText
              as="span"
              className="block"
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              Services
            </AnimatedText>
          </h2>

          <div className="ml-0 lg:ml-[200px] xl:ml-[350px]">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-inherit text-[18px] sm:text-[24px] lg:text-[32px] mb-[36px] md:mb-[56px]">
              <AnimatedText
                as="span"
                className="inline"
                isDarkBg={isDark}
                disableColorReveal
                slideDuration={0.8}
                slideStagger={0.08}
              >
                We are a UX/UI design company that crafts scalable, sustainable, and innovative solutions to transform extraordinary ideas into reality.
              </AnimatedText>
            </p>
          </div>

          <img src={service_img} alt="service" className="w-full h-auto mt-8 mb-4 md:mb-12 md:mt-12 lg:mt-[120px]" />
        </div>
      </section>

      {/* SERVICES — Sticky Stack */}
      <StickyStackServices sectionRef={darkSectionRef} isDark={isDark} />

      {/* PROCESS */}
      <section className="relative w-full pt-2 pb-20 px-4 lg:px-8 xl:px-20">
        <div className="max-w-[1260px] mx-auto">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[56px] sm:text-[56px] md:text-[100px] lg:text-[100px] mb-[16px] md:mb-[26px]">
            <AnimatedText
              as="span"
              className="block"
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              Process
            </AnimatedText>
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-inherit opacity-80 text-[18px] sm:text-[24px] lg:text-[32px] mb-[46px] md:mb-[86px] max-w-[930px] ml-0 lg:ml-auto">
            <AnimatedText
              as="span"
              className="inline"
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              A flexible, adaptive process designed to help businesses launch faster and scale with confidence.
            </AnimatedText>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[78px] gap-y-[32px] md:gap-y-[72px]">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col gap-2 md:gap-4">
                <div className="[font-family:'Poppins',Helvetica] font-normal text-inherit text-2xl">
                  <AnimatedText
                    as="span"
                    className="inline-block"
                    isDarkBg={isDark}
                    disableColorReveal
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {step.number}
                  </AnimatedText>
                </div>

                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[24px] lg:text-[32px]">
                  <AnimatedText
                    as="span"
                    className="inline-block"
                    isDarkBg={isDark}
                    disableColorReveal
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {step.title}
                  </AnimatedText>
                </h3>

                <Separator.Root className="bg-current opacity-20 h-[2px]" />

                <p className="[font-family:'Poppins',Helvetica] font-normal opacity-80 text-[16px] sm:text-[18px] lg:text-2xl">
                  <AnimatedText
                    as="span"
                    className="inline"
                    disableColorReveal
                    startColor="currentColor"
                    endColor="currentColor"
                    slideDuration={0.8}
                    slideStagger={0.08}
                  >
                    {step.description}
                  </AnimatedText>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="pb-24">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-0">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[56px] sm:text-[56px] md:text-[100px] lg:text-[100px] mb-[16px] md:mb-[26px]">
            <AnimatedText
              as="span"
              className="block"
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              Testimonials
            </AnimatedText>
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal opacity-80 text-[18px] sm:text-[24px] lg:text-[32px] max-w-[930px] ml-0 lg:ml-[200px] xl:ml-[350px]">
            <AnimatedText
              as="span"
              className="block"
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              We work with forward-thinking clients who value creativity and results.
              Together, we build experiences that inspire and deliver growth.
            </AnimatedText>
          </p>
        </div>

        <div
          className="relative max-w-7xl mx-auto px-4 md:px-6 mt-12"
          onMouseEnter={(event) => {
            document.body.dataset.cursorHidden = "true";
            if (carouselCursorRef.current) {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              cursorActiveRef.current = true;
              cursorTargetRef.current = { x, y };
              cursorCurrentRef.current = { x, y };
              gsap.set(carouselCursorRef.current, { x, y, force3D: true });
              gsap.to(carouselCursorRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          }}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setCarouselCursorDir(x < rect.width / 2 ? "left" : "right");
            cursorTargetRef.current = { x, y };
          }}
          onMouseLeave={() => {
            document.body.dataset.cursorHidden = "false";
            if (carouselCursorRef.current) {
              cursorActiveRef.current = false;
              gsap.to(carouselCursorRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            }
          }}
          onClick={() => {
            if (!carouselApi) return;
            if (carouselCursorDir === "left") {
              carouselApi.scrollPrev();
            } else {
              carouselApi.scrollNext();
            }
          }}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4 cursor-none">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[85%] sm:basis-[70%] md:basis-1/2 lg:basis-[40%] flex justify-center"
                >
                  <Card 
                    className="group relative border-0 shadow-none rounded-none overflow-hidden transition-colors duration-700 h-[419px] w-[465px]"
                    style={{
                      backgroundColor: isDark ? "#111111" : "#fafafa",
                      color: isDark ? "#ffffff" : "#000000"
                    }}
                  >
                    <CardContent className="relative z-10 h-full p-8 flex flex-col gap-6 justify-start">
                      <p className="[font-family:'Poppins',Helvetica] text-[14px] sm:text-[16px] lg:text-[17px] opacity-90 leading-relaxed w-full min-h-[168px]">
                        <AnimatedText
                          as="span"
                          className="block"
                          isDarkBg={isDark}
                          disableColorReveal
                          slideDuration={0.6}
                          slideStagger={0.05}
                        >
                          {testimonial.quote}
                        </AnimatedText>
                      </p>

                      <div className="flex gap-4 items-center min-h-[64px] mt-auto">
                        <Avatar className="w-12 h-12 sm:w-14 sm:h-14">
                          <AvatarImage src={testimonial.image} />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <div className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[14px] sm:text-[16px] lg:text-[18px]">
                            <AnimatedText
                              as="span"
                              className="inline"
                              isDarkBg={isDark}
                              disableColorReveal
                              slideDuration={0.5}
                              slideStagger={0.05}
                            >
                              {testimonial.name}
                            </AnimatedText>
                          </div>
                          <div className="[font-family:'Poppins',Helvetica] opacity-70 text-[12px] sm:text-[13px] lg:text-[14px]">
                            <AnimatedText
                              as="span"
                              className="inline"
                              isDarkBg={isDark}
                              disableColorReveal
                              slideDuration={0.5}
                              slideStagger={0.05}
                            >
                              {testimonial.title}
                            </AnimatedText>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div
            ref={carouselCursorRef}
            className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full transition-colors duration-700"
            style={{
              left: 0,
              top: 0,
              backgroundColor: isDark ? "#ffffff" : "#000000",
              color: isDark ? "#000000" : "#ffffff",
            }}
          >
            <span className="font-medium text-sm">Drag</span>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}