"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const mobileLinks = [
  { href: "#technology", label: "Nos séjours" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const headerTextLight = isMenuOpen || !isScrolled;

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${isScrolled && !isMenuOpen ? "bg-background/10 backdrop-blur-md rounded-full" : "bg-transparent"}`}
        style={{
          boxShadow: isScrolled && !isMenuOpen ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
        }}
      >
        <div className="flex items-center justify-between transition-all duration-300 px-2 pl-2 py-2">
          {/* Desktop Navigation */}
          <nav aria-label="Navigation principale" className="hidden items-center gap-10 md:flex">
            <Link
              href="#technology"
              className={`px-4 py-2 text-sm font-medium rounded-full border-none focus-visible:border-transparent transition-colors ${isScrolled ? "text-white bg-black hover:text-foreground" : "bg-black text-white hover:bg-black/90"}`}
            >
              Nos séjours
            </Link>
          </nav>


          {/* Logo */}
          <Link href="/" aria-label="Accueil — L'Hermitage" className={`text-lg font-medium tracking-tight transition-colors duration-300 ${headerTextLight ? "text-white" : "text-foreground"}`}>
            <Image
              src={headerTextLight ? "/images/logo-tagline-blanc.png" : "/images/logo-tagline.png"}
              alt="L'Hermitage — Séjours d'entreprise en tiers-lieu d'innovation rurale"
              width={40}
              height={40}
              priority
            />
          </Link>

          {/* CTA */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="mailto:laetitia@hermitagelelab.com"
              className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${isScrolled ? "bg-[#E75754] text-background hover:opacity-80" : "bg-white text-foreground hover:bg-white/90"}`}
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative h-10 w-10 flex items-center justify-center md:hidden transition-colors ${headerTextLight ? "text-white" : "text-foreground"}`}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  isMenuOpen ? "top-1/2 w-6 -translate-y-1/2 -rotate-45" : "top-full w-4"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ease-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background image with scale animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 transition-transform duration-[1200ms] ease-out ${
              isMenuOpen ? "scale-100" : "scale-110"
            }`}
          >
            <Image
              src="/images/grande-maison-1.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-foreground/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-foreground/60" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col px-8 pt-28 pb-10 text-white">
          <nav aria-label="Navigation principale" className="flex-1 flex flex-col justify-center">
            <span
              className={`block text-xs uppercase tracking-[0.3em] text-white/40 mb-8 transition-all duration-700 ease-out ${
                isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
              style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
            >
              Navigation
            </span>
            <ul className="flex flex-col gap-2">
              {mobileLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      transitionDelay: isMenuOpen ? `${300 + i * 90}ms` : "0ms",
                    }}
                    className={`group relative block py-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-5xl italic leading-[1.05] tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
                        {link.label}
                      </span>
                    </span>
                    <span className="mt-3 block h-px w-full origin-left scale-x-0 bg-white/20 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`transition-all duration-700 ease-out ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: isMenuOpen ? "700ms" : "0ms" }}
          >
            <Link
              href="#reserve"
              onClick={() => setIsMenuOpen(false)}
              className="group relative block w-full overflow-hidden rounded-full bg-[#E75754] px-6 py-4 text-center text-sm font-medium uppercase tracking-[0.2em] transition-all hover:bg-[#d94a47]"
            >
              <span className="relative z-10">Réserver un séjour</span>
            </Link>

            <div className="mt-6 flex flex-col items-center gap-1 text-center text-sm text-white/60">
              <a
                href="tel:+33621170317"
                className="transition-colors hover:text-white"
              >
                +33 6 21 17 03 17
              </a>
              <a
                href="mailto:laetitia@hermitagelelab.com"
                className="transition-colors hover:text-white"
              >
                laetitia@hermitagelelab.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
