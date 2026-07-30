export default function CTABanner({
  heading,
  sub,
  buttonText = "Jetzt Kontakt aufnehmen",
}: {
  heading: string;
  sub?: string;
  buttonText?: string;
}) {
  return (
    <section className="py-16" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-2xl px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            border: "1px solid rgba(232,163,61,0.3)",
            background:
              "linear-gradient(135deg, var(--near-black-2) 0%, var(--near-black) 100%)",
          }}
        >
          <div className="text-center md:text-left">
            <h3 style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)", marginBottom: sub ? 6 : 0 }}>
              {heading}
            </h3>
            {sub && (
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.98rem" }}>{sub}</p>
            )}
          </div>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold whitespace-nowrap"
            style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
              <path d="M4 6h16v12H4z" fill="none" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
