import type { ReactNode } from "react";
import "@/app/globals.css";
import { fontClassNames } from "@/app/font-config";
import Nav from "@/components/Nav";
import CookieConsent from "@/components/CookieConsent";
import { LANG_DETECT_SCRIPT, type Lang } from "@/lib/i18n";

const SKIP_LINK: Record<Lang, string> = {
  de: "Zum Inhalt springen",
  es: "Saltar al contenido",
};

/** Gemeinsames <html>-Gerüst der beiden Root-Layouts (app/(de) und app/(es)). */
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={fontClassNames}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_DETECT_SCRIPT }} />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <a href="#main-content" className="skip-link">
          {SKIP_LINK[lang]}
        </a>
        <Nav lang={lang} />
        {/* Statisches Duplikat des "contact"-Formulars, damit Netlify das
            Formular samt aller Feldnamen beim Build sicher erkennt — das
            echte Formular (ContactSection) wird clientseitig gerendert. */}
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <textarea name="message" />
          <input type="text" name="language" />
          <input type="text" name="bot-field" />
        </form>
        <div id="main-content">{children}</div>
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
