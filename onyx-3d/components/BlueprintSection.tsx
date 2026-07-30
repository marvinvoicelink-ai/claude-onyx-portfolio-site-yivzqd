import Image from "next/image";

export default function BlueprintSection() {
  return (
    <section
      className="py-24"
      style={{ borderTop: "1px solid var(--hairline)" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{
            fontSize: 11.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--amber)",
          }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 01 / Aufbau
        </span>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.3rem)",
            maxWidth: "22ch",
            marginBottom: 14,
          }}
        >
          Kein Baukasten mit festen Modulen.
        </h2>
        <p
          className="mb-12"
          style={{
            color: "var(--warm-grey-dim)",
            maxWidth: "62ch",
            fontSize: "1.02rem",
            lineHeight: 1.7,
          }}
        >
          Kundenportal, Dashboard, Automatisierung, Dokumentenverwaltung —
          was am Ende dazugehört, entscheidet dein Prozess. Alles läuft in
          einem System zusammen, das genau für dich gebaut ist.
        </p>

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--hairline)", maxWidth: 820 }}
        >
          <Image
            src="/generated/system-blueprint.png"
            alt="Schema: Kundenportal und Dashboard verbinden sich zu deinem System, das Automatisierung und Dokumentenverwaltung steuert"
            width={1200}
            height={896}
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}
