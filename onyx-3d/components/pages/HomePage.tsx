import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import HomeHero from "@/components/erfassung/HomeHero";
import AngebotSection from "@/components/erfassung/AngebotSection";
import ImmoAnzeigen from "@/components/erfassung/ImmoAnzeigen";
import ReferenzQuina from "@/components/erfassung/ReferenzQuina";
import ErfassungRealCase from "@/components/erfassung/ErfassungRealCase";
import ImmoAblauf from "@/components/erfassung/ImmoAblauf";
import ImmoPakete from "@/components/erfassung/ImmoPakete";
import { AliveFaq } from "@/components/alive/AliveChrome";
import CTABanner from "@/components/CTABanner";
import FounderBlock from "@/components/FounderBlock";
import StickyCta from "@/components/StickyCta";
import Footer from "@/components/Footer";
import { alternates, type Lang } from "@/lib/i18n";
import { IMMO_CTA, IMMO_FAQ } from "./immoShared";

const META: Record<Lang, { title: string; description: string }> = {
  de: {
    title: "ONYX Studio — Objekte komplett zeigen, für Makler & Bauträger",
    description:
      "Andere zeigen Bilder, wir zeigen komplette Begehungen: vom Rohbau bis fertig eingerichtet, auf einer eigenen Website, durch die Käufer am Handy gehen und alle Daten sehen. Unsere Videos machen Facebook- und Instagram-Anzeigen sehenswert – für mehr Anfragen und mehr Verkäufe.",
  },
  es: {
    title: "ONYX Studio — Inmuebles mostrados por completo, para agencias y promotoras",
    description:
      "Otros muestran imágenes, nosotros recorridos completos: de la obra a la vivienda amueblada, en una web propia que los compradores recorren desde el móvil con todos los datos. Nuestros vídeos hacen que los anuncios en Facebook e Instagram se miren de verdad: más solicitudes y más ventas.",
  },
};

export function homeMetadata(lang: Lang): Metadata {
  return { ...META[lang], alternates: alternates(lang, "/") };
}

/**
 * Startseite nach der Positionierung vom 21./22.11.2026 (siehe CLAUDE.md,
 * Kernbotschaft Immobilien): Objekt komplett zeigen, 3D-Website zum
 * Durchgehen, Anzeigen, die man anschaut - und warum das mehr Anfragen bringt.
 * Die Vor-Ort-Erfassung und die White-Label-Angebote stehen weiter auf ihren
 * Unterseiten (/vor-ort-erfassung, /angebot, ...), erreichbar über das Menü.
 */
export default function HomePage({ lang }: { lang: Lang }) {
  const faq = IMMO_FAQ[lang];
  const cta = IMMO_CTA[lang];

  return (
    <SmoothScroll>
      <main>
        <HomeHero lang={lang} />
        <AngebotSection lang={lang} />
        <ImmoAnzeigen lang={lang} />
        <ReferenzQuina lang={lang} />
        <ErfassungRealCase lang={lang} />
        <ImmoAblauf lang={lang} />
        <ImmoPakete lang={lang} />
        <FounderBlock lang={lang} variant="objekt" immo />

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
