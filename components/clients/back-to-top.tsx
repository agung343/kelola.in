"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!visible) return null;

  return (
    <button
      className="fixed bottom-6 right-6 md:hidden bg-green-500/90 backdrop-blur-md text-neutral-100 p-2 rounded-full shadow-xl transition"
      aria-label="Back to Top"
      onClick={scrollToTop}
    >
      <ArrowUp size={20} />
    </button>
  );
}
