"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../../../components/ui/button";


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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

export const TestimonialsSection = (): JSX.Element => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const headingRef = useRef<HTMLHeadingElement | null>(null);
    const testimonialDescRef = useRef<HTMLParagraphElement>(null);
    const faqDescRef = useRef<HTMLParagraphElement>(null);
  

  useEffect(() => {
    if (!headingRef.current) return;

    const el = headingRef.current;
    const fullText =
      "Years of collaboration, countless ideas shared, and amazing brands by our side.";

    const words = fullText.split(" ").map((word, i) =>
      i === 0
        ? `<span class='word inline-block text-[#2b2b2b]'>${word}</span>`
        : `<span class='word inline-block text-[#2b2b2b4c]'><span class='inner block translate-y-full opacity-0'>${word}</span></span>`
    );

    el.innerHTML = words.join(" ");

    gsap.to(el.querySelectorAll(".inner"), {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.12,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });
  }, []);


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
    <section className="relative w-full bg-white overflow-x-hidden">
      <div className="w-full py-[100px] sm:py-[140px] lg:py-[160px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 md:gap-20">

          {/* ===== BRANDS (MARQUEE) ===== */}
          <div className="flex flex-col gap-6 md:gap-12">
            <h2
              ref={headingRef}
              className="
                [font-family:'Poppins',Helvetica] font-normal
                text-[36px] sm:text-[56px] lg:text-[80px]
                leading-[44px] sm:leading-[70px] lg:leading-[90px]
              "
            />
            <BrandMarquee />
          </div>

          {/* ===== TESTIMONIALS ===== */}
          <div className="flex flex-col gap-6 md:gap-12">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[46px] sm:text-[80px] lg:text-[120px]">
              Testimonials
            </h2>
             <div className="max-w-full lg:max-w-[930px] ml-0 lg:ml-auto">
            <p
              ref={descRef}
              className="
                [font-family:'Poppins',Helvetica] font-normal text-black
                text-[18px] sm:text-[24px] lg:text-[40px]
                tracking-[0] leading-normal
              "
            >
            We work with forward-thinking clients who value creativity and results. Together, we build experiences that inspire and deliver growth.
            </p>

            <Button
              variant="link"
              className="h-auto w-fit p-0 flex flex-col items-start gap-1 mt-4"
            >
              <span
                className="
                  [font-family:'Poppins',Helvetica] font-normal text-white
                  text-[20px] sm:text-[24px] lg:text-[32px]
                "
              >
                Discover More
              </span>
              <div className="w-[160px] sm:w-[190px] lg:w-[226px] h-0.5 bg-[#ffffff66]" />
            </Button>
          </div>

            <div className="relative">
              <Carousel
                plugins={[plugin.current]}
                opts={{ align: "start", loop: true }}
                className="max-w-7xl mx-auto"
              >
                <CarouselContent>
                  {testimonials.map((t, i) => (
                    <CarouselItem
                      key={i}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="border-0 shadow-none bg-transparent">
                        <CardContent className="p-4 flex flex-col gap-6">
                          <p className="[font-family:'Poppins',Helvetica] text-[#000000e6] text-[14px] sm:text-[16px] lg:text-[17px] w-full">
                            {t.quote}
                          </p>

                          <div className="flex gap-4 items-center">
                            <Avatar className="w-12 h-12 sm:w-14 sm:h-14">
                              <AvatarImage src={t.image} />
                              <AvatarFallback>
                                {t.name[0]}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <div className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[14px] sm:text-[16px] lg:text-[18px]">
                                {t.name}
                              </div>
                              <div className="[font-family:'Poppins',Helvetica] text-[#555] text-[12px] sm:text-[13px] lg:text-[14px]">
                                {t.title}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* ✅ MOBILE + DESKTOP ARROWS */}
                <CarouselPrevious
                  className="
          flex
          absolute top-1/2 -translate-y-1/2
          h-10 w-10 sm:h-12 sm:w-12
          bg-white shadow-md
          hover:bg-gray-100
        "
                />

                <CarouselNext
                  className="
          flex
          absolute  top-1/2 -translate-y-1/2
          h-10 w-10 sm:h-12 sm:w-12
          bg-white shadow-md
          hover:bg-gray-100
        "
                />
              </Carousel>
            </div>
          </div>


          {/* ===== FAQ ===== */}
          <div className="flex flex-col gap-4 md:gap-12 mt-4 md:mt-10">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px]">
              FAQ
            </h2>
               <div className="max-w-full lg:max-w-[930px] ml-0 lg:ml-auto">
            <p
              ref={descRef}
              className="
                [font-family:'Poppins',Helvetica] font-normal text-black
                text-[18px] sm:text-[24px] lg:text-[40px]
                tracking-[0] leading-normal
              "
            >
           We're thrilled that you're interested in learning from us. Before you apply, here are a few things to keep in mind. Let’s help you get started on the right path.
            </p>

          
          </div>

            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-[#cccccc]"
                >
                  <AccordionTrigger className="py-6">
                    <span className="[font-family:'Poppins',Helvetica] text-[14px] sm:text-[22px] lg:text-[28px]">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer.map((p, i) => (
                      <p
                        key={i}
                        className="[font-family:'Poppins',Helvetica] text-gray-700 text-[14px] sm:text-[15px] lg:text-base leading-relaxed mb-3 "
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
