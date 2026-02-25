"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../../../components/ui/button";
import { AnimatedText } from "../../../../components/AnimatedText";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../../components/ui/carousel";
import { BrandMarquee } from "@/components/BrandMarquee";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */

const testimonials = [
  {
    quote:
      "The divenzo team has been exceptional throughout our project. Their dedication and attention to detail resulted in an outstanding final product. We’re absolutely thrilled with the outcome and couldn’t have asked for better. I would highly recommend them to anyone seeking top-notch services.",
    name: "Vijaya Bhaskar",
    title: "Founder, Bhaskara Hospitals",
    image: "/ellipse-9-2.svg",
  },
  {
    quote:
      "We’re grateful to Divenzo for their exceptional work on our project website.Their responsiveness, creativity, and dedication led to an outstanding result. It’s been a pleasure collaborating, and we whole heartedly recommend them.",
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

const faqItems = [
  {
    question: "What are your focus areas as a UI/UX agency?",
    answer: [
      "We design intuitive, visually engaging, and user-friendly digital products from websites to enterprise software. Focusing on interaction and usability, we create solutions that drive user acceptance and elevate your brand.",
      "As a global UX/UI design agency, we deliver a wide spectrum of design solutions from websites, web and mobile apps to enterprise software, AR/VR interfaces, brand identity, and front-end development. Along the way, we've made our mark across industries such as SaaS, healthcare, B2B, enterprise systems, and educational platforms. Our focus remains clear: to craft meaningful, visually compelling, and highly engaging user experiences on a global scale.",
    ],
  },
  {
    question: "What sets Divenzo apart from other top UI/UX design agencies?",
    answer: [
      "At Divenzo, we believe in honest partnerships we never over-promise and only commit to what we can confidently deliver. That’s why 97% of our clients are satisfied with our work and communication, with many returning for future collaborations. While others claim to be the best, we let our work and loyal clients speak for us. That’s what truly sets us apart.",
      "From UI/UX to branding, our team of seasoned, empathetic designers is equipped to bring your vision to life. We focus on creating user-friendly digital products that align with your unique needs and goals. At Divenzo, we don’t just promise results we deliver them with precision and care. Curious to know more? What services do you offer for start-ups, and how can they add real value to my business?",
    ],
  },
   {
    question: "What services do you offer for start-ups, and how can they add value to my business?",
    answer: [
      "As a UI/UX design agency, we understand the unique challenges startups face. That’s why we create tailored design solutions that go beyond aesthetics. From sleek, responsive websites to intuitive mobile apps, we focus on usability, clarity, and real-world impact. We dive deep into your users’ needs, map their journeys, and design experiences that solve genuine problems helping you build products that truly resonate.",
      "To bring your vision to life, we craft wireframes, build prototypes, and conduct user testing refining every detail until your product shines. Leave the design stress to us and embrace a human centered approach. We’re here to help you create a product your customers will love and one that drives real growth for your startup.",
    ],
  },
  {
    question: "Can you help us redesign our app, website, or enterprise/B2B software?",
    answer: [
      "Yes, we can help you redesign or revamp your digital products whether it’s apps, websites, or complex enterprise and B2B software. As a global UI/UX design agency, we offer a full suite of redesign solutions alongside new product design. Our revamp process includes in-depth user research and testing, streamlined information architecture, wireframing, prototyping, and the complete design and development of a refined, user-focused final product.",
      "Redesigning an existing digital product be it a website or enterprise software often demands as much, if not more, effort than building from scratch. It can be time-intensive, requiring deep research, strategic planning, and careful evaluation of existing assets. At Divenzo, we approach every redesign with clarity: aligning with what's working, discarding what’s not, and crafting a streamlined path forward. As a fast-moving UX design firm, we focus on minimizing complexity and maximizing impact.",
    ],
  },
  {
    question: "How do you estimate the time for the UI/UX project?",
    answer: [
      "The timeline for any UI/UX project largely depends on the project type and scope of deliverables. At our agency, projects typically range from 2 weeks to 6 months. During this time, we follow a structured, step-by-step process that includes strategy, user research, design, prototyping, and usability testing. Timelines may extend if additional revisions are needed or if clients request add-on features or expanded solutions. Flexibility and clarity are key to ensuring quality results.",
    
    ],
  },
   {
    question: "How much does a UI/UX design project cost?",
    answer: [
      "UI/UX design costs vary depending on your project goals, timeline, and deliverables. Our solutions typically start at $3000, but we offer flexible pricing to accommodate your specific needs. We encourage you to get in touch by scheduling a meeting through our contact form. Alternatively, we’re happy to reach out to you. After understanding your requirements, we’ll provide a detailed project proposal, including a customized pricing plan that may evolve through mutual discussion.",

    ],
  },
];

/* ================= COMPONENT ================= */

interface TestimonialsSectionProps {
  theme?: "light" | "dark";
}

export const TestimonialsSection = ({ theme }: TestimonialsSectionProps): JSX.Element => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const brandsTextRef = useRef<HTMLDivElement | null>(null);
  const testimonialDescRef = useRef<HTMLParagraphElement>(null);
  const faqDescRef = useRef<HTMLParagraphElement>(null);
  const carouselCursorRef = useRef<HTMLDivElement | null>(null);
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorCurrentRef = useRef({ x: 0, y: 0 });
  const cursorActiveRef = useRef(false);
  const isDark = theme === "dark";
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [carouselCursorDir, setCarouselCursorDir] = useState<"left" | "right">(
    "right"
  );

  useEffect(() => {
    // Brands text Dzinr word reveal
    if (brandsTextRef.current) {
      const topLayers = brandsTextRef.current.querySelectorAll('.word-top-layer');
      
      const scrollTrigger = gsap.fromTo(
        topLayers,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: brandsTextRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      return () => {
        scrollTrigger.scrollTrigger?.kill();
      };
    }
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
  const ctx = gsap.context(() => {
    // Keep existing slide-in only for elements that still use refs
  });

  return () => ctx.revert();
}, []);
  return (
    <section
      className={`relative w-full overflow-x-hidden transition-colors duration-700 ${
        isDark ? "dark-section" : ""
      }`}
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
      data-section="testimonials"
    >
      <div className="w-full pt-[40px] sm:pt-[50px] lg:pt-[50px] pb-[40px] sm:pb-[50px] lg:pb-[50px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 md:gap-20">

          {/* ===== BRANDS (MARQUEE) ===== */}
          <div className="flex flex-col gap-6 md:gap-12">
            <div 
              ref={brandsTextRef}
              className="
                [font-family:'Poppins',Helvetica] font-normal
                text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px]
                leading-[38px] sm:leading-[50px] md:leading-[70px] lg:leading-[90px]
              "
            >
              {("Years of collaboration, countless ideas shared, and amazing brands by our side.").split(' ').map((word, index) => (
                <span key={index} className="relative inline-block mr-[0.3em]">
                  <span 
                    className="word-base-layer"
                    style={{ 
                      opacity: 0.3,
                      color: isDark ? '#999999' : '#666666'
                    }}
                  >
                    {word}
                  </span>
                  <span 
                    className="word-top-layer absolute inset-0"
                    style={{ 
                      opacity: 0,
                      color: isDark ? '#ffffff' : '#000000'
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </div>
            <BrandMarquee />
          </div>
          

          {/* ===== TESTIMONIALS ===== */}
          <div className="flex flex-col gap-6 md:gap-12">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[40px] sm:text-[56px] md:text-[100px] lg:text-[100px]">
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
             <div className="max-w-full lg:max-w-[930px] ml-0 lg:ml-auto">
            <AnimatedText
              className="
                [font-family:'Poppins',Helvetica] font-normal text-inherit
                text-[18px] sm:text-[24px] lg:text-[32px]
                tracking-[0] leading-normal
              "
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
            We work with forward-thinking clients who value creativity and results. Together, we build experiences that inspire and deliver growth.
            </AnimatedText>

            
          </div>

            <div
              className="relative mt-6 md:mt-12"
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
                    duration: 0.3,
                    ease: "power3.out",
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
                    duration: 0,
                    ease: "none",
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
                // 1. REMOVED the plugins={[plugin.current]} line to stop auto-scrolling
                opts={{ align: "start", loop: true }}
                setApi={setCarouselApi}
                className="w-full"
              >
                <CarouselContent className="-ml-4 cursor-none">
                  {/* 2. DUPLICATED the array so Embla has enough cards to create an infinite loop */}
                  {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[40%]"
                    >
                      <Card
                        className={`
                          group relative border-0 shadow-none rounded-none overflow-hidden transition-colors duration-700
                          h-full min-h-[360px] sm:min-h-[419px] w-full
                          ${isDark ? "bg-[#111111]" : "bg-[#fafafa]"}
                        `}
                      >
                        <CardContent className="relative z-10 h-full p-6 sm:p-8 flex flex-col gap-6 justify-between">
                          <AnimatedText
                            className="[font-family:'Poppins',Helvetica] text-inherit opacity-90 text-[14px] sm:text-[16px] lg:text-[17px] w-full"
                            isDarkBg={isDark}
                            disableColorReveal
                            slideDuration={0.8}
                            slideStagger={0.08}
                          >
                            {t.quote}
                          </AnimatedText>

                          <div className="flex gap-4 items-center mt-6">
                            <Avatar className="w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                              <AvatarImage src={t.image} />
                              <AvatarFallback>
                                {t.name[0]}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                              <AnimatedText
                                className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[14px] sm:text-[16px] lg:text-[18px]"
                                isDarkBg={isDark}
                                disableColorReveal
                                slideDuration={0.8}
                                slideStagger={0.08}
                              >
                                {t.name}
                              </AnimatedText>
                              <AnimatedText
                                className="[font-family:'Poppins',Helvetica] text-inherit opacity-70 text-[12px] sm:text-[13px] lg:text-[14px]"
                                isDarkBg={isDark}
                                disableColorReveal
                                slideDuration={0.8}
                                slideStagger={0.08}
                              >
                                {t.title}
                              </AnimatedText>
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
                className="pointer-events-none absolute z-20 flex h-20 w-20 items-center justify-center rounded-full"
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
          </div>


          {/* ===== FAQ ===== */}
          <div className="flex flex-col gap-4 md:gap-12 mt-4 md:mt-10">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[40px] sm:text-[56px] md:text-[100px] lg:text-[100px]">
              <AnimatedText
                as="span"
                className="block"
                isDarkBg={isDark}
                disableColorReveal
                slideDuration={0.8}
                slideStagger={0.08}
              >
                FAQ
              </AnimatedText>
            </h2>
               <div className="max-w-full lg:max-w-[930px] ml-0 lg:ml-auto">
            <AnimatedText
              className="
                [font-family:'Poppins',Helvetica] font-normal text-inherit
                text-[18px] sm:text-[24px] lg:text-[32px]
                tracking-[0] leading-normal
              "
              isDarkBg={isDark}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
           We're thrilled that you're interested in learning from us. Before you apply, here are a few things to keep in mind. Let’s help you get started on the right path.
            </AnimatedText>

          
          </div>

            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={index === faqItems.length - 1 ? "border-0" : "border-b border-[#cccccc]"}
                >
                  <AccordionTrigger className="py-6">
                    <span className="block [font-family:'Poppins',Helvetica] font-normal text-[14px] sm:text-[22px] lg:text-[28px] leading-[1.4]">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer.map((p, i) => (
                      <p
                        key={i}
                        className={`[font-family:'Poppins',Helvetica] text-[16px] sm:text-[17px] lg:text-[18px] leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {p}
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
            </div>
          
        </div>
      </div>
    </section>
  );
};
