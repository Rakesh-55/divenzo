import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) return; // mobile fallback

    itemRefs.current.forEach((item, index) => {
      const title = item.querySelector(".service-title");
      const content = item.querySelector(".service-content");

      ScrollTrigger.create({
        trigger: item,
        start: "top top+=90", // below header
        end: "+=100%",
        pin: true,
        pinSpacing: false,
        scrub: true,

        onUpdate: (self) => {
          gsap.to(content, {
            scale: 1 - self.progress * 0.25,
            opacity: 1 - self.progress,
            y: -40 * self.progress,
            ease: "none",
          });

          gsap.to(title, {
            scale: 1 - index * 0.05,
            ease: "none",
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="bg-black text-white px-4 sm:px-10 md:px-20">
      <div
        ref={containerRef}
        className="max-w-[1280px] mx-auto relative"
      >
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => (itemRefs.current[index] = el!)}
            className="min-h-screen flex flex-col justify-center"
          >
            {/* HEADING */}
            <h2 className="service-title font-semibold text-[40px] md:text-[48px] lg:text-[56px]">
              {service.id}. {service.title}
            </h2>

            {/* CONTENT */}
            <div className="service-content mt-6 max-w-[960px]">
              <p className="text-[#cccccc] text-[18px] md:text-[22px] lg:text-[26px]">
                {service.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-6 list-disc pl-6">
                {service.points.map((point, i) => (
                  <li
                    key={i}
                    className="text-[#ffffffcc] text-[15px] md:text-[18px]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
