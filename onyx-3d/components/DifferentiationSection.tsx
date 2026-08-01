import Image from "next/image";

const diffs = [
  { image: "/generated/diff-01.webp", alt: "Kein CRM von der Stange. Dein System wird nach deinem Prozess gebaut." },
  { image: "/generated/diff-02.webp", alt: "Volles Eigentum. Du besitzt Code und Daten - vollständig." },
  { image: "/generated/diff-03.webp", alt: "Deine Infrastruktur. Du hostest auf deinem eigenen Server." },
  { image: "/generated/diff-04.webp", alt: "Kein Lock-in. Nach der Übergabe bist du unabhängig." },
];

export default function DifferentiationSection() {
  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 05 / Abgrenzung
        </span>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.1rem)", lineHeight: 1.05, marginBottom: 20 }}>
          Dein Zugang.
          <br />
          Deine Regeln.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "56ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 32 }}>
          Wir sind keine 08/15-CRM-Firma, die dir ein fertiges Produkt
          verkauft und erwartet, dass du deine Prozesse daran anpasst. Bei
          uns ist es umgekehrt: Wir bauen dein System um deinen Prozess
          herum — mit genau den Funktionen, die dein Geschäft braucht, ohne
          den Ballast, den es nicht braucht.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diffs.map((d) => (
            <div
              key={d.image}
              className="rounded-2xl"
              style={{ boxShadow: "0 0 40px -20px rgba(232,163,61,0.25)" }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--near-black-2)" }}>
                <Image
                  src={d.image}
                  alt={d.alt}
                  width={1200}
                  height={900}
                  className="w-full h-auto block"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
