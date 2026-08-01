import Image from "next/image";

export default function ExplainerSection() {
  return (
    <section className="py-14">
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

      <div className="mx-auto px-7" style={{ maxWidth: 480, marginTop: 200 }}>
        <div className="relative flex items-center justify-center" style={{ minHeight: 60 }}>
          {/* Higgsfield light-burst behind the explainer video — distinct from the case-study ring */}
          <div
            aria-hidden
            className="ring-pulse absolute"
            style={{
              width: 640,
              height: 640,
              maxWidth: "100vw",
              maxHeight: "100vw",
              WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 68%)",
              maskImage: "radial-gradient(circle, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 68%)",
            }}
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
            className="relative rounded-2xl w-full"
            style={{
              padding: 10,
              background: "var(--near-black)",
              boxShadow: "0 24px 60px -20px rgba(0,0,0,0.65)",
            }}
          >
            <div
              className="relative rounded-xl overflow-hidden w-full"
              style={{
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
      </div>
    </section>
  );
}
