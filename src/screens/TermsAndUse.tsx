import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import { AnimatedText } from "@/components/AnimatedText";

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
      "ACCESSING, BROWSING OR OTHERWISE USING THE WEBSITE INDICATES YOUR ACCEPTANCE TO ALL THE TERMS AND CONDITIONS HEREIN. PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE PROCEEDING. IF YOU DO NOT AGREE WITH THE SAME, PLEASE DO NOT USE THIS WEBSITE. For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person visits our platform, either just for the purpose of browsing the Website or engages to buy our products & services. This Website allows the User to surf the Website. The term “We”, “Us”, “Our” shall mean Company.Your use of the Website and services and tools are governed by the following terms and conditions (“Terms of Use”) as applicable to the Website including the applicable policies which are incorporated herein by way of reference. If You transact on the Website, You shall be subject to the policies that are applicable to the Website for such transaction. By mere use of the Website, You shall be contracting with Company and these terms and conditions including the policies constitute your binding obligations, with the Website. Any new features or tools which are added to the current store shall also be subject to the Terms of Use. We reserve the right to update, change or replace any part of these Terms of Use by posting updates and/or changes to Our Website. It is your responsibility to check this page periodically for changes.",
  },
  {
    id: 3,
    title: "Eligibility to use",
    desc:
      "By agreeing to these Terms of Use, you represent that you are persons who can form legally binding contracts under Indian Contract Act, 1872. Persons who are “incompetent to contract” within the meaning of the Indian Contract Act, 1872 including minors, un-discharged insolvents etc. are not eligible to use the Website. As a minor, if you wish to use or transact on Website, such use or transaction may be made by your legal guardian or parents on the Website. Company reserves the right to refuse You access to the Website if it is brought to Company’s notice or if it is discovered that you are under the age of 18 years. By visiting Company Website or accepting these Terms of Use, You represent and warrant to Company that You are 18 years of age or older and that You have the right, authority and capacity to use the Website and agree to and abide by these Terms of Use. You also represent and warrant to the Company that You will use the Website in a manner consistent with any and all applicable laws and regulations.",
  },
  {
    id: 4,
    title: "Privacy and Information Protection",
    desc:
      "ACCESSING, BROWSING OR OTHERWISE USING THE WEBSITE INDICATES YOUR ACCEPTANCE TO ALL THE TERMS AND CONDITIONS HEREIN. PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE PROCEEDING. IF YOU DO NOT AGREE WITH THE SAME, PLEASE DO NOT USE THIS WEBSITE.Please review our Privacy Policy, which also governs your visit to this Site, to understand our internal policies and practices. The personal information/data provided to us by you during the course of usage of http://divenzo.com/ will be treated as strictly confidential and in accordance with the Privacy Policy and applicable laws and regulations. If You object to your information being transferred or used, please do not use the website.",
  },
  {
    id: 5,
    title: "Charges for using the Website",
    desc:
      "Company does not charge any fee for browsing the Website. Company reserves the right to change its Fee Policy from time to time. In particular, Company may at its sole discretion introduce new services and modify some or all of the existing services offered on the Website. In such an event Company reserves the right to introduce fees for the new services offered or amend/introduce fees for existing services, as the case may be. Changes to the Fee Policy shall be posted on the Website and such changes shall automatically become effective immediately after they are posted on the Website. Unless otherwise stated, all fees shall be quoted in Indian Rupees.",
  },
  {
    id: 6,
    title: "Rights of use",
    desc:
      "Company grants you limited rights to access and make personal use of this website, but not to download (other than page caching) or modify it, or any portion of it. These rights do not include any commercial use of this website or its contents; any collection and use of any content, descriptions, or prices; any derivative use of this website or its contents; any downloading or copying of account information for the benefit of a third-party; or any use of data mining, robots, or similar data gathering and extraction tools.This website or any portion of this website (including but not limited to any copyrighted material, trademarks, or other proprietary information) may not be reproduced, duplicated, copied, sold, resold, visited, distributed or otherwise exploited for any commercial purpose.",
  },
];

const termsAndUseData = [
  {
    id: 1,
    title: "Your Conduct",
    description:
      "You must not use the Website in any way that causes, or is likely to cause, the Website or access to it to be interrupted, damaged or impaired in any way. You understand that you, and not Company, are responsible for all electronic communications and content sent from your computer to us and you must use the Website for lawful purposes only. You must not use the Website for any of the following:",
    points: [
      "For Fraudulent Purposes, Or In Connection With A Criminal Offense Or Other Unlawful Activity;",
      "To Send, Use Or Reuse Any Material That Does Not Belong To You; Or Is Illegal, Offensive (Including But Not Limited To Material That Is Sexually Explicit Content Or Which Promotes Racism, Bigotry, Hatred Or Physical Harm), Deceptive, Misleading, Abusive, Indecent, Harassing, Blasphemous, Defamatory, Libelous, Obscene, Pornographic, Pedophilic Or Menacing; Ethnically Objectionable, Disparaging Or In Breach Of Copyright, Trademark, Confidentiality, Privacy Or Any Other Proprietary Information Or Right; Or Is Otherwise Injurious To Third Parties; Or Relates To Or Promotes Money Laundering Or Gambling; Or Is Harmful To Minors In Any Way; Or Impersonates Another Person; Or Threatens The Unity, Integrity, Security Or Sovereignty Of India Or Friendly Relations With Foreign States; Or Objectionable Or Otherwise Unlawful In Any Manner Whatsoever; Or Which Consists Of Or Contains Software Viruses, Political Campaigning, Commercial Solicitation, Chain Letters, Mass Mailings Or Any “Spam”; Or Violates Any Law For The Time Being In Force; Or Deceives Or Misleads The Address About The Origin Of Such Messages Or Communicates Any Information Which Is Grossly Offensive Or Menacing In Nature;",
      "To Not Make Any Unauthorized Commercial Use Of This Website Or Service And You May Not Resell This Service Or Assign Your Rights Or Obligations Under These Terms Of Usage. You May Not Reverse Engineer Any Part Of This Website Or Service.",
      "For Any Act That Causes, Or May Be Likely To Cause Damage Or Impairment To The Website Or In Any Manner Harms The Company Or Any Other Person Or Entity (As Determined By The Company In Its Sole Discretion) Or Interrupt Free Access To It In Any Way",
      "Medical Records And History",
      "Biometric Information",
      "Information Received By Body Corporate Under Lawful Contract Or Otherwise",
      "Visitor Details As Provided At The Time Of Registration Or Thereafter And",
      "Call Data Records.",
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
      <section className="relative w-full bg-white overflow-x-hidden">
        <div className="flex flex-col lg:flex-row lg:h-screen">

          {/* LEFT: HEADING */}
          <div
            ref={headingRef}
            className="
              w-full lg:w-[40%]
              pt-[30px] md:pt-[80px]
              px-4 sm:px-10 lg:pl-8 xl:pl-20
            "
          >
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1] mb-[36px] md:mb-[56px]">
              <AnimatedText as="span" className="block" isDarkBg={false} disableColorReveal slideDuration={0.8} slideStagger={0.08}>
                Terms
              </AnimatedText>
            </h2>
            <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1]">
              <AnimatedText as="span" className="block" isDarkBg={false} disableColorReveal slideDuration={0.8} slideStagger={0.08}>
                &amp; Use
              </AnimatedText>
            </h2>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="w-full lg:w-[60%] overflow-visible lg:overflow-y-auto no-scrollbar">
            <div className="px-4 sm:px-10 lg:px-[60px] xl:px-[100px] py-12 lg:py-20">

              <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[16px] sm:text-[20px] lg:text-[24px] leading-[1.6] mb-6">
                <AnimatedText
                  as="span"
                  className="block"
                  isDarkBg={false}
                  disableColorReveal
                  slideDuration={0.8}
                  slideStagger={0.08}
                >
                  These Terms of Use (“Terms of Use”) have been drafted in accordance
                  with the provisions of Rule 3 (1) of the Information Technology
                  (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of https://divenzo.com/.
                </AnimatedText>
              </p>

              {/* INTRO SECTIONS */}
              {termsAndUse.map((section) => (
                <div key={section.id} className="mb-10">
                  <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[22px] sm:text-[26px] lg:text-[32px] mb-4">
                    <AnimatedText as="span" className="inline-block" isDarkBg={false} disableColorReveal slideDuration={0.8} slideStagger={0.08}>
                      {section.title}
                    </AnimatedText>
                  </h2>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.6]">
                    <AnimatedText
                      as="span"
                      className="block"
                      isDarkBg={false}
                      disableColorReveal
                      slideDuration={0.8}
                      slideStagger={0.08}
                    >
                      {section.desc}
                    </AnimatedText>
                  </p>
                </div>
              ))}

              {/* MAIN CONTENT */}
              {termsAndUseData.map((section) => (
                <div key={section.id} className="mb-12">
                  <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[22px] sm:text-[26px] lg:text-[32px] mb-4">
                    <AnimatedText as="span" className="inline-block" isDarkBg={false} disableColorReveal slideDuration={0.8} slideStagger={0.08}>
                      {section.title}
                    </AnimatedText>
                  </h2>

                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.6] mb-4">
                    <AnimatedText
                      as="span"
                      className="block"
                      isDarkBg={false}
                      disableColorReveal
                      slideDuration={0.8}
                      slideStagger={0.08}
                    >
                      {section.description}
                    </AnimatedText>
                  </p>

                  <ul className="list-disc pl-6 grid gap-2">
                    {section.points.map((point, index) => (
                      <li
                        key={index}
                        className="[font-family:'Poppins',Helvetica] font-normal text-[#000000cc] text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.6]"
                      >
                        <AnimatedText
                          as="span"
                          className="block"
                          isDarkBg={false}
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
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
