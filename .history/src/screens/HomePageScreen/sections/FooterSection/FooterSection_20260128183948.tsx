import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FooterSection = () => {
  const companyRef = useRef<HTMLHeadingElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Company letters animation
    if (companyRef.current) {
      const letters = companyRef.current.querySelectorAll(".company-letter");
      gsap.fromTo(
        letters,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: companyRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }

    // Social links fade-in
    if (socialRef.current) {
      gsap.from(socialRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: true,
        },
      });
    }

    // Navigation links fade-in
    if (navRef.current) {
      gsap.from(navRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: navRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: true,
        },
      });
    }

    // Contact info fade-in
    if (contactRef.current) {
      gsap.from(contactRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: true,
        },
      });
    }

    // Parallax background effect
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: -30, // background moves slower than content
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section className="relative w-full">
      {/* Scroll space */}
      <div className="h-[120vh]" />

      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 -z-10"
      />

      {/* Sticky footer */}
      <footer className="sticky bottom-0 w-full bg-transparent text-white px-8 py-16">
        <div className="flex flex-col gap-12">
          {/* Social Links */}
          <nav ref={socialRef} className="flex gap-8 text-2xl font-semibold">
            {["Instagram", "LinkedIn", "Twitter", "Facebook"].map((name) => (
              <a key={name} href="#" className="hover:underline">
                {name}
              </a>
            ))}
          </nav>

          {/* Navigation */}
          <nav ref={navRef} className="flex gap-6 text-lg">
            {["About", "Projects", "Services", "Contact"].map((name) => (
              <a key={name} href="#" className="hover:underline">
                {name}
              </a>
            ))}
          </nav>

          {/* Contact Info */}
          <address
            ref={contactRef}
            className="flex flex-col gap-4 not-italic text-lg"
          >
            <a href="mailto:hello@divenzo.com">hello@divenzo.com</a>
            <a href="tel:+919347828484">(+91) 93478 28484</a>
            <span>Sanjay Gandhi Nagar, Shapur Nagar, IDA Jeedimetla, Hyd -500055</span>
          </address>

          {/* Company Name Animation */}
          <h1
            ref={companyRef}
            className="text-center font-bold text-[100px] sm:text-[200px] lg:text-[300px] leading-none overflow-hidden"
          >
            {"Divenzo".split("").map((char, i) => (
              <span key={i} className="inline-block company-letter">
                {char}
              </span>
            ))}
          </h1>

          {/* Legal Links */}
          <div className="flex justify-between text-sm">
            <p>© {new Date().getFullYear()} Divenzo. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/terms-of-use" className="hover:underline">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
