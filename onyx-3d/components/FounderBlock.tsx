"use client";

import Image from "next/image";
import { openContactForm } from "@/lib/contactModal";
import { trackWhatsAppClick } from "@/lib/trackLead";

const WHATSAPP_HREF =
  "https://wa.me/4917632273522?text=Hallo%20Marvin%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20kostenlose%20Demo%20von%20Onyx.";

/**
 * Wer dahinter steckt. Bei einem Einzelunternehmen, das an den Mittelstand
 * verkauft, ist die Person der groesste Vertrauenshebel: der Leser will
 * wissen, mit wem er redet, bevor er ein Formular ausfuellt. Deshalb steht
 * der Block direkt vor dem Demo-Formular — Gesicht, Name, Ort, dann die
 * Bitte. Alle Angaben sind echt (Impressum), kein Team, kein Buero-Stockfoto.
 */
export default function FounderBlock() {
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
                alt="Marvin Weiß-Drumm, Gründer von Onyx.AI"
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
                <span style={{ opacity: 0.7 }}>§</span> Wer dahinter steckt
              </span>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", lineHeight: 1.1, marginBottom: 14, maxWidth: "18ch" }}>
                Kein Account-Manager, <span className="accent">direkt zum Chef</span>
              </h2>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.04rem", lineHeight: 1.75, marginBottom: 12, maxWidth: "50ch" }}>
                Ich bin Marvin Weiß-Drumm, Gründer von Onyx.AI aus Landau in der
                Pfalz. Ich baue die Systeme selbst — vom ersten Gespräch bis zur
                Übergabe redest du mit dem, der den Code schreibt. Nicht mit
                einem Vertrieb, der dich danach weiterreicht.
              </p>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.04rem", lineHeight: 1.75, marginBottom: 12, maxWidth: "50ch" }}>
                Ich habe zu oft gesehen, wie Betriebe an fünf Tools hängen, die
                nicht zusammenpassen, und an einem Anbieter, den sie nicht
                loswerden. Deshalb baue ich anders: ein System nach deinem
                Ablauf, das ich dir vollständig übergebe. Code, Daten, alles
                deins. Danach brauchst du mich nicht mehr — und genau das ist
                der Punkt.
              </p>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.04rem", lineHeight: 1.75, marginBottom: 24, maxWidth: "50ch" }}>
                Trag dich ein, und ich melde mich persönlich. Kein
                Verkaufsgespräch, kein Foliensatz — du bekommst eine Demo, die
                zu deinem Betrieb passt, und entscheidest dann.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openContactForm("Gruender-CTA")}
                  className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 font-semibold btn-amber"
                  style={{ background: "var(--amber)", color: "#12141a", fontSize: 15 }}
                >
                  Kostenlose Demo sichern
                </button>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener"
                  onClick={trackWhatsAppClick}
                  className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 font-semibold btn-ghost"
                  style={{ border: "1px solid var(--hairline)", color: "var(--warm-grey)", fontSize: 15 }}
                >
                  Direkt auf WhatsApp schreiben
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
