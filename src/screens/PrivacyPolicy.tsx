import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import { AnimatedText } from "@/components/AnimatedText";

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
      "“Personal information” is defined under the SPI Rules to mean any information that relates to a natural person, which, either directly or indirectly, in combination with other information available or likely to be available with a body corporate, is capable of identifying such a natural person. Information that is freely available in the public domain or accessible under the Right to Information Act, 2005 or any other law will not be regarded as sensitive personal data or information. The spi rules further define “sensitive personal data or information” of a person to mean personal information about that person relating to:",
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
      "We collect Information through our Website to provide better services and results to our Users. Information is collected by the details provided by User and the data collected by the usage of the services. Details provided by User shall include Personal Information like name, address (residential or email), contact number, and other such data which is required for the efficient use of the services provided by the Company. In general, the user can browse the Website without revealing any Personal Information. Although once Personal Information is provided, the identity of the User is not anonymous anymore. Where possible, we indicate which fields are required and which fields are optional. Our User always has the option of not providing Information by choosing not to use a particular service or feature. Other Information collected includes device information i.e. from which device is the services being used. This shall include the hardware model, operating system, unique identification number associated with the device etc.",
    ],
  },
  {
    id: 2,
    title: "Usage of the collected Information",
    points: [
      "The Information collected is constantly used to provide personally relevant features and improve the services for our Users. With such pool of information, it is easier for us to understand the current trends in the market, according to which we cater our services. Such information helps us to come with content that provides a better User experience, thereby creating better satisfaction and increasing the user base of our Website. User discretion is asked before using such information for any other purposes than those set out in this Policy. Although the information which is shared by the User themselves through us shall not be considered as making private information public.",
    ],
  },
  {
    id: 3,
    title: "Sharing of Personal Information",
    points: [
      "Disclosure may be necessary to provide Users access to our Services, to comply with our legal obligations, to enforce our User Agreement, to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our Services. Such Personal Information, when shared with third parties, shall be subject to strict confidentiality agreements.",
      "We may disclose personal information if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose Personal Information to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to enforce our Terms or Privacy Policy. We and our affiliates will share / sell some or all of your personal information with another business entity should we (or our assets) plan to merge with, or be acquired by that business entity, or re-organization, amalgamation, restructuring of business. Should such a transaction occur that other business entity (or the new combined entity) will be required to follow this privacy policy with respect to your Personal Information.",
    ],
  },
  {
    id: 4,
    title: "Securing Information",
    points: [
      "In order to secure the information provided to us by our users, we review the processing and storage practices along with the information collected to guard against unauthorized access into the data collected in our systems. Furthermore, user information is protected by subjecting our Employees and Agents who process such information to strict confidentiality agreements, where if they fail to comply with it, such non compliance shall lead to heavy penalties or legal proceedings, depending upon the gravity of the situation.",
    ],
  },
  {
    id: 5,
    title: "Choice/Opt-Out",
    points: [
      "We provide all our users with the opportunity to opt-out of receiving promotional, marketing-related communications from us in general, after setting up an account. User may remove their personal information by unsubscribing or deleting their account from our Website.",
    ],
  },
  {
    id: 6,
    title: "Consent",
    points: [
      "By using the Website and by providing personal information, the user consents to the collection and use of the information disclosed by them in accordance with this Privacy Policy, including but not limited to their consent for sharing their information as per this privacy policy. Our Website offers publicly accessible blogs or community forums. You should be aware that any information you provide in these areas may be read, collected, and used by others who access them.",
      "This document is an electronic record in terms of existing and applicable Information Technology laws and the amended provisions thereto pertaining to electronic records in various allied statutes as amended pursuant to the Information Technology laws. This electronic record has been generated by a computer system and does not require any authentication. From time to time, the Company may change this internet privacy policy. The effective date of this policy, as stated below, indicates the last time this policy was revised or materially changed. Checking the effective date below allows you to determine whether there have been changes since the last time you reviewed the policy.",
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
              pt-[30px] md:pt-[80px] pb-8 md:pb-16
              px-4 sm:px-8 lg:px-8 xl:px-20
            "
          >
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1] mb-[36px] md:mb-[56px]">
              <AnimatedText as="span" className="block" isDarkBg={false} disableColorReveal slideDuration={0.8} slideStagger={0.08}>
                Privacy
              </AnimatedText>
            </h2>
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1]">
              <AnimatedText as="span" className="block" isDarkBg={false} disableColorReveal slideDuration={0.8} slideStagger={0.08}>
                Policy
              </AnimatedText>
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
            <div className="px-4 sm:px-8 lg:px-[60px] xl:px-[100px] py-6 lg:py-20">

              {/* Intro */}
              <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[16px] sm:text-[18px] lg:text-[24px] leading-[1.6] mb-6">
                This Privacy Policy describes Divenzo Design & Innovation Private Limited, a UI design company’s policies and procedures on the collection and use and disclosure of the Information provided by the Users and visitors of the Website (together referred to as the “Users”). The Company shall not use the User’s information in any manner except as provided under this Privacy Policy. Every User who accesses the Website agrees to be bound by the terms of this Privacy Policy.
              </p>

              <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[16px] sm:text-[18px] lg:text-[24px] leading-[1.6] mb-6">
                Interpretation: In this Privacy Policy, references to “You”, “Your”, “User” shall mean the end user accessing the Website or the Services and “We”, “Us” and “Our” shall mean the Company, its affiliates and partners.
              </p>

              {/* First Section */}
              {privacyPolicyData.map((section) => (
                <div key={section.id} className="mb-10">
                  <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[22px] sm:text-[26px] lg:text-[32px] mb-4">
                    <AnimatedText as="span" className="inline-block" isDarkBg={false} disableColorReveal slideDuration={0.8} slideStagger={0.08}>
                      {section.title}
                    </AnimatedText>
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
                    <AnimatedText as="span" className="inline-block" isDarkBg={false} disableColorReveal slideDuration={0.8} slideStagger={0.08}>
                      {section.title}
                    </AnimatedText>
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
