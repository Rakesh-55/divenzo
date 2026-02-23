import React, { useEffect } from "react";
import { gsap } from "gsap";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  onClose,
  message = "Email sent successfully! We'll get back to you soon.",
}) => {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      // Animate in
      gsap.fromTo(
        ".success-popup-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        ".success-popup-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out" }
      );

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    gsap.to(".success-popup-overlay", { opacity: 0, duration: 0.3 });
    gsap.to(
      ".success-popup-content",
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: onClose,
      }
    );
  };

  return (
    <div
      className="success-popup-overlay fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="success-popup-content bg-white rounded-2xl px-8 py-6 shadow-2xl max-w-sm text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-5xl">✓</div>
        <h3 className="text-2xl font-semibold text-black mb-2">Success!</h3>
        <p className="text-gray-600 text-base leading-relaxed">{message}</p>
        <button
          onClick={handleClose}
          className="mt-6 px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
