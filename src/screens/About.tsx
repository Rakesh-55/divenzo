"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { AnimatedText } from "@/components/AnimatedText";
import { useScrollProgress } from "@/hooks/useScrollProgress";

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
  { image: anonymos, name: "AK", designation: "Head of Design" },
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

const TeamCard = ({ card, isDark = true }) => {
  return (
    <div 
      className="flex flex-col items-start transition-colors duration-700 ease-in-out"
    >
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
        <AnimatedText
          as="span"
          className="inline-block"
          isDarkBg={isDark}
          disableColorReveal
          slideDuration={0.6}
          slideStagger={0.04}
        >
          {card.name}
        </AnimatedText>
      </h3>

      {/* Role */}
      <p
        className="
          [font-family:'Poppins',Helvetica] font-normal
          text-[14px] sm:text-[15px] lg:text-[16px] transition-colors duration-700
        "
        style={{ color: isDark ? "#ccc" : "#666" }}
      >
        <AnimatedText
          as="span"
          className="inline-block"
          isDarkBg={isDark}
          disableColorReveal
          slideDuration={0.6}
          slideStagger={0.04}
        >
          {card.designation}
        </AnimatedText>
      </p>
    </div>
  );
};

/* ================= PAGE ================= */

export default function AboutSection() {
  const mainRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const teamSectionRef = useRef<HTMLDivElement | null>(null);
  const clientsSectionRef = useRef<HTMLDivElement | null>(null);
  const statsContainerRef = useRef<HTMLDivElement | null>(null);
  const statsTextRef = useRef<HTMLDivElement | null>(null);
  const teamDesignTextRef = useRef<HTMLDivElement | null>(null);
  
  // Single state purely for child components (AnimatedText, Cards)
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // 1. Color Background Triggers (Direct DOM manipulation for smoothness)
      if (teamSectionRef.current && clientsSectionRef.current && mainRef.current) {
        
        // Enter Team Section (White -> Black)
        ScrollTrigger.create({
          trigger: teamSectionRef.current,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => { 
            gsap.to(mainRef.current, { backgroundColor: "#000", color: "#fff", duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
            setIsDarkTheme(true); 
          },
          onLeaveBack: () => { 
            gsap.to(mainRef.current, { backgroundColor: "#fff", color: "#000", duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
            setIsDarkTheme(false); 
          },
        });

        // Enter Clients Section (Black -> White)
        ScrollTrigger.create({
          trigger: clientsSectionRef.current,
          start: "top 50%",
          onEnter: () => { 
            gsap.to(mainRef.current, { backgroundColor: "#fff", color: "#000", duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
            setIsDarkTheme(false); 
          },
          onLeaveBack: () => { 
            gsap.to(mainRef.current, { backgroundColor: "#000", color: "#fff", duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
            setIsDarkTheme(true); 
          },
        });
      }

      // 2. Stat Cards Animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".stat-card");
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%", end: "top 30%", toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Stats Text Unveil
      if (statsTextRef.current) {
        const topLayers = statsTextRef.current.querySelectorAll('.word-top-layer');
        gsap.fromTo(
          topLayers,
          { opacity: 0 },
          {
            opacity: 1, stagger: 0.08, ease: "none",
            scrollTrigger: {
              trigger: statsTextRef.current,
              start: "top 70%", end: "top 20%", scrub: true,
            }
          }
        );
      }

      // 4. Team Design Text Unveil
      if (teamDesignTextRef.current) {
        const topLayers = teamDesignTextRef.current.querySelectorAll('.word-top-layer');
        gsap.fromTo(
          topLayers,
          { opacity: 0 },
          {
            opacity: 1, stagger: 0.08, ease: "none",
            scrollTrigger: {
              trigger: teamDesignTextRef.current,
              start: "top 70%", end: "top 20%", scrub: true,
            }
          }
        );
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={mainRef}
        className={`relative w-full overflow-x-hidden ${isDarkTheme ? "dark-section" : ""}`}
        style={{ backgroundColor: "#fff", color: "#000" }} // Initial state for GSAP to animate from
      >
        <div className="max-w-[1280px] mx-auto pt-3 pb-8 md:pt-8 md:pb-16 px-4 lg:px-8 xl:px-0">

          {/* ABOUT */}
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[40px] sm:text-[56px] md:text-[80px] lg:text-[120px] leading-[1] mb-[36px] md:mb-[56px]">
            <AnimatedText
              as="span"
              className="block"
              isDarkBg={isDarkTheme}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              About Us
            </AnimatedText>
          </h2>

          <div className="ml-0 md:ml-[80px] lg:ml-[200px] xl:ml-[350px]">
            <AnimatedText
              className="[font-family:'Poppins',Helvetica] font-normal text-inherit text-[18px] sm:text-[24px] lg:text-[32px] mb-[36px] md:mb-[56px]"
              isDarkBg={isDarkTheme}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              As global leaders in UX/UI design, technology and marketing solutions, we are dedicated to simplifying, strengthening, and transforming businesses of all sizes. our mission is to bridge the gap between creativity and technology, crafting seamless experiences that inspire users and drive measurable outcomes for our clients.
            </AnimatedText>
          </div>

          <img
            src={about_img}
            alt="about"
            className="w-full mt-8 mb-[50px] md:mt-12"
          />

          <div className="ml-0 md:ml-[80px] lg:ml-[200px] xl:ml-[350px] space-y-[16px] md:space-y-[56px]">
            <AnimatedText
              className="[font-family:'Poppins',Helvetica] font-normal text-inherit text-[18px] sm:text-[24px] lg:text-[32px]"
              isDarkBg={isDarkTheme}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              At Divenzo, we create brand experiences that endure, scale, and connect. Through intentional design systems, we partner with founders to transform ideas into powerful stories that spark emotion and clarity.
            </AnimatedText>
            <AnimatedText
              className="[font-family:'Poppins',Helvetica] font-normal text-inherit text-[18px] sm:text-[24px] lg:text-[32px]"
              isDarkBg={isDarkTheme}
              disableColorReveal
              slideDuration={0.8}
              slideStagger={0.08}
            >
              We believe design should move with purpose. Our vision is to create brands that inspire leadership. By uniting strategy, creativity, and motion, we craft iconic identities that shape culture and drive business forward.
            </AnimatedText>
          </div>

          {/* STATS */}
          <div 
            ref={statsContainerRef}
            className="mt-[40px] md:mt-[100px] -mx-4 lg:mx-0 px-4 py-8"
          >
            <h3
              ref={statsTextRef}
              className="
              [font-family:'Poppins',Helvetica] font-normal 
              text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px]
              leading-[38px] sm:leading-[50px] md:leading-[70px] lg:leading-[90px]
              mb-[40px] lg:mb-[72px]
            "
            >
              {("Our work speaks through numbers. Here's what we've achieved so far.").split(' ').map((word, index) => (
                <span key={index} className="relative inline-block mr-[0.3em]">
                  <span 
                    className="word-base-layer transition-colors duration-700 ease-in-out" 
                    style={{ 
                      opacity: 0.3,
                      color: isDarkTheme ? '#999999' : '#666666'
                    }}
                  >
                    {word}
                  </span>
                  <span 
                    className="word-top-layer absolute inset-0 transition-colors duration-700 ease-in-out" 
                    style={{ 
                      opacity: 0,
                      color: isDarkTheme ? '#ffffff' : '#000000'
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h3>

            <div
              ref={cardsRef}
              className="flex flex-wrap gap-4 lg:gap-5 justify-center w-full"
            >
              {statsData.map((stat, index) => (
                <Card
                  key={index}
                  className="
                    stat-card border-0 shadow-none rounded-none transition-colors duration-700 ease-in-out flex-none
                    w-[285px] h-[372px]
                  "
                  style={{ 
                    backgroundColor: isDarkTheme ? "#111" : "#fafafa",
                    color: "inherit"
                  }}
                >
                  <CardContent className="h-full p-8 flex flex-col gap-4 justify-center text-inherit">
                    <div
                      className="
                        min-h-[80px]
                        flex items-end
                        [font-family:'Poppins',Helvetica] font-semibold
                        text-7xl
                        leading-[56px]
                      "
                    >
                      {stat.number}
                    </div>

                    <div className="flex flex-col gap-[10px] min-h-[140px]">
                      <h4
                        className="
                          [font-family:'Poppins',Helvetica] font-bold
                          text-[22px]
                          leading-[33px]
                        "
                      >
                        <AnimatedText
                          as="span"
                          className="inline-block"
                          isDarkBg={isDarkTheme}
                          disableColorReveal
                          slideDuration={0.6}
                          slideStagger={0.04}
                        >
                          {stat.title}
                        </AnimatedText>
                      </h4>
                      <p
                        className="
                          [font-family:'Poppins',Helvetica] font-normal opacity-80
                          text-lg
                          leading-[27px]
                        "
                      >
                        <AnimatedText
                          as="span"
                          className="inline-block"
                          isDarkBg={isDarkTheme}
                          disableColorReveal
                          slideDuration={0.6}
                          slideStagger={0.04}
                        >
                          {stat.description}
                        </AnimatedText>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* ================= TEAM SECTION ================= */}
        <div 
          ref={teamSectionRef}
          className="py-[70px] px-4 lg:px-8 xl:px-0"
        >
          <div className="max-w-[1280px] mx-auto">

            <h3 
              ref={teamDesignTextRef}
              className="[font-family:'Poppins',Helvetica] font-normal text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px] tracking-[0] leading-[38px] sm:leading-[50px] md:leading-[70px] lg:leading-[90px] mb-[40px] sm:mb-[72px]"
            >
              {("Design is more than visuals. It's the trust you earn, the emotion you spark, and the impact that lasts.").split(' ').map((word, index) => (
                <span key={index} className="relative inline-block mr-[0.3em]">
                  <span 
                    className="word-base-layer transition-colors duration-700 ease-in-out" 
                    style={{ 
                      opacity: 0.3,
                      color: isDarkTheme ? '#999999' : '#666666'
                    }}
                  >
                    {word}
                  </span>
                  <span 
                    className="word-top-layer absolute inset-0 transition-colors duration-700 ease-in-out" 
                    style={{ 
                      opacity: 0,
                      color: isDarkTheme ? '#ffffff' : '#000000'
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h3>

            {/* ===== TEAM HEADING ===== */}
            <h2 
              className="[font-family:'Poppins',Helvetica] font-semibold text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1] mb-[40px] md:mb-[56px]"
            >
              <AnimatedText
                as="span"
                className="block"
                isDarkBg={isDarkTheme}
                disableColorReveal
                slideDuration={0.8}
                slideStagger={0.08}
              >
                Team
              </AnimatedText>
            </h2>

            {/* ===== MOBILE + TABLET ===== */}
            <div className="grid grid-cols-2 gap-8 lg:hidden">
              {team.map((member, index) => (
                <TeamCard key={index} card={member} isDark={isDarkTheme} />
              ))}
            </div>

            {/* ===== DESKTOP ===== */}
            <div className="hidden lg:grid grid-cols-4 gap-12">
              <div className="col-start-2">
                <TeamCard card={team[0]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-4">
                <TeamCard card={team[1]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-1">
                <TeamCard card={team[2]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-3">
                <TeamCard card={team[3]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-4">
                <TeamCard card={team[4]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-2">
                <TeamCard card={team[5]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-3">
                <TeamCard card={team[6]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-4">
                <TeamCard card={team[7]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-1">
                <TeamCard card={team[8]} isDark={isDarkTheme} />
              </div>
              <div className="col-start-4">
                <TeamCard card={team[9]} isDark={isDarkTheme} />
              </div>
            </div>

            <div className="ml-0 md:ml-[80px] lg:ml-[200px] xl:ml-[350px] pt-20">
              <p 
                className="[font-family:'Poppins',Helvetica] font-normal text-[18px] sm:text-[24px] lg:text-[32px] tracking-[0] leading-[normal]"
              >
                <AnimatedText
                  as="span"
                  className="block"
                  isDarkBg={isDarkTheme}
                  disableColorReveal
                  slideDuration={0.8}
                  slideStagger={0.08}
                >
                  We’re a team of designers, product managers, developers, and storytellers dedicated to helping businesses of all sizes bring their next big idea to life.
                </AnimatedText>
              </p>
            </div>

          </div>
        </div>

        {/* ================= CLIENTS SECTION ================= */}
        <section
          ref={clientsSectionRef}
          className="w-full py-10 md:py-20"
        >
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8 xl:px-0">
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-inherit text-[40px] sm:text-[56px] md:text-[100px] lg:text-[100px] leading-[1] mb-[36px] md:mb-[56px]">
              <AnimatedText
                as="span"
                className="block"
                isDarkBg={isDarkTheme}
                disableColorReveal
                slideDuration={0.8}
                slideStagger={0.08}
              >
                Clients
              </AnimatedText>
            </h2>

            <div className="ml-0 md:ml-[80px] lg:ml-[200px] xl:ml-[350px]">
              <AnimatedText
                className="[font-family:'Poppins',Helvetica] font-normal text-inherit text-[18px] sm:text-[24px] lg:text-[32px] mb-[36px] md:mb-[56px]"
                isDarkBg={isDarkTheme}
                disableColorReveal
                slideDuration={0.8}
                slideStagger={0.08}
              >
                Every client relationship begins with shared passion. That passion fuels the meaningful experiences we create together.
              </AnimatedText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {brandLogos.map((src, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Client ${index + 1}`}
                    className="h-40 sm:h-44 lg:h-48 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      </section>

      <FooterSection />
    </>
  );
}