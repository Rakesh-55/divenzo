"use client";
import React from "react";

const brandLogos: string[] = [
  "/client/Haritha_Hospital.png",
  // "/client/Celeb_fiesta.png",
  "/client/ibha_1.png",
  "/client/Prasad_Pathlabs.png",
  "/client/Adhya_Productions.png",
  "/client/Bhaskara_Hospital.png",
  "/client/NPR_Films.png",
  "/client/Sew_Design_Studio.png",
];

export function BrandMarquee(): JSX.Element {
  return (
    <div className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-14">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Track */}
      <div className="marquee-track flex w-max items-center gap-10 sm:gap-20">
        {[...brandLogos, ...brandLogos].map((src, index) => (
          <div
            key={index}
            className="
              flex items-center justify-center
              min-w-[120px] sm:min-w-[260px] 
            "
          >
            <img
              src={src}
              alt={`Brand ${index + 1}`}
              className="
                h-40 sm:h-44 lg:h-48
                w-auto object-contain
                opacity-100
                transition-all duration-500 ease-out
                hover:opacity-100 hover:scale-[1.08]
              "
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Animation */}
      <style>{`
        .marquee-track {
          animation: marquee 26s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (hover: hover) {
          .marquee-track:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
