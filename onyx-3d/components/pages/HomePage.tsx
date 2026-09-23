import type { Metadata } from "next";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import HomeHero from "@/components/erfassung/HomeHero";
import ErfassungDemo from "@/components/erfassung/ErfassungDemo";
import ErfassungSteps from "@/components/erfassung/ErfassungSteps";
import ErfassungRealCase from "@/components/erfassung/ErfassungRealCase";
import ErfassungBereiche from "@/components/erfassung/ErfassungBereiche";
import ErfassungVideoSection from "@/components/erfassung/ErfassungVideoSection";
import ErfassungSprachen from "@/components/erfassung/ErfassungSprachen";
import ErfassungPreise from "@/components/erfassung/ErfassungPreise";
import { AliveCase, AliveFaq } from "@/components/alive/AliveChrome";
import CTABanner from "@/components/CTABanner";
import Testimonials from "@/components/Testimonials";
import FounderBlock from "@/components/FounderBlock";
import StickyCta from "@/components/StickyCta";
import Footer from "@/components/Footer";
import { alternates, lp, type Lang } from "@/lib/i18n";
import { ERFASSUNG_CTA, ERFASSUNG_FAQ } from "./erfassungShared";

const META: Record<Lang, { title: string; description: string }> = {
  de: {
    title: "Onyx.AI — Vor-Ort-Erfassung für Bau, Handwerk & Immobilien",
    description:
      "Durchs Objekt gehen, sprechen, filmen — Onyx.AI macht daraus Aufmaß, Mängelprotokoll, Exposé und Scroll-Website. Dazu individuelle White-Label-Systeme und KI-Agenten.",
  },
  es: {
    title: "Onyx.AI — Captura in situ para construcción, oficios e inmobiliarias",
    description:
      "Recorre el inmueble, habla y graba: Onyx.AI lo convierte en mediciones, informes de defectos, dossier y web con scroll. Además, sistemas a medida en marca blanca y agentes de IA.",
  },
};

export function homeMetadata(lang: Lang): Metadata {
  return { ...META[lang], alternates: alternates(lang, "/") };
}

const TEXT: Record<
  Lang,
  {
    whoKicker: string;
    whoHeading: string;
    whoBody: string;
    links: { href: string; label: string }[];
    caseTag: string;
    caseHeading: string;
    caseDesc: string;
    caseBullets: string[];
  }
> = {
  de: {
    whoKicker: "Wer wir sind",
    whoHeading: "Onyx.AI baut eigene Systeme — kein Baukasten von der Stange.",
    whoBody:
      "Die Vor-Ort-Erfassung ist ein eigenes System, das wir für Bau, Handwerk und Immobilien gebaut haben — nutzbar, so wie sie ist. Brauchst du stattdessen etwas Individuelles, bauen wir dir dein eigenes System im White-Label, wie schon für andere Kunden. Dazu kommen KI-Telefonagenten und Automatisierungen, die wir ebenfalls im Programm haben.",
    links: [
      { href: "/angebot", label: "Individuelles White-Label-System →" },
      { href: "/ki-agenten", label: "KI-Telefonagenten →" },
      { href: "/automatisierungen", label: "Automatisierungen →" },
    ],
    caseTag: "Kundencase · Hausverwaltung",
    caseHeading: "Vom Excel-Chaos zum eigenen System.",
    caseDesc:
      "Für eine Hausverwaltung haben wir ein komplettes CRM von Grund auf entwickelt und vollständig übergeben. Kein Produkt zum Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen möglich ist.",
    caseBullets: ["Individuelle Prozessanalyse & Konzept", "Vollständige Entwicklung im Onyx-Standard", "Übergabe von Code, Zugängen & Doku"],
  },
  es: {
    whoKicker: "Quiénes somos",
    whoHeading: "Onyx.AI construye sistemas propios, no soluciones de catálogo.",
    whoBody:
      "La captura in situ es un sistema propio que hemos construido para construcción, oficios e inmobiliarias, listo para usar tal cual. Si necesitas algo a medida, te construimos tu propio sistema en marca blanca, como ya hemos hecho para otros clientes. Además, tenemos agentes telefónicos de IA y automatizaciones.",
    links: [
      { href: "/angebot", label: "Sistema propio en marca blanca →" },
      { href: "/ki-agenten", label: "Agentes telefónicos de IA →" },
      { href: "/automatisierungen", label: "Automatizaciones →" },
    ],
    caseTag: "Caso de cliente · Administración de fincas",
    caseHeading: "Del caos de Excel a un sistema propio.",
    caseDesc:
      "Para una administración de fincas desarrollamos desde cero un CRM completo y lo entregamos por completo. No es un producto a la venta, sino un ejemplo de lo que es posible para tu empresa.",
    caseBullets: ["Análisis de procesos y concepto a medida", "Desarrollo completo con el estándar Onyx", "Entrega de código, accesos y documentación"],
  },
};

/**
 * Startseite: komplett auf Bauunternehmer, Bauleiter, Handwerker und
 * Immobilienmakler ausgerichtet, mit der Vor-Ort-Erfassung als
 * Hauptbotschaft — statt der allgemeinen "White-Label für jeden
 * Mittelstandsbetrieb"-Positionierung, die jetzt nur noch auf den
 * Nebenseiten (/angebot, /branchen, ...) steht, weiterhin über die
 * Navigation erreichbar.
 */
export default function HomePage({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const faq = ERFASSUNG_FAQ[lang];
  const cta = ERFASSUNG_CTA[lang];

  return (
    <SmoothScroll>
      <main>
        <HomeHero lang={lang} />
        <ErfassungDemo lang={lang} />
        <ErfassungSteps lang={lang} />
        <ErfassungRealCase lang={lang} />
        <ErfassungBereiche lang={lang} />
        <ErfassungVideoSection lang={lang} />
        <ErfassungSprachen lang={lang} />
        <ErfassungPreise lang={lang} />

        <section className="pt-10 pb-2">
          <div className="mx-auto px-7 text-center" style={{ maxWidth: 700 }}>
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> {t.whoKicker}
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14 }}>{t.whoHeading}</h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 28 }}>{t.whoBody}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {t.links.map((l) => (
                <Link key={l.href} href={lp(lang, l.href)} className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <AliveCase
          tag={t.caseTag}
          name="HausManager Pro"
          heading={t.caseHeading}
          desc={t.caseDesc}
          bullets={t.caseBullets}
          image="/generated/chaos-to-portal.webp"
          logo="/logos/hwp.png"
          imageRight
        />

        {/* Beweis: echte Kundenstimmen, dann Gesicht und Name direkt vor der Bitte. */}
        <Testimonials lang={lang} />
        <FounderBlock lang={lang} variant="objekt" />

        <AliveFaq eyebrow={faq.eyebrow} heading={faq.heading} faqs={faq.items} />

        <CTABanner lang={lang} heading={cta.heading} sub={cta.sub} buttonText={cta.button} source="Schluss-CTA" topic="objekt" />
        <p className="mono text-center" style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginTop: -8, marginBottom: 32 }}>
          {cta.note}
        </p>

        <Footer lang={lang} />

        {/* Handy: Objekt-Anfrage und Infogespräch jederzeit einen Daumen entfernt. */}
        <StickyCta lang={lang} />
      </main>
    </SmoothScroll>
  );
}
