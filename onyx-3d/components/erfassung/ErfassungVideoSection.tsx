import type { Lang } from "@/lib/i18n";

const TEXT: Record<Lang, { kicker: string; heading: string; body: string; aria: string; badge: string }> = {
  de: {
    kicker: "Video statt Fotomarathon",
    heading: "Film den Rundgang. Nicht jeden Raum aus zwölf Winkeln.",
    body: "Das Video ist das Hauptmaterial. Du gehst so durch das Objekt, wie du es ohnehin tun würdest, und erklärst dabei die wichtigen Punkte. Einzelne Fotos bleiben die Ausnahme für Situationen, in denen sie zusätzlichen Nutzen bringen.",
    aria: "Rundgang durch einen Rohbau, Handy in der Hand",
    badge: "Symbolbild",
  },
  es: {
    kicker: "Vídeo en lugar de maratón de fotos",
    heading: "Graba el recorrido. No cada estancia desde doce ángulos.",
    body: "El vídeo es el material principal. Recorres el inmueble como lo harías de todos modos y vas explicando los puntos importantes. Las fotos sueltas quedan para los casos en los que realmente aportan algo.",
    aria: "Recorrido por una obra en construcción con el móvil en la mano",
    badge: "Imagen ilustrativa",
  },
};

/** KI-generiertes Stimmungsvideo (Higgsfield), als "Symbolbild" gekennzeichnet — zeigt bewusst keine App-Oberfläche, um keine Funktionen vorzutäuschen. */
export default function ErfassungVideoSection({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section className="py-14" style={{ background: "var(--near-black-2)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 18, maxWidth: "20ch" }}>{t.heading}</h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, maxWidth: "50ch" }}>{t.body}</p>
          </div>

          <div
            className="beam-border rounded-2xl overflow-hidden relative"
            style={{ aspectRatio: "16 / 9", background: "var(--near-black)" }}
          >
            <video
              src="/generated/rundgang-baustelle.mp4"
              poster="/generated/rundgang-baustelle-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-label={t.aria}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <span
              className="mono absolute"
              style={{ left: 12, bottom: 10, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,242,236,0.7)", background: "rgba(17,17,17,0.55)", padding: "3px 8px", borderRadius: 6, zIndex: 3 }}
            >
              {t.badge}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
