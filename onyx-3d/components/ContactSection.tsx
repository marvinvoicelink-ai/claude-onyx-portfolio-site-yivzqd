"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { trackLead, trackWhatsAppClick, trackCalendlyClick } from "@/lib/trackLead";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const TEXT: Record<
  Lang,
  {
    kicker: string;
    heading: [string, string, string];
    sub: string;
    fields: { name: string; email: string; phone: string };
    message: string;
    submit: string;
    sending: string;
    ok: string;
    error: string;
    or: string;
    whatsapp: string;
    whatsappText: string;
    booking: string;
    phoneDisplay: string;
  }
> = {
  de: {
    kicker: "Kontakt",
    heading: ["Lass uns ", "dein System", " besprechen"],
    sub: "Schreib direkt, was dein Unternehmen braucht — der Gründer antwortet selbst, kein Bot, keine Warteschlange.",
    fields: { name: "Name", email: "E-Mail", phone: "Telefonnummer" },
    message: "Was braucht dein Unternehmen?",
    submit: "Nachricht senden",
    sending: "Wird gesendet …",
    ok: "Danke! Deine Nachricht ist angekommen — wir melden uns zeitnah.",
    error: "Etwas ist schiefgelaufen. Schreib uns stattdessen direkt auf WhatsApp.",
    or: "oder direkt",
    whatsapp: "WhatsApp schreiben",
    whatsappText: "Hallo Marvin, ich interessiere mich für ein White-Label-System von Onyx.",
    booking: "30 Min. Termin buchen",
    phoneDisplay: "0176 3227 3522",
  },
  es: {
    kicker: "Contacto",
    heading: ["Hablemos de ", "tu sistema", ""],
    sub: "Escríbenos directamente qué necesita tu empresa. Te responde el propio fundador: sin bots y sin colas de espera.",
    fields: { name: "Nombre", email: "Correo electrónico", phone: "Teléfono" },
    message: "¿Qué necesita tu empresa?",
    submit: "Enviar mensaje",
    sending: "Enviando…",
    ok: "¡Gracias! Hemos recibido tu mensaje y te responderemos pronto.",
    error: "Algo ha fallado. Escríbenos directamente por WhatsApp.",
    or: "o directamente",
    whatsapp: "Escribir por WhatsApp",
    whatsappText: "Hola Marvin, me interesa un sistema de Onyx.",
    booking: "Reservar una cita de 30 min",
    phoneDisplay: "+49 176 3227 3522",
  },
};

export default function ContactSection({ lang = "de", blatt }: { lang?: Lang; blatt?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const t = TEXT[lang];
  const whatsappHref = `https://wa.me/4917632273522?text=${encodeURIComponent(t.whatsappText)}`;

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
        // Erst hier: vollständig ausgefüllt, abgeschickt und von Netlify
        // angenommen. Ein Klick auf den Button allein ist noch keine Anfrage.
        trackLead();
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
    <section
      id="kontakt"
      className="py-14 on-dark silver-rim"
      style={{ background: "var(--near-black-2)" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: 720 }}>
        <div className="text-center">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / ${t.kicker}` : t.kicker}
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 14 }}>
            {t.heading[0]}
            <span className="accent">{t.heading[1]}</span>
            {t.heading[2]}
          </h2>
          <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", marginBottom: 36, maxWidth: "50ch" }}>
            {t.sub}
          </p>
        </div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="language" value={lang} />
          <p style={{ position: "absolute", left: -9999 }}>
            <label>
              {lang === "es" ? "No rellenar:" : "Nicht ausfüllen:"} <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {(["name", "email", "phone"] as const).map((field) => (
              <label key={field} className="block">
                <span className="mono block mb-2" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
                  {t.fields[field]}
                </span>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  name={field}
                  required
                  autoComplete={field === "phone" ? "tel" : field}
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
          </div>

          <label className="block mb-5">
            <span className="mono block mb-2" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
              {t.message}
            </span>
            <textarea
              name="message"
              rows={4}
              required
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
            {status === "sending" ? t.sending : t.submit}
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
            {status === "ok" && t.ok}
            {status === "error" && t.error}
          </p>
        </form>

        <div
          className="flex items-center gap-3.5 my-8 mono"
          style={{ fontSize: 12, color: "var(--warm-grey-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}
        >
          <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
          {t.or}
          <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
        </div>

        <div className="flex flex-wrap gap-3.5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold"
            style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
          >
            {t.whatsapp}
          </a>
          <a
            href="https://calendly.com/onyx-ai/30min"
            target="_blank"
            rel="noopener"
            onClick={trackCalendlyClick}
            className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold"
            style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
          >
            {t.booking}
          </a>
        </div>
        <p className="mono mt-6" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
          WhatsApp{" "}
          <a
            href="https://wa.me/4917632273522"
            target="_blank"
            rel="noopener"
            onClick={trackWhatsAppClick}
            style={{ color: "var(--amber)" }}
          >
            {t.phoneDisplay}
          </a>{" "}
          · info@onyx-ai.de
        </p>
      </div>
    </section>
  );
}
