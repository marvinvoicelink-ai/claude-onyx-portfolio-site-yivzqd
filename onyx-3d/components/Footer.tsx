"use client";

import Link from "next/link";

export default function Footer() {
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
          <Link href="/impressum" className="footer-link">
            Impressum
          </Link>
          <Link href="/datenschutz" className="footer-link">
            Datenschutz
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("onyx-open-cookie-settings"))}
            className="footer-link"
            style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "inherit", cursor: "pointer" }}
          >
            Cookie-Einstellungen
          </button>
          <a href="https://calendly.com/onyx-ai/30min" target="_blank" rel="noopener" className="footer-link">
            Termin buchen
          </a>
        </div>
      </div>
    </footer>
  );
}
