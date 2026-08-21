import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Über mich — Onyx.AI",
  description: "Das Team hinter Onyx.AI — die Menschen, die dein System bauen.",
};

const team = [
  {
    name: "Marvin Weiß-Drumm",
    role: "CEO & Head of AI and Automations",
    image: "/assets/marvin-portrait.jpg",
  },
  {
    name: "Jennifer",
    role: "Support",
    image: "/assets/team/jennifer.jpg",
  },
  {
    name: "Jonas",
    role: "Programmierer",
    image: "/assets/team/jonas.jpg",
  },
  {
    name: "Tim",
    role: "Programmierer",
    image: "/assets/team/tim.jpg",
  },
];

export default function UeberMichPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Über uns
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>
            Die Menschen hinter Onyx.AI.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Kein anonymes Team, keine Warteschlange — die Menschen, die dein
            System konzipieren, bauen und dir übergeben.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div
            className="rounded-2xl px-7 py-8 md:px-10 md:py-10 on-dark silver-rim"
            style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
          >
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> Die Agentur
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", maxWidth: "24ch", marginBottom: 18 }}>
              Angefangen hat es mit einer ziemlich banalen Beobachtung.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 14 }}>
                  Onyx.AI gibt es seit rund vier Jahren. Der Auslöser war
                  nichts Großes: In fast jedem Unternehmen, in das wir
                  hineingeschaut haben, ging Zeit an Stellen verloren, die
                  niemand für besonders wichtig hielt. Angebote, die jemand
                  von Hand zusammensucht. Zahlen, die jeden Monat neu aus drei
                  Tabellen entstehen. Anrufe, die niemand annimmt, weil alle
                  im Tagesgeschäft stecken.
                </p>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75 }}>
                  Daraus wurde das Ziel, das bis heute gilt: Unternehmen die
                  Arbeit leichter machen. Nicht mit einem Produkt, das für
                  alle passen soll, sondern mit dem, was im einzelnen Betrieb
                  wirklich hakt.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {[
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
                ].map((p) => (
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

            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginTop: 22, maxWidth: "72ch" }}>
              Gearbeitet wird von Landau in der Pfalz aus, mit einem kleinen
              Team und ohne Zwischenschicht: Wer anfragt, spricht mit dem
              Gründer und nicht mit einem Support-Postfach.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 700 }}>
          <p style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)", fontWeight: 700, lineHeight: 1.4 }}>
            Ein eigenes System spart Kosten. Ein eigenes System ohne KI spart
            nur ein paar Jahre lang —{" "}
            <span className="accent">danach zieht der Wettbewerb vorbei, der längst automatisiert hat.</span>
          </p>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginTop: 20 }}>
            Deshalb bauen wir KI und Automatisierung nicht als Extra ein,
            sondern von Anfang an in jedes System, das wir für dich
            entwickeln.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div
          className="mx-auto px-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ maxWidth: 1180 }}
        >
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl"
              style={{ boxShadow: "0 0 60px -10px rgba(203, 203, 201,0.4)" }}
            >
              <div className="rounded-2xl overflow-hidden on-dark silver-rim" style={{ background: "var(--near-black-2)" }}>
                <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 90vw, 280px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <div className="p-5 text-center">
                  <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{m.name}</div>
                  <div className="mono" style={{ fontSize: 12.5, color: "var(--amber)", marginTop: 4 }}>
                    {m.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
