"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const DESCRIPTION_LINES = [
  "Au coeur d’un d’un tiers-lieu rural", 
  "à 1h40 de Paris,",
  "dans un domaine forestier patrimonial.",
];

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [alpineTranslateX, setAlpineTranslateX] = useState(-100);
  const [forestTranslateX, setForestTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;

    // Calculate progress based on scroll position
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    // Alpine comes from left (-100% to 0%)
    setAlpineTranslateX((1 - progress) * -100);

    // Forest comes from right (100% to 0%)
    setForestTranslateX((1 - progress) * 100);

    // Title fades out as blocks come together
    setTitleOpacity(1 - progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  useEffect(() => {
    const node = descriptionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDescriptionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="products"
      aria-label="Composez votre séjour d'entreprise sur-mesure"
      className="overflow-x-clip bg-background"
    >
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[12vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[10vw] lg:text-[8vw] text-center px-6">
                Créez votre séjour.
              </h2>
            </div>

            {/* Product Grid */}
            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              {/* Alpine Image - comes from left */}
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="/images/poire.jpg"
                  alt="Hébergements et restauration sur-mesure à L'Hermitage : table d'hôtes en produits locaux"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                    Hébergements et restauration
                  </span>
                </div>
              </div>

              {/* Forest Image - comes from right */}
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="/images/activite.jpg"
                  alt="Activité de cohésion en plein air pour groupes professionnels à L'Hermitage"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                    Espaces de travail et activités
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            L'Hermitage
          </p>
          <p
            ref={descriptionRef}
            aria-label={DESCRIPTION_LINES.join(" ")}
            className="mt-8 font-normal leading-relaxed text-foreground/80 text-3xl text-center"
          >
            {DESCRIPTION_LINES.map((line, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="block"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, black 40%, transparent 55%)",
                  maskImage:
                    "linear-gradient(to right, black 40%, transparent 55%)",
                  WebkitMaskSize: "250% 100%",
                  maskSize: "250% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: descriptionVisible ? "0% 0%" : "100% 0%",
                  maskPosition: descriptionVisible ? "0% 0%" : "100% 0%",
                  opacity: descriptionVisible ? 1 : 0,
                  transitionProperty:
                    "mask-position, -webkit-mask-position, opacity",
                  transitionDuration: "2.8s, 2.8s, 2.2s",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: `${i * 200}ms`,
                }}
              >
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
        