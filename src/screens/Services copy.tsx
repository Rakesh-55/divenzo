import { Navbar } from "@/components/Navbar";
import Autoplay from "embla-carousel-autoplay";

import React from "react";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import { AnimatedText } from "@/components/AnimatedText";
import service_img from "../assets/service_img.png";
import * as Separator from "@radix-ui/react-separator";
import { TestimonialsSection } from "./HomePageScreen/sections/TestimonialsSection";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


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
      "We craft digital experiences that don’t just look good—they perform. Our marketing strategies blend creativity with data to drive visibility, engagement, and growth. From SEO and ads to content and social campaigns, we turn your brand into a digital powerhouse.",
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
      <section className="relative w-full bg-white ">
        <div className="flex flex-col gap-[56px]">
          <div className="max-w-[1280px] mx-auto pt-20 pb-20">
            <div className="mb-[56px]">
              <AnimatedText
                className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[120px] tracking-[0] leading-[85px] mb-[56px]"
                isDarkBg={false}
                disableColorReveal
                slideDuration={0.8}
                slideStagger={0.08}
              >
                Services
              </AnimatedText>

              <div className="ml-[350px]">
                <AnimatedText
                  className="[font-family:'Poppins',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal] mb-[56px]"
                  isDarkBg={false}
                  disableColorReveal
                  slideDuration={0.8}
                  slideStagger={0.08}
                >
                  We are a UX/UI design company that crafts scalable, sustainable, and innovative solutions to transform extraordinary ideas into reality.
                </AnimatedText>
              </div>

              <img src={service_img} alt="service" />
            </div>
          </div>


        </div>
      </section>

      {/* service section  */}

      <section className="bg-black text-white py-32 px-10 md:px-20 dark-section">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-24">
          {servicesData.map((service) => (
            <div key={service.id} className="flex flex-col gap-8">
              {/* Heading */}
              <AnimatedText
                className="[font-family:'Poppins',Helvetica] font-semibold text-[48px] md:text-[44px] leading-[normal]"
                isDarkBg
                disableColorReveal
                slideDuration={0.8}
                slideStagger={0.08}
              >
                {service.id}. {service.title}
              </AnimatedText>

              <div className="ml-auto">


                {/* Description */}
                <AnimatedText
                  className="[font-family:'Poppins',Helvetica] font-normal text-[20px] md:text-[28px] text-[#cccccc] leading-[1.4] max-w-[960px]"
                  isDarkBg
                  disableColorReveal
                  slideDuration={0.8}
                  slideStagger={0.08}
                >
                  {service.description}
                </AnimatedText>

                {/* Bullet Points */}

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-6 list-disc pl-6">
                  {service.points.map((point, index) => (
                    <li
                      key={index}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[20px] text-[#ffffffcc] leading-[1.6]"
                    >
                      <AnimatedText
                        className="[font-family:'Poppins',Helvetica] font-normal text-[20px] text-[#ffffffcc] leading-[1.6]"
                        isDarkBg
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
          ))}
        </div>
      </section>

      {/* process section */}

      <section className="relative w-full bg-white  px-20 pb-20">
        <div className="max-w-[1260px] mx-auto">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[120px] tracking-[0] leading-[normal] mb-[26px]">
            Process
          </h2>

          <p className="max-w-[930px] ml-auto [font-family:'Poppins',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal] mb-[86px]">
            A flexible, adaptive process designed to help businesses launch faster
            and scale with confidence.
          </p>

          <div className="grid grid-cols-2 gap-x-[78px] gap-y-[72px]">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="[font-family:'Poppins',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal]">
                      {step.number}
                    </div>



                    <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-[normal]">
                      {step.title}
                    </h3>
                  </div>

                  <Separator.Root className="bg-neutral-200 h-[2px] w-full" />
                </div>

                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000CC] text-2xl tracking-[0] leading-[normal]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* testmonial section */}
      <div className="flex flex-col gap-12">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[120px] tracking-[0] leading-normal">
            Testimonials
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[32px] tracking-[0] leading-normal max-w-[930px] ml-[350px]">
            We work with forward-thinking clients who value creativity and
            results. Together, we build experiences that inspire and deliver
            growth.
          </p>
        </div>


        <div className="relative w-full py-12 bg-white">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            onMouseEnter={plugin.current.stop}
            className="w-full max-w-7xl mx-auto px-4 md:px-6"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  <Card className="border-0 shadow-none bg-transparent [font-family:'Poppins',Helvetica] min-h-20">
                    <CardContent className="p-3 flex flex-col justify-between h-full">

                      {/* Quote section */}
                      <div className="relative">
                        {/* Soft big open quote behind text */}
                        <span className="absolute -top-10 bottom-3 -left-2 text-[220px] text-[#e5e5e5] leading-none font-serif select-none z-10">
                          &ldquo;
                        </span>

                        {/* Quote text */}
                        <p className="relative font-poppins text-[17px] md:text-[18px] text-[#000000e6] leading-relaxed z-10">
                          {testimonial.quote}
                        </p>
                      </div>



                      {/* Avatar + Name */}
                      <div className="flex gap-4 items-center mt-8">
                        <Avatar className="w-14 h-14 ring-1 ring-gray-200">
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <div className="font-poppins font-semibold text-black text-lg">
                            {testimonial.name}
                          </div>
                          <div className="font-poppins text-[#555] text-sm">
                            {testimonial.title}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-100" />
            <CarouselNext className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-100" />
          </Carousel>
        </div>
      </div>



      <FooterSection />
    </>

  );
}
