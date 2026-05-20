"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Mail, Phone, X } from "lucide-react";

const BRAND = "#E75754";
const EMAIL = "laetitia@hermitagelelab.com";
const PHONE_DISPLAY = "+33 6 21 17 03 17";
const PHONE_HREF = "tel:+33621170317";

export function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Side panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-bubble-title"
        aria-hidden={!isOpen}
        className={`fixed bottom-0 right-0 z-[61] flex h-[100svh] w-full max-w-sm flex-col bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100svh-3rem))] sm:rounded-3xl ${
          isOpen ? "translate-x-0 translate-y-0" : "translate-x-full sm:translate-x-[calc(100%+1.5rem)]"
        }`}
      >
        {/* Header */}
        <header
          className="relative flex items-center gap-3 px-5 py-5 text-white sm:rounded-t-3xl"
          style={{ background: BRAND }}
        >
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/40">
            <Image
              src="/images/laetitia.jpg"
              alt=""
              fill
              sizes="44px"
              className="object-cover bg-white"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p id="contact-bubble-title" className="text-base font-medium leading-tight">
              Laëtitia — L'Hermitage
            </p>
            <p className="flex items-center gap-1.5 text-xs text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              En ligne — réponse rapide
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Fermer la fenêtre de contact"
            className="rounded-full p-1.5 text-white/90 transition hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Conversation body */}
        <div className="flex-1 overflow-y-auto bg-secondary/40 px-4 py-6">
          <div className="flex flex-col gap-3">
            <Message>
              Bonjour 👋 Je suis Laëtitia, ravie de vous accueillir à L'Hermitage.
            </Message>
            <Message>
              Vous souhaitez organiser un séjour, un séminaire ou un team-building ? Échangeons directement — par mail ou par téléphone.
            </Message>
          </div>
        </div>

        {/* Actions */}
        <footer className="border-t border-border bg-background p-4 sm:rounded-b-3xl">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-background px-3 py-4 text-center transition hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <Mail className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              <span className="text-sm font-medium">Envoyer un mail</span>
              <span className="text-[11px] text-muted-foreground group-hover:text-background/70">
                {EMAIL}
              </span>
            </a>
            <a
              href={PHONE_HREF}
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center text-white transition hover:opacity-90"
              style={{ background: BRAND }}
            >
              <Phone className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              <span className="text-sm font-medium">Téléphoner</span>
              <span className="text-[11px] text-white/80">{PHONE_DISPLAY}</span>
            </a>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Disponible du lundi au vendredi, 9h–18h.
          </p>
        </footer>
      </aside>

      {/* Floating bubble */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Fermer la fenêtre de contact" : "Ouvrir la fenêtre de contact"}
        aria-expanded={isOpen}
        className={`fixed bottom-5 right-5 z-[62] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 ${
          isOpen ? "rotate-90 scale-95" : ""
        }`}
        style={{ background: BRAND }}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
            </span>
          </>
        )}
      </button>
    </>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-background px-4 py-2.5 text-sm leading-relaxed text-foreground shadow-sm">
      {children}
    </div>
  );
}
