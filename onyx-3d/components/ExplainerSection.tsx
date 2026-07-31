import Image from "next/image";

export default function ExplainerSection() {
  return (
    <section className="py-24" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 mono"
          style={{
            fontSize: 11.5,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--amber)",
            background: "var(--amber-soft)",
            border: "1px solid rgba(232,163,61,0.3)",
          }}
        >
          Erklärt in 60 Sekunden
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 16 }}>
          Wie &bdquo;bauen &amp; übergeben&ldquo; konkret abläuft.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 40, maxWidth: "56ch", marginLeft: "auto", marginRight: "auto" }}>
          Ein kurzer Überblick, bevor wir ins Detail gehen — was White-Label
          bei Onyx bedeutet und warum es sich von klassischer Software
          unterscheidet.
        </p>
      </div>

      <div className="mx-auto px-7" style={{ maxWidth: 680, marginTop: 24 }}>
        <div className="relative flex items-center justify-center" style={{ minHeight: 60 }}>
          {/* Higgsfield light-burst behind the explainer video — distinct from the case-study ring */}
          <div
            aria-hidden
            className="ring-pulse absolute"
            style={{ width: 400, height: 400, maxWidth: "70vw", maxHeight: "70vw" }}
          >
            <Image
              src="/generated/explainer-burst.webp"
              alt=""
              fill
              sizes="640px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div
            className="relative rounded-xl overflow-hidden w-full"
            style={{
              border: "1px solid rgba(232,163,61,0.55)",
              boxShadow: "0 24px 60px -20px rgba(0,0,0,0.65)",
              background: "#000",
            }}
          >
            <video
              controls
              preload="none"
              playsInline
              poster="/assets/explainer-poster.jpg"
              style={{ width: "100%", display: "block", aspectRatio: "16/9" }}
            >
              <source src="/assets/explainer.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
