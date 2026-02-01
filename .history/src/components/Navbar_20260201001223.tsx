import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/divenzo-logo.png";
import { Menu, X } from "lucide-react";
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
  const [showBurger, setShowBurger] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const menuRef = useRef<HTMLDivElement>(null);

  /* ================= SCROLL LOGIC ================= */
  useEffect(() => {
    let lastScroll = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;

      setAtTop(current < 40);

      if (current > lastScroll && current > 80) {
        setShowBurger(true);
      }

      if (current < 40) {
        setShowBurger(false);
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= MENU ANIMATION ================= */
  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.8, ease: "power4.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.6,
        ease: "power4.in",
      });
    }
  }, [menuOpen]);

  /* ================= CURSOR COLOR SYNC ================= */
  useEffect(() => {
    document.body.dataset.navTheme =
      menuOpen || onDarkSection ? "dark" : "light";
  }, [menuOpen, onDarkSection]);

  return (
    <div className="font-nav">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-transparent">
        <nav className="flex items-center justify-between px-20 py-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Divenzo" className="w-12 h-12" />
          </Link>

          {/* ================= LEFT INFO ================= */}
          <div
            className={`
              flex items-center gap-16
              transition-all duration-700 ease-out
              ${scrolled ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"}
            `}
          >
            {/* Location */}
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] opacity-70">
                Based in
              </span>
              <span className="text-[16px] font-medium">
                Hyderabad, India
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] opacity-70">
                Say hello
              </span>
              <a
                href="mailto:hello@divenzo.com"
                className="text-[16px] font-medium hover:opacity-70 transition-opacity"
              >
                hello@divenzo.com
              </a>
            </div>
          </div>


          {/* CENTER NAV (ONLY AT TOP) */}
          {atTop && (
            <div className="hidden lg:flex gap-12">
              {navLinks.map(link => (
                <Link
                  key={link.page}
                  to={link.page}
                  className={`
                    relative text-[16px]  tracking-wide
                    ${onDarkSection ? "text-white" : "text-black"}
                    group
                  `}
                >
                  {link.label}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[1.5px] w-full
                      bg-current
                      scale-x-0 origin-left
                      transition-transform duration-500 ease-out
                      group-hover:scale-x-100
                      group-hover:origin-left
                      group-[.leave]:origin-right
                    `}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* ================= RIGHT (CTA + HAMBURGER) ================= */}
<div
  className={`
    ml-auto flex items-center gap-6
    transition-all duration-700 ease-out
    ${scrolled ? "-translate-x-6" : "translate-x-0"}
  `}
>
  {/* DISCUSS CTA */}
  <Link
    to="/discuss"
    className={`
      relative text-[18px] font-medium tracking-wide
      ${onDarkSection ? "text-white" : "text-black"}
      group
    `}
  >
    Discuss with us
    <span
      className="
        absolute left-0 -bottom-1 h-[1.5px] w-full
        bg-current scale-x-0 origin-left
        transition-transform duration-500 ease-out
        group-hover:scale-x-100
      "
    />
  </Link>

  {/* HAMBURGER (APPEARS ON SCROLL) */}
  {scrolled && (
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="
        w-12 h-12 rounded-full
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110
      "
    >
      <div className="relative w-6 h-6">
        <span
          className={`
            absolute left-0 top-2 h-[2px] w-full
            transition-all duration-300
            ${menuOpen ? "rotate-45 top-3 bg-white" : onDarkSection ? "bg-white" : "bg-black"}
          `}
        />
        <span
          className={`
            absolute left-0 top-4 h-[2px] w-full
            transition-all duration-300
            ${menuOpen ? "-rotate-45 top-3 bg-white" : onDarkSection ? "bg-white" : "bg-black"}
          `}
        />
      </div>
    </button>
  )}
</div>


      {/* ================= FULLSCREEN MENU ================= */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[300] bg-black text-white"
        >
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
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
      )}

      {/* SPACER */}
      <div className="h-[96px]" />
    </div>
  );
};
