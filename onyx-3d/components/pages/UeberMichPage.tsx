import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import { alternates, type Lang } from "@/lib/i18n";
import PageIntro, { IntroText } from "./PageIntro";

const TEAM = [
  { name: "Marvin Weiß-Drumm", role: { de: "CEO & Head of AI and Automations", es: "CEO & Head of AI and Automations" }, image: "/assets/marvin-portrait.jpg" },
  { name: "Jennifer", role: { de: "Support", es: "Soporte" }, image: "/assets/team/jennifer.jpg" },
  { name: "Jonas", role: { de: "Programmierer", es: "Programador" }, image: "/assets/team/jonas.jpg" },
  { name: "Tim", role: { de: "Programmierer", es: "Programador" }, image: "/assets/team/tim.jpg" },
];

const TEXT: Record<
  Lang,
  {
    meta: { title: string; description: string };
    kicker: string;
    title: string;
    intro: string;
    agencyKicker: string;
    agencyHeading: string;
    agencyP1: string;
    agencyP2: string;
    points: { t: string; d: string }[];
    agencyP3: string;
    closing: string;
    closingAccent: string;
    closingSub: string;
  }
> = {
  de: {
    meta: { title: "Über mich — Onyx.AI", description: "Das Team hinter Onyx.AI — die Menschen, die dein System bauen." },
    kicker: "Über uns",
    title: "Die Menschen hinter Onyx.AI.",
    intro: "Kein anonymes Team, keine Warteschlange — die Menschen, die dein System konzipieren, bauen und dir übergeben.",
    agencyKicker: "Die Agentur",
    agencyHeading: "Angefangen hat es mit einer ziemlich banalen Beobachtung.",
    agencyP1:
      "Onyx.AI gibt es seit rund vier Jahren. Der Auslöser war nichts Großes: In fast jedem Unternehmen, in das wir hineingeschaut haben, ging Zeit an Stellen verloren, die niemand für besonders wichtig hielt. Angebote, die jemand von Hand zusammensucht. Zahlen, die jeden Monat neu aus drei Tabellen entstehen. Anrufe, die niemand annimmt, weil alle im Tagesgeschäft stecken.",
    agencyP2:
      "Daraus wurde das Ziel, das bis heute gilt: Unternehmen die Arbeit leichter machen. Nicht mit einem Produkt, das für alle passen soll, sondern mit dem, was im einzelnen Betrieb wirklich hakt.",
    points: [
      {
        t: "Eigene Systeme statt Standardsoftware",
        d: "Dashboards, Portale und interne Tools, gebaut nach dem Ablauf des Unternehmens statt nach einer Vorlage.",
      },
      {
        t: "KI-Agenten, die wirklich mitarbeiten",
        d: "Agenten gehen ans Telefon, buchen Termine und fassen nach. Auch in dem System, das der Kunde schon nutzt.",
      },
      {
        t: "Automatisierung dort, wo sie zählt",
        d: "Angebote, Rechnungen, Dokumentenerkennung und die Übergaben zwischen Programmen, die sonst Copy-Paste sind.",
      },
      {
        t: "Übergabe statt Abhängigkeit",
        d: "Am Ende gehören Code, Daten und Zugänge dem Kunden. Gehostet wird bei ihm, nicht bei uns.",
      },
    ],
    agencyP3:
      "Gearbeitet wird von Landau in der Pfalz aus, mit einem kleinen Team und ohne Zwischenschicht: Wer anfragt, spricht mit dem Gründer und nicht mit einem Support-Postfach.",
    closing: "Ein eigenes System spart Kosten. Ein eigenes System ohne KI spart nur ein paar Jahre lang — ",
    closingAccent: "danach zieht der Wettbewerb vorbei, der längst automatisiert hat.",
    closingSub:
      "Deshalb bauen wir KI und Automatisierung nicht als Extra ein, sondern von Anfang an in jedes System, das wir für dich entwickeln.",
  },
  es: {
    meta: { title: "Nosotros — Onyx.AI", description: "El equipo detrás de Onyx.AI: las personas que construyen tu sistema." },
    kicker: "Nosotros",
    title: "Las personas detrás de Onyx.AI.",
    intro: "Ni un equipo anónimo ni colas de espera: las personas que diseñan tu sistema, lo construyen y te lo entregan.",
    agencyKicker: "La agencia",
    agencyHeading: "Todo empezó con una observación bastante simple.",
    agencyP1:
      "Onyx.AI existe desde hace unos cuatro años. El detonante no fue nada grande: en casi todas las empresas en las que mirábamos por dentro se perdía tiempo en lugares que nadie consideraba especialmente importantes. Presupuestos que alguien monta a mano. Cifras que cada mes salen de nuevo de tres hojas de cálculo. Llamadas que nadie atiende porque todos están con el día a día.",
    agencyP2:
      "De ahí salió el objetivo que sigue vigente: hacer el trabajo más fácil a las empresas. No con un producto que tenga que servir para todos, sino con lo que de verdad se atasca en cada empresa.",
    points: [
      {
        t: "Sistemas propios en lugar de software estándar",
        d: "Paneles, portales y herramientas internas construidos según el proceso de la empresa, no según una plantilla.",
      },
      {
        t: "Agentes de IA que de verdad colaboran",
        d: "Los agentes atienden el teléfono, reservan citas y hacen seguimiento. También dentro del sistema que el cliente ya usa.",
      },
      {
        t: "Automatización donde cuenta",
        d: "Presupuestos, facturas, reconocimiento de documentos y los traspasos entre programas que, si no, son copiar y pegar.",
      },
      {
        t: "Entrega en lugar de dependencia",
        d: "Al final, el código, los datos y los accesos son del cliente. Se aloja en su casa, no en la nuestra.",
      },
    ],
    agencyP3:
      "Trabajamos desde Landau in der Pfalz (Alemania), con un equipo pequeño y sin intermediarios: quien nos escribe habla con el fundador, no con un buzón de soporte.",
    closing: "Un sistema propio ahorra costes. Un sistema propio sin IA solo ahorra durante unos años: ",
    closingAccent: "después te adelanta la competencia que ya ha automatizado.",
    closingSub:
      "Por eso no añadimos la IA y la automatización como un extra, sino que las integramos desde el principio en cada sistema que desarrollamos para ti.",
  },
};

export function ueberMichMetadata(lang: Lang): Metadata {
  return { ...TEXT[lang].meta, alternates: alternates(lang, "/ueber-mich") };
}

export default function UeberMichPage({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <main>
      <PageIntro kicker={t.kicker} title={t.title}>
        <IntroText>{t.intro}</IntroText>
      </PageIntro>

      <section className="py-10">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div
            className="rounded-2xl px-7 py-8 md:px-10 md:py-10"
            style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
          >
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> {t.agencyKicker}
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", maxWidth: "24ch", marginBottom: 18 }}>{t.agencyHeading}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 14 }}>{t.agencyP1}</p>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75 }}>{t.agencyP2}</p>
              </div>

              <div className="flex flex-col gap-3">
                {t.points.map((p) => (
                  <div key={p.t} className="flex gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={17} height={17} style={{ flexShrink: 0, marginTop: 4 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 2 }}>{p.t}</div>
                      <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.96rem", lineHeight: 1.6 }}>{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginTop: 22, maxWidth: "72ch" }}>{t.agencyP3}</p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 700 }}>
          <p style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)", fontWeight: 700, lineHeight: 1.4 }}>
            {t.closing}
            <span className="accent">{t.closingAccent}</span>
          </p>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginTop: 20 }}>{t.closingSub}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto px-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ maxWidth: 1180 }}>
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-2xl" style={{ boxShadow: "0 0 60px -10px rgba(232, 163, 61,0.45)" }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--near-black-2)" }}>
                <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                  <Image src={m.image} alt={m.name} fill sizes="(max-width: 640px) 90vw, 280px" style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>
                <div className="p-5 text-center">
                  <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{m.name}</div>
                  <div className="mono" style={{ fontSize: 12.5, color: "var(--amber)", marginTop: 4 }}>
                    {m.role[lang]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
