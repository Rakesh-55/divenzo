import React, { useState } from "react";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";
import { Navbar } from "@/components/Navbar";

export default function Discuss() {
  const [budget, setBudget] = useState("");
  const [service, setService] = useState("");

  return (
    <>
      <Navbar />

      <style>
{`
  /* ===== Custom Select Styling (No external CSS) ===== */
  .custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='black' viewBox='0 0 20 20'%3E%3Cpath d='M5.5 7.5l4.5 4.5 4.5-4.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.25rem center;
    background-size: 1.25rem;
    padding-right: 2rem;
  }

  /* Add LEFT SPACE for options */
  .custom-select option {
    padding-left: 14px;
    background-color: white;
    color: black;
  }

  /* Black hover / selected */
  .custom-select option:hover,
  .custom-select option:checked {
    background-color: black !important;
    color: white !important;
  }
`}
</style>


      <section className="relative w-full bg-white overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto py-10 md:py-20 px-4 lg:px-0">

          {/* ===== HEADING ===== */}
          <h2 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[56px] sm:text-[80px] lg:text-[120px] leading-[1] mb-[36px] lg:mb-[56px]">
            Discuss
          </h2>

          {/* ===== DESCRIPTION ===== */}
          <div className="ml-0 lg:ml-[350px]">
            <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[40px] mb-[40px] lg:mb-[56px]">
              Tell us about your project in the form below, and we’ll put you in
              touch with the right team. If you’d prefer to email us instead,
              reach out to{" "}
              <a
                href="mailto:hello@divenzo.com"
                className="text-[#000000cc] underline hover:text-[#005BBB] transition-colors"
              >
                hello@divenzo.com
              </a>{" "}
              or give us a call on{" "}
              <a
                href="tel:+919347828484"
                className="text-[#000000cc] underline hover:text-[#005BBB] transition-colors"
              >
                +91 93478 28484
              </a>
              .
            </p>

            {/* ===== FORM ===== */}
            <form
              className="flex flex-col gap-8 sm:gap-10 mt-6 ml-0 lg:ml-[100px]"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted successfully!");
              }}
            >
              {/* Name */}
              <input
                type="text"
                required
                placeholder="Full Name*"
                className="
                  border-b border-[#b3b3b3] focus:border-black outline-none
                  py-3
                  text-[16px] sm:text-[18px] lg:text-[22px]
                  text-black
                  [font-family:'Poppins',Helvetica]
                "
              />

              {/* Email */}
              <input
                type="email"
                required
                placeholder="Email*"
                className="
                  border-b border-[#b3b3b3] focus:border-black outline-none
                  py-3
                  text-[16px] sm:text-[18px] lg:text-[22px]
                  text-black
                  [font-family:'Poppins',Helvetica]
                "
              />

              {/* Phone */}
              <input
                type="tel"
                required
                placeholder="Phone Number*"
                className="
                  border-b border-[#b3b3b3] focus:border-black outline-none
                  py-3
                  text-[16px] sm:text-[18px] lg:text-[22px]
                  text-black
                  [font-family:'Poppins',Helvetica]
                "
              />

              {/* Company */}
              <input
                type="text"
                placeholder="Company Name (Optional)"
                className="
                  border-b border-[#b3b3b3] focus:border-black outline-none
                  py-3
                  text-[16px] sm:text-[18px] lg:text-[22px]
                  text-black
                  [font-family:'Poppins',Helvetica]
                "
              />

              {/* Budget */}
             <select
  defaultValue=""
  onChange={(e) => setBudget(e.target.value)}
  className={`
    
    custom-select
    border-0 border-b border-[#b3b3b3] focus:border-black outline-none
    py-3 bg-transparent
    text-[16px] sm:text-[18px] lg:text-[22px]
    [font-family:'Poppins',Helvetica]
    ${budget === "" ? "text-[#00000066]" : "text-black"}
  `}
>
  <option value="" disabled hidden>
    Select a Budget (Optional)
  </option>
  <option value="under5K">&lt; $5K</option>
  <option value="5-10k">$5–10K</option>
  <option value="10-20k">$10–20K</option>
  <option value="20-30k">$20–30K</option>
  <option value="50k">$50K+</option>
</select>



              {/* Service */}
          <select
  required
  defaultValue=""
  onChange={(e) => setService(e.target.value)}
  className={`
  
    custom-select
    border-0 border-b border-[#b3b3b3] focus:border-black outline-none
    py-3 bg-transparent
    text-[16px] sm:text-[18px] lg:text-[22px]
    [font-family:'Poppins',Helvetica]
    ${service === "" ? "text-[#00000066]" : "text-black"}
  `}
>
  <option value="" disabled hidden>
    Select a Service*
  </option>
  <option value="branding">Branding</option>
  <option value="research">Research</option>
  <option value="design">Design</option>
  <option value="development">Development</option>
  <option value="marketing">Digital Marketing</option>
</select>



              {/* Message */}
              <textarea
                required
                rows={4}
                placeholder="Tell us more about your idea*"
                className="
                  border-b border-[#b3b3b3] focus:border-black outline-none
                  py-3 resize-none
                  text-[16px] sm:text-[18px] lg:text-[22px]
                  text-black
                  [font-family:'Poppins',Helvetica]
                "
              />

              {/* Submit */}
              <button
                type="submit"
                className="
                  [font-family:'Poppins',Helvetica]
                  text-[18px] sm:text-[20px] lg:text-[24px]
                  text-black underline
                  hover:text-[#555]
                  transition-colors
                  self-start
                "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
