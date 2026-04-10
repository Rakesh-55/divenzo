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

  
  useLayoutEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;

      
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
      <main className="pt-header">
        <Routes>
          <Route path="/" element={<HomePageScreen />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/discuss" element={<Discuss />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsAndUse />} />
        </Routes>
      </main>
    </CursorProvider>
    
  );
}
