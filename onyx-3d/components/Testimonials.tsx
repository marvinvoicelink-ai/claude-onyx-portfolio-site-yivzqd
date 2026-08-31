/**
 * Kundenstimmen. BEWUSST leer, bis echte Zitate von echten Onyx-Kunden
 * vorliegen (Name, Rolle/Firma, Zitat, optional Foto). Keine erfundenen
 * Namen oder Logos — das waeren gefaelschte Referenzen. Sobald Marvin echte
 * Stimmen liefert, hier eintragen und die Section in app/page.tsx einhaengen.
 */
type Testimonial = {
  quote: string;
  name: string;
  role: string; // z. B. "Geschäftsführer, HWD Handelsagentur"
  image?: string; // optionaler Pfad zu einem Portrait in /public
};

const testimonials: Testimonial[] = [
  // Beispiel-Form (echte Daten eintragen):
  // {
  //   quote: "Onyx hat uns ein System gebaut, das fünf Tools ersetzt. Läuft, gehört uns.",
  //   name: "Vorname Nachname",
  //   role: "Geschäftsführer, Firma",
  //   image: "/testimonials/person.jpg",
  // },
];

export default function Testimonials({ blatt }: { blatt?: string }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1100 }}>
        <div className="text-center">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Stimmen` : "Stimmen"}
          </span>
          <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch", marginBottom: 34 }}>
            Was <span className="accent">Kunden sagen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-6 md:p-8 on-dark silver-rim text-left"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <svg viewBox="0 0 24 24" fill="var(--amber)" width={26} height={26} style={{ opacity: 0.9, marginBottom: 14 }}>
                <path d="M9 11H5.5a.5.5 0 0 1-.5-.5V7a3 3 0 0 1 3-3h.5a.5.5 0 0 1 0 1H8a2 2 0 0 0-2 2v.5A1.5 1.5 0 0 1 7.5 9H9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3v-1Zm10 0h-3.5a.5.5 0 0 1-.5-.5V7a3 3 0 0 1 3-3h.5a.5.5 0 0 1 0 1H18a2 2 0 0 0-2 2v.5A1.5 1.5 0 0 1 17.5 9H19a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3v-1Z" />
              </svg>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--warm-grey)", marginBottom: 20 }}>
                {t.quote}
              </p>
              <div className="flex items-center gap-3" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {t.image && <img src={t.image} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />}
                <div>
                  <div className="display" style={{ fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.2 }}>{t.name}</div>
                  <div className="mono" style={{ fontSize: 12, color: "var(--warm-grey-dim)", marginTop: 3 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
