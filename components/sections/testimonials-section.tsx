"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LINES = [
  "Un domaine d'exception pour des séminaires,",
  "alliant nature, confort et expériences uniques.",
];

const CLIENT_LOGOS = [
  { src: "/images/logos-clients/Acted.png", alt: "Acted" },
  { src: "/images/logos-clients/AEI.png", alt: "AEI" },
  { src: "/images/logos-clients/Alois.png", alt: "Alois" },
  { src: "/images/logos-clients/Bella stock.png", alt: "Bella Stock" },
  { src: "/images/logos-clients/CCVS.png", alt: "CCVS" },
  { src: "/images/logos-clients/Centre de formation.png", alt: "Centre de formation" },
  { src: "/images/logos-clients/CERDD.png", alt: "CERDD" },
  { src: "/images/logos-clients/Coordination Sud.jpeg", alt: "Coordination Sud" },
  { src: "/images/logos-clients/CSDD.png", alt: "CSDD" },
  { src: "/images/logos-clients/Decathlon.jpeg", alt: "Decathlon" },
  { src: "/images/logos-clients/Eloquentia.png", alt: "Eloquentia" },
  { src: "/images/logos-clients/Entr_ouvert.png", alt: "Entr'ouvert" },
  { src: "/images/logos-clients/Eppur.png", alt: "Eppur" },
  { src: "/images/logos-clients/Etamine.png", alt: "Etamine" },
  { src: "/images/logos-clients/FAIR.png", alt: "FAIR" },
  { src: "/images/logos-clients/France Ville Durable.jpeg", alt: "France Ville Durable" },
  { src: "/images/logos-clients/La Maison Francaise.png", alt: "La Maison Française" },
  { src: "/images/logos-clients/La porte du hainaut.png", alt: "La Porte du Hainaut" },
  { src: "/images/logos-clients/L_arche en France.png", alt: "L'Arche en France" },
  { src: "/images/logos-clients/Le bruit qui court.jpg", alt: "Le Bruit qui Court" },
  { src: "/images/logos-clients/Lemon tri.png", alt: "Lemon Tri" },
  { src: "/images/logos-clients/Les glénans.png", alt: "Les Glénans" },
  { src: "/images/logos-clients/L_ouvre boite.png", alt: "L'Ouvre-Boîte" },
  { src: "/images/logos-clients/Maison de la conversation.png", alt: "Maison de la Conversation" },
  { src: "/images/logos-clients/Makesense.jpg", alt: "Makesense" },
  { src: "/images/logos-clients/Montrieux.png", alt: "Montrieux" },
  { src: "/images/logos-clients/Open society.png", alt: "Open Society" },
  { src: "/images/logos-clients/Open.png", alt: "Open" },
  { src: "/images/logos-clients/Outwork.jpeg", alt: "Outwork" },
  { src: "/images/logos-clients/Pythéas .jpeg", alt: "Pythéas" },
  { src: "/images/logos-clients/Refugee Food.png", alt: "Refugee Food" },
  { src: "/images/logos-clients/Ticket for change.png", alt: "Ticket for Change" },
  { src: "/images/logos-clients/Transformance pro.png", alt: "Transformance Pro" },
  { src: "/images/logos-clients/UniLaSalle.png", alt: "UniLaSalle" },
  { src: "/images/logos-clients/Université Gustave Eiffel.png", alt: "Université Gustave Eiffel" },
  { src: "/images/logos-clients/UTC.jpg", alt: "UTC" },
  { src: "/images/logos-clients/Vesto.png", alt: "Vesto" },
  { src: "/images/logos-clients/WFX.png", alt: "WFX" },
];

export function TestimonialsSection() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = paragraphRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const maskDuration = isMobile ? "2.4s" : "4.8s";
  const opacityDuration = isMobile ? "2s" : "4.2s";
  const lineStagger = isMobile ? 300 : 600;

  return (
    <section id="about" aria-labelledby="testimonials-heading" className="bg-background">
      <h2 id="testimonials-heading" className="sr-only">
        Témoignages d'entreprises ayant choisi L'Hermitage
      </h2>
      {/* Large Text Statement */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <Image
          src="/images/logo-tagline.png"
          alt=""
          width={148}
          height={148}
          className="mb-12 mx-auto"
        />
        <p
          ref={paragraphRef}
          aria-label={LINES.join(" ")}
          className="mx-auto max-w-3xl text-center text-2xl font-semibold leading-relaxed text-foreground md:text-4xl"
        >
          {LINES.map((line, i) => (
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
                WebkitMaskPosition: visible ? "0% 0%" : "100% 0%",
                maskPosition: visible ? "0% 0%" : "100% 0%",
                opacity: visible ? 1 : 0,
                transitionProperty:
                  "mask-position, -webkit-mask-position, opacity",
                transitionDuration: `${maskDuration}, ${maskDuration}, ${opacityDuration}`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: `${i * lineStagger}ms`,
              }}
            >
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Scrolling client logos */}
      <div
        aria-label="Ils nous ont fait confiance"
        className="marquee-mask overflow-hidden py-12 md:py-16"
      >
        <div className="flex w-max animate-marquee items-center gap-16 md:gap-24">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <div
              key={i}
              className="relative h-12 w-32 shrink-0 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-16 md:w-40"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/grande-maison-1.jpg"
          alt="La grande maison patrimoniale de L'Hermitage au lever du soleil, lieu d'accueil de séminaires"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - white at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
