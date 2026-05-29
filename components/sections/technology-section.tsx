"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Slower animation - more viewport range
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      
      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  
  return (
    <p
      ref={containerRef}
      className="text-3xl font-semibold leading-snug md:text-4xl lg:text-5xl"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;
        
        return (
          <span
            key={index}
            className="transition-colors duration-150"
            style={{
              color: isRevealed ? "var(--foreground)" : "#e4e4e7",
            }}
          >
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

// Sur écran tactile sans souris, le glissement se termine après une distance de
// scroll plus courte : la progress est multipliée par ce facteur puis clampée.
const TOUCH_SCROLL_SPEED = 1.8;

const sideImages = [
  {
    src: "/images/tipis.jpg",
    alt: "Tipis d'hébergement insolite au cœur du domaine forestier de L'Hermitage",
    position: "left",
    span: 1,
  },
  {
    src: "/images/salle-a-manger-1.jpg",
    alt: "Salon chaleureux pour temps informels et brainstormings de séminaire",
    position: "left",
    span: 1,
  },
  {
    src: "/images/salon.jpg",
    alt: "Hébergements de groupe en pleine nature pour séminaires d'entreprise",
    position: "right",
    span: 1,
  },
  {
    src: "/images/lits-2.jpg",
    alt: "Chambres confortables de la grande maison d'hôtes de L'Hermitage",
    position: "right",
    span: 1,
  },
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const isTouchRef = useRef(false);

  const descriptionText = "Déconnectez pour vous reconnecter à 1h40 de Paris. Chambres confort et hébergements insolites, espaces de travail modulables, cuisine d’hôtes en produits locaux, et plus de 50 activités de groupe pour construire votre séjour.";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsTabletOrMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const onChange = () => {
      isTouchRef.current = mq.matches;
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      // Accélère le glissement sur écran tactile sans souris.
      const speed = isTouchRef.current ? TOUCH_SCROLL_SPEED : 1;
      const progress = Math.min(1, rawProgress * speed);

      setScrollProgress(progress);

      // Text scroll progress
      if (textSectionRef.current) {
        const textRect = textSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const startOffset = windowHeight * 0.9;
        const endOffset = windowHeight * 0.1;

        const totalDistance = startOffset - endOffset;
        const currentPosition = startOffset - textRect.top;

        const newTextProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
        setTextProgress(newTextProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Title fades out first (0 to 0.2)
  const titleOpacity = Math.max(0, 1 - (scrollProgress / 0.2));

  // Image transforms start after title fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  // Desktop: bento grid (center shrinks, side panels open from edges)
  // Tablet/Mobile: side panels slide inward over the full-screen image until they meet
  const centerWidth = isTabletOrMobile ? 100 : 100 - (imageProgress * 58);
  const centerHeight = isTabletOrMobile ? 100 : 100 - (imageProgress * 30);
  const sideWidth = isTabletOrMobile ? 50 : imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;

  // Calculate grayscale for text section based on textProgress
  const grayscaleAmount = Math.round((1 - textProgress) * 100);

  return (
    <section ref={sectionRef} aria-label="Innovation rurale et citoyenne — l'esprit de L'Hermitage" className="relative bg-foreground">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              padding: `${imageProgress * 16}px`,
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
                      width: `calc(${sideWidth}% - ${gap / 2}px)`,
                      gap: `${gap}px`,
                      zIndex: 10,
                      transform: `translateX(${sideTranslateLeft}%)`,
                      opacity: sideOpacity,
                    }
                  : {
                      width: `${sideWidth}%`,
                      gap: `${gap}px`,
                      transform: `translateX(${sideTranslateLeft}%)`,
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

            {/* Main Center Image */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/grande-maison-2.jpg"
                alt="La grande maison de L'Hermitage, cœur du tiers-lieu d'innovation rurale et citoyenne"
                fill
                className="object-cover"
                priority
                style={{ opacity: isTabletOrMobile ? Math.max(0, 1 - imageProgress * 1.5) : 1 }}
              />
              <div
                className="absolute inset-0 bg-foreground/40"
                style={{ opacity: isTabletOrMobile ? Math.max(0, 1 - imageProgress * 1.5) : 1 }}
              />
              
              {/* Title Text - Fades out word by word with blur */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              >
                <h2 className="max-w-3xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-7xl text-5xl">
                  {["Innovation", "rurale", "et citoyenne."].map((word, index) => {
                    // Each word fades out sequentially based on scrollProgress
                    const wordFadeStart = index * 0.07; // Technology: 0, Meets: 0.07, Wilderness: 0.14
                    const wordFadeEnd = wordFadeStart + 0.07;
                    const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
                    const wordOpacity = 1 - wordProgress;
                    const wordBlur = wordProgress * 10; // 0px to 10px blur
                    
                    return (
                      <span
                        key={index}
                        className="inline-block"
                        style={{
                          opacity: wordOpacity,
                          filter: `blur(${wordBlur}px)`,
                          transition: 'opacity 0.1s linear, filter 0.1s linear',
                          marginRight: index < 2 ? '0.3em' : '0',
                        }}
                      >
                        {word}
                        {index === 1 && <br />}
                      </span>
                    );
                  })}
                </h2>
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
                      width: `calc(${sideWidth}% - ${gap / 2}px)`,
                      gap: `${gap}px`,
                      zIndex: 10,
                      transform: `translateX(${sideTranslateRight}%)`,
                      opacity: sideOpacity,
                    }
                  : {
                      width: `${sideWidth}%`,
                      gap: `${gap}px`,
                      transform: `translateX(${sideTranslateRight}%)`,
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

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Description Section with Background Image and Scroll Reveal */}
      <div 
        ref={textSectionRef}
        className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40"
      >
        {/* Background Image with Grayscale Filter */}
        

        {/* Text Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
