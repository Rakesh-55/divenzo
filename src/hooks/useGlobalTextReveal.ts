import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_DURATION = 1.2;
const WORD_STAGGER = 0.12;

const shouldSkip = (el: HTMLElement) => {
  if (el.closest("header, footer")) return true;
  if (el.closest("[data-no-text-reveal='true']")) return true;
  if (el.closest("button, a, input, textarea, select, label")) return true;
  if (el.childElementCount > 0) return true;
  if (el.dataset.revealApplied === "true") return true;
  return false;
};

export const useGlobalTextReveal = (key?: string) => {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("p, li, h1, h2, h3, h4, h5, h6")
    ).filter((el) => !shouldSkip(el));

    if (!targets.length) return;

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const fullText = el.textContent || "";
        if (!fullText.trim()) return;

        el.dataset.revealApplied = "true";

        const words = fullText
          .split(" ")
          .map(
            (word) =>
              `<span class='word inline-block overflow-hidden' style='color: inherit;'><span class='inner block'>${word}</span></span>`
          );

        el.innerHTML = words.join(" ");

        const innerWords = el.querySelectorAll(".inner");
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              innerWords,
              { y: 16, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: REVEAL_DURATION,
                ease: "power4.out",
                stagger: {
                  each: WORD_STAGGER,
                  from: "start",
                },
                immediateRender: false,
              }
            );
          },
        });
      });
    });

    return () => ctx.revert();
  }, [key]);
};

export default useGlobalTextReveal;
