import { Navbar } from "@/components/Navbar";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import service_img from "../assets/service_img.png";
import * as Separator from "@radix-ui/react-separator";
import { ScrollDrivenStickySection } from "@/components/ScrollDrivenStickySection";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  {
    quote:
      "We're grateful to Divenzo for their exceptional work on our project website. Their responsiveness, creativity, and dedication led to an outstanding result. It's been a pleasure collaborating, and we wholeheartedly recommend them.",
    name: "Jaswinder Singh",
    title: "Founder, RW Infotech",
    image: "/ellipse-9.svg",
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

/* ================= PAGE ================= */

export default function Services() {
  const plugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    })
  );

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative w-full bg-white">
        <div className="max-w-[1280px] mx-auto py-10 md:py-20 px-4 lg:px-0">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] leading-[85px] mb-[36px] md:mb-[56px]">
            Services
          </h2>

          <div className="ml-0 lg:ml-[350px]">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[40px] mb-[36px] md:mb-[56px]">
              We are a UX/UI design company that crafts scalable, sustainable, and
              innovative solutions to transform extraordinary ideas into reality.
            </p>
          </div>

          <img src={service_img} alt="service" className="w-full h-auto  my-8 md:my-12" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-black text-white">
        <div className="max-w-[1280px] mx-auto">
          {servicesData.map((service, idx) => (
            <ScrollDrivenStickySection
              key={service.id}
              number={service.id.toString()}
              title={service.title}
              description={service.description}
              points={service.points}
              index={idx}
              totalSections={servicesData.length}
            />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative w-full bg-white pt-10 pb-20  px-4 lg:px-20 ">
        <div className="max-w-[1260px] mx-auto">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] mb-[16px] md:mb-[26px]">
            Process
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[40px] mb-[46px] md:mb-[86px] max-w-[930px] ml-0 lg:ml-auto">
            A flexible, adaptive process designed to help businesses launch faster
            and scale with confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[78px] gap-y-[32px] md:gap-y-[72px]">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col gap-2 md:gap-4">
                <div className="[font-family:'Poppins',Helvetica] font-normal text-black text-2xl">
                  {step.number}
                </div>

                <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[24px] lg:text-[32px]">
                  {step.title}
                </h3>

                <Separator.Root className="bg-neutral-200 h-[2px]" />

                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000CC] text-[16px] sm:text-[18px] lg:text-2xl">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
<section className="pb-24">
  <div className="max-w-[1280px] mx-auto px-4 lg:px-0">
    <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[46px] sm:text-[80px] lg:text-[120px] mb-4">
      Testimonials
    </h2>

    <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[18px] sm:text-[24px] lg:text-[40px] max-w-[930px] ml-0 lg:ml-[350px]">
      We work with forward-thinking clients who value creativity and results.
      Together, we build experiences that inspire and deliver growth.
    </p>
  </div>

  {/* 🔹 RELATIVE WRAPPER IS REQUIRED */}
  <div className="relative max-w-7xl mx-auto px-4 md:px-6 mt-12">
    <Carousel
      plugins={[plugin.current]}
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {testimonials.map((testimonial, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
          >
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="p-3 flex flex-col gap-6">
                <p className="[font-family:'Poppins',Helvetica] text-[15px] sm:text-[17px] md:text-[18px] text-[#000000e6] leading-relaxed">
                  {testimonial.quote}
                </p>

                <div className="flex gap-4 items-center">
                  <Avatar className="w-12 h-12 ring-1 ring-gray-200">
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[16px]">
                      {testimonial.name}
                    </div>
                    <div className="[font-family:'Poppins',Helvetica] text-[#555] text-[14px]">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* ✅ FORCE VISIBLE ARROWS (MOBILE + DESKTOP) */}
      <CarouselPrevious
        className="
          absolute left-2 top-1/2 -translate-y-1/2
          z-20
          h-10 w-10 sm:h-12 sm:w-12
          bg-white
          opacity-100
          shadow-lg
          border border-black/10
        "
      />

      <CarouselNext
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          z-20
          h-10 w-10 sm:h-12 sm:w-12
          bg-white
          opacity-100
          shadow-lg
          border border-black/10
        "
      />
    </Carousel>
  </div>
</section>


      <FooterSection />
    </>
  );
}
