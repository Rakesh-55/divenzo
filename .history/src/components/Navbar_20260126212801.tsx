import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/divenzo-logo.png";
import { Menu, X } from "lucide-react";
import { useHeaderTheme } from "../hooks/useHeaderTheme";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "About", page: "/about" },
  { label: "Projects", page: "/projects" },
  { label: "Services", page: "/services" },
  { label: "Contact", page: "/discuss" },
];

export const Navbar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { scrolled, onDarkSection } = useHeaderTheme();
  const navRefs = useRef<HTMLAnchorElement[]>([]);

  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRefs.current.length) return;

    gsap.fromTo(
      navRefs.current,
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: scrolled ? 1 : 1,
        y: scrolled ? 0 : 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  }, []);

  useEffect(() => {
    document.body.dataset.navTheme = onDarkSection ? "dark" : "light";
  }, [onDarkSection]);

  useEffect(() => {
  q

  return (
    <>
      {/* ================= FIXED HEADER ================= */}
      <header
        className={`
          fixed top-0 left-0 w-full z-[100] transition-all duration-300
          ${
            !scrolled
              ? "bg-white"
              : onDarkSection
              ? "bg-black/60 backdrop-blur-md"
              : "bg-white/60 backdrop-blur-md"
          }
        `}
      >
        <section className="w-full">
          {/* ================= DESKTOP ================= */}
          <nav className="hidden lg:flex items-center gap-[120px] px-20 py-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="w-12 h-12 object-contain"
                alt="Divenzo"
                src={logo}
                loading="lazy"
              />
            </Link>

            {/* ================= LEFT ================= */}
            {!scrolled && (
              <div className="flex items-center gap-16 transition-opacity duration-300">
                <div>
                  <div className="text-base">Based in</div>
                  <div className="text-base">Hyderabad, India</div>
                </div>

                <div>
                  <div className="text-base">Say hello</div>
                  <a href="mailto:hello@divenzo.com" className="text-base">
                    hello@divenzo.com
                  </a>
                </div>
              </div>
            )}

            {/* ================= CENTER (NAV LINKS) ================= */}
            <div
               ref={navContainerRef}
               className="flex items-center gap-10 ml-[420px]"
            >
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.page}
                  ref={(el) => {
                    if (el) navRefs.current[index] = el;
                  }}
                  className={`
                    relative group text-base transition-colors duration-300
                    ${onDarkSection ? "text-white" : "text-black"}
                  `}
                >
                  {link.label}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[1px] w-full
                      scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left
                      ${onDarkSection ? "bg-white" : "bg-black"}
                    `}
                  />
                </Link>
              ))}
            </div>

            {/* ================= RIGHT (CTA) ================= */}
            {!scrolled && (
              <div className="ml-auto transition-opacity duration-300">
                <Link to="/discuss" className="relative text-base">
                  Discuss with us
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[1px] w-full
                      ${onDarkSection ? "bg-white/40" : "bg-black/40"}
                    `}
                  />
                </Link>
              </div>
            )}
          </nav>

          {/* ================= MOBILE BAR ================= */}
          <nav className="flex lg:hidden items-center justify-between px-4 py-4">
            <Link to="/" className="flex items-center">
              <img
                className="w-10 h-10 object-contain"
                alt="Divenzo"
                src={logo}
              />
            </Link>

            <button onClick={() => setOpen(true)}>
              <Menu
                size={28}
                className={onDarkSection ? "text-white" : "text-black"}
              />
            </button>
          </nav>
        </section>
      </header>

      {/* ================= HEADER SPACER ================= */}
      <div className="h-[72px] lg:h-[88px]" />

      {/* ================= BACKDROP ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SLIDE-IN MENU ================= */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[100]
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="px-6 space-y-8">
          {/* Location */}
          <div>
            <div className="text-base">Based in</div>
            <div className="text-base">Hyderabad, India</div>
          </div>

          {/* Email */}
          <div>
            <div className="text-base">Say hello</div>
            <div className="text-base">
              <a href="mailto:hello@divenzo.com">
                hello@divenzo.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.page}
                onClick={() => setOpen(false)}
                className="text-lg nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/discuss"
            onClick={() => setOpen(false)}
            className="text-base inline-block border-b border-black/40"
          >
            Discuss with us
          </Link>
        </div>
      </aside>
    </>
  );
};
