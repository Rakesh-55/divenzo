import { useEffect, useState } from "react";

export const useScrollProgress = (
  ref: React.RefObject<HTMLElement>
) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // clamp value between 0 and 1
      const value =
        1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);

      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
};
