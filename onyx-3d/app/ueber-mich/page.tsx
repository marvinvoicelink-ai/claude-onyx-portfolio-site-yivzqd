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

      <section className="py-14">
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
              style={{ boxShadow: "0 0 60px -10px rgba(232,163,61,0.45)" }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--near-black-2)" }}>
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
