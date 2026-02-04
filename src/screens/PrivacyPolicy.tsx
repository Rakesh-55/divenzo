import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";

/* ================= DATA ================= */

const privacyPolicyData = [
  {
    id: 1,
    title: "Why this Privacy Policy?",
    description: "This privacy policy is published in compliance of:",
    points: [
      "Section 43A Of The Information Technology Act, 2000",
      "Regulation 4 Of The Information Technology (Reasonable Security Practices And Procedures And Sensitive Personal Information) Rules, 2011",
      "Regulation 3(1) Of The Information Technology (Intermediaries Guidelines) Rules, 2011.",
    ],
  },
  {
    id: 2,
    title: "Why this Personal Information?",
    description:
      "“Personal information” is defined under the SPI Rules to mean any information that relates to a natural person...",
    points: [
      "Passwords",
      "Financial Information Such As Bank Accounts, Credit And Debit Card Details",
      "Physical, Physiological And Mental Health Condition",
      "Sexual Orientation",
      "Medical Records And History",
      "Biometric Information",
      "Information Received By Body Corporate Under Lawful Contract Or Otherwise",
      "Visitor Details As Provided At The Time Of Registration Or Thereafter",
      "Call Data Records",
    ],
  },
];

const privacyPolicyRemData = [
  {
    id: 1,
    title: "Information we collect",
    points: [
      "We collect Information through our Website to provide better services and results to our Users...",
    ],
  },
  {
    id: 2,
    title: "Usage of the collected Information",
    points: [
      "The Information collected is constantly used to provide personally relevant features and improve the services...",
    ],
  },
  {
    id: 3,
    title: "Sharing of Personal Information",
    points: [
      "Disclosure may be necessary to provide Users access to our Services...",
      "We may disclose personal information if required to do so by law...",
    ],
  },
  {
    id: 4,
    title: "Securing Information",
    points: [
      "In order to secure the information provided to us by our users...",
    ],
  },
  {
    id: 5,
    title: "Choice/Opt-Out",
    points: [
      "We provide all our users with the opportunity to opt-out of receiving promotional communications...",
    ],
  },
  {
    id: 6,
    title: "Consent",
    points: [
      "By using the Website and by providing personal information, the user consents...",
      "This document is an electronic record...",
      "Effective date of this policy: This policy was last updated on 14/08/2025.",
    ],
  },
];

/* ================= PAGE ================= */

export default function PrivacyPolicy() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const lines = containerRef.current.querySelectorAll("h2");
      gsap.fromTo(
        lines,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: "power4.out",
          stagger: 0.25,
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <>
      <section className="relative w-full bg-white overflow-x-hidden">
        <div className="lg:flex h-auto lg:h-[100vh]">

          {/* ===== LEFT HEADING ===== */}
          <div
            ref={containerRef}
            className="
              w-full lg:w-[40%]
              flex flex-col justify-start
              py-10 md:py-20
              px-4 sm:px-8 lg:pl-20
            "
          >
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] leading-[1]">
              Privacy
            </h2>
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] leading-[1]">
              Policy
            </h2>
          </div>

          {/* ===== CONTENT ===== */}
          <div
            className="
              w-full lg:w-[60%]
              overflow-visible lg:overflow-y-scroll
              no-scrollbar
            "
          >
            <div className="px-4 sm:px-8 lg:px-[100px] py-6 lg:py-20">

              {/* Intro */}
              <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[16px] sm:text-[18px] lg:text-[24px] leading-[1.6] mb-6">
                This Privacy Policy describes Divenzo Design & Innovation Private Limited’s policies and procedures...
              </p>

              <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[16px] sm:text-[18px] lg:text-[24px] leading-[1.6] mb-6">
                Interpretation: In this Privacy Policy, references to “You”, “Your”...
              </p>

              {/* First Section */}
              {privacyPolicyData.map((section) => (
                <div key={section.id} className="mb-10">
                  <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[22px] sm:text-[26px] lg:text-[32px] mb-4">
                    {section.title}
                  </h2>

                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[17px] lg:text-[20px] mb-3">
                    {section.description}
                  </p>

                  <ul className="list-disc pl-6 grid gap-2">
                    {section.points.map((point, i) => (
                      <li
                        key={i}
                        className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[17px] lg:text-[20px]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Remaining Sections */}
              {privacyPolicyRemData.map((section) => (
                <div key={section.id} className="mb-10">
                  <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[22px] sm:text-[26px] lg:text-[32px] mb-4">
                    {section.title}
                  </h2>

                  <ul className="list-disc pl-6 flex flex-col gap-4">
                    {section.points.map((point, i) => (
                      <li
                        key={i}
                        className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[17px] lg:text-[20px] leading-[1.7]"
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
