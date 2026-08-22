import Image from "next/image";

type LogoItem = { name: string; src: string };

const logos: LogoItem[] = [
  { name: "HWP — Haushalt Wirtschaft Plan", src: "/logos/flat/hwp.png" },
  { name: "Rebstöckel", src: "/logos/flat/rebstoeckel.png" },
  { name: "PawPlace", src: "/logos/flat/pawplace.png" },
  { name: "Haas Wasserkraft", src: "/logos/flat/haas-wasserkraft.png" },
  { name: "SpeedFire Design", src: "/logos/flat/speedfire.png" },
  { name: "VoiceLink AI", src: "/logos/flat/voicelink.png" },
  { name: "MGA", src: "/logos/flat/mga.svg" },
  { name: "Mordor Intelligence", src: "/logos/flat/mordor-intelligence.svg" },
  { name: "Buena Vista Crew", src: "/logos/flat/buena-vista-crew.svg" },
  { name: "raum in form", src: "/logos/flat/raum-in-form.svg" },
];

/** Flat, monochrome client-logo strip — no card backgrounds, just logos and slash separators scrolling past. */
const REPEAT = 8;

export default function LogoMarquee() {
  const track = Array.from({ length: REPEAT }, () => logos).flat();
  return (
    <section className="marquee-border-glow on-dark" style={{ background: "var(--near-black)", padding: "38px 0 28px" }}>
      {/* Einordnungssatz direkt ueber den Logos: sagt in einem Satz, was
          Onyx baut, fuer wen und was am Ende damit passiert. Bewusst leicht
          gesetzt, damit er die Headline im Hero nicht doppelt. */}
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 900, marginBottom: 26 }}>
        {/* Statt des Wortes das Logo selbst. Bleibt eine h2, damit die
            Ueberschriften-Struktur der Seite erhalten bleibt — der Name steht
            im alt-Text, fuer Screenreader und Suchmaschinen. */}
        <h2 style={{ marginBottom: 14 }}>
          <Image
            src="/logo/onyx-ai-logo.png"
            alt="ONYX.AI"
            width={1350}
            height={368}
            className="mx-auto"
            style={{ height: "clamp(54px, 9vw, 96px)", width: "auto", display: "block" }}
          />
        </h2>
        <p style={{ fontSize: "clamp(1.02rem, 1.7vw, 1.22rem)", lineHeight: 1.6, color: "var(--warm-grey-dim)" }}>
          Wir bauen maßgeschneiderte Systeme für mittelständische Unternehmen
          — Kundenportale, interne Tools und Dashboards, mit KI und
          Automatisierung von Anfang an.{" "}
          <span className="accent">
            Zugeschnitten auf deinen Ablauf, vollständig übergeben und danach
            dein Eigentum.
          </span>
        </p>
      </div>

      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180, marginBottom: 20 }}>
        <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>
          Unternehmen, die uns vertrauen
        </span>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track-8x flex items-center" style={{ width: "max-content" }}>
          {track.map((item, i) => (
            <div key={i} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.name}
                className="logo-flat"
                style={{
                  height: 26,
                  width: "auto",
                  maxWidth: 130,
                  objectFit: "contain",
                  margin: "0 26px",
                  animationDelay: `${(i % logos.length) * 0.5}s`,
                }}
              />
              <span className="mono" aria-hidden style={{ fontSize: 16, color: "var(--hairline)" }}>
                /
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
