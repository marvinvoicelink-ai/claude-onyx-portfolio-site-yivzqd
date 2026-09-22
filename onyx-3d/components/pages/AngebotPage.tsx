import type { Metadata } from "next";
import Link from "next/link";
import OfferingsList from "@/components/OfferingsList";
import IndustriesSection from "@/components/IndustriesSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import { alternates, lp, type Lang } from "@/lib/i18n";
import PageIntro, { IntroText } from "./PageIntro";

const TEXT: Record<
  Lang,
  {
    meta: { title: string; description: string };
    kicker: string;
    title: string;
    intro: string;
    note: string;
    noteLink: string;
    ctaHeading: string;
    ctaSub: string;
    ctaButton: string;
  }
> = {
  de: {
    meta: {
      title: "Angebot — Onyx.AI",
      description:
        "Die sechs Bausteine, aus denen wir Systeme bauen: Kundenportale, interne Tools, Dashboards, Automatisierung, Terminplanung und Dokumentenverwaltung.",
    },
    kicker: "Angebot",
    title: "Was wir bauen. Und für wen.",
    intro:
      "Sechs Bausteine, aus denen wir Systeme zusammensetzen. Kein Betrieb braucht alle. Welche es bei dir werden, entscheidet dein Prozess. Klick auf einen Baustein, dann siehst du im Detail, was dahintersteckt.",
    note: "Daneben gibt es die Vor-Ort-Erfassung: kein weiterer Baustein, den wir für dich bauen, sondern ein eigener, pro Objekt abgerechneter Bereich für Bau, Handwerk und Immobilien.",
    noteLink: "Mehr zur Vor-Ort-Erfassung →",
    ctaHeading: "Welcher Baustein passt zu deinem Betrieb?",
    ctaSub: "Im Erstgespräch sortieren wir das gemeinsam, kostenlos und unverbindlich.",
    ctaButton: "Kostenloses Erstgespräch sichern",
  },
  es: {
    meta: {
      title: "Servicios — Onyx.AI",
      description:
        "Los seis módulos con los que construimos sistemas: portales de clientes, herramientas internas, paneles, automatización, planificación de citas y gestión de documentos.",
    },
    kicker: "Servicios",
    title: "Lo que construimos. Y para quién.",
    intro:
      "Seis módulos con los que montamos sistemas. Ninguna empresa los necesita todos. Cuáles serán los tuyos lo decide tu proceso. Haz clic en un módulo y verás en detalle qué hay detrás.",
    note: "Además está la captura in situ: no es otro módulo que construimos para ti, sino un servicio propio, facturado por inmueble, para construcción, oficios e inmobiliarias.",
    noteLink: "Más sobre la captura in situ →",
    ctaHeading: "¿Qué módulo encaja en tu empresa?",
    ctaSub: "Lo vemos juntos en la primera conversación, gratis y sin compromiso.",
    ctaButton: "Reservar primera conversación gratuita",
  },
};

export function angebotMetadata(lang: Lang): Metadata {
  return { ...TEXT[lang].meta, alternates: alternates(lang, "/angebot") };
}

export default function AngebotPage({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <main>
      <PageIntro kicker={t.kicker} title={t.title}>
        <IntroText>{t.intro}</IntroText>
      </PageIntro>

      <OfferingsList lang={lang} />

      <section className="py-6">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>{t.note}</p>
          <div className="mt-6">
            <Link href={lp(lang, "/vor-ort-erfassung")} className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
              {t.noteLink}
            </Link>
          </div>
        </div>
      </section>

      <IndustriesSection lang={lang} />

      <CTABanner lang={lang} heading={t.ctaHeading} sub={t.ctaSub} buttonText={t.ctaButton} />

      <Footer lang={lang} />
    </main>
  );
}
