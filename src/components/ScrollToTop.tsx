import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top for fresh page loads
    window.scrollTo(0, 0); 
  }, [pathname]);

  return null;
};