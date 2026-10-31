"use client";

import Image from "next/image";
import { openContactForm } from "@/lib/contactModal";
import type { ContactTopic } from "@/lib/contactModal";
import type { Lang } from "@/lib/i18n";

type Variant = Extract<ContactTopic, "objekt" | "demo">;

const TEXT: Record<
  Lang,
  {
    kicker: string;
    heading: [string, string];
    alt: string;
    p1: string;
    p2: string;
    p3: Record<Variant, string>;
    cta: Record<Variant, string>;
    info: string;
  }
> = {
  de: {
    kicker: "Wer dahinter steckt",
    heading: ["Kein Account-Manager, ", "direkt zum Chef"],
    alt: "Marvin Weiß-Drumm, Gründer von Onyx.AI",
    p1: "Ich bin Marvin Weiß-Drumm, Gründer von Onyx.AI aus Landau in der Pfalz. Ich baue die Systeme selbst — vom ersten Gespräch bis zur Übergabe redest du mit dem, der den Code schreibt. Nicht mit einem Vertrieb, der dich danach weiterreicht.",
    p2: "Ich habe zu oft gesehen, wie Betriebe an fünf Tools hängen, die nicht zusammenpassen, und an einem Anbieter, den sie nicht loswerden. Deshalb baue ich anders: ein System nach deinem Ablauf, das ich dir vollständig übergebe. Code, Daten, alles deins. Danach brauchst du mich nicht mehr — und genau das ist der Punkt.",
    p3: {
      objekt:
        "Schreib mir, und ich melde mich persönlich. Kein Verkaufsgespräch, kein Foliensatz — wir probieren die Vor-Ort-Erfassung an einem deiner echten Objekte aus, und du entscheidest dann.",
      demo: "Trag dich ein, und ich melde mich persönlich. Kein Verkaufsgespräch, kein Foliensatz — du bekommst eine Demo, die zu deinem Betrieb passt, und entscheidest dann.",
    },
    cta: { objekt: "Objekt ausprobieren", demo: "Kostenlose Demo sichern" },
    info: "Infogespräch vereinbaren",
  },
  es: {
    kicker: "Quién está detrás",
    heading: ["Sin gestores de cuenta: ", "hablas con el jefe"],
    alt: "Marvin Weiß-Drumm, fundador de Onyx.AI",
    p1: "Soy Marvin Weiß-Drumm, fundador de Onyx.AI, desde Landau in der Pfalz (Alemania). Construyo los sistemas yo mismo: desde la primera conversación hasta la entrega hablas con quien escribe el código, no con un comercial que luego te pasa a otro.",
    p2: "He visto demasiadas veces empresas atadas a cinco herramientas que no encajan entre sí y a un proveedor del que no se pueden librar. Por eso trabajo de otra manera: un sistema según tu proceso, que te entrego por completo. Código, datos, todo tuyo. Después ya no me necesitas, y de eso se trata.",
    p3: {
      objekt:
        "Escríbeme y te contacto personalmente. Sin discursos de venta ni presentaciones: probamos la captura in situ en uno de tus inmuebles reales y después decides.",
      demo: "Apúntate y te contacto personalmente. Sin discursos de venta ni presentaciones: recibes una demo adaptada a tu empresa y después decides.",
    },
    cta: { objekt: "Probar con un inmueble", demo: "Conseguir demo gratuita" },
    info: "Reservar llamada informativa",
  },
};

/**
 * Wer dahinter steckt. Bei einem Einzelunternehmen, das an den Mittelstand
 * verkauft, ist die Person der groesste Vertrauenshebel: der Leser will
 * wissen, mit wem er redet, bevor er ein Formular ausfuellt. Deshalb steht
 * der Block direkt vor dem Demo-Formular — Gesicht, Name, Ort, dann die
 * Bitte. Alle Angaben sind echt (Impressum), kein Team, kein Buero-Stockfoto.
 */
export default function FounderBlock({ lang = "de", variant = "objekt" }: { lang?: Lang; variant?: Variant }) {
  const t = TEXT[lang];
  const pStyle = { color: "var(--warm-grey-dim)", fontSize: "1.04rem", lineHeight: 1.75, marginBottom: 12, maxWidth: "50ch" } as const;
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1100 }}>
        <div
          className="rounded-[28px] p-6 md:p-10 on-dark beam-border"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--silver-line)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] gap-7 md:gap-12 items-center">
            <div
              className="relative rounded-2xl overflow-hidden mx-auto md:mx-0"
              style={{ width: "100%", maxWidth: 320, aspectRatio: "4 / 5", border: "1px solid var(--hairline)" }}
            >
              <Image
                src="/assets/marvin-portrait.jpg"
                alt={t.alt}
                fill
                sizes="(min-width: 768px) 320px, 80vw"
                style={{ objectFit: "cover", objectPosition: "50% 12%" }}
              />
            </div>

            <div className="text-left">
              <span
                className="mono inline-flex items-center gap-2 mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
              </span>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", lineHeight: 1.1, marginBottom: 14, maxWidth: "18ch" }}>
                {t.heading[0]}
                <span className="accent">{t.heading[1]}</span>
              </h2>
              <p style={pStyle}>{t.p1}</p>
              <p style={pStyle}>{t.p2}</p>
              <p style={{ ...pStyle, marginBottom: 24 }}>{t.p3[variant]}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openContactForm("Gruender-CTA", variant)}
                  className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 font-semibold btn-amber"
                  style={{ background: "var(--amber)", color: "#12141a", fontSize: 15 }}
                >
                  {t.cta[variant]}
                </button>
                <button
                  type="button"
                  onClick={() => openContactForm("Gruender-Infogespraech", "info")}
                  className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 font-semibold btn-ghost"
                  style={{ border: "1px solid var(--hairline)", color: "var(--warm-grey)", fontSize: 15, background: "transparent" }}
                >
                  {t.info}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
