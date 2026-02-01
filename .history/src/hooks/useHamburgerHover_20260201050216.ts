import { useEffect } from "react";

export const useHamburgerHover = () => {
  useEffect(() => {
    // Get all hamburger buttons
    const hamburgerButtons = document.querySelectorAll("button[aria-label='Toggle menu']");

    hamburgerButtons.forEach((button) => {
      const spans = button.querySelectorAll("span");

      const handleMouseEnter = () => {
        // Add hover class to button
        button.classList.add("hamburger-hovering");

        // Detect if dark or light section
        const isDark = document.body.dataset.navTheme === "dark";

        // Invert line colors
        spans.forEach((span) => {
          const spanEl = span as HTMLElement;
          if (isDark) {
            // Dark section: lines become black
            spanEl.classList.add("!bg-black");
          } else {
            // Light section: lines become white
            spanEl.classList.add("!bg-white");
          }
        });
      };

      const handleMouseLeave = () => {
        button.classList.remove("hamburger-hovering");
        
        // Remove color inversion
        spans.forEach((span) => {
          const spanEl = span as HTMLElement;
          spanEl.classList.remove("!bg-black", "!bg-white");
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);
};
