"use client";

import { useState } from "react";
import { trackLead, trackWhatsAppClick, trackCalendlyClick } from "@/lib/trackLead";
import DemoSlotsBadge from "./DemoSlotsBadge";

/**
 * Frueh auf der Seite, direkt hinter dem Hero: das Angebot einer kostenlosen,
 * auf den Betrieb zugeschnittenen Demo. Wer sich eintraegt, bekommt ein
 * laufendes System zu seinem Bereich gezeigt — dafuer brauchen wir vorher ein
 * paar Angaben (Name, Kontakt, Branche, worum es geht).
 *
 * Eigenes Netlify-Formular ("demo"), getrennt von der allgemeinen
 * Kontaktanfrage ("contact"), damit die Demo-Eintragungen bei Netlify separat
 * ankommen. Der Lead feuert erst, wenn Netlify die Absendung angenommen hat
 * (res.ok) — ein abgebrochener Versuch zaehlt nicht (siehe lib/trackLead.ts).
 */
export default function DemoSignupSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("bot-field")) return;

    const encoded = new URLSearchParams();
    data.forEach((value, key) => encoded.append(key, String(value)));

    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded.toString(),
      });
      if (res.ok) {
        trackLead("Demo-Anmeldung");
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="demo" className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] on-dark beam-border"
          style={{
            background: "var(--near-black-2)",
            border: "1px solid var(--silver-line)",
          }}
        >
          {/* Linke Spalte: das Angebot in Worten. */}
          <div className="p-8 md:p-11 flex flex-col justify-center">
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span
                className="inline-block rounded-full"
                style={{ width: 6, height: 6, background: "var(--amber)", boxShadow: "0 0 8px 1px rgba(232, 163, 61,0.6)" }}
              />
              Geschenkt für dich
            </span>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.5rem)", lineHeight: 1.14, marginBottom: 16, maxWidth: "22ch" }}>
              Wir schenken dir eine kostenlose Demo, damit du siehst, wie{" "}
              <span className="accent">dein eigenes System</span> aussieht
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.04rem", lineHeight: 1.75, marginBottom: 20, maxWidth: "46ch" }}>
              Trag dich ein, und wir bauen dir kostenlos eine Demo — ein
              laufendes System, zugeschnitten auf deinen Betrieb. So siehst du
              schon vorher, was wir für dich tun können, und wie dein System
              später aussieht. Kein Verkaufsgespräch, kein Foliensatz.
            </p>
            <ul className="flex flex-col gap-2.5" style={{ marginBottom: 4 }}>
              {[
                "Auf deine Branche und deinen Prozess zugeschnitten",
                "Kostenlos und unverbindlich",
                "Du behältst am Ende Code und Daten vollständig",
              ].map((b) => (
                <li key={b} className="flex gap-2.5" style={{ fontSize: "0.98rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <DemoSlotsBadge />
            </div>
          </div>

          {/* Rechte Spalte: die Eintragung. */}
          <div
            className="p-8 md:p-10 flex flex-col justify-center"
            style={{ borderLeft: "1px solid var(--hairline)", background: "rgba(232, 163, 61,0.035)" }}
          >
            <span className="mono block mb-5" style={{ fontSize: 12.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--warm-grey-dim)" }}>
              Für die Demo eintragen
            </span>

            <form
              name="demo"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="text-left"
            >
              <input type="hidden" name="form-name" value="demo" />
              <p style={{ position: "absolute", left: -9999 }}>
                <label>
                  Nicht ausfüllen: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="flex flex-col gap-4 mb-5">
                {(
                  [
                    { field: "name", label: "Name", type: "text", ac: "name", required: true },
                    { field: "email", label: "E-Mail", type: "email", ac: "email", required: true },
                    { field: "company", label: "Unternehmen / Branche", type: "text", ac: "organization", required: true },
                  ] as const
                ).map(({ field, label, type, ac, required }) => (
                  <label key={field} className="block">
                    <span className="mono block mb-2" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
                      {label}
                    </span>
                    <input
                      type={type}
                      name={field}
                      required={required}
                      autoComplete={ac}
                      className="w-full rounded-[10px] px-4 py-3 on-dark"
                      style={{
                        background: "var(--near-black)",
                        border: "1px solid var(--hairline)",
                        color: "var(--warm-grey)",
                        fontSize: 15,
                      }}
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="mono block mb-2" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
                    Was soll die Demo zeigen?
                  </span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Welcher Ablauf oder welches Tool soll darin vorkommen?"
                    className="w-full rounded-[10px] px-4 py-3 on-dark"
                    style={{
                      background: "var(--near-black)",
                      border: "1px solid var(--hairline)",
                      color: "var(--warm-grey)",
                      fontSize: 15,
                      resize: "vertical",
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-[10px] py-4 font-semibold btn-amber"
                style={{
                  background: "var(--amber)",
                  color: "#12141a",
                  fontSize: 15.5,
                  opacity: status === "sending" ? 0.6 : 1,
                }}
              >
                {status === "sending" ? "Wird gesendet …" : "Kostenlose Demo sichern"}
              </button>

              <p
                role="status"
                aria-live="polite"
                className="mono mt-3.5"
                style={{
                  fontSize: 13,
                  minHeight: "1.2em",
                  color: status === "ok" ? "var(--amber)" : "var(--warm-grey-dim)",
                }}
              >
                {status === "ok" && "Danke! Wir melden uns mit deiner Demo bei dir."}
                {status === "error" && "Etwas ist schiefgelaufen. Schreib uns stattdessen direkt auf WhatsApp."}
                {status === "idle" && "DSGVO-konform · Kein Abo, keine Verpflichtung"}
              </p>

              {/* Naechster Schritt direkt nach dem Absenden: Termin oder
                  WhatsApp, damit aus dem Lead schneller ein Gespraech wird.
                  Eigenes Tracking, denn das Formular allein bucht noch keinen
                  Termin und schreibt keine WhatsApp-Nachricht — das ist ein
                  zusaetzlicher, nicht automatischer Klick. */}
              {status === "ok" && (
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href="https://calendly.com/onyx-ai/30min"
                    target="_blank"
                    rel="noopener"
                    onClick={trackCalendlyClick}
                    className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 font-semibold btn-ghost"
                    style={{ border: "1px solid rgba(232,163,61,0.45)", color: "var(--amber)", fontSize: 14 }}
                  >
                    Direkt Termin buchen →
                  </a>
                  <a
                    href="https://wa.me/4917632273522"
                    target="_blank"
                    rel="noopener"
                    onClick={trackWhatsAppClick}
                    className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 font-semibold btn-ghost"
                    style={{ border: "1px solid var(--hairline)", color: "var(--warm-grey)", fontSize: 14 }}
                  >
                    Oder auf WhatsApp
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
