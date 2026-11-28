import type { Metadata } from "next";
import "./globals.css";
import { fontClassNames } from "./font-config";

export const metadata: Metadata = {
  title: "Seite nicht gefunden · Página no encontrada — Onyx.AI",
};

const btn = {
  background: "var(--amber)",
  color: "#161104",
  fontSize: "15.5px",
} as const;

/** 404 für beide Sprachen — die Seite weiß nicht, aus welcher Sprachfassung der Link kam. */
export default function GlobalNotFound() {
  return (
    <html lang="de" className={fontClassNames}>
      <body>
        <main className="flex items-center justify-center" style={{ minHeight: "100vh" }}>
          <div className="mx-auto px-7 text-center" style={{ maxWidth: 520 }}>
            <span
              className="mono block mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              404
            </span>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14 }}>Diese Seite gibt es nicht.</h1>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 28 }}>
              Der Link ist entweder veraltet oder falsch getippt.
            </p>
            <p lang="es" style={{ color: "var(--warm-grey-faint)", fontSize: "0.98rem", lineHeight: 1.7, marginBottom: 32 }}>
              Esta página no existe. El enlace está desactualizado o mal escrito.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/" className="inline-flex items-center rounded-[10px] px-6 py-4 font-semibold btn-amber" style={btn}>
                Zur Startseite
              </a>
              <a
                href="/es"
                lang="es"
                className="inline-flex items-center rounded-[10px] px-6 py-4 font-semibold btn-ghost"
                style={{ color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: "15.5px" }}
              >
                Ir a la página de inicio
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
