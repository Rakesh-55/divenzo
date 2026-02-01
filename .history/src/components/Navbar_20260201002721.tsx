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

  return (
    <div className="font-nav">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-[100]">
        <nav
          className="
            hidden lg:grid
            grid-cols-[auto_1fr_auto]
            items-center
            px-20 py-6
            backdrop-blur-md
            transition-colors duration-500
          "
          style={{
            backgroundColor: scrolled
              ? onDarkSection
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
              absolute left-1/2 -translate-x-1/2 flex gap-12
              transition-all duration-700
              ${scrolled ? "-translate-y-10 opacity-0" : "opacity-100"}
            `}
          >
            {navLinks.map(link => (
              <Link
                key={link.page}
                to={link.page}
                className={`
                  relative text-lg font-medium group
                  ${onDarkSection ? "text-white" : "text-black"}
                `}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-current scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* RIGHT CTA + HAMBURGER */}
          <div className="ml-auto flex items-center gap-6">
            <Link
              to="/discuss"
              className={`
                relative text-lg font-medium group
                ${onDarkSection ? "text-white" : "text-black"}
              `}
            >
              Discuss with us
              <span className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-current scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </Link>

            {scrolled && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute left-0 top-2 h-[2px] w-full ${
                      menuOpen ? "rotate-45 top-3 bg-white" : onDarkSection ? "bg-white" : "bg-black"
                    } transition`}
                  />
                  <span
                    className={`absolute left-0 top-4 h-[2px] w-full ${
                      menuOpen ? "-rotate-45 top-3 bg-white" : onDarkSection ? "bg-white" : "bg-black"
                    } transition`}
                  />
                </div>
              </button>
            )}
          </div>

        </nav>
      </header>

      {/* FULLSCREEN MENU */}
      {menuOpen && (
        <div className="fullscreen-menu fixed inset-0 z-[300] bg-black text-white">
          <div className="h-full flex flex-col justify-between px-20 py-20">
            <nav className="flex flex-col gap-10 text-6xl">
              {navLinks.map(link => (
                <Link
                  key={link.page}
                  to={link.page}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-10 right-20 flex gap-10 text-lg">
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
      )}

      {/* SPACER */}
      <div className="h-[96px]" />
    </div>
  );
};
