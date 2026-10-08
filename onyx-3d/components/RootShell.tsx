import type { ReactNode } from "react";
import "@/app/globals.css";
import { fontClassNames } from "@/app/font-config";
import Nav from "@/components/Nav";
import CookieConsent from "@/components/CookieConsent";
import ContactModal from "@/components/ContactModal";
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
          <input type="text" name="anliegen" />
          <input type="text" name="quelle" />
          <input type="text" name="erreichbar" />
          <input type="text" name="bot-field" />
        </form>
        {/* Eigenes Netlify-Formular für die Demo-Anmeldung (DemoSignupSection),
            damit Demo-Eintragungen getrennt von Kontaktanfragen ankommen. */}
        <form name="demo" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="company" />
          <textarea name="message" />
          <input type="text" name="language" />
          <input type="text" name="bot-field" />
        </form>
        <div id="main-content">{children}</div>
        {/* Ein Kontakt-Formular-Overlay, das jeder CTA-Button seitenweit öffnet (openContactForm). */}
        <ContactModal lang={lang} />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
