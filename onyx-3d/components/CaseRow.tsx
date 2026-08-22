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
  /** Zahlen, wenn es welche gibt. */
  facts?: { value: string; label: string }[];
  /** Kurze Stichpunkte fuer Faelle ohne belastbare Zahlen — bewusst keine
      erfundenen Kennzahlen nur der Optik wegen. */
  points?: string[];
  image: string;
  imageAlt: string;
  imageRight?: boolean;
  href?: string;
  /** Aus, wenn das Bild die Zahlen schon selbst zeigt — sonst stehen sie doppelt. */
  factsOverlay?: boolean;
};

export default function CaseRow({
  logo,
  name,
  tag,
  heading,
  text,
  facts,
  points,
  image,
  imageAlt,
  imageRight = true,
  href = "/referenzen",
  factsOverlay = true,
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

        {/* Die Kennzahlen liegen im Bild, sind aber echter Text und kein
            eingebrannter Pixelinhalt: so bleiben sie scharf, vorlesbar,
            durchsuchbar und aenderbar, ohne das Bild neu zu erzeugen.
            Der Verlauf darunter haelt sie auf jedem Motiv lesbar. */}
        {factsOverlay && (facts || points) && (
        <div
          className="absolute inset-x-0 bottom-0 px-4 pt-12 pb-4 sm:px-5 sm:pb-5"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.8) 42%, rgba(8,8,8,0) 100%)",
          }}
        >
          {facts ? (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {facts.map((f) => (
                <div key={f.label}>
                  <div
                    className="mono"
                    style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", color: "var(--amber)", lineHeight: 1.15 }}
                  >
                    {f.value}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(245,242,236,0.8)", lineHeight: 1.3 }}>
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {(points ?? []).map((pt) => (
                <span
                  key={pt}
                  className="inline-flex items-center gap-1.5"
                  style={{ fontSize: "0.82rem", color: "rgba(245,242,236,0.88)", lineHeight: 1.35 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" width={13} height={13} style={{ flexShrink: 0 }}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {pt}
                </span>
              ))}
            </div>
          )}
        </div>
        )}
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

      <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.65, maxWidth: "48ch", marginBottom: 22 }}>
        {text}
      </p>

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
