import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */

const servicesData = [
  {
    id: 1,
    title: "Research",
    description:
      "We improvise to provide meaningful, data-driven insights that capture the user's voice and align with business objectives, seamlessly integrating with our UI/UX design and development services.",
    points: [
      "Heuristic Analysis",
      "Design Audit",
      "Usability Testing",
      "Ethnographic Research",
      "Emerging Trends",
      "UX Research",
    ],
  },
  {
    id: 2,
    title: "Design",
    description:
      "We approach design as a collaborative journey, bringing together diverse stakeholder insights to craft impactful experiences and scalable solutions.",
    points: [
      "Digital Branding",
      "User Experience Design",
      "User Interface Design",
      "Interaction Design",
      "AI Design Solutions",
      "Digital Prototyping",
    ],
  },
  {
    id: 3,
    title: "Development",
    description:
      "We transform your ideas into functional, scalable digital products—ranging from websites and mobile apps to enterprise platforms.",
    points: [
      "Front-End Development",
      "Web Application",
      "Mobile Application",
      "Custom Application",
      "SAAS Implementation",
      "CMS Integration",
    ],
  },
  {
    id: 4,
    title: "Content Writing",
    description:
      "Content creation is the craft of developing engaging digital material that resonates with your audience.",
    points: [
      "Blog Writing",
      "Website Copy",
      "Social Media Content",
      "SEO Content",
      "Video Scripts",
    ],
  },
  {
    id: 5,
    title: "Digital Marketing",
    description:
      "We blend creativity with data-driven strategies to drive visibility, engagement, and growth.",
    points: [
      "SEO",
      "PPC",
      "SMM",
      "Email Marketing",
      "Marketing Automation",
    ],
  },
];

/* ================= COMPONENT ================= */

export default function ServicesSection() {
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const triggers: ScrollTrigger[] = [];

    itemRefs.current.forEach((item) => {
      if (!item) return;

      const content = item.querySelector(
        ".service-content"
      ) as HTMLElement;

      if (!content) return;

      const trigger = ScrollTrigger.create({
        trigger: item,
        start: "top top+=90", // below fixed header
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
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="bg-black text-white px-4 sm:px-10 md:px-20">
      <div className="max-w-[1280px] mx-auto relative">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => {
              if (el) itemRefs.current[index] = el;
            }}
            className="min-h-screen flex flex-col justify-center"
          >
            {/* HEADING */}
            <h2 className="font-semibold text-[36px] sm:text-[42px] lg:text-[48px]">
              {service.id}. {service.title}
            </h2>

            {/* CONTENT */}
            <div className="service-content mt-6 max-w-[960px]">
              <p className="text-[#cccccc] text-[16px] sm:text-[20px] lg:text-[26px]">
                {service.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-6 list-disc pl-6">
                {service.points.map((point, i) => (
                  <li
                    key={i}
                    className="text-[#ffffffcc] text-[15px] sm:text-[18px]"
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
