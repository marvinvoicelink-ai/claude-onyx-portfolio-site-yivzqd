"use client";

import Link from "next/link";
import type { Lang } from "@/lib/i18n";

const TEXT: Record<Lang, { impressum: string; privacy: string; terms: string; cookies: string; booking: string; legalNote?: string }> = {
  de: {
    impressum: "Impressum",
    privacy: "Datenschutz",
    terms: "AGB",
    cookies: "Cookie-Einstellungen",
    booking: "Termin buchen",
  },
  es: {
    impressum: "Aviso legal",
    privacy: "Privacidad",
    terms: "Condiciones",
    cookies: "Configuración de cookies",
    booking: "Reservar cita",
    legalNote: "Textos legales en alemán",
  },
};

/** Rechtstexte gibt es nur auf Deutsch (rechtlich maßgebliche Fassung) — die spanischen Links zeigen darauf. */
export default function Footer({ lang = "de" }: { lang?: Lang }) {
  const t = TEXT[lang];
  const legalLang = lang === "de" ? undefined : "de";

  return (
    <footer className="py-8">
      <div
        className="mx-auto px-7 flex flex-wrap items-center justify-between gap-3.5 mono"
        style={{ maxWidth: 1180, fontSize: 12.5, color: "var(--warm-grey-faint)" }}
      >
        <span className="inline-flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/onyx-ai-logo.png" alt="ONYX.AI" style={{ height: 15, width: "auto" }} />
          © 2026 · Marvin Weiß-Drumm, Landau in der Pfalz
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/impressum" hrefLang={legalLang} className="footer-link">
            {t.impressum}
          </Link>
          <Link href="/datenschutz" hrefLang={legalLang} className="footer-link">
            {t.privacy}
          </Link>
          <Link href="/agb" hrefLang={legalLang} className="footer-link">
            {t.terms}
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("onyx-open-cookie-settings"))}
            className="footer-link"
            style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "inherit", cursor: "pointer" }}
          >
            {t.cookies}
          </button>
          <a href="https://calendly.com/onyx-ai/30min" target="_blank" rel="noopener" className="footer-link">
            {t.booking}
          </a>
        </div>
        {t.legalNote && (
          <span className="w-full" style={{ fontSize: 11, opacity: 0.8 }}>
            {t.legalNote}
          </span>
        )}
      </div>
    </footer>
  );
}
