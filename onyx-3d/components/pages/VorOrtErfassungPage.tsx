import type { Metadata } from "next";
import ErfassungHero from "@/components/erfassung/ErfassungHero";
import ErfassungDemo from "@/components/erfassung/ErfassungDemo";
import ErfassungSteps from "@/components/erfassung/ErfassungSteps";
import ErfassungRealCase from "@/components/erfassung/ErfassungRealCase";
import ErfassungBereiche from "@/components/erfassung/ErfassungBereiche";
import ErfassungVideoSection from "@/components/erfassung/ErfassungVideoSection";
import ErfassungSprachen from "@/components/erfassung/ErfassungSprachen";
import ErfassungPreise from "@/components/erfassung/ErfassungPreise";
import { AliveFaq } from "@/components/alive/AliveChrome";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { alternates, type Lang } from "@/lib/i18n";
import { ERFASSUNG_CTA, ERFASSUNG_FAQ } from "./erfassungShared";

const META: Record<Lang, { title: string; description: string }> = {
  de: {
    title: "Vor-Ort-Erfassung — Onyx.AI",
    description:
      "Räume, Maße und Mängel direkt vor Ort einsprechen und filmen — Onyx.AI strukturiert die Angaben, erstellt eine schematische Zeichnung und baut daraus Baudokumentation, Aufmaß, Exposé oder Scroll-Website.",
  },
  es: {
    title: "Captura in situ — Onyx.AI",
    description:
      "Dicta y graba en el lugar las estancias, medidas y defectos: Onyx.AI ordena los datos, dibuja un esquema y prepara con ello la documentación de obra, las mediciones, el dossier o la web con scroll.",
  },
};

export function vorOrtErfassungMetadata(lang: Lang): Metadata {
  return { ...META[lang], alternates: alternates(lang, "/vor-ort-erfassung") };
}

export default function VorOrtErfassungPage({ lang }: { lang: Lang }) {
  const faq = ERFASSUNG_FAQ[lang];
  const cta = ERFASSUNG_CTA[lang];
  return (
    <main>
      <ErfassungHero lang={lang} />
      <ErfassungDemo lang={lang} />
      <ErfassungSteps lang={lang} />
      <ErfassungRealCase lang={lang} />
      <ErfassungBereiche lang={lang} />
      <ErfassungVideoSection lang={lang} />
      <ErfassungSprachen lang={lang} />
      <ErfassungPreise lang={lang} />

      <AliveFaq eyebrow={faq.eyebrow} heading={faq.heading} faqs={faq.items} />

      <CTABanner lang={lang} heading={cta.heading} sub={cta.sub} buttonText={cta.button} source="Erfassung-Schluss-CTA" topic="objekt" />
      <p className="mono text-center" style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginTop: -8, marginBottom: 32 }}>
        {cta.note}
      </p>

      <Footer lang={lang} />
      <StickyCta lang={lang} />
    </main>
  );
}
