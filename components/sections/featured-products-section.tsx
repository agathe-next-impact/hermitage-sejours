"use client";

import { FadeImage } from "@/components/fade-image";
import { CONTACT_BUBBLE_OPEN_EVENT } from "@/components/contact-bubble";

const openContactBubble = () => {
  window.dispatchEvent(new Event(CONTACT_BUBBLE_OPEN_EVENT));
};

const features = [
  {
    title: "Hébergements",
    description: "100+ couchages",
    image: "/images/salon.jpg",
    alt: "Hébergements de groupe à L'Hermitage : 100+ couchages en chambres, maison et tipis",
  },
  {
    title: "Restauration",
    description: "16+ options à la carte",
    image: "/images/restauration-1.jpg",
    alt: "Restauration sur mesure pour séminaires : plus de 16 options à la carte",
  },
  {
    title: "Espaces de travail",
    description: "6 espaces modulables",
    image: "/images/espace-de-travail.jpeg",
    alt: "Six espaces de travail modulables pour séminaires et ateliers d'entreprise",
  },
  {
    title: "Activités de groupe",
    description: "50+ activités",
    image: "/images/activite.jpg",
    alt: "Plus de 50 activités de groupe et team-building en pleine nature à L'Hermitage",
  },
  {
    title: "Evénements sur mesure",
    description: "250+ personnes",
    image: "/images/evenement.jpg",
    alt: "Événements professionnels sur mesure jusqu'à 250 personnes dans un domaine forestier",
  },
  {
    title: "Transport et logistique",
    description: "A la demande",
    image: "/images/logistique.jpeg",
    alt: "Transport et logistique à la demande depuis Paris vers L'Hermitage",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="technology" aria-labelledby="experience-heading" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 id="experience-heading" className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
         Construisons votre expérience.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground">
          Hébergements, restauration, espaces de travail, activités et logistique : nous assemblons chaque brique de votre séminaire ou team-building sur mesure.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div key={feature.title} className="group">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.alt}
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>

            {/* Content — ouvre le panneau de contact */}
            <button
              type="button"
              onClick={openContactBubble}
              aria-haspopup="dialog"
              aria-label={`Nous contacter à propos de : ${feature.title}`}
              className="block w-full cursor-pointer py-6 text-left"
            >
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                {feature.description}
              </p>
              <h3 className="text-foreground text-xl font-semibold transition-colors">
                {feature.title}
              </h3>
              <span className="mt-3 inline-block text-sm text-muted-foreground underline underline-offset-4 transition-colors group-hover:text-foreground">
                En savoir plus
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20"></div>
    </section>
  );
}
