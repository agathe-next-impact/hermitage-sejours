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
    if (isTabletOrMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (window.innerHeight * 2)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTabletOrMobile]);

  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const centerWidth = 100 - (imageProgress * 58);
  const centerHeight = 100 - (imageProgress * 30);
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;
  const sideTranslateY = -(imageProgress * 15);

  return (
    <section ref={sectionRef} aria-label="Présentation de L'Hermitage" className="relative bg-background">
      {/* MOBILE: simple static hero, no scroll animation */}
      <div className="lg:hidden">
        <div className="relative h-svh w-full overflow-hidden">
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
          <div className="absolute inset-0 flex items-end overflow-hidden px-4 pb-6">
            <h1 className="w-full text-[10vw] font-medium leading-[0.85] tracking-tighter text-white">
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

        {/* Bento images en grille statique sous la vidéo */}
        <div className="grid grid-cols-2 gap-2 p-2">
          {sideImages.map((img, idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden">
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex px-6 pt-16 pb-16">
          <p className="mx-auto max-w-2xl text-center text-xl leading-relaxed text-muted-foreground">
            Séjours sur-mesure, team-building
            <br />
            et séminaires.
          </p>
        </div>
      </div>

      {/* DESKTOP: bento scroll animation */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="relative flex h-full w-full items-stretch justify-center"
              style={{
                gap: `${gap}px`,
                padding: `${imageProgress * 16}px`,
                paddingBottom: `${60 + (imageProgress * 40)}px`,
              }}
            >
              {/* Left Column */}
              <div
                className="flex flex-col will-change-transform"
                style={{
                  width: `${sideWidth}%`,
                  gap: `${gap}px`,
                  transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                  opacity: sideOpacity,
                }}
              >
                {sideImages.filter(img => img.position === "left").map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
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

              {/* Main Hero Video - Center */}
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
                <div
                  className="absolute inset-0 flex items-end overflow-hidden"
                  style={{ opacity: textOpacity }}
                >
                  <h1 className="w-full text-[7vw] font-medium leading-[0.8] tracking-tighter text-white">
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
                style={{
                  width: `${sideWidth}%`,
                  gap: `${gap}px`,
                  transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                  opacity: sideOpacity,
                }}
              >
                {sideImages.filter(img => img.position === "right").map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
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

        <div className="h-[200vh]" />

        <div className="flex px-12 pt-48 pb-36 lg:px-20 lg:pt-56 lg:pb-44">
          <p className="mx-auto max-w-2xl text-center text-3xl leading-relaxed text-muted-foreground lg:text-[1.5rem] lg:leading-snug">
            Séjours sur-mesure, team-building
            <br />
            et séminaires.
          </p>
        </div>
      </div>
    </section>
  );
}
