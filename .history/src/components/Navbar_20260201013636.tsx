import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ================= SCROLL STATE ================= */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* ================= HEADER ================= */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${menuOpen ? "z-[400]" : ""}`}>
        <nav
          className={`
            hidden lg:grid
            grid-cols-[auto_1fr_auto]
            items-center
            px-20 py-6
            transition-all duration-500
            ${!menuOpen && scrolled ? "backdrop-blur-md" : ""}
          `}
          style={{
            backgroundColor: 
              menuOpen
                ? "transparent"
                : scrolled
                ? document.body.dataset.navTheme === "dark"
                  ? "rgba(0,0,0,0.6)"
                  : "rgba(255,255,255,0.6)"
                : "transparent",
          }}
        >


        <div className="flex items-center gap-12">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Divenzo" className="w-12 h-12" />
          </Link>

          {/* BASED IN / SAY HELLO */}
          <div
            className={`
              flex gap-10 transition-all duration-700 ease-out
              ${scrolled ? "-translate-y-6 opacity-0" : "opacity-100"}
            `}
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
          >
            {navLinks.map(link => (
              <Link
                key={link.page}
                to={link.page}
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
            {scrolled && (
              <Link
                to="/discuss"
                className={`
                  relative text-[18px] font-medium
                  transition-all duration-500
                  ${menuOpen ? "text-white visible" : onDarkSection ? "text-white" : "text-black"}
                `}
              >
                Discuss with us
                <span
                  className="
                    absolute left-0 -bottom-1 h-[1.5px] w-full
                    bg-current scale-x-0 origin-left
                    transition-transform duration-500 ease-out
                    hover:scale-x-100
                  "
                />
              </Link>
            )}

            {/* HAMBURGER / X BUTTON */}
            {scrolled && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="
                  w-10 h-10
                  flex items-center justify-center
                  relative
                  cursor-pointer
                  z-[600]
                "
                aria-label="Toggle menu"
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
            )}
          </div>


        </nav>
      </header>

      {/* FULLSCREEN MENU */}
      {menuOpen && (
        <div className="fullscreen-menu fixed inset-0 z-[300] bg-black text-white pointer-events-auto overflow-hidden">
          <div className="h-full flex flex-col justify-between px-20 py-20 pt-32 max-w-2xl">
            <nav className="flex flex-col items-start gap-10 text-8xl">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={link.page}
                  onClick={() => setMenuOpen(false)}
                  className="menu-link text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-20 right-20 flex gap-10 text-lg">
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
      <div className="h-[96px]" />
    </div>
  );
};
