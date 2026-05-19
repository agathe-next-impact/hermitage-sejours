"use client";

import Link from "next/link";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="bg-background" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Coordonnées et liens de L'Hermitage
      </h2>
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" aria-label="Accueil — L'Hermitage" className="text-lg font-medium text-foreground">
              <Image src="/images/logo.png" alt="L'Hermitage — Séjours d'entreprise en tiers-lieu d'innovation" width={120} height={70} />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Séjours et événements d'entreprise sur mesure, alliant nature, confort et expériences uniques au cœur du Tiers-Lieu d'innovation rurale et citoyenne de L'Hermitage, à 1h40 de Paris.
            </p>
          </div>

          {/* Adresse */}
          <div>
            <h3 className="mb-4 flex flex-col gap-4 text-sm font-medium text-foreground">Localisation</h3>
            <address className="not-italic">
              <p>17 rue de l'Hermitage</p>
              <p>60350 Autrêches</p>
              <p>France</p>
              <p className="mt-4 text-sm text-muted-foreground">
                À 1h40 de Paris, 30 min de Compiègne, 20 min de l'aéroport de Beauvais.
              </p>
            </address>
            <Link
              href="https://www.google.com/maps/place/L'Hermitage+Le+Lab/@49.3878788,2.9184413,17z/data=!3m1!4b1!4m5!3m4!1s0x47e7c9d9f0a7b8e5:0x6c8a1f2b9e5c9c8d!8m2!3d49.3878788!4d2.92063"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground underline"
              rel="noopener"
              target="_blank"
              aria-label="Voir L'Hermitage sur Google Maps (nouvel onglet)"
            >
              Voir sur Google Maps
            </Link>
          </div>

          {/* Service */}
          <div>
            <h3 className="mb-4 flex flex-col gap-4 text-sm font-medium text-foreground">Contact</h3>
            <address className="not-italic">
              <p>Laëtitia</p>
              <Link
                href="mailto:laetitia@hermitagelelab.com"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground underline"
                aria-label="Envoyer un email à Laëtitia à laetitia@hermitagelelab.com"
              >
                laetitia@hermitagelelab.com
              </Link>
              <br />
              <Link
                href="tel:+33621170317"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground underline"
                aria-label="Appeler L'Hermitage au +33 6 21 17 03 17"
              >
                +33 6 21 17 03 17
              </Link>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} L'Hermitage. Tous droits réservés.
          </p>

          {/* Social Links */}
          <nav aria-label="Réseaux sociaux">
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  href="https://www.instagram.com/l_hermitage_/"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  rel="noopener me"
                  target="_blank"
                  aria-label="L'Hermitage sur Instagram (nouvel onglet)"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/projethermitage"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  rel="noopener me"
                  target="_blank"
                  aria-label="L'Hermitage sur Facebook (nouvel onglet)"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/@lhermitage1573"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  rel="noopener me"
                  target="_blank"
                  aria-label="L'Hermitage sur YouTube (nouvel onglet)"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/company/leprojethermitage/"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  rel="noopener me"
                  target="_blank"
                  aria-label="L'Hermitage sur LinkedIn (nouvel onglet)"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
