"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const phrases = [
  "Votre séjour à l'Hermitage",
  "au cœur d'un tiers-lieu rural",
  "chargé d'une histoire centenaire,",
  "dans ancien domaine de chasse de 30ha,",  
  "un bois de 22ha accessible,",
  "des chalets forestiers,",
  "des tipis,",
  "deux maisons forestières,",
  "une maison d'hôtes,",
  "dans la nature,",
  "pour déconnecter,",
  "et reconnecter,",
  "au vivant,",
  "au collectif",
  "Un fablab, une menuiserie,",
  "un atelier partagé",
  "de magnifiques espaces de travail",
  "pour faire commun,",
  "construire autrement,",
  "travailler librement,",
  "faire ensemble,",
  "partager autrement,",
  "avec un café cantine de village,",
  "une restauration locale et de saison,",  
  "une terrasse panoramique",
  "et une guinguette pour faire la fête",
  "à très vite !!",
];

const LETTER_DELAY_S = 0.035;
const LETTER_ANIM_S = 0.4;
const HOLD_MS = 1700;

const MOBILE_LETTER_DELAY_S = 0.012;
const MOBILE_LETTER_ANIM_S = 0.25;
const MOBILE_HOLD_MS = 900;

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

function fontSizeClass(length: number, mobile: boolean) {
  if (mobile) {
    if (length < 25) return "text-[11vw]";
    if (length < 45) return "text-[7.5vw]";
    return "text-[6vw]";
  }
  if (length < 25) return "text-[6vw]";
  if (length < 45) return "text-[4.5vw]";
  if (length < 65) return "text-[3.5vw]";
  return "text-[2.8vw]";
}

function AnimatedPhrase({ phrase, phraseKey, mobile }: { phrase: string; phraseKey: number; mobile: boolean }) {
  const letterDelay = mobile ? MOBILE_LETTER_DELAY_S : LETTER_DELAY_S;
  const animDuration = mobile ? `${MOBILE_LETTER_ANIM_S * 1.5}s` : "0.6s";
  let letterIdx = 0;
  return (
    <span key={phraseKey} className="block">
      {phrase.split(/(\s+)/).map((segment, segIdx) => {
        if (segment === "") return null;
        if (/^\s+$/.test(segment)) {
          return (
            <span key={segIdx} aria-hidden="true">
              {" "}
            </span>
          );
        }
        return (
          <span key={segIdx} className="inline-block">
            {Array.from(segment).map((letter) => {
              const delay = letterIdx * letterDelay;
              letterIdx += 1;
              return (
                <span
                  key={delay}
                  className="inline-block opacity-0"
                  style={{
                    animation: `slideUp ${animDuration} ease-out forwards`,
                    animationDelay: `${delay}s`,
                    transition: "all 1.5s",
                    transitionTimingFunction: "cubic-bezier(0.86, 0, 0.07, 1)",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function useCyclingPhrase(mobile: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index >= phrases.length - 1) return;
    const phrase = phrases[index];
    const letterDelay = mobile ? MOBILE_LETTER_DELAY_S : LETTER_DELAY_S;
    const animS = mobile ? MOBILE_LETTER_ANIM_S : LETTER_ANIM_S;
    const hold = mobile ? MOBILE_HOLD_MS : HOLD_MS;
    const duration = phrase.length * letterDelay * 1000 + animS * 1000 + hold;
    const t = setTimeout(() => setIndex((i) => i + 1), duration);
    return () => clearTimeout(t);
  }, [index, mobile]);
  return { phrase: phrases[index], index };
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const { phrase, index: phraseIndex } = useCyclingPhrase(isTabletOrMobile);

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
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (vh * 2)));
      setScrollProgress(progress);

      // Fade out the sticky text once section 2 has entered the viewport by 20% of vh.
      const remaining = rect.bottom - vh;
      const fadeStart = -vh * 0.2;
      const fadeEnd = -vh * 0.7;
      const opacity = remaining >= fadeStart
        ? 1
        : remaining <= fadeEnd
          ? 0
          : (remaining - fadeEnd) / (fadeStart - fadeEnd);
      setTextOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTabletOrMobile]);

  const textIsBlack = scrollProgress > 0.005;
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
            <h1
              className={`w-full font-medium leading-[0.95] tracking-tight text-white ${fontSizeClass(phrase.length, true)}`}
            >
              <span className="sr-only">
                Séjours d'entreprise sur-mesure à L'Hermitage — tiers-lieu d'innovation dans un domaine forestier patrimonial de 30 hectares, à 1h40 de Paris.
              </span>
              <span aria-hidden="true">
                <AnimatedPhrase phrase={phrase} phraseKey={phraseIndex} mobile />
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
                className="object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>

        <div className="flex px-6 pt-16 pb-16">
          <p className="mx-auto max-w-2xl text-center font-medium text-3xl leading-relaxed text-muted-foreground">
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

          {/* Texte sticky en bas d'écran : blanc au repos, noir dès le scroll */}
          <div className="pointer-events-none absolute inset-x-0 bottom-16 pb-4 overflow-hidden">
            <h1
              className={`w-full font-black leading-[0.9] tracking-tighter ${fontSizeClass(phrase.length, false)}`}
              style={{
                color: textIsBlack ? "#000" : "#fff",
                opacity: textOpacity,
                transition: "color 0.15s ease, opacity 0.2s linear",
              }}
            >
              <span aria-hidden="true">
                <AnimatedPhrase phrase={phrase} phraseKey={phraseIndex} mobile={false} />
              </span>
            </h1>
          </div>
        </div>

        <div className="h-[200vh]" />

        <div className="flex px-12 pt-48 pb-36 lg:px-20 lg:pt-56 lg:pb-44">
          <p className="mx-auto max-w-2xl text-center font-medium text-3xl leading-relaxed text-muted-foreground lg:text-[2rem] lg:leading-snug">
            Séjours sur-mesure <br/>
            team-building et séminaires.
          </p>
        </div>
      </div>
    </section>
  );
}
