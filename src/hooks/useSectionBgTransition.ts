import { useEffect } from "react";

const TRANSITION_DURATION = "600ms";

export const useSectionBgTransition = (key?: string) => {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section")
    ).filter((section) => {
      if (section.dataset.noBgTransition === "true") return false;
      if (section.closest("header")) return false;
      if (section.closest("footer")) return false;
      return true;
    });

    if (!sections.length) return;

    sections.forEach((section) => {
      const computedBg = window.getComputedStyle(section).backgroundColor || "";
      const hasBlackClass = section.classList.contains("bg-black") || section.classList.contains("dark-section");
      const hasWhiteClass = section.classList.contains("bg-white");
      const baseBg = hasBlackClass
        ? "#000"
        : hasWhiteClass
        ? "#fff"
        : computedBg && computedBg !== "rgba(0, 0, 0, 0)"
        ? computedBg
        : "#fff";
      const baseText = hasBlackClass ? "#ffffff" : "#000000";
      const baseMuted = hasBlackClass
        ? "rgba(255,255,255,0.6)"
        : "rgba(0,0,0,0.6)";
      section.dataset.baseBg = baseBg;
      section.dataset.baseText = baseText;
      section.dataset.baseMuted = baseMuted;
      section.style.transition = section.style.transition
        ? `${section.style.transition}, background-color ${TRANSITION_DURATION} ease, color ${TRANSITION_DURATION} ease`
        : `background-color ${TRANSITION_DURATION} ease, color ${TRANSITION_DURATION} ease`;
      section.style.setProperty("--section-text", baseText);
      section.style.setProperty("--section-text-muted", baseMuted);
    });

    let ticking = false;

    const applyBackgrounds = () => {
      const viewportCenter = window.innerHeight * 0.5;

      let activeIndex = -1;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          activeIndex = index;
        }
      });

      sections.forEach((section) => {
        const baseBg = section.dataset.baseBg || "";
        const baseText = section.dataset.baseText || "";
        const baseMuted = section.dataset.baseMuted || "";
        section.style.backgroundColor = baseBg;
        if (baseText) {
          section.style.color = baseText;
        }
        if (baseMuted) {
          section.style.setProperty("--section-text", baseText);
          section.style.setProperty("--section-text-muted", baseMuted);
        }
      });

      if (activeIndex >= 0) {
        const activeSection = sections[activeIndex];
        const activeBg = activeSection.dataset.baseBg || "";
        const activeText = activeSection.dataset.baseText || "";
        const activeMuted = activeSection.dataset.baseMuted || "";
        if (activeIndex - 1 >= 0) {
          sections[activeIndex - 1].style.backgroundColor = activeBg;
          if (activeText) {
            sections[activeIndex - 1].style.color = activeText;
          }
          if (activeMuted) {
            sections[activeIndex - 1].style.setProperty("--section-text", activeText);
            sections[activeIndex - 1].style.setProperty("--section-text-muted", activeMuted);
          }
        }
        if (activeIndex + 1 < sections.length) {
          sections[activeIndex + 1].style.backgroundColor = activeBg;
          if (activeText) {
            sections[activeIndex + 1].style.color = activeText;
          }
          if (activeMuted) {
            sections[activeIndex + 1].style.setProperty("--section-text", activeText);
            sections[activeIndex + 1].style.setProperty("--section-text-muted", activeMuted);
          }
        }
      }
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        applyBackgrounds();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    applyBackgrounds();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      sections.forEach((section) => {
        section.style.backgroundColor = "";
        section.style.color = "";
        section.style.transition = "";
        delete section.dataset.baseBg;
        delete section.dataset.baseText;
        delete section.dataset.baseMuted;
        section.style.removeProperty("--section-text");
        section.style.removeProperty("--section-text-muted");
      });
    };
  }, [key]);
};

export default useSectionBgTransition;
