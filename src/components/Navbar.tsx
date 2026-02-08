import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/divenzo-logo.png";
import aboutNavImg from "../assets/nav_images/about_nav_img.png";
import projectsNavImg from "../assets/nav_images/projects_nav_img.png";
import servicesNavImg from "../assets/nav_images/services_nav_img.png";
import contactNavImg from "../assets/nav_images/contact_nav_img.png";
import { useHeaderTheme } from "../hooks/useHeaderTheme";
import { gsap } from "gsap";

const navLinks = [
  { label: "About", page: "/about", image: aboutNavImg },
  { label: "Projects", page: "/projects", image: projectsNavImg },
  { label: "Services", page: "/services", image: servicesNavImg },
  { label: "Contact", page: "/discuss", image: contactNavImg },
];

export const Navbar = (): JSX.Element => {
  const { onDarkSection } = useHeaderTheme();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [hoveredMenuLink, setHoveredMenuLink] = useState<string | null>(null);

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
            hidden lg:block w-screen
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


        <div className="max-w-[1364px] mx-auto px-6 lg:px-9">
        <div className="grid grid-cols-[auto_1fr_auto] items-center py-4">
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
              <div className="text-sm text-black">Based in</div>
              <div className="text-base font-normal text-black">Hyderabad, India</div>
            </div>

            <div className="leading-tight">
              <div className="text-sm text-black">Say hello</div>
              <a
                href="mailto:hello@divenzo.com"
                className="text-base font-normal text-black hover:opacity-70"
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
                  relative text-[18px] font-normal tracking-wide
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
        </div>
        </div>

        </nav>
      </header>

      {/* FULLSCREEN MENU */}
      {(menuOpen || true) && (
        <div 
          className="fullscreen-menu fixed inset-0 z-[300] bg-black text-white overflow-hidden"
          style={{
            pointerEvents: menuOpen ? "auto" : "none",
            transform: menuOpen ? "translateY(0%)" : "translateY(100%)",
            transition: "none",
          }}
        >
          <div className="h-screen flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-14 md:py-16 lg:py-20">
            <div className="mt-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              <nav className="flex flex-col items-start gap-4 sm:gap-5 md:gap-7 lg:gap-10 text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                {navLinks.map((link) => {
                  const isHovered = hoveredMenuLink === link.label;
                  const isDimmed = hoveredMenuLink && hoveredMenuLink !== link.label;
                  return (
                    <Link
                      key={link.page}
                      to={link.page}
                      onClick={() => handleNavClick(link.page)}
                      onMouseEnter={() => setHoveredMenuLink(link.label)}
                      onMouseLeave={() => setHoveredMenuLink(null)}
                      className={`menu-link transition-colors duration-300 ${
                        menuOpen
                          ? isHovered
                            ? "text-white"
                            : isDimmed
                            ? "text-gray-500"
                            : "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex flex-col items-end text-right gap-3 sm:gap-4 md:gap-6 lg:gap-8 lg:ml-auto lg:h-full">
                <div className="flex-1 w-full flex items-center justify-end">
                  <div className="relative w-full max-w-[560px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px] overflow-hidden">
                  {navLinks.map((link) => (
                    <img
                      key={link.page}
                      src={link.image}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                        hoveredMenuLink === link.label
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-[0.98]"
                      }`}
                    />
                  ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap justify-end gap-2 sm:gap-3 md:gap-6 lg:gap-10 text-xs sm:text-sm md:text-base lg:text-lg">
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
