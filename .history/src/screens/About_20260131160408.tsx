import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

import about_img from "../assets/about_img.png";
import navneeta from "../assets/team/navneeta.png";
import anonymos from "../assets/team/anonymos.png";
import ramesh from "../assets/team/ramesh.png";
import saikumar from "../assets/team/saikumar.png";
import ajaykumar from "../assets/team/ajaykumar.png";
import divya from "../assets/team/divya.png";
import bhanuprakash from "../assets/team/bhanuprakash.png";
import vinaykumar from "../assets/team/vinaykumar.png";
import bhavani from "../assets/team/bhavani.png";
import srinavas from "../assets/team/srinavas.png";

import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandMarquee } from "@/components/BrandMarquee";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */

const brandLogos = [
  "/client/Haritha_Hospital.png",
  "/client/celeb_fiesta.png",
  "/client/ibha_1.png",
  "/client/Prasad_Pathlabs.png",
  "/client/Adhya_Productions.png",
  "/client/Bhaskara_Hospital.png",
  "/client/NPR_Films.png",
  "/client/Sew_Design_Studio.png",
];

const team = [
  { image: navneeta, name: "Navneeta. K", designation: "Founder" },
  { image: anonymos, name: "No Name", designation: "Head of Design" },
  { image: ramesh, name: "Ramesh. T", designation: "Digital Marketing Head" },
  { image: saikumar, name: "Sai Kumar. D", designation: "Senior Software Developer" },
  { image: ajaykumar, name: "Ajay Kumar", designation: "Brand Designer" },
  { image: divya, name: "Divya. K", designation: "Software Developer" },
  { image: bhanuprakash, name: "Bhanu Prakash. K", designation: "Product & Ad Photographer" },
  { image: vinaykumar, name: "Vinay Kumar", designation: "Lead Product Designer" },
  { image: bhavani, name: "Bhavani. V", designation: "Senior UX Designer" },
  { image: srinavas, name: "Srinivas. K", designation: "Marketing & Account Management" },
];

const statsData = [
  { number: "9+", title: "Projects launched", description: "Helping brands make their mark online." },
  { number: "10K+", title: "Users reached", description: "Our designs engage millions globally" },
  { number: "98%", title: "Client satisfaction rate", description: "We build long-term partnerships through proven results." },
  { number: "1+", title: "Years of expertise", description: "Decades of experience in delivering impactful digital solutions." },
];



const TeamCard = ({ card }) => {
  return (
    <div className="flex flex-col items-start text-white">

      {/* Image */}
      <div className="overflow-hidden mb-3 sm:mb-4 bg-[#1a1a1a] w-full">
        <img
          src={card.image}
          alt={card.name}
          className="
            w-full object-contain transition-transform duration-500 hover:scale-105
             sm:h-[220px] lg:h-auto
          "
        />
      </div>

      {/* Name */}
      <h3
        className="
          [font-family:'Poppins',Helvetica] font-semibold
          text-[18px] sm:text-[20px] lg:text-[22px]
          leading-tight
        "
      >
        {card.name}
      </h3>

      {/* Role */}
      <p
        className="
          [font-family:'Poppins',Helvetica] font-normal text-[#ccc]
          text-[14px] sm:text-[15px] lg:text-[16px]
        "
      >
        {card.designation}
      </p>
    </div>
  );
};

/* ================= PAGE ================= */

export default function About() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const el = headingRef.current;
    const fullText =
      "Our work speaks through numbers. Here’s what we’ve achieved so far.";

    const words = fullText.split(" ").map((word, i) =>
      i === 0
        ? `<span class='word inline-block text-black overflow-hidden'>${word}</span>`
        : `<span class='word inline-block text-[#00000066] overflow-hidden'><span class='inner block translate-y-full opacity-0'>${word}</span></span>`
    );

    el.innerHTML = words.join(" ");

    const innerWords = el.querySelectorAll(".inner");

    gsap.to(innerWords, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    const grayWords = el.querySelectorAll(".word:not(:first-child)");
    gsap.to(grayWords, {
      color: "#000000",
      stagger: { each: 0.1, amount: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".stat-card");

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);
  return (
    <>
      <Navbar />

      <section className="relative w-full bg-white overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto py-10 md:py-20 px-4 lg:px-0">

          {/* ABOUT */}z
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] leading-[1] mb-[36px] md:mb-[56px]">
            About Us
          </h2>

          <div className="ml-0 lg:ml-[350px]">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[40px] mb-[36px] md:mb-[56px]">
              As global leaders in UX/UI design, technology and marketing solutions, we are dedicated to simplifying, strengthening, and transforming businesses of all sizes. our mission is to bridge the gap between creativity and technology, crafting seamless experiences that inspire users and drive measurable outcomes for our clients.
            </p>
          </div>

          <img src={about_img} alt="about" className="w-full my-8 md:my-12" />

          <div className="ml-0 lg:ml-[350px] space-y-[16px] md:space-y-[56px]">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[40px]">
              At Divenzo, we create brand experiences that endure, scale, and connect. Through intentional design systems, we partner with founders to transform ideas into powerful stories that spark emotion and clarity.
            </p>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[40px]">
              We believe design should move with purpose. Our vision is to create brands that inspire leadership. By uniting strategy, creativity, and motion, we craft iconic identities that shape culture and drive business forward.
            </p>
          </div>

          {/* STATS */}
          <div className="mt-[40px] md:mt-[100px]">
            <h3
              ref={headingRef}
              className="
              [font-family:'Poppins',Helvetica] font-normal text-black
              text-[36px] sm:text-[56px] lg:text-[80px]
              leading-[44px] sm:leading-[70px] lg:leading-[90px]
              mb-[40px] lg:mb-[72px]
            "
            >
              Our work speaks through numbers. Here&apos;s what we&apos;ve achieved
              so far.
            </h3>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12" ref={cardsRef}>
              {statsData.map((stat, i) => (
                <Card key={i} className="border-0 shadow-none bg-transparent stat-card" >
                  <CardContent className="p-0 flex flex-col md:gap-4">
                    <div className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[48px] sm:text-[56px] lg:text-7xl">
                      {stat.number}
                    </div>
                    <Separator className="bg-neutral-200" />
                    <h4 className="[font-family:'Poppins',Helvetica] font-bold text-[18px] sm:text-[20px] lg:text-[22px]">
                      {stat.title}
                    </h4>
                    <p className="[font-family:'Poppins',Helvetica] text-[#000000cc] text-[14px] sm:text-[15px] lg:text-lg">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* ================= TEAM SECTION ================= */}
        <div className="bg-black">
          <div className="max-w-[1280px] mx-auto py-[70px] px-4 lg:px-0">

            {/* Heading – unchanged */}
            <h3 className="[font-family:'Poppins',Helvetica] font-normal text-[36px] sm:text-[56px] lg:text-[80px] tracking-[0] leading-[50px] lg:leading-[90px] mb-[72px]">
              <span className="text-white">Design </span>
              <span className="text-[#f3f3f366]">
                is more than visuals. It’s the trust you earn, the emotion you spark,
                and the impact that lasts.
              </span>
            </h3>

            {/* ===== MOBILE + TABLET (Grid preferred, Flex fallback handled by grid) ===== */}
            <div className="grid grid-cols-2 gap-8 lg:hidden">
              {team.map((member, index) => (
                <TeamCard key={index} card={member} />
              ))}
            </div>

            {/* ===== DESKTOP (YOUR ORIGINAL STAGGERED GRID – UNTOUCHED) ===== */}
            <div className="hidden lg:grid grid-cols-4 gap-12">
              <div className="col-start-2">
                <TeamCard card={team[0]} />
              </div>

              <div className="col-start-4">
                <TeamCard card={team[1]} />
              </div>

              <div className="col-start-1">
                <TeamCard card={team[2]} />
              </div>

              <div className="col-start-3">
                <TeamCard card={team[3]} />
              </div>

              <div className="col-start-4">
                <TeamCard card={team[4]} />
              </div>

              <div className="col-start-2">
                <TeamCard card={team[5]} />
              </div>

              <div className="col-start-3">
                <TeamCard card={team[6]} />
              </div>

              <div className="col-start-4">
                <TeamCard card={team[7]} />
              </div>

              <div className="col-start-1">
                <TeamCard card={team[8]} />
              </div>

              <div className="col-start-4">
                <TeamCard card={team[9]} />
              </div>
            </div>

            {/* Bottom paragraph – unchanged */}
            <div className="ml-0 lg:ml-[350px] pt-20">
              <p className="[font-family:'Poppins',Helvetica] font-normal text-white text-[18px] sm:text-[24px] lg:text-[40px] tracking-[0] leading-[normal]">
                We’re a team of designers, product managers, developers, and storytellers
                dedicated to helping businesses of all sizes bring their next big idea
                to life.
              </p>
            </div>

          </div>
        </div>


        <div className="max-w-[1280px] mx-auto py-10 md:py-20 px-4 lg:px-0">

          {/* ABOUT */}
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-[#2b2b2b] text-[56px] sm:text-[80px] lg:text-[120px] leading-[1] mb-[36px] md:mb-[56px]">
            Clients
          </h2>

          <div className="ml-0 lg:ml-[350px]">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[40px] mb-[36px] md:mb-[56px]">
              Every client relationship begins with shared passion. That passion fuels the meaningful experiences we create together.            </p>
          </div>



          <BrandMarquee />
        </div>

      </section>

      <FooterSection />
    </>
  );
}
