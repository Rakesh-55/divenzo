import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { FooterSection } from "./HomePageScreen/sections/FooterSection";

/* ─────────────────────────────────────────────
   Animated Input / Textarea
   - Floating label revealed by GSAP on mount
   - Black underline animates left→right on focus
   - Text turns black on focus, grey on blur
   ───────────────────────────────────────────── */
interface AnimatedFieldProps {
  label: string;
  type?: string;
  required?: boolean;
  isTextarea?: boolean;
  delay?: number;
  value: string;
  onChange: (v: string) => void;
}

function AnimatedField({
  label,
  type = "text",
  required = false,
  isTextarea = false,
  delay = 0,
  value,
  onChange,
}: AnimatedFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  /* reveal label on mount */
  useEffect(() => {
    if (!labelRef.current) return;
    gsap.fromTo(
      labelRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.3 + delay, ease: "power3.out" }
    );
  }, [delay]);

  /* underline animate */
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.to(lineRef.current, {
      scaleX: focused ? 1 : 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [focused]);

  const sharedClass = `
    relative w-full bg-transparent outline-none
    py-3 text-[16px] sm:text-[18px] lg:text-[22px]
    [font-family:'Poppins',Helvetica] transition-colors duration-300
    ${focused ? "text-black" : "text-gray-500"}
  `;

  return (
    <div ref={wrapRef} className="relative">
      {/* floating label */}
      <label
        ref={labelRef}
        className={`
          absolute left-0 pointer-events-none
          [font-family:'Poppins',Helvetica] transition-all duration-300
          ${active
            ? "top-[-8px] text-[11px] sm:text-[12px] text-gray-400"
            : "top-[12px] text-[16px] sm:text-[18px] lg:text-[22px] text-gray-400"
          }
        `}
        style={{ opacity: 0 }}
      >
        {label}
      </label>

      {isTextarea ? (
        <textarea
          required={required}
          rows={4}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={`${sharedClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={sharedClass}
        />
      )}

      {/* static grey border */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#b3b3b3]" />
      {/* animated black underline */}
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Animated Select
   Same floating-label + underline pattern,
   dropdown options styled visibly (black text on white bg)
   ───────────────────────────────────────────── */
interface AnimatedSelectProps {
  label: string;
  required?: boolean;
  delay?: number;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

function AnimatedSelect({
  label,
  required = false,
  delay = 0,
  value,
  onChange,
  options,
}: AnimatedSelectProps) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  useEffect(() => {
    if (!labelRef.current) return;
    gsap.fromTo(
      labelRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.3 + delay, ease: "power3.out" }
    );
  }, [delay]);

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.to(lineRef.current, {
      scaleX: focused ? 1 : 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [focused]);

  return (
    <div className="relative">
      {/* floating label */}
      <label
        ref={labelRef}
        className={`
          absolute left-0 pointer-events-none
          [font-family:'Poppins',Helvetica] transition-all duration-300
          ${active
            ? "top-[-8px] text-[11px] sm:text-[12px] text-gray-400"
            : "top-[12px] text-[16px] sm:text-[18px] lg:text-[22px] text-gray-400"
          }
        `}
        style={{ opacity: 0 }}
      >
        {label}
      </label>

      <select
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`
          relative w-full bg-transparent outline-none appearance-none
          py-3 text-[16px] sm:text-[18px] lg:text-[22px]
          [font-family:'Poppins',Helvetica] cursor-pointer
          transition-colors duration-300
          ${value === "" ? "text-transparent" : focused ? "text-black" : "text-gray-500"}
        `}
        style={{
          WebkitAppearance: "none",
          MozAppearance: "none" as never,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23333' viewBox='0 0 20 20'%3E%3Cpath d='M5.5 7.5l4.5 4.5 4.5-4.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.25rem center",
          backgroundSize: "1.25rem",
          paddingRight: "2rem",
        }}
      >
        <option value="" disabled hidden />
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{ color: "#000", backgroundColor: "#fff" }}
          >
            {o.label}
          </option>
        ))}
      </select>

      {/* static grey border */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#b3b3b3]" />
      {/* animated black underline */}
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */
export default function Discuss() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  /* heading + description reveal */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  /* form submit — frontend only, does NOT touch any backend */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      alert("Form submitted successfully!");
    },
    []
  );

  return (
    <>
      <section className="relative w-full bg-white overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto pt-3 pb-8 md:pt-8 md:pb-16 px-4 lg:px-0">

          {/* ===== HEADING ===== */}
          <h2
            ref={headingRef}
            className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[40px] sm:text-[56px] md:text-[80px] lg:text-[120px] leading-[1] mb-[36px] lg:mb-[56px]"
            style={{ opacity: 0 }}
          >
            Discuss
          </h2>

          {/* ===== DESCRIPTION ===== */}
          <div className="ml-0 md:ml-[120px] lg:ml-[350px]">
            <p
              ref={descRef}
              className="[font-family:'Poppins',Helvetica] font-normal text-black text-[18px] sm:text-[24px] lg:text-[32px] mb-[40px] lg:mb-[56px]"
              style={{ opacity: 0 }}
            >
              Tell us about your project in the form below, and we'll put you in
              touch with the right team. If you'd prefer to email us instead,
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
              onSubmit={handleSubmit}
            >
              <AnimatedField label="Full Name*"      required type="text"  delay={0}    value={fullName} onChange={setFullName} />
              <AnimatedField label="Email*"           required type="email" delay={0.08} value={email}    onChange={setEmail} />
              <AnimatedField label="Phone Number*"    required type="tel"   delay={0.16} value={phone}    onChange={setPhone} />
              <AnimatedField label="Company Name"                           delay={0.24} value={company}  onChange={setCompany} />

              <AnimatedSelect
                label="Select a Budget (Optional)"
                delay={0.32}
                value={budget}
                onChange={setBudget}
                options={[
                  { value: "under5K", label: "< $5K" },
                  { value: "5-10k",   label: "$5–10K" },
                  { value: "10-20k",  label: "$10–20K" },
                  { value: "20-30k",  label: "$20–30K" },
                  { value: "50k",     label: "$50K+" },
                ]}
              />

              <AnimatedSelect
                label="Select a Service*"
                required
                delay={0.4}
                value={service}
                onChange={setService}
                options={[
                  { value: "branding",    label: "Branding" },
                  { value: "research",    label: "Research" },
                  { value: "design",      label: "Design" },
                  { value: "development", label: "Development" },
                  { value: "marketing",   label: "Digital Marketing" },
                ]}
              />

              <AnimatedField label="Tell us more about your idea*" required isTextarea delay={0.48} value={message} onChange={setMessage} />

              {/* Submit — same hover underline as Navbar links */}
              <button
                type="submit"
                className="
                  relative self-start group
                  [font-family:'Poppins',Helvetica]
                  text-[18px] sm:text-[20px] lg:text-[24px]
                  text-black font-normal
                  py-1
                "
              >
                Submit
                <span
                  className="
                    absolute left-0 -bottom-0.5 h-[1.5px] w-full
                    bg-neutral-400/70 transition-opacity duration-300
                    group-hover:opacity-0
                  "
                />
                <span
                  className="
                    absolute left-0 -bottom-0.5 h-[1.5px] w-full
                    bg-current scale-x-0 origin-left
                    transition-transform duration-500 ease-out
                    group-hover:scale-x-100
                  "
                />
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
