import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AutomatisierungenDetail from "@/components/AutomatisierungenDetail";
import KiAgentenDetail from "@/components/KiAgentenDetail";
import GlowCard from "@/components/GlowCard";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import { AliveCase } from "@/components/alive/AliveChrome";
import { alternates, lp, type Lang } from "@/lib/i18n";
import PageIntro, { IntroText } from "./PageIntro";
import { CTA_SYSTEM } from "./SimplePages";

/* /automatisierungen und /ki-agenten in beiden Sprachen. */

type Meta = { title: string; description: string };

const AUTO: Record<
  Lang,
  {
    meta: Meta;
    kicker: string;
    title: string;
    intro: string;
    imageAlt: string;
    boxHeading: string;
    boxBody: string;
    more: string;
    moreLink: string;
    ctaHeading: string;
    ctaSub: string;
    ctaButton: string;
  }
> = {
  de: {
    meta: {
      title: "Automatisierungen — Onyx.AI",
      description:
        "Software-Automatisierungen für deinen Betrieb: Angebotserstellung, Rechnungen, Dokumentenerkennung und KI-Agenten, die auch in deinem bestehenden ERP oder CRM mitarbeiten.",
    },
    kicker: "Automatisierung & KI",
    title: "Software-Automatisierungen für deinen Betrieb.",
    intro:
      "Teil von Automatisierung & KI-Agenten, einem der Bausteine, die wir dir bauen. Wir automatisieren die Arbeit, die in deinem Betrieb täglich Zeit frisst — von der Angebotserstellung über Rechnungen und Dokumentenerkennung bis zur Kommunikation. Und das nicht nur in einem neuen System: Unsere KI-Agenten setzen wir genauso gerne in das ein, was du bereits nutzt.",
    imageAlt: "Automatisierung: Aus eingehenden Dokumenten entstehen automatisch Angebote, Bestätigungen und Rechnungen",
    boxHeading: "Dein bestehendes System bleibt, wo es ist.",
    boxBody:
      "Wenn du bereits ein ERP, ein CRM, eine Warenwirtschaft oder ein Branchenprogramm im Einsatz hast, musst du dafür nichts ablösen. Wir setzen unsere KI-Agenten und Automatisierungen über die vorhandenen Schnittstellen direkt in dieses System hinein — dein Team arbeitet weiter in der Oberfläche, die es kennt, und die Arbeit dahinter läuft von selbst. Wie jedes andere System bei uns: im White-Label gebaut, vollständig an dich übergeben, auf deiner Infrastruktur.",
    more:
      "Und vieles mehr: Das hier sind die Bereiche, nach denen am häufigsten gefragt wird — gebaut wird am Ende immer das, was in deinem Betrieb tatsächlich Zeit kostet. Sag uns, welcher Ablauf bei dir hakt, und wir schauen uns an, ob er sich automatisieren lässt.",
    moreLink: "Mehr über unsere KI-Telefonagenten →",
    ctaHeading: "Welcher Ablauf kostet dich am meisten Zeit?",
    ctaSub: "Sag uns, wo es hakt — wir sagen dir, ob sich das automatisieren lässt.",
    ctaButton: "Kostenloses Erstgespräch sichern",
  },
  es: {
    meta: {
      title: "Automatizaciones — Onyx.AI",
      description:
        "Automatizaciones de software para tu empresa: presupuestos, facturas, reconocimiento de documentos y agentes de IA que también trabajan dentro de tu ERP o CRM actual.",
    },
    kicker: "Automatización e IA",
    title: "Automatizaciones de software para tu empresa.",
    intro:
      "Forma parte de Automatización y agentes de IA, uno de los módulos que construimos para ti. Automatizamos el trabajo que cada día te quita tiempo: desde los presupuestos y las facturas hasta el reconocimiento de documentos y la comunicación. Y no solo en un sistema nuevo: nuestros agentes de IA también los integramos en lo que ya utilizas.",
    imageAlt: "Automatización: a partir de los documentos entrantes se generan presupuestos, confirmaciones y facturas",
    boxHeading: "Tu sistema actual se queda donde está.",
    boxBody:
      "Si ya usas un ERP, un CRM, un programa de gestión de stock o un software del sector, no tienes que sustituir nada. Integramos nuestros agentes de IA y automatizaciones directamente en ese sistema a través de las interfaces existentes: tu equipo sigue trabajando en la pantalla que ya conoce y el trabajo de fondo se hace solo. Como cualquier otro sistema nuestro: construido en marca blanca, entregado por completo, en tu propia infraestructura.",
    more:
      "Y mucho más: estas son las áreas por las que más se pregunta, pero al final se construye lo que de verdad cuesta tiempo en tu empresa. Dinos qué proceso se atasca y vemos si se puede automatizar.",
    moreLink: "Más sobre nuestros agentes telefónicos de IA →",
    ctaHeading: "¿Qué proceso te cuesta más tiempo?",
    ctaSub: "Dinos dónde se atasca y te decimos si se puede automatizar.",
    ctaButton: "Reservar primera conversación gratuita",
  },
};

export function automatisierungenMetadata(lang: Lang): Metadata {
  return { ...AUTO[lang].meta, alternates: alternates(lang, "/automatisierungen") };
}

export function AutomatisierungenPage({ lang }: { lang: Lang }) {
  const t = AUTO[lang];
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <span
                className="mono block mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                {t.kicker}
              </span>
              <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 18, maxWidth: "18ch" }}>{t.title}</h1>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "58ch" }}>{t.intro}</p>
            </div>

            <GlowCard>
              <Image
                src="/generated/automatisierung.webp"
                alt={t.imageAlt}
                width={1200}
                height={896}
                priority
                className="w-full h-auto block rounded-xl"
                style={{ maxWidth: "88%" }}
              />
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div
            className="rounded-2xl px-7 py-7 md:px-10 md:py-8"
            style={{ background: "var(--amber-soft)", border: "1px solid rgba(232, 163, 61,0.3)" }}
          >
            <h2 style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.55rem)", marginBottom: 10 }}>{t.boxHeading}</h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "72ch" }}>{t.boxBody}</p>
          </div>
        </div>
      </section>

      <AutomatisierungenDetail lang={lang} />

      <section className="py-6">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>{t.more}</p>
          <div className="mt-6">
            <Link href={lp(lang, "/ki-agenten")} className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
              {t.moreLink}
            </Link>
          </div>
        </div>
      </section>

      <CTABanner lang={lang} heading={t.ctaHeading} sub={t.ctaSub} buttonText={t.ctaButton} />
      <Footer lang={lang} />
    </main>
  );
}

const KI: Record<
  Lang,
  {
    meta: Meta;
    kicker: string;
    title: string;
    intro: string;
    autoLink: string;
    refKicker: string;
    refHeading: string;
    caseTag: string;
    caseHeading: string;
    caseDesc: string;
    caseBullets: string[];
    allRefs: string;
  }
> = {
  de: {
    meta: {
      title: "KI-Agenten — Onyx.AI",
      description: "Drei KI-Agenten, die für dich telefonieren: Anrufe entgegennehmen, Termine buchen, aktiv nachfragen.",
    },
    kicker: "KI-Agenten",
    title: "Drei Agenten, die für dich telefonieren.",
    intro:
      "Teil von Automatisierung & KI-Agenten, einem der Bausteine, die wir dir bauen — genauso im White-Label, genauso vollständig übergeben wie jedes andere System. Jeder Agent übernimmt Telefonarbeit, die bisher bei dir oder deinem Team hängen geblieben ist, sobald niemand abnehmen konnte.",
    autoLink: "Auch ohne Telefon: unsere Software-Automatisierungen →",
    refKicker: "Referenz",
    refHeading: "Kein Konzept — bereits gebaut und im Einsatz.",
    caseTag: "Kundencase · KI-Agentur",
    caseHeading: "KI-Telefonagenten aufgebaut statt nur beraten.",
    caseDesc:
      "VoiceLink AI ist selbst eine KI-Agentur — für Solarunternehmen. Wir haben für sie die KI-Agenten komplett aufgebaut und bei der Einführung bei ihren Unternehmen unterstützt.",
    caseBullets: [
      "KI-Voice-Agenten für Solarunternehmen komplett aufgebaut",
      "Unterstützung bei Einrichtung & Einführung beim Endkunden",
      "Skalierbare Basis statt Einzellösung pro Kunde",
    ],
    allRefs: "Alle Referenzen ansehen →",
  },
  es: {
    meta: {
      title: "Agentes de IA — Onyx.AI",
      description: "Tres agentes de IA que llaman por ti: atienden llamadas, reservan citas y hacen seguimiento activo.",
    },
    kicker: "Agentes de IA",
    title: "Tres agentes que llaman por ti.",
    intro:
      "Forma parte de Automatización y agentes de IA, uno de los módulos que construimos para ti: igual en marca blanca e igual de entregado por completo que cualquier otro sistema. Cada agente se encarga del trabajo telefónico que hasta ahora se quedaba en ti o en tu equipo cuando nadie podía atender.",
    autoLink: "También sin teléfono: nuestras automatizaciones de software →",
    refKicker: "Referencia",
    refHeading: "No es un concepto: ya está construido y en uso.",
    caseTag: "Caso de cliente · Agencia de IA",
    caseHeading: "Agentes telefónicos de IA construidos, no solo recomendados.",
    caseDesc:
      "VoiceLink AI es a su vez una agencia de IA para empresas solares. Les construimos los agentes de IA por completo y les ayudamos a implantarlos en sus empresas clientes.",
    caseBullets: [
      "Agentes de voz con IA para empresas solares, construidos por completo",
      "Apoyo en la configuración y la implantación en el cliente final",
      "Una base escalable en lugar de una solución suelta por cliente",
    ],
    allRefs: "Ver todas las referencias →",
  },
};

export function kiAgentenMetadata(lang: Lang): Metadata {
  return { ...KI[lang].meta, alternates: alternates(lang, "/ki-agenten") };
}

export function KiAgentenPage({ lang }: { lang: Lang }) {
  const t = KI[lang];
  const cta = CTA_SYSTEM[lang];
  return (
    <main>
      <PageIntro kicker={t.kicker} title={t.title}>
        <IntroText>{t.intro}</IntroText>
        <div className="mt-6">
          <Link href={lp(lang, "/automatisierungen")} className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
            {t.autoLink}
          </Link>
        </div>
      </PageIntro>

      <KiAgentenDetail lang={lang} />

      <section className="py-6">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            {t.refKicker}
          </span>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.8rem)" }}>{t.refHeading}</h2>
        </div>
      </section>

      <AliveCase
        tag={t.caseTag}
        name="VoiceLink AI"
        heading={t.caseHeading}
        desc={t.caseDesc}
        bullets={t.caseBullets}
        image="/generated/voicelink-case.png"
        logo="/logos/voicelink.png"
        logoBg="dark"
      />

      <div className="text-center" style={{ marginTop: -24, marginBottom: 24 }}>
        <Link href={lp(lang, "/referenzen")} className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
          {t.allRefs}
        </Link>
      </div>

      <CTABanner lang={lang} heading={cta.heading} sub={cta.sub} buttonText={cta.button} />
      <Footer lang={lang} />
    </main>
  );
}
