import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";

/* ================= DATA ================= */

const termsAndUse = [
  {
    id: 1,
    title: "About Us",
    desc:
      "The domain name https://divenzo.com (hereinafter referred to as “Website”) owned and managed by 1thing Design & Innovation Private Limited, a private limited company limited by shares incorporated in India under the Companies Act, 2013, and having its registered office at Sanjay Gandhi Nagar, Shapur Nagar, IDA Jeedimetla (hereinafter referred to as “Company”). The company is an in and out ui/ux design & digital marketing agency based in Hyderabad. The Company basically designs across all platforms from websites and online tools to mobile apps, software, and basically just about anything that demands user interface.",
  },
  {
    id: 2,
    title: "Terms of Use",
    desc:
      "ACCESSING, BROWSING OR OTHERWISE USING THE WEBSITE INDICATES YOUR ACCEPTANCE TO ALL THE TERMS AND CONDITIONS HEREIN. PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE PROCEEDING...",
  },
  {
    id: 3,
    title: "Eligibility to use",
    desc:
      "By agreeing to these Terms of Use, you represent that you are persons who can form legally binding contracts under Indian Contract Act, 1872...",
  },
  {
    id: 4,
    title: "Privacy and Information Protection",
    desc:
      "Please review our Privacy Policy, which also governs your visit to this Site...",
  },
  {
    id: 5,
    title: "Charges for using the Website",
    desc:
      "Company does not charge any fee for browsing the Website...",
  },
  {
    id: 6,
    title: "Rights of use",
    desc:
      "Company grants you limited rights to access and make personal use of this website...",
  },
];

const termsAndUseData = [
  {
    id: 1,
    title: "Your Conduct",
    description:
      "You must not use the Website in any way that causes, or is likely to cause, the Website or access to it to be interrupted...",
    points: [
      "For fraudulent purposes or unlawful activity",
      "To send illegal, offensive, deceptive or abusive material",
      "To make unauthorized commercial use of this Website",
      "To cause damage or impairment to the Website",
    ],
  },
];

/* ================= PAGE ================= */

export default function TermsAndUse() {
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (headingRef.current) {
      const lines = headingRef.current.querySelectorAll("h2");

      gsap.fromTo(
        lines,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.25,
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <>
      <Navbar />

      <section className="relative w-full bg-white overflow-x-hidden">
        <div className="flex flex-col lg:flex-row lg:h-screen">

          {/* LEFT: HEADING */}
          <div
            ref={headingRef}
            className="
              w-full lg:w-[40%]
              pt-16 lg:pt-20
              px-4 sm:px-10 lg:pl-20
            "
          >
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] leading-[1]">
              Terms
            </h2>
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] leading-[1]">
              &amp; Use
            </h2>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="w-full lg:w-[60%] overflow-visible lg:overflow-y-auto no-scrollbar">
            <div className="px-4 sm:px-10 lg:px-[100px] py-12 lg:py-20">

              <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[16px] sm:text-[20px] lg:text-[24px] leading-[1.6] mb-6">
                These Terms of Use (“Terms of Use”) have been drafted in accordance
                with the provisions of Rule 3 (1) of the Information Technology
                (Intermediaries guidelines) Rules, 2011.
              </p>

              {/* INTRO SECTIONS */}
              {termsAndUse.map((section) => (
                <div key={section.id} className="mb-10">
                  <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[22px] sm:text-[26px] lg:text-[32px] mb-4">
                    {section.title}
                  </h2>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.6]">
                    {section.desc}
                  </p>
                </div>
              ))}

              {/* MAIN CONTENT */}
              {termsAndUseData.map((section) => (
                <div key={section.id} className="mb-12">
                  <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[22px] sm:text-[26px] lg:text-[32px] mb-4">
                    {section.title}
                  </h2>

                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.6] mb-4">
                    {section.description}
                  </p>

                  <ul className="list-disc pl-6 grid gap-2">
                    {section.points.map((point, index) => (
                      <li
                        key={index}
                        className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.6]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
