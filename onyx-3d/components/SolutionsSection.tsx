import Image from "next/image";

const solutions = [
  { image: "/generated/solution-01.webp", alt: "Kundenportale. Status, Dokumente und Termine selbst einsehen." },
  { image: "/generated/solution-02.webp", alt: "Interne Tools. Aus Excel und Zetteln wird ein eigenes System." },
  { image: "/generated/solution-03.webp", alt: "Dashboards & Auswertungen. Alle Zahlen an einem Ort, live und verständlich." },
  { image: "/generated/solution-04.webp", alt: "Automatisierung & KI-Agenten. Mails, Reports und Erinnerungen laufen automatisch." },
  { image: "/generated/solution-05.webp", alt: "Termin- & Ressourcenplanung. Kalender und Kapazitäten in einem System." },
  { image: "/generated/solution-06.webp", alt: "Dokumenten- & Datenverwaltung. Eine zentrale Ablage statt Ordner-Chaos." },
];

export default function SolutionsSection() {
  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 03 / Bauteile
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "22ch", marginBottom: 14 }}>
          Ein System, jeder Bereich, den du brauchst.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 44 }}>
          Kein Baukasten mit festen Modulen. Was dein System am Ende abdeckt,
          richtet sich nach deinem Prozess — hier ein Überblick, wo
          maßgeschneiderte Systeme typischerweise ansetzen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div
              key={s.image}
              className="rounded-2xl"
              style={{ boxShadow: "0 0 40px -20px rgba(232,163,61,0.25)" }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--near-black-2)" }}>
                <Image
                  src={s.image}
                  alt={s.alt}
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
