"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Mail, Phone, X } from "lucide-react";

const BRAND = "#E75754";
const EMAIL = "laetitia@hermitagelelab.com";
const PHONE_DISPLAY = "+33 6 21 17 03 17";
const PHONE_HREF = "tel:+33621170317";

export const CONTACT_BUBBLE_OPEN_EVENT = "contact-bubble:open";

export function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    };
    window.addEventListener(CONTACT_BUBBLE_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CONTACT_BUBBLE_OPEN_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () => {
      const panel = panelRef.current;
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    // Déplace le focus dans le panneau à l'ouverture.
    (getFocusable()[0] ?? panelRef.current)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      // Restitue le focus à l'élément déclencheur.
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

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
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-bubble-title"
        tabIndex={-1}
        inert={!isOpen || undefined}
        className={`fixed bottom-0 right-0 z-[61] flex h-[100svh] w-full max-w-sm flex-col bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100svh-3rem))] sm:rounded-3xl ${
          isOpen ? "translate-x-0 translate-y-0" : "translate-x-full sm:translate-x-[calc(100%+1.5rem)]"
        }`}
      >
        {/* Header */}
        <header className="relative flex items-start gap-4 border-b border-border bg-background px-6 py-6 sm:rounded-t-3xl">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border">
            <Image
              src="/images/laetitia.jpg"
              alt=""
              fill
              sizes="48px"
              className="object-cover bg-secondary"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              L'Hermitage
            </p>
            <p id="contact-bubble-title" className="font-display text-2xl italic leading-tight text-foreground">
              Laëtitia
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: BRAND }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: BRAND }} />
              </span>
              En ligne · réponse rapide
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Fermer la fenêtre de contact"
            className="-mr-1.5 -mt-1.5 rounded-full p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Conversation body */}
        <div className="flex-1 overflow-y-auto bg-secondary/40 px-5 py-6">
          <div className="flex flex-col gap-3">
            <Message>
              Bonjour, je suis Laëtitia, ravie de vous accueillir à L'Hermitage.
            </Message>
            <Message>
              Vous souhaitez organiser un séjour, un séminaire ou un team-building ? Échangeons directement — par mail ou par téléphone.
            </Message>
          </div>
        </div>

        {/* Actions */}
        <footer className="border-t border-border bg-background p-5 sm:rounded-b-3xl">
          <div className="flex flex-col gap-2.5">
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-center gap-2.5 rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              <Mail className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Écrire à Laëtitia
            </a>
            <a
              href={PHONE_HREF}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-center gap-2.5 rounded-full border border-border px-5 py-3.5 text-sm font-medium text-foreground transition hover:border-foreground"
            >
              <Phone className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Appeler · {PHONE_DISPLAY}
            </a>
          </div>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Lun – Ven · 9h – 18h
          </p>
        </footer>
      </aside>
    </>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-2.5 text-sm leading-relaxed text-foreground">
      {children}
    </div>
  );
}
