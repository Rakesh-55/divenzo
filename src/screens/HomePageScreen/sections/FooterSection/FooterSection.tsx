import React from "react";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/divenzo.design" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/divenzo-design-digital-marketing-agency/" },
  { name: "Twitter", url: "#" },
  { name: "Facebook", url: "https://www.facebook.com/share/19guPkqrpU/?mibextid=wwXIfr" },
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
    const h1 = companyRef.current;
    if (!h1) return;

    const letters = h1.querySelectorAll(".company-letter");
    const lettersArray = Array.from(letters);

    // Set initial hidden state
    lettersArray.forEach((letter) => {
      (letter as HTMLElement).style.transform = "translateY(100%)";
      (letter as HTMLElement).style.opacity = "0";
    });

    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            // Appear: left to right, slide up
            lettersArray.forEach((letter, i) => {
              setTimeout(() => {
                gsap.to(letter, {
                  y: "0%",
                  opacity: 1,
                  duration: 0.8,
                  ease: "power4.out",
                });
              }, i * 50);
            });
          } else if (!entry.isIntersecting && hasAnimated) {
            hasAnimated = false;
            // Disappear: left to right, slide down
            lettersArray.forEach((letter, i) => {
              setTimeout(() => {
                gsap.to(letter, {
                  y: "100%",
                  opacity: 0,
                  duration: 0.4,
                  ease: "power2.in",
                });
              }, i * 30);
            });
          }
        });
      },
      {
        rootMargin: "0px 0px -5% 0px",
        threshold: 0,
      }
    );

    // Observe the wrapper div, not the h1 itself
    const wrapper = h1.parentElement;
    if (wrapper) observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);



  return (
    <section ref={footerRef} className="relative w-full">

    {/* SCROLL SPACE (reveals footer) */}
    {/* <div className="h-[120vh]" /> */}

    {/* FOOTER (stays still) */}
    <footer
      className="
        sticky bottom-0 w-full bg-black dark-section
        pt-[53px] sm:pt-[80px] lg:pt-[100px]
        pb-[25px] sm:pb-[30px] lg:pb-[35px]
        px-[4vw]
        overflow-hidden
      "
    >
      <div ref={contentRef} className="flex flex-col gap-[56px]">
        {/* ===== Social Links ===== */}
        <nav
          className="
            flex flex-wrap items-center
            gap-6 sm:gap-10 lg:gap-16 xl:gap-[137px]
          "
        >
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => link.url === "#" && e.preventDefault()}
              className="
                inline-flex items-center justify-center
                h-auto p-0 footer-no-underline overflow-hidden group
                hover:bg-transparent focus:bg-transparent active:bg-transparent
                [font-family:'Poppins',Helvetica] font-semibold text-white
                text-[24px] sm:text-[32px] lg:text-5xl
              "
            >
              <span className="relative block leading-[1.3] pb-1">
                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                  {link.name}
                </span>
                <span className="absolute left-0 top-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                  {link.name}
                </span>
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-[56px]">
          <Separator className="bg-[#ffffff33] h-0.5" />

          {/* ===== Main Footer Content ===== */}
          <div
            className="
              flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr]
              lg:items-start
              gap-6 lg:gap-6 xl:gap-[80px]
            "
          >
            {/* ---- Lets Chat ---- */}
            <section
              className="
                flex flex-col gap-8
                w-full lg:flex-1
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
                    text-[24px]
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
                    relative h-auto w-fit px-0 py-2.5
                    rounded-none group no-underline hover:no-underline
                    [font-family:'Poppins',Helvetica] font-normal text-white
                    text-[22px]
                  "
                >
                  Discuss with us
                  <span
                    className="
                      absolute left-0 -bottom-1 h-[1.5px] w-full
                      bg-neutral-400/70 transition-opacity duration-300
                      group-hover:opacity-0
                    "
                  />
                  <span
                    className="
                      absolute left-0 -bottom-1 h-[1.5px] w-full
                      bg-current scale-x-0 origin-left
                      transition-transform duration-500 ease-out
                      group-hover:scale-x-100
                    "
                  />
                </Button>
              </Link>
            </section>

            {/* ---- Navigation ---- */}
            <nav
              className="
                flex flex-col gap-4 sm:gap-6
                w-full lg:w-auto lg:shrink-0
                items-start lg:items-start
                lg:justify-self-center
              "
            >
              {navigationLinks.map((link, index) => (
                <Link key={index} to={link.page}>
                  <Button
                    variant="link"
                    className="
                      h-auto p-0 w-fit justify-start footer-no-underline overflow-hidden group
                      hover:bg-transparent focus:bg-transparent active:bg-transparent
                      [font-family:'Poppins',Helvetica] font-normal text-white
                      text-[16px] sm:text-[18px] lg:text-[20px]
                    "
                  >
                    <span className="relative block leading-[1.3] pb-1">
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                        {link.name}
                      </span>
                      <span className="absolute left-0 top-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                        {link.name}
                      </span>
                    </span>
                  </Button>
                </Link>
              ))}
            </nav>

            {/* ---- Contact ---- */}
            <address
              className="
                flex flex-col gap-4 sm:gap-6
                w-full lg:flex-1 lg:max-w-[354px]
                lg:justify-self-end
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
                    text-[20px]
                    no-underline
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
              flex flex-col gap-6
              mt-[30px] sm:mt-[35px] lg:mt-[39px]
            "
          >
            <div className="overflow-hidden">
              <h1
                ref={companyRef}
                aria-label="Divenzo"
                className="
                  font-varela font-bold text-white text-center
                  text-[23vw] leading-[1.2]
                  whitespace-nowrap
                  overflow-hidden
                "
              >
                {"Divenzo".split("").map((char, i) => (
                  <span key={i} className="inline-block company-letter" aria-hidden="true">
                    {char}
                  </span>
                ))}
              </h1>
            </div>

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
                          no-underline hover:no-underline
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
    </section>
  );
};
