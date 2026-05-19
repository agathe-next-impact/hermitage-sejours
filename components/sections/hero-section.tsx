"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "VOTRE  SÉJOUR  A  L'HERMITAGE";

const sideImages = [
  {
    src: "/images/hebergement.jpeg",
    alt: "Hébergement insolite en tipis dans le domaine forestier de L'Hermitage",
    position: "left",
    span: 1,
  },
  {
    src: "/images/salon-1.jpg",
    alt: "Salon convivial de la grande maison d'hôtes de L'Hermitage",
    position: "left",
    span: 1,
  },
  {
    src: "/images/poulailler.jpg",
    alt: "Le poulailler rénové, espace atypique du tiers-lieu de L'Hermitage",
    position: "right",
    span: 1,
  },
  {
    src: "/images/lits-soleil.jpg",
    alt: "Chambre lumineuse de la grande maison de L'Hermitage",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollableHeightRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsTabletOrMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // Freeze the scrollable height at mount and on orientation changes only,
    // so mobile URL-bar show/hide doesn't jitter the animation.
    const computeHeight = () => {
      scrollableHeightRef.current = window.innerHeight * (isTabletOrMobile ? 1.2 : 2);
    };
    computeHeight();

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeightRef.current));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("orientationchange", computeHeight);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("orientationchange", computeHeight);
    };
  }, [isTabletOrMobile]);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));

  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  // Desktop: bento grid (center shrinks, side panels open from edges)
  // Tablet/Mobile: side panels slide inward over the full-screen video until they meet
  const centerWidth = isTabletOrMobile ? 100 : 100 - (imageProgress * 58);
  const centerHeight = isTabletOrMobile ? 100 : 100 - (imageProgress * 30);
  const sideWidth = isTabletOrMobile ? 50 : imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;

  // Vertical offset on desktop only (no shift when panels join in mobile)
  const sideTranslateY = isTabletOrMobile ? 0 : -(imageProgress * 15);

  return (
    <section ref={sectionRef} aria-label="Présentation de L'Hermitage" className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: isTabletOrMobile ? 0 : `${gap}px`,
              padding: isTabletOrMobile ? 0 : `${imageProgress * 16}px`,
              paddingBottom: isTabletOrMobile ? 0 : `${60 + (imageProgress * 40)}px`,
            }}
          >

            {/* Left Column */}
            <div
              className="flex flex-col will-change-transform"
              style={
                isTabletOrMobile
                  ? {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: `${sideWidth}%`,
                      gap: 0,
                      zIndex: 10,
                      transform: `translateX(${sideTranslateLeft}%)`,
                      opacity: sideOpacity,
                    }
                  : {
                      width: `${sideWidth}%`,
                      gap: `${gap}px`,
                      transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                      opacity: sideOpacity,
                    }
              }
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderTopLeftRadius: isTabletOrMobile ? 0 : `${borderRadius}px`,
                    borderBottomLeftRadius: isTabletOrMobile ? 0 : `${borderRadius}px`,
                    borderTopRightRadius: `${borderRadius}px`,
                    borderBottomRightRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <video
                src="/videos/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Vidéo de présentation du domaine de L'Hermitage : forêt, hébergements et espaces de séminaire"
                className="absolute inset-0 h-full w-full object-cover"
              />
              
              {/* Overlay Text - Fades out first */}
              <div 
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-[12vw] font-medium leading-[0.8] tracking-tighter text-white md:text-[7vw]">
                  <span className="sr-only">
                    Séjours d'entreprise sur-mesure à L'Hermitage — tiers-lieu d'innovation dans un domaine forestier patrimonial de 30 hectares, à 1h40 de Paris.
                  </span>
                  <span aria-hidden="true">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                  </span>
                </h1>
              </div>
            </div>

            {/* Right Column */}
            <div
              className="flex flex-col will-change-transform"
              style={
                isTabletOrMobile
                  ? {
                      position: "absolute",
                      top: 0,
                      right: 0,
                      height: "100%",
                      width: `${sideWidth}%`,
                      gap: 0,
                      zIndex: 10,
                      transform: `translateX(${sideTranslateRight}%)`,
                      opacity: sideOpacity,
                    }
                  : {
                      width: `${sideWidth}%`,
                      gap: `${gap}px`,
                      transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                      opacity: sideOpacity,
                    }
              }
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderTopLeftRadius: `${borderRadius}px`,
                    borderBottomLeftRadius: `${borderRadius}px`,
                    borderTopRightRadius: isTabletOrMobile ? 0 : `${borderRadius}px`,
                    borderBottomRightRadius: isTabletOrMobile ? 0 : `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[120vh] md:h-[200vh]" />

      {/* Tagline Section */}
      <div className="flex px-6 pt-20 pb-20 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-2xl text-center text-xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[1.5rem] lg:leading-snug">
          Séjours sur-mesure, team-building
          <br />
          et séminaires.
        </p>
      </div>
    </section>
  );
}
