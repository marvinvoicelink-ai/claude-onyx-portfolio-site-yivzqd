import Image from "next/image";

const diffs = [
  "Kein CRM von der Stange — dein System wird nach deinem Prozess gebaut, nicht umgekehrt.",
  "Du besitzt Code und Daten — vollständig.",
  "Du hostest auf deiner eigenen Infrastruktur.",
  "Nach der Übergabe bist du unabhängig. Kein Lock-in.",
];

export default function DifferentiationSection() {
  return (
    <section className="py-24" style={{ borderTop: "1px solid var(--hairline)" }}>
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
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "56ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 18 }}>
          Wir sind keine 08/15-CRM-Firma, die dir ein fertiges Produkt
          verkauft und erwartet, dass du deine Prozesse daran anpasst. Bei
          uns ist es umgekehrt: Wir bauen dein System um deinen Prozess
          herum — mit genau den Funktionen, die dein Geschäft braucht, ohne
          den Ballast, den es nicht braucht.
        </p>

        <div className="flex items-center gap-3.5 mb-12">
          <Image
            src="/assets/marvin-portrait.jpg"
            alt="Marvin Weiß-Drumm, Gründer von Onyx.AI"
            width={52}
            height={52}
            className="rounded-full object-cover"
            style={{ border: "1px solid rgba(232,163,61,0.45)", boxShadow: "0 0 20px -6px rgba(232,163,61,0.4)" }}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Marvin Weiß-Drumm</div>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--warm-grey-faint)", marginTop: 2 }}>
              Gründer, Onyx.AI
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diffs.map((d, i) => (
            <div
              key={d}
              className="flex gap-4 rounded-2xl p-7"
              style={{ border: "1px solid rgba(232,163,61,0.3)", background: "var(--near-black-2)" }}
            >
              <span className="mono" style={{ fontSize: 13, color: "var(--amber)", paddingTop: 2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: "1rem", color: "var(--warm-grey)", fontWeight: 500, lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
