import Image from "next/image";

export default function IndustriesSection() {
  return (
    <section className="py-24" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 04 / Vergleich
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "26ch", marginBottom: 32 }}>
          Mit uns oder wie bisher — der Unterschied auf einen Blick.
        </h2>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(232,163,61,0.3)" }}
        >
          <Image
            src="/generated/comparison.webp"
            alt="Mit Onyx: Dein Prozess statt Vorlage, volles Eigentum an Code und Daten, eigene Infrastruktur DSGVO-konform, kein Lock-in nach der Übergabe. Mit deinen aktuellen Tools: passt nie ganz zum Prozess, Daten bei fremden Anbietern, wiederkehrende Abo-Kosten, abhängig vom Anbieter."
            width={1600}
            height={903}
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}
