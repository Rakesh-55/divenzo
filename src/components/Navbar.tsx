import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/divenzo-logo.png";
import { useHeaderTheme } from "../hooks/useHeaderTheme";
import { gsap } from "gsap";

const navLinks = [
  { label: "About", page: "/about" },
  { label: "Projects", page: "/projects" },
  { label: "Services", page: "/services" },
  { label: "Contact", page: "/discuss" },
];

export const Navbar = (): JSX.Element => {
  const { onDarkSection } = useHeaderTheme();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

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
    if (menuOpen) {
      gsap.fromTo(
        ".fullscreen-menu",
        { y: "100%" },
        { y: "0%", duration: 0.8, ease: "power4.out" }
      );
    } else {
      gsap.to(
        ".fullscreen-menu",
        { y: "100%", duration: 0.6, ease: "power4.in" }
      );
    }
  }, [menuOpen]);
  
  
  

  useEffect(() => {
    if (menuOpen) {
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
    } else {
      gsap.to(
        ".menu-link",
        {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power4.in",
          stagger: 0.05,
        }
      );
    }
  }, [menuOpen]);



  return (
    <div className="font-nav">
      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-[500]">
        <nav 
          className={`flex items-center justify-between px-6 py-4 transition-all duration-500 ${scrolled && !menuOpen ? "backdrop-blur-md" : ""}`}
          style={{
            backgroundColor: menuOpen
              ? "transparent"
              : scrolled
              ? onDarkSection
                ? "rgba(0,0,0,0.6)"
                : "rgba(255,255,255,0.6)"
              : "transparent",
          }}
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={logo} alt="Divenzo" className="w-10 h-10" />
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
            hidden lg:grid
            grid-cols-[auto_1fr_auto]
            items-center
            px-20 py-4
            transition-all duration-500
            ${scrolled && !menuOpen ? "backdrop-blur-xl" : ""}
          `}
          style={{
            backgroundColor: 
              menuOpen
                ? "transparent"
                : scrolled
                ? onDarkSection
                  ? "rgba(0,0,0,0.6)"
                  : "rgba(255,255,255,0.6)"
                : "transparent",
          }}
        >


        <div className="flex items-center gap-12">
          {/* LOGO */}
          <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={logo} alt="Divenzo" className="w-12 h-12" />
          </Link>

          {/* BASED IN / SAY HELLO */}
          <div
            className={`
              flex gap-10 transition-all duration-700 ease-out
              ${scrolled ? "-translate-y-6 opacity-0" : "opacity-100"}
            `}
            style={{ transitionDelay: scrolled ? "0ms" : "520ms" }}
          >
            <div className="leading-tight">
              <div className="text-sm opacity-70">Based in</div>
              <div className="text-base font-medium">Hyderabad, India</div>
            </div>

            <div className="leading-tight">
              <div className="text-sm opacity-70">Say hello</div>
              <a
                href="mailto:hello@divenzo.com"
                className="text-base font-medium hover:opacity-70"
              >
                hello@divenzo.com
              </a>
            </div>
          </div>
        </div>


          {/* CENTER NAV */}
          <div
            className={`
              flex justify-center gap-12
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
                  relative text-[18px] font-medium tracking-wide
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
                relative text-[18px] font-medium group
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
                hidden lg:flex items-center justify-center overflow-hidden
                transition-all duration-700 ease-out
                ${showHamburger ? "w-12 opacity-100" : "w-0 opacity-0"}
              `}
              aria-hidden={!showHamburger}
            >
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="
                  w-12 h-12
                  flex items-center justify-center
                  relative
                  cursor-pointer
                  z-[600]
                "
                aria-label="Toggle menu"
                style={{ pointerEvents: showHamburger ? "auto" : "none" }}
              >
                {/* Top Line / First diagonal */}
                <span
                  className={`
                    absolute h-0.5 transition-all duration-500
                    ${
                      menuOpen
                        ? "w-5 rotate-45 bg-white"
                        : "w-5 rotate-0 " +
                          (onDarkSection ? "bg-white" : "bg-black")
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
                    absolute h-0.5 transition-all duration-500
                    ${
                      menuOpen
                        ? "w-5 -rotate-45 bg-white"
                        : "w-5 rotate-0 " +
                          (onDarkSection ? "bg-white" : "bg-black")
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


        </nav>
      </header>

      {/* FULLSCREEN MENU */}
      {(menuOpen || true) && (
        <div 
          className="fullscreen-menu fixed inset-0 z-[300] bg-black text-white overflow-y-auto"
          style={{
            pointerEvents: menuOpen ? "auto" : "none",
            transform: menuOpen ? "translateY(0%)" : "translateY(100%)",
            transition: "none",
          }}
        >
          <div className="h-full flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-20 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
            <nav className="flex flex-col items-start gap-4 sm:gap-5 md:gap-7 lg:gap-10 text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
              {/* Home Link */}
              <Link
                to="/"
                onClick={() => handleNavClick("/")}
                className="menu-link text-gray-400 hover:text-white transition-colors duration-300"
              >
                Home
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className="menu-link text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 lg:bottom-20 right-4 sm:right-6 md:right-12 lg:right-20 flex gap-2 sm:gap-3 md:gap-6 lg:gap-10 text-xs sm:text-sm md:text-base lg:text-lg">
              {["Instagram", "LinkedIn", "Twitter", "Facebook"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative group text-gray-400 hover:text-white transition-colors"
                >
                  {item}
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
      )}

      {/* SPACER */}
      <div className="h-16 lg:h-[96px]" />

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
