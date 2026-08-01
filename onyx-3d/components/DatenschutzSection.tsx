import DatenschutzContent from "./DatenschutzContent";

export default function DatenschutzSection() {
  return (
    <section id="datenschutz" className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
        <span
          className="mono block mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          Rechtliches
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 24 }}>Datenschutzerklärung</h2>
        <div className="legal-content">
          <DatenschutzContent />
        </div>
      </div>
    </section>
  );
}
