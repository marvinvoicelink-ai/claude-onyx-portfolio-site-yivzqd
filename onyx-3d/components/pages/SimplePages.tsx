import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import DifferentiatorsDetail from "@/components/DifferentiatorsDetail";
import ProblemsDetail from "@/components/ProblemsDetail";
import RoadmapSection from "@/components/RoadmapSection";
import ContactSection from "@/components/ContactSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import { alternates, type Lang } from "@/lib/i18n";
import PageIntro, { IntroText } from "./PageIntro";

/* Die kurzen Unterseiten (FAQ, Für dich, Kontakt, Problem) in beiden Sprachen. */

type Meta = { title: string; description: string };

const FAQ: Record<Lang, { meta: Meta; kicker: string; title: string; intro: string }> = {
  de: {
    meta: { title: "FAQ — Onyx.AI", description: "Häufige Fragen zu White-Label-Systemen von Onyx.AI." },
    kicker: "Fragen & Antworten",
    title: "Häufige Fragen.",
    intro: "Die häufigsten Fragen zu Preis, Ablauf und Datenschutz — kurz und ehrlich beantwortet.",
  },
  es: {
    meta: { title: "Preguntas frecuentes — Onyx.AI", description: "Preguntas frecuentes sobre los sistemas en marca blanca de Onyx.AI." },
    kicker: "Preguntas y respuestas",
    title: "Preguntas frecuentes.",
    intro: "Las preguntas más habituales sobre precio, proceso y protección de datos, respondidas de forma breve y honesta.",
  },
};

export function faqMetadata(lang: Lang): Metadata {
  return { ...FAQ[lang].meta, alternates: alternates(lang, "/faq") };
}

export function FaqPage({ lang }: { lang: Lang }) {
  const t = FAQ[lang];
  return (
    <main>
      <PageIntro kicker={t.kicker} title={t.title}>
        <IntroText>{t.intro}</IntroText>
      </PageIntro>
      <FAQSection lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

export const CTA_SYSTEM: Record<Lang, { heading: string; sub: string; button: string }> = {
  de: {
    heading: "Dein System, gebaut für genau dein Geschäft.",
    sub: "Kein Baukasten, kein Abo — ein System, das dir gehört.",
    button: "Kostenloses Erstgespräch sichern",
  },
  es: {
    heading: "Tu sistema, construido para tu negocio.",
    sub: "Sin plantillas ni suscripciones: un sistema que es tuyo.",
    button: "Reservar primera conversación gratuita",
  },
};

const FUER_DICH: Record<Lang, { meta: Meta; kicker: string; title: string; intro: string }> = {
  de: {
    meta: {
      title: "Was wir für dich tun können — Onyx.AI",
      description: "Kein CRM von der Stange, kein Lock-in — was du bekommst, wenn Onyx.AI dein System baut.",
    },
    kicker: "Für dich",
    title: "Was wir für dich tun können.",
    intro: "Kein Baukasten, keine Abhängigkeit — so unterscheidet sich ein System von Onyx von dem, was du sonst bekommst.",
  },
  es: {
    meta: {
      title: "Lo que podemos hacer por ti — Onyx.AI",
      description: "Ni un CRM de catálogo ni dependencia del proveedor: esto es lo que recibes cuando Onyx.AI construye tu sistema.",
    },
    kicker: "Para ti",
    title: "Lo que podemos hacer por ti.",
    intro: "Sin plantillas y sin dependencias: así se diferencia un sistema de Onyx de lo que sueles encontrar.",
  },
};

export function fuerDichMetadata(lang: Lang): Metadata {
  return { ...FUER_DICH[lang].meta, alternates: alternates(lang, "/fuer-dich") };
}

export function FuerDichPage({ lang }: { lang: Lang }) {
  const t = FUER_DICH[lang];
  const cta = CTA_SYSTEM[lang];
  return (
    <main>
      <PageIntro kicker={t.kicker} title={t.title}>
        <IntroText>{t.intro}</IntroText>
      </PageIntro>
      <DifferentiatorsDetail lang={lang} />
      <CTABanner lang={lang} heading={cta.heading} sub={cta.sub} buttonText={cta.button} />
      <Footer lang={lang} />
    </main>
  );
}

const KONTAKT: Record<Lang, { meta: Meta; kicker: string; title: string }> = {
  de: {
    meta: { title: "Kontakt — Onyx.AI", description: "Kontakt zu Onyx.AI aufnehmen — Formular, Infogespräch oder Termin buchen." },
    kicker: "Kontakt",
    title: "Reden wir über dein System.",
  },
  es: {
    meta: { title: "Contacto — Onyx.AI", description: "Ponte en contacto con Onyx.AI: formulario, llamada informativa o reserva de cita." },
    kicker: "Contacto",
    title: "Hablemos de tu sistema.",
  },
};

export function kontaktMetadata(lang: Lang): Metadata {
  return { ...KONTAKT[lang].meta, alternates: alternates(lang, "/kontakt") };
}

export function KontaktPage({ lang }: { lang: Lang }) {
  const t = KONTAKT[lang];
  return (
    <main>
      <PageIntro kicker={t.kicker} title={t.title} />
      <RoadmapSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

const PROBLEM: Record<
  Lang,
  { meta: Meta; kicker: string; title: string; intro: string; closing: string; closingAccent: string; ctaHeading: string; ctaSub: string }
> = {
  de: {
    meta: {
      title: "Problem — Onyx.AI",
      description: "Mehrere Tools, fehlende Funktionen, fremde Server, Abhängigkeit vom Anbieter — kommt dir das bekannt vor?",
    },
    kicker: "Problem",
    title: "Kommt dir das bekannt vor?",
    intro: "Die typische Ausgangslage, bevor Unternehmen sich für ein eigenes, maßgeschneidertes System entscheiden.",
    closing: "Ein System sollte dich nicht ausbremsen, sondern dich voranbringen — ",
    closingAccent: "genau solche Systeme bauen wir.",
    ctaHeading: "Erkennst du dein Unternehmen in diesen Problemen wieder?",
    ctaSub: "Lass uns in einem kurzen Gespräch klären, was für dich der größte Hebel wäre.",
  },
  es: {
    meta: {
      title: "El problema — Onyx.AI",
      description: "Varias herramientas, funciones que faltan, servidores ajenos, dependencia del proveedor: ¿te suena?",
    },
    kicker: "El problema",
    title: "¿Te suena de algo?",
    intro: "La situación típica antes de que una empresa se decida por un sistema propio y a medida.",
    closing: "Un sistema no debería frenarte, sino hacerte avanzar: ",
    closingAccent: "justo esos sistemas son los que construimos.",
    ctaHeading: "¿Reconoces tu empresa en estos problemas?",
    ctaSub: "Veamos en una conversación breve dónde está para ti la mayor palanca.",
  },
};

export function problemMetadata(lang: Lang): Metadata {
  return { ...PROBLEM[lang].meta, alternates: alternates(lang, "/problem") };
}

export function ProblemPage({ lang }: { lang: Lang }) {
  const t = PROBLEM[lang];
  return (
    <main>
      <PageIntro kicker={t.kicker} title={t.title}>
        <IntroText>{t.intro}</IntroText>
      </PageIntro>

      <ProblemsDetail lang={lang} />

      <section className="py-14">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 700 }}>
          <p style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)", fontWeight: 700, lineHeight: 1.4 }}>
            {t.closing}
            <span className="accent">{t.closingAccent}</span>
          </p>
        </div>
      </section>

      <CTABanner lang={lang} heading={t.ctaHeading} sub={t.ctaSub} />
      <Footer lang={lang} />
    </main>
  );
}
