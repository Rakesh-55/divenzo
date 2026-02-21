import React, { useState } from "react";
import { AnimatedText } from "@/components/AnimatedText";

const categories = [
  "All",
  "Ecommerce",
  "Food & Beverage",
  "Real State",
  "Health & Wellness",
  "Hospitality & Travel",
  "Transport",
  "Tech",
  "Fashion Apparels",
  "Beauty & Care",
  "Manufacturing & Industrial",
  "Entertainment",
  "Sports"
];

// Define the props we are expecting from the parent
interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  // visible counts
  const mobileVisible = 5;
  const tabletVisible = 7;

  return (
    <section className="w-full py-8 sm:py-10 mb-8">
      {/* ===== FILTER BUTTONS ===== */}
      <div className="flex flex-wrap gap-3 sm:gap-4">

        {categories.map((category, index) => {
          const isActive = activeCategory === category;

          // hide logic for mobile & tablet
          const isHidden =
            !expanded &&
            (
              index >= mobileVisible ||
              (index >= tabletVisible && window.innerWidth >= 640)
            );

          return (
            <button
              key={index}
              onClick={() => onCategoryChange(category)}
              className={`
                rounded-full border
                transition-all duration-300
                [font-family:'Poppins',Helvetica]
                whitespace-nowrap

                text-[14px] sm:text-[16px] lg:text-[18px]
                px-4 py-2
                sm:px-5 sm:py-2.5
                lg:px-6 lg:py-3

                ${isHidden ? "hidden lg:inline-flex" : "inline-flex"}

                ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black border-[#ccc] hover:bg-black hover:text-white"
                }
              `}
            >
              <AnimatedText
                as="span"
                className="inline-block"
                disableColorReveal
                startColor="currentColor"
                endColor="currentColor"
                slideDuration={0.8}
                slideStagger={0.08}
              >
                {category}
              </AnimatedText>
            </button>
          );
        })}

        {/* ===== TOGGLE BUTTON (Mobile & Tablet only) ===== */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            inline-flex lg:hidden
            rounded-full border border-dashed
            text-black
            [font-family:'Poppins',Helvetica]

            text-[14px] sm:text-[16px]
            px-4 py-2 sm:px-5 sm:py-2.5

            hover:bg-black hover:text-white
            transition-all duration-300
          "
        >
          <AnimatedText
            as="span"
            className="inline-block"
            disableColorReveal
            startColor="currentColor"
            endColor="currentColor"
            slideDuration={0.8}
            slideStagger={0.08}
          >
            {expanded ? "Show Less" : "+ More"}
          </AnimatedText>
        </button>
      </div>
    </section>
  );
};