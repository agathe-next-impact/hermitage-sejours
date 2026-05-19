"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" aria-labelledby="testimonials-heading" className="bg-background">
      <h2 id="testimonials-heading" className="sr-only">
        Témoignages d'entreprises ayant choisi L'Hermitage
      </h2>
      {/* Large Text Statement */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <figure>
          <blockquote cite="https://www.wwf.fr/" className="mx-auto max-w-5xl text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug italic">
            "Merci pour votre sens du service hors du commun. Gentillesse, sourire et engagement, cela a contribué à rendre ce moment exceptionnel. Merci"
          </blockquote>
          <figcaption className="mx-auto max-w-5xl mt-4 text-lg font-semibold text-foreground">WWF</figcaption>
        </figure>
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
