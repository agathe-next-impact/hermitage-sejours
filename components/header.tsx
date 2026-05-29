"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_BUBBLE_OPEN_EVENT } from "@/components/contact-bubble";

const openContactBubble = () => {
  window.dispatchEvent(new Event(CONTACT_BUBBLE_OPEN_EVENT));
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${isScrolled ? "bg-background/10 backdrop-blur-md rounded-full" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-3 py-2">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Accueil — L'Hermitage"
          className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
        >
          <Image
            src={isScrolled ? "/images/logo-tagline.png" : "/images/logo-tagline-blanc.png"}
            alt="L'Hermitage — Séjours d'entreprise en tiers-lieu d'innovation rurale"
            width={40}
            height={40}
            priority
          />
        </Link>

        {/* Contact / Réserver — ouvre le panneau de contact */}
        <button
          type="button"
          onClick={openContactBubble}
          aria-haspopup="dialog"
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          Réserver
        </button>
      </div>
    </header>
  );
}
