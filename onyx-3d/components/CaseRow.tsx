import Image from "next/image";
import Link from "next/link";

/**
 * Referenz in einer Zeile: Logo oben, Text in der Mitte, Bild an der Seite.
 *
 * Loest die beiden grossen Case-Bloecke auf der Startseite ab. Die
 * ausfuehrliche Fassung mit Video, Zitat und Kennzahlenraster steht
 * weiterhin auf /referenzen — hier zaehlt, dass man beide Faelle in einem
 * Bildschirm erfassen kann, statt zweimal durchzuscrollen.
 *
 * Die Seiten wechseln von Fall zu Fall (imageRight), damit die Reihe nicht
 * wie eine Liste wirkt.
 */
export type CaseRowProps = {
  logo: string;
  name: string;
  tag: string;
  heading: string;
  text: string;
  facts: { value: string; label: string }[];
  image: string;
  imageAlt: string;
  imageRight?: boolean;
  href?: string;
};

export default function CaseRow({
  logo,
  name,
  tag,
  heading,
  text,
  facts,
  image,
  imageAlt,
  imageRight = true,
  href = "/referenzen",
}: CaseRowProps) {
  const media = (
    <div
      /* Am Handy steht das Bild immer unter dem Text, egal auf welcher Seite
         es am Desktop sitzt — sonst faengt der zweite Fall mit einem Bild an
         und das Logo taucht erst darunter auf. Getauscht wird erst ab lg. */
      className={`rounded-2xl overflow-hidden on-dark silver-rim ${imageRight ? "" : "lg:order-first"}`}
      style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
    >
      <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 520px, 92vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );

  const body = (
    <div className="text-left">
      {/* Logos sind in ihren Originalfarben gebaut; auf Schwarz werden sie
          hier einheitlich weiss gezogen, damit die Reihe ruhig bleibt. */}
      <Image
        src={logo}
        alt={name}
        width={200}
        height={60}
        className="mb-5"
        style={{
          // Die Kundenlogos sind unterschiedlich fein gezeichnet; HWP ist
          // eine duenne Linienzeichnung und verschwindet unter ~30px.
          height: 32,
          width: "auto",
          maxWidth: 190,
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
          opacity: 1,
        }}
      />

      <span
        className="mono block mb-3"
        style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
      >
        {tag}
      </span>

      <h3 style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)", marginBottom: 12, maxWidth: "24ch" }}>
        {heading}
      </h3>

      <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "48ch", marginBottom: 20 }}>
        {text}
      </p>

      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6">
        {facts.map((f) => (
          <div key={f.label}>
            <div className="mono" style={{ fontSize: "1.15rem", color: "var(--amber)", lineHeight: 1.2 }}>
              {f.value}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--warm-grey-faint)" }}>{f.label}</div>
          </div>
        ))}
      </div>

      <Link href={href} className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
        Fall im Detail ansehen →
      </Link>
    </div>
  );

  return (
    <section className="py-8">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {body}
          {media}
        </div>
      </div>
    </section>
  );
}
