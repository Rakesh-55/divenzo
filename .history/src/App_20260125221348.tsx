import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./screens/About.tsx";
import Services from "./screens/Services.tsx";
import Projects from "./screens/Projects.tsx";
import Discuss from "./screens/Discuss.tsx";
import PrivacyPolicy from "./screens/PrivacyPolicy.tsx";
import TermsAndUse from "./screens/TermsAndUse.tsx";
import { HomePageScreen } from "./screens/HomePageScreen/HomePageScreen.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePageScreen />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/discuss" element={<Discuss />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsAndUse />} />
    </Routes>
    </>
    
  );
}
