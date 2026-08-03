export type LogoItem = { name: string; src: string; bg?: "light" | "dark" };

const logos: LogoItem[] = [
  { name: "HWP — Haushalt Wirtschaft Plan", src: "/logos/hwp.png", bg: "light" },
  { name: "Rebstöckel", src: "/logos/rebstoeckel.png", bg: "light" },
  { name: "PawPlace", src: "/logos/pawplace.png", bg: "light" },
  { name: "Haas Wasserkraft", src: "/logos/haas-wasserkraft.png", bg: "light" },
  { name: "SpeedFire Design", src: "/logos/speedfire.png", bg: "dark" },
  { name: "VoiceLink AI", src: "/logos/voicelink.png", bg: "dark" },
];

/** Client-logo strip directly under the hero: infinite scroll, each logo pops toward the viewer on hover. */
export default function LogoMarquee() {
  const track = [...logos, ...logos];
  return (
    <section
      style={{
        background: "var(--near-black-2)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
        padding: "26px 0",
      }}
    >
      <div className="overflow-hidden alive-logo-perspective">
        <div className="marquee-track flex items-center" style={{ width: "max-content" }}>
          {track.map((item, i) => {
            const light = (item.bg ?? "light") === "light";
            return (
              <div
                key={i}
                className="alive-logo-card flex items-center justify-center mx-3.5 rounded-2xl"
                style={{
                  width: 168,
                  height: 92,
                  padding: "16px 22px",
                  background: light ? "var(--warm-grey)" : "var(--near-black)",
                  border: light ? "1px solid rgba(22,17,4,0.08)" : "1px solid var(--hairline)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
