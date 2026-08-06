type LogoItem = { name: string; src: string };

const logos: LogoItem[] = [
  { name: "HWP — Haushalt Wirtschaft Plan", src: "/logos/flat/hwp.png" },
  { name: "Rebstöckel", src: "/logos/flat/rebstoeckel.png" },
  { name: "PawPlace", src: "/logos/flat/pawplace.png" },
  { name: "Haas Wasserkraft", src: "/logos/flat/haas-wasserkraft.png" },
  { name: "SpeedFire Design", src: "/logos/flat/speedfire.png" },
  { name: "VoiceLink AI", src: "/logos/flat/voicelink.png" },
];

/** Flat, monochrome client-logo strip — no card backgrounds, just logos and slash separators scrolling past. */
const REPEAT = 8;

export default function LogoMarquee() {
  const track = Array.from({ length: REPEAT }, () => logos).flat();
  return (
    <section className="marquee-border-glow" style={{ background: "var(--near-black)", padding: "28px 0" }}>
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
