"use client";

import { lp, type Lang } from "@/lib/i18n";
import { openContactForm, type ContactTopic } from "@/lib/contactModal";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const TEXT: Record<Lang, { button: string; info: string }> = {
  de: {
    button: "Jetzt Kontakt aufnehmen",
    info: "Infogespräch vereinbaren",
  },
  es: {
    button: "Contactar ahora",
    info: "Reservar llamada informativa",
  },
};

export default function CTABanner({
  lang = "de",
  kicker,
  heading,
  sub,
  buttonText,
  ctaHref,
  source = "CTA-Banner",
  topic = "general",
}: {
  lang?: Lang;
  kicker?: string;
  heading: string;
  sub?: string;
  buttonText?: string;
  ctaHref?: string;
  source?: string;
  topic?: ContactTopic;
}) {
  const t = TEXT[lang];
  return (
    <section className="py-7">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-2xl px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 on-dark beam-border"
          style={{
            background:
              "linear-gradient(135deg, var(--near-black-2) 0%, var(--near-black) 100%)",
          }}
        >
          <div className="text-center">
            {kicker && (
              <span
                className="mono inline-flex items-center gap-2 mb-3"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                <span style={{ opacity: 0.7 }}>§</span> {kicker}
              </span>
            )}
            <h3 style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)", marginBottom: sub ? 6 : 0 }}>
              {heading}
            </h3>
            {sub && (
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.98rem" }}>{sub}</p>
            )}
          </div>
          <div className="flex flex-col items-center gap-3.5">
            {/* Kein Lead beim Klick: öffnet nur das Formular. */}
            <a
              href={ctaHref ?? lp(lang, "/kontakt")}
              onClick={(e) => {
                e.preventDefault();
                openContactForm(source, topic);
              }}
              className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold whitespace-nowrap btn-amber"
              style={{ background: "var(--amber)", color: "#12141a", fontSize: 15.5 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
                <path d="M4 6h16v12H4z" fill="none" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              {buttonText ?? t.button}
            </a>
            <a
              href={lp(lang, "/kontakt")}
              onClick={(e) => {
                e.preventDefault();
                openContactForm(`${source}-Infogespraech`, "info");
              }}
              className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold whitespace-nowrap btn-ghost"
              style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={17} height={17} aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
              </svg>
              {t.info}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
