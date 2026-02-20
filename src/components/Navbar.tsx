import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/divenzo-logo.png";
import logoBlack from "../assets/divenzo-logo-black.png";
import aboutNavImg from "../assets/nav_images/about_nav_img.png";
import contactNavImg from "../assets/nav_images/contact_nav_img.png";
import projectsNavImg from "../assets/nav_images/projects_nav_img.png";
import servicesNavImg from "../assets/nav_images/services_nav_img.png";
import { useHeaderTheme } from "../hooks/useHeaderTheme";
import { gsap } from "gsap";

const navLinks = [
  { label: "About", page: "/about" },
  { label: "Projects", page: "/projects" },
  { label: "Services", page: "/services" },
];

const menuOnlyLinks = [{ label: "Contact", page: "/discuss" }];

const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/divenzo.design" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/divenzo-design-digital-marketing-agency/" },
  { name: "Twitter", url: "#" },
  { name: "Facebook", url: "#" },
];

export const Navbar = (): JSX.Element => {
  const { onDarkSection } = useHeaderTheme();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [hoveredMenuLink, setHoveredMenuLink] = useState<string | null>(null);
  const [menuImage, setMenuImage] = useState<string | null>(null);
  const [menuImageVisible, setMenuImageVisible] = useState(false);
  const [isHamburgerHovered, setIsHamburgerHovered] = useState(false);
  const imageClearTimeoutRef = useRef<number | null>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const magneticCircleRef = useRef<HTMLSpanElement>(null);

  const menuImageMap: Record<string, string> = {
    About: aboutNavImg,
    Projects: projectsNavImg,
    Services: servicesNavImg,
    Contact: contactNavImg,
  };

  const handleMenuLinkEnter = (label: string) => {
    if (imageClearTimeoutRef.current) {
      window.clearTimeout(imageClearTimeoutRef.current);
      imageClearTimeoutRef.current = null;
    }
    setHoveredMenuLink(label);
    const nextImage = menuImageMap[label];
    if (nextImage) {
      setMenuImage(nextImage);
      // Small delay to ensure DOM is ready before triggering animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMenuImageVisible(true);
        });
      });
    }
  };

  const handleMenuLinksLeave = () => {
    if (imageClearTimeoutRef.current) {
      window.clearTimeout(imageClearTimeoutRef.current);
      imageClearTimeoutRef.current = null;
    }
    setHoveredMenuLink(null);
    setMenuImageVisible(false);
    imageClearTimeoutRef.current = window.setTimeout(() => {
      setMenuImage(null);
      imageClearTimeoutRef.current = null;
    }, 50);
  };

  const handleMenuLinksMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target || !target.closest(".menu-link")) {
      handleMenuLinksLeave();
    }
  };

  /* ================= HANDLE SAME PAGE NAV ================= */
  const handleNavClick = (page: string) => {
    if (location.pathname === page) {
      // Same page - scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
    } else {
      // Different page - will navigate via Link
      setMenuOpen(false);
    }
  };

  /* ================= CLOSE MENU ON ROUTE CHANGE ================= */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* ================= SCROLL STATE ================= */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= HAMBURGER VISIBILITY DELAY ================= */
  useEffect(() => {
    if (scrolled || menuOpen) {
      const timer = setTimeout(() => {
        setShowHamburger(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowHamburger(false);
    }
  }, [scrolled, menuOpen]);

  /* ================= CURSOR THEME ================= */
  useEffect(() => {
    document.body.dataset.navTheme =
      menuOpen || onDarkSection ? "dark" : "light";
  }, [menuOpen, onDarkSection]);

  /* ================= MENU ANIMATION ================= */
  useEffect(() => {
    if (!menuOpen) return;
    gsap.fromTo(
      ".fullscreen-menu",
      { y: "100%" },
      { y: "0%", duration: 0.8, ease: "power4.out" }
    );
  }, [menuOpen]);

  const headerBgColor = menuOpen
    ? "transparent"
    : scrolled
    ? onDarkSection
      ? "rgba(0,0,0,0.6)"
      : "rgba(255,255,255,0.6)"
    : "transparent";
  
    
  
  

  useEffect(() => {
    if (!menuOpen) return;

    gsap.fromTo(
      ".menu-link",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
      }
    );
  }, [menuOpen]);



  return (
    <div className="font-nav">
      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-[500]">
        <nav 
          className={`
            flex items-center justify-between px-6 py-4 
            transition-all duration-500 
            ${
              scrolled && !menuOpen
                ? `
                  backdrop-blur-xl
                  ${
                    onDarkSection
                      ? "bg-gradient-to-b from-black/70 to-black/40 border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                      : "bg-gradient-to-b from-white/70 to-white/40 border-b border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                  }
                `
                : ""
              }
            `}
          
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src={menuOpen || onDarkSection ? logo : logoBlack}
              alt="Divenzo"
              className="w-10 h-10"
            />
          </Link>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center relative cursor-pointer z-[600] active:opacity-70"
            aria-label="Toggle menu"
          >
            <span
              className={`
                absolute h-0.5 transition-all duration-500
                ${menuOpen ? "w-5 rotate-45" : "w-5 rotate-0"} ${menuOpen || onDarkSection ? "bg-white" : "bg-black"}
              `}
              style={{
                top: menuOpen ? "50%" : "35%",
                transform: menuOpen ? "translateY(-50%) rotate(45deg)" : "none",
              }}
            />

            <span
              className={`
                absolute h-0.5 transition-all duration-500
                ${menuOpen ? "w-5 -rotate-45" : "w-5 rotate-0"} ${menuOpen || onDarkSection ? "bg-white" : "bg-black"}
              `}
              style={{
                top: menuOpen ? "50%" : "65%",
                transform: menuOpen ? "translateY(-50%) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* ================= DESKTOP HEADER ================= */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${menuOpen ? "z-[400]" : ""}`}>
        <nav
          className={`
            hidden lg:block
            w-full
            px-8 lg:px-12 xl:px-20 py-4
            transition-all duration-500
            ${scrolled && !menuOpen
              ? `
                backdrop-blur-xl
                ${onDarkSection 
                  ? "bg-black/40 border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  : "bg-white/40 border-b border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                }
              `
              : ""
            }
          `}
        >
          <div
            className="
              grid grid-cols-[auto_1fr_auto]
              items-center
              w-full max-w-[1300px] mx-auto
            "
          >
            <div className="flex items-center gap-6 xl:gap-12">
          {/* LOGO */}
          <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src={menuOpen || onDarkSection ? logo : logoBlack}
              alt="Divenzo"
              className="w-12 h-12"
            />
          </Link>

          {/* BASED IN / SAY HELLO */}
          <div
            className={`
              hidden xl:flex gap-10 transition-all duration-700 ease-out
              ${scrolled ? "-translate-y-6 opacity-0" : "opacity-100"}
            `}
            style={{ transitionDelay: scrolled ? "0ms" : "520ms" }}
          >
            <div className="leading-tight text-black">
              <div className="text-[14px] text-black">Based in</div>
              <div className=" text-[16px] font-normal">Hyderabad, India</div>
            </div>

            <div className="leading-tight text-black">
              <div className="text-[14px] text-black">Say hello</div>
                <a
                  href="mailto:hello@divenzo.com"
                  className="text-[16px] font-normal hover:opacity-70"
                >
                  hello@divenzo.com
                </a>
              </div>
            </div>
            </div>

            {/* CENTER NAV */}
            <div
              className={`
                flex justify-center gap-6 xl:gap-12
                transition-all duration-700
                ${scrolled ? "-translate-y-6 opacity-0" : "opacity-100"}
              `}
              style={{ transitionDelay: scrolled ? "0ms" : "520ms" }}
            >
              {navLinks.map(link => (
                <Link
                  key={link.page}
                  to={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`
                    relative text-[14px] lg:text-[15px] xl:text-[16px] font-normal tracking-wide
                    ${onDarkSection ? "text-white" : "text-black"}
                    group
                  `}
                >
                  {link.label}
                  <span
                    className="
                      absolute left-0 -bottom-1 h-[1.5px] w-full
                      bg-current scale-x-0 origin-left
                      transition-transform duration-500 ease-out
                      group-hover:scale-x-100
                    "
                  />
                </Link>
              ))}
            </div>


            {/* RIGHT CTA + HAMBURGER */}
            <div className="flex items-center gap-6 justify-end relative z-50">
            {/* DISCUSS */}
            <Link
              to="/discuss"
              onClick={() => handleNavClick("/discuss")}
              className={`
                relative text-[14px] lg:text-[15px] xl:text-[16px] font-normal group
                transition-all duration-700 ease-out
                ${showHamburger ? "-translate-x-2" : "translate-x-0"}
                ${menuOpen ? "text-white visible" : onDarkSection ? "text-white" : "text-black"}
              `}
              style={{ transitionDelay: scrolled ? "120ms" : "0ms" }}
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
            </Link>

            {/* HAMBURGER / X BUTTON */}
            <div
              className={`
                hidden lg:flex items-center justify-center
                transition-all duration-700 ease-out
                ${showHamburger ? "w-12 opacity-100" : "w-0 opacity-0"}
              `}
              aria-hidden={!showHamburger}
            >
              <button
                ref={hamburgerBtnRef}
                onClick={() => setMenuOpen(!menuOpen)}
                className="
                  w-12 h-12
                  flex items-center justify-center
                  relative
                  cursor-pointer
                  z-[600]
                  overflow-visible
                "
                aria-label="Toggle menu"
                style={{ pointerEvents: showHamburger ? "auto" : "none" }}
                onMouseEnter={() => {
                  setIsHamburgerHovered(true);
                  document.body.dataset.cursorHidden = "true";
                  if (magneticCircleRef.current) {
                    gsap.to(magneticCircleRef.current, {
                      scale: 1,
                      opacity: 1,
                      duration: 0.4,
                      ease: "power2.out",
                    });
                  }
                }}
                onMouseMove={(e) => {
                  const btn = hamburgerBtnRef.current;
                  const circle = magneticCircleRef.current;
                  if (!btn || !circle) return;
                  const rect = btn.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  gsap.to(circle, {
                    x: x * 0.35,
                    y: y * 0.35,
                    duration: 0.4,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={() => {
                  setIsHamburgerHovered(false);
                  document.body.dataset.cursorHidden = "false";
                  if (magneticCircleRef.current) {
                    gsap.to(magneticCircleRef.current, {
                      scale: 0,
                      opacity: 0,
                      x: 0,
                      y: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                }}
              >
                {/* Magnetic hover circle */}
                <span
                  ref={magneticCircleRef}
                  className="absolute rounded-full pointer-events-none z-0"
                  style={{
                    width: 56,
                    height: 56,
                    left: "50%",
                    top: "50%",
                    marginLeft: -28,
                    marginTop: -28,
                    transform: "scale(0)",
                    opacity: 0,
                    backgroundColor: isHamburgerHovered
                      ? menuOpen || onDarkSection
                        ? "#ffffff"
                        : "#000000"
                      : menuOpen || onDarkSection
                      ? "#ffffff"
                      : "#000000",
                    transition: "background-color 0.3s",
                  }}
                />

                {/* Top Line / First diagonal */}
                <span
                  className={`
                    absolute h-0.5 transition-all duration-500 z-20
                    ${
                      menuOpen
                        ? "w-5 rotate-45 " +
                          (isHamburgerHovered
                            ? menuOpen || onDarkSection
                              ? "bg-black"
                              : "bg-white"
                            : "bg-white")
                        : "w-5 rotate-0 " +
                          (isHamburgerHovered
                            ? menuOpen || onDarkSection
                              ? "bg-black"
                              : "bg-white"
                            : onDarkSection
                            ? "bg-white"
                            : "bg-black")
                    }
                  `}
                  style={{
                    top: menuOpen ? "50%" : "40%",
                    transform: menuOpen ? "translateY(-50%) rotate(45deg)" : "none",
                  }}
                />

                {/* Bottom Line / Second diagonal */}
                <span
                  className={`
                    absolute h-0.5 transition-all duration-500 z-20
                    ${
                      menuOpen
                        ? "w-5 -rotate-45 " +
                          (isHamburgerHovered
                            ? menuOpen || onDarkSection
                              ? "bg-black"
                              : "bg-white"
                            : "bg-white")
                        : "w-5 rotate-0 " +
                          (isHamburgerHovered
                            ? menuOpen || onDarkSection
                              ? "bg-black"
                              : "bg-white"
                            : onDarkSection
                            ? "bg-white"
                            : "bg-black")
                    }
                  `}
                  style={{
                    top: menuOpen ? "50%" : "60%",
                    transform: menuOpen ? "translateY(-50%) rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </div>
            </div>
          </div>
        </nav>
      </header>

      {/* FULLSCREEN MENU */}
      {menuOpen && (
        <div className="fullscreen-menu fixed inset-0 z-[300] bg-black text-white pointer-events-auto overflow-y-auto">
          <div className="h-full flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 py-20 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
            <div className="flex-1 flex items-center lg:items-end">
              <nav
                className="flex flex-col items-start gap-4 sm:gap-5 md:gap-7 lg:gap-10 text-6xl sm:text-6xl md:text-6xl lg:text-7xl"
              onMouseMove={handleMenuLinksMouseMove}
              onMouseLeave={handleMenuLinksLeave}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  handleMenuLinksLeave();
                }
              }}
              >
                {[...navLinks, ...menuOnlyLinks].map((link) => {
                  const isHovered = hoveredMenuLink === link.label;
                  const isMuted = hoveredMenuLink && !isHovered;
                  return (
                    <Link
                      key={link.page}
                      to={link.page}
                      onClick={() => handleNavClick(link.page)}
                      onMouseEnter={() => handleMenuLinkEnter(link.label)}
                      onMouseLeave={handleMenuLinksLeave}
                      onFocus={() => handleMenuLinkEnter(link.label)}
                      onBlur={() => {
                        if (hoveredMenuLink === link.label) {
                          handleMenuLinksLeave();
                        }
                      }}
                      className={`menu-link transition-colors duration-100 ${
                        isMuted ? "text-gray-400" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Menu hover image */}
            <div className="absolute top-32 sm:top-36 md:top-40 lg:top-44 right-4 sm:right-6 md:right-12 lg:right-20">
              <div className="relative hidden sm:block aspect-[16/10] overflow-hidden" style={{ width: 'min(587px, 40vw)' }}>
                {menuImage && (
                  <img
                    src={menuImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      clipPath: menuImageVisible
                        ? "inset(0 0 0 0)"
                        : "inset(0 100% 0 0)",
                      transition: menuImageVisible 
                        ? "clip-path 1s cubic-bezier(0.45, 0, 0.55, 1)"
                        : "clip-path 0s",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Social links */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 lg:bottom-20 right-4 sm:right-6 md:right-12 lg:right-20">
              <div className="flex gap-2 sm:gap-3 md:gap-6 lg:gap-10 text-xs sm:text-sm md:text-base lg:text-lg">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group text-white transition-colors duration-300"
                  >
                    {link.name}
                    <span
                      className="
                        absolute left-0 -bottom-1 h-[1px] w-full
                        bg-current scale-x-0 origin-left
                        transition-transform duration-500 ease-out
                        group-hover:scale-x-100
                      "
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SPACER */}
      <div className="h-16 lg:h-[80px]" />

      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
