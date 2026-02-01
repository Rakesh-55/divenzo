import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <>
    <div className={theme === "dark" ? "dark" : ""}>
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePageScreen setTheme={setTheme} />} />
        <Route path="/about" element={<About setTheme={setTheme} />} />
        <Route path="/services" element={<Services setTheme={setTheme} />} />
        <Route path="/projects" element={<Projects setTheme={setTheme} />} />
        <Route path="/discuss" element={<Discuss setTheme={setTheme} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy setTheme={setTheme} />} />
        <Route path="/terms-of-use" element={<TermsAndUse setTheme={setTheme} />} />
      </Routes>
      </div>
    </>
    
  );
}
