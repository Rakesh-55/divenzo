import { useLayoutEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./screens/About.tsx";
import Services from "./screens/Services.tsx";
import Projects from "./screens/Projects.tsx";
import Discuss from "./screens/Discuss.tsx";
import PrivacyPolicy from "./screens/PrivacyPolicy.tsx";
import TermsAndUse from "./screens/TermsAndUse.tsx";
import { HomePageScreen } from "./screens/HomePageScreen/HomePageScreen.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";

import { Navbar } from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import { CursorProvider } from "./hooks/useCursor";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Kills all ScrollTriggers and removes leftover GSAP pin-spacer wrappers
 * BEFORE the DOM is mutated for the new route. useLayoutEffect cleanup
 * runs synchronously before React applies DOM changes, so pin-spacers
 * are still in the DOM and can be properly unwrapped.
 */
function RouteCleanup() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  // useLayoutEffect cleanup runs BEFORE React removes old DOM nodes
  useLayoutEffect(() => {
    return () => {
      // Kill every ScrollTrigger instance while DOM is still intact
      ScrollTrigger.getAll().forEach((st) => {
        st.kill(true);
      });

      // Unwrap pin-spacer wrappers and remove them
      document.querySelectorAll(".pin-spacer").forEach((spacer) => {
        const child = spacer.firstElementChild as HTMLElement | null;
        if (child) {
          gsap.set(child, { clearProps: "all" });
          child.style.cssText = "";
          spacer.parentNode?.insertBefore(child, spacer);
        }
        spacer.remove();
      });

      ScrollTrigger.refresh();
    };
  }, [location.pathname]);

  // Also clean up after paint as a safety net for any stragglers
  useLayoutEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;

      // After DOM has been committed for new route, remove any leftover spacers
      requestAnimationFrame(() => {
        document.querySelectorAll(".pin-spacer").forEach((spacer) => {
          const child = spacer.firstElementChild as HTMLElement | null;
          if (child) {
            gsap.set(child, { clearProps: "all" });
            child.style.cssText = "";
            spacer.parentNode?.insertBefore(child, spacer);
          }
          spacer.remove();
        });
      });
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <CursorProvider>
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <RouteCleanup />
      <Routes>
      <Route path="/" element={<HomePageScreen />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/discuss" element={<Discuss />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsAndUse />} />
    </Routes>
    </CursorProvider>
    
  );
}
