import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AliveInvertedStatement, AliveTeamGrid, AliveCtaBand } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Test Über mich — Onyx.AI",
  robots: { index: false, follow: false },
};

const team = [
  { name: "Marvin Weiß-Drumm", role: "CEO & Head of AI and Automations", image: "/assets/marvin-portrait.jpg" },
  { name: "Jennifer", role: "Support", image: "/assets/team/jennifer.jpg" },
  { name: "Jonas", role: "Programmierer", image: "/assets/team/jonas.jpg" },
  { name: "Tim", role: "Programmierer", image: "/assets/team/tim.jpg" },
];

export default function TestAliveUeberMichPage() {
  return (
    <main>
      <section className="py-24 pt-40 text-center">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <span className="mono block mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
            Über uns
          </span>
          <h1 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.05, marginBottom: 16 }}>
            Die Menschen hinter Onyx.AI.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Kein anonymes Team, keine Warteschlange — die Menschen, die dein System konzipieren, bauen und dir übergeben.
          </p>
        </div>
      </section>

      <AliveInvertedStatement
        eyebrow="Warum Onyx"
        statement="Ein eigenes System spart Kosten. Ein eigenes System ohne KI spart nur ein paar Jahre lang —"
        highlight="danach zieht der Wettbewerb vorbei, der längst automatisiert hat."
        sub="Deshalb bauen wir KI und Automatisierung nicht als Extra ein, sondern von Anfang an in jedes System, das wir für dich entwickeln."
      />

      <AliveTeamGrid eyebrow="Team" heading="Wer dein System baut." team={team} />

      <AliveCtaBand heading="Lern uns kennen." sub="Ein kurzes Gespräch, keine Verkaufsshow." />

      <Footer />
    </main>
  );
}
