import React from "react";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const socialLinks = [
  { name: "Instagram" },
  { name: "LinkedIn" },
  { name: "Twitter" },
  { name: "Facebook" },
];

const navigationLinks = [
  { name: "About", page: "/about" },
  { name: "Projects", page: "/projects" },
  { name: "Services", page: "/services" },
  { name: "Contact", page: "/discuss" },
];

const contactInfo = [
  { text: "hello@divenzo.com" },
  { text: "(+91) 93478 28484" },
  { text: "Sanjay Gandhi Nagar, Shapur Nagar, IDA Jeedimetla, Hyd -500055" },
];

const legalLinks = [
  { name: "Privacy Policy", page: "/privacy-policy" },
  { name: "Terms of Use", page: "/terms-of-use" },
];

export const FooterSection = (): JSX.Element => {

  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!footerRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: true,
        },
      }
    );
  }, []);

useEffect



  return (
    <footer
      ref={footerRef}
      className="
        relative w-full bg-black dark-section
        pt-[80px] sm:pt-[120px] lg:pt-[150px]
        pb-[50px] sm:pb-[60px] lg:pb-[70px]
        px-4 sm:px-8 lg:px-20
        overflow-hidden
      "
    >
      <div ref={contentRef} className="flex flex-col gap-[46px]">
        {/* ===== Social Links ===== */}
        <nav
          className="
            flex flex-wrap items-center
            gap-6 sm:gap-10 lg:gap-[137px]
          "
        >
          {socialLinks.map((link, index) => (
            <Button
              key={index}
              variant="link"
              className="
                h-auto p-0
                hover:bg-transparent focus:bg-transparent active:bg-transparent
                [font-family:'Poppins',Helvetica] font-semibold text-white
                text-[24px] sm:text-[32px] lg:text-5xl
              "
            >
              <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:scale-x-0 after:bg-white after:origin-left after:transition-transform hover:after:scale-x-100">
                {link.name}
              </span>
            </Button>
          ))}
        </nav>

        <div className="flex flex-col gap-[58px]">
          <Separator className="bg-[#ffffff33] h-0.5" />

          {/* ===== Main Footer Content ===== */}
          <div
            className="
              flex flex-col lg:flex-row
              gap-12 lg:gap-[150px]
            "
          >
            {/* ---- Lets Chat ---- */}
            <section
              className="
                flex flex-col gap-8
                w-full lg:w-[501px]
              "
            >
              <div className="flex flex-col gap-6">
                <h2
                  className="
                    [font-family:'Poppins',Helvetica] font-semibold text-white
                    text-[36px] sm:text-[44px] lg:text-[56px]
                    leading-[1.2]
                  "
                >
                  Lets Chat
                </h2>

                <p
                  className="
                    [font-family:'Poppins',Helvetica] font-normal text-white
                    text-[16px] sm:text-[20px] lg:text-[28px]
                  "
                >
                  Unleashing brand potential through
                  <br />
                  creative design and innovation.
                </p>
              </div>

              <Link to="/discuss">
                <Button
                  variant="link"
                  className="
                    h-auto w-fit px-0 py-2.5 border-b-2 border-[#ffffff4c]
                    rounded-none
                    [font-family:'Poppins',Helvetica] font-normal text-white
                    text-[16px] sm:text-[18px] lg:text-2xl
                  "
                >
                  Discuss with us
                </Button>
              </Link>
            </section>

            {/* ---- Navigation ---- */}
            <nav
              className="
                flex flex-col gap-4 sm:gap-6
                w-full lg:w-[100px]
              "
            >
              {navigationLinks.map((link, index) => (
                <Link key={index} to={link.page}>
                  <Button
                    variant="link"
                    className="
                      h-auto p-0 w-fit justify-start
                      hover:bg-transparent focus:bg-transparent active:bg-transparent
                      [font-family:'Poppins',Helvetica] font-normal text-white
                      text-[16px] sm:text-[18px] lg:text-2xl
                    "
                  >
                    <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:scale-x-0 after:bg-white after:origin-left after:transition-transform hover:after:scale-x-100">
                      {link.name}
                    </span>
                  </Button>
                </Link>
              ))}
            </nav>

            {/* ---- Contact ---- */}
            <address
              className="
                flex flex-col gap-4 sm:gap-6
                w-full lg:w-[354px]
                not-italic
              "
            >
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={
                    index === 0
                      ? `mailto:${info.text}`
                      : index === 1
                      ? `tel:${info.text}`
                      : undefined
                  }
                  className="
                    [font-family:'Poppins',Helvetica] font-normal text-white
                    text-[16px] sm:text-[18px] lg:text-2xl
                  "
                >
                  {info.text}
                </a>
              ))}
            </address>
          </div>

          {/* ===== Bottom Area ===== */}
          <div
            className="
              flex flex-col gap-12
              mt-[60px] sm:mt-[70px] lg:mt-[78px]
            "
          >
            <h1
              ref={companyRef}
              className="
                font-varela font-bold text-white text-center
                text-[86px] sm:text-[160px] lg:text-[355px]
                leading-[1]
                whitespace-nowrap
                overflow-hidden
              "
            >
              {"Divenzo".split("").map((char, i) => (
                <span key={i} className="inline-block company-letter">
                  {char}
                </span>
              ))}
            </h1>

            <div
              className="
                flex flex-col sm:flex-row
                gap-4 sm:gap-0
                items-center justify-between
              "
            >
              <p
                className="
                  [font-family:'Poppins',Helvetica] font-normal text-white
                  text-[12px] sm:text-[14px] lg:text-base
                  text-center whitespace-nowrap
                "
              >
                Copyright © {new Date().getFullYear()} Divenzo. All rights reserved
              </p>

              <div className="flex items-center gap-2">
                {legalLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Separator
                        orientation="vertical"
                        className="h-4 w-px bg-[#2d2e2e]"
                      />
                    )}
                    <Link to={link.page}>
                      <Button
                        variant="link"
                        className="
                          h-auto p-0
                          hover:bg-transparent focus:bg-transparent active:bg-transparent
                          [font-family:'Open_Sans',Helvetica] font-normal text-white
                          text-[12px] sm:text-[14px] lg:text-base
                          whitespace-nowrap
                        "
                      >
                        <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:scale-x-0 after:bg-white after:origin-left after:transition-transform hover:after:scale-x-100">
                          {link.name}
                        </span>
                      </Button>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
  );
};
