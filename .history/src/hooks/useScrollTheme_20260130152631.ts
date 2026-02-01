import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollTheme(setTheme: (t: "light" | "dark") => void) {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-theme]"
    );

    sections.forEach((section) => {
      const theme = section.dataset.theme as "light" | "dark";

      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setTheme(theme),
        onEnterBack: () => setTheme(theme),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [setTheme]);
}
