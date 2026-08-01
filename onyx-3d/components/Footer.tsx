import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div
        className="mx-auto px-7 flex flex-wrap items-center justify-between gap-3.5 mono"
        style={{ maxWidth: 1180, fontSize: 12.5, color: "var(--warm-grey-faint)" }}
      >
        <span>© 2026 Onyx.AI — Marvin Weiß-Drumm, Landau in der Pfalz</span>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <a href="https://calendly.com/onyx-ai/30min" target="_blank" rel="noopener">
            Termin buchen
          </a>
        </div>
      </div>
    </footer>
  );
}
