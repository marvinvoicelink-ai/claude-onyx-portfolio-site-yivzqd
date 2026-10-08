"use client";

import { useEffect, useState } from "react";
import { trackLead, trackCalendlyClick } from "@/lib/trackLead";
import { OPEN_CONTACT_EVENT, type ContactTopic } from "@/lib/contactModal";
import type { Lang } from "@/lib/i18n";

type TopicText = { kicker: string; heading: [string, string, string]; intro: string; message: string; submit: string };

const TEXT: Record<
  Lang,
  {
    topics: Record<ContactTopic, TopicText>;
    close: string;
    name: string;
    email: string;
    phone: string;
    phoneRequired: string;
    reachable: string;
    reachablePlaceholder: string;
    sending: string;
    idle: string;
    error: string;
    okTitle: string;
    okNext: string;
    book: string;
    honeypot: string;
  }
> = {
  de: {
    topics: {
      objekt: {
        kicker: "Objekt ausprobieren",
        heading: ["Teste es mit ", "deinem nächsten Objekt", ""],
        intro:
          "Name und E-Mail reichen — Marvin meldet sich persönlich und bespricht mit dir, wie du die Vor-Ort-Erfassung an einem echten Objekt ausprobierst. Abrechnung pro Objekt, kein Abo.",
        message: "Um welches Objekt geht es? (optional)",
        submit: "Anfrage senden",
      },
      demo: {
        kicker: "Kostenlose Demo",
        heading: ["Sichere dir deine ", "kostenlose Demo", ""],
        intro:
          "Name und E-Mail reichen — der Gründer meldet sich persönlich und baut dir eine Demo, die zu deinem Betrieb passt. Kein Bot, keine Warteschlange.",
        message: "Was soll die Demo zeigen? (optional)",
        submit: "Kostenlose Demo anfragen",
      },
      info: {
        kicker: "Infogespräch",
        heading: ["Vereinbare ein ", "Infogespräch", ""],
        intro:
          "Trag dich ein — Marvin ruft dich persönlich an und klärt mit dir in rund 30 Minuten, ob und wie Onyx.AI dir helfen kann. Kostenlos und unverbindlich.",
        message: "Worum soll es gehen? (optional)",
        submit: "Infogespräch anfragen",
      },
      general: {
        kicker: "Kontakt",
        heading: ["Erzähl kurz, ", "worum es geht", ""],
        intro:
          "Name und E-Mail reichen — Marvin meldet sich persönlich. Kein Bot, keine Warteschlange.",
        message: "Worum geht es? (optional)",
        submit: "Anfrage senden",
      },
    },
    close: "Schließen",
    name: "Name",
    email: "E-Mail",
    phone: "Telefonnummer (optional)",
    phoneRequired: "Telefonnummer",
    reachable: "Wann bist du am besten erreichbar? (optional)",
    reachablePlaceholder: "z. B. werktags ab 16 Uhr",
    sending: "Wird gesendet …",
    idle: "DSGVO-konform · Der Gründer meldet sich persönlich",
    error: "Etwas ist schiefgelaufen. Schreib uns stattdessen an info@onyx-ai.de.",
    okTitle: "Danke! Deine Anfrage ist angekommen — Marvin meldet sich persönlich.",
    okNext: "Willst du es schneller? Dann buch dir direkt einen Termin.",
    book: "Direkt Termin buchen →",
    honeypot: "Nicht ausfüllen:",
  },
  es: {
    topics: {
      objekt: {
        kicker: "Probar con un inmueble",
        heading: ["Pruébalo con ", "tu próximo inmueble", ""],
        intro:
          "Basta con tu nombre y tu correo: Marvin te contacta personalmente y vemos juntos cómo probar la captura in situ en un inmueble real. Se factura por inmueble, sin suscripción.",
        message: "¿De qué inmueble se trata? (opcional)",
        submit: "Enviar solicitud",
      },
      demo: {
        kicker: "Demo gratuita",
        heading: ["Consigue tu ", "demo gratuita", ""],
        intro:
          "Basta con tu nombre y tu correo: el fundador te contacta personalmente y te prepara una demo adaptada a tu empresa. Sin bots y sin colas de espera.",
        message: "¿Qué debería mostrar la demo? (opcional)",
        submit: "Solicitar demo gratuita",
      },
      info: {
        kicker: "Llamada informativa",
        heading: ["Reserva una ", "llamada informativa", ""],
        intro:
          "Déjanos tus datos: Marvin te llama personalmente y en unos 30 minutos vemos si Onyx.AI puede ayudarte y cómo. Gratis y sin compromiso.",
        message: "¿De qué quieres hablar? (opcional)",
        submit: "Solicitar llamada informativa",
      },
      general: {
        kicker: "Contacto",
        heading: ["Cuéntanos brevemente ", "de qué se trata", ""],
        intro: "Basta con tu nombre y tu correo: Marvin te contacta personalmente. Sin bots y sin colas de espera.",
        message: "¿De qué se trata? (opcional)",
        submit: "Enviar solicitud",
      },
    },
    close: "Cerrar",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono (opcional)",
    phoneRequired: "Teléfono",
    reachable: "¿Cuándo es mejor llamarte? (opcional)",
    reachablePlaceholder: "p. ej., entre semana a partir de las 16 h",
    sending: "Enviando…",
    idle: "Conforme al RGPD · Te responde el propio fundador",
    error: "Algo ha fallado. Escríbenos a info@onyx-ai.de.",
    okTitle: "¡Gracias! Hemos recibido tu solicitud: Marvin te contactará personalmente.",
    okNext: "¿Tienes prisa? Reserva una cita directamente.",
    book: "Reservar cita →",
    honeypot: "No rellenar:",
  },
};

/**
 * Ein einziges Kontakt-Formular als Overlay, das jeder CTA-Button öffnet
 * (über openContactForm). Beim Absenden feuert der Lead mit dem Namen des
 * Buttons, der das Overlay geöffnet hat, als Quelle.
 *
 * Nutzt denselben Netlify-Formularnamen "contact" wie die ContactSection —
 * Netlify erkennt das Formular aus dem statischen, versteckten Formular in
 * RootShell. Zusätzliche Felder (anliegen, quelle, language) sind dort
 * ebenfalls angelegt, sonst würde Netlify sie verwerfen.
 */
export default function ContactModal({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [topic, setTopic] = useState<ContactTopic>("general");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const tt = t.topics[topic];

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<{ source?: string; topic?: ContactTopic }>).detail;
      setSource(detail?.source ?? null);
      setTopic(detail?.topic ?? "general");
      setStatus("idle");
      setOpen(true);
    }
    window.addEventListener(OPEN_CONTACT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, onOpen);
  }, []);

  // Hintergrund-Scroll sperren, solange das Overlay offen ist, und mit Escape
  // schließen.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
        // Erst hier ist es ein Lead: abgeschickt und von Netlify angenommen.
        // Der Button-Name hängt als Quelle daran.
        trackLead(source ?? undefined);
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  const inputStyle = {
    background: "var(--near-black)",
    border: "1px solid var(--hairline)",
    color: "var(--warm-grey)",
    fontSize: 15,
  } as const;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(8,8,8,0.72)", backdropFilter: "blur(4px)", overflowY: "auto" }}
      role="dialog"
      aria-modal="true"
      aria-label={tt.kicker}
      onMouseDown={(e) => {
        // Klick auf den abgedunkelten Rand schließt, Klick in die Karte nicht.
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="relative w-full on-dark beam-border"
        style={{
          maxWidth: 560,
          marginTop: "clamp(16px, 6vh, 64px)",
          marginBottom: 24,
          background: "var(--near-black-2)",
          border: "1px solid var(--silver-line)",
          borderRadius: 20,
          padding: "clamp(22px, 4vw, 40px)",
          boxShadow: "0 30px 80px -30px rgba(0,0,0,0.9)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={t.close}
          onClick={() => setOpen(false)}
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 14, right: 14, width: 34, height: 34, border: "1px solid var(--hairline)", color: "var(--warm-grey-dim)", background: "transparent" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={16} height={16}>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <span className="mono block mb-3" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
          {tt.kicker}
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 3.4vw, 2rem)", lineHeight: 1.15, marginBottom: 10, paddingRight: 30 }}>
          {tt.heading[0]}
          <span className="accent">{tt.heading[1]}</span>
          {tt.heading[2]}
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.6, marginBottom: 24, maxWidth: "46ch" }}>{tt.intro}</p>

        {status === "ok" ? (
          <div role="status" aria-live="polite">
            <p className="mono" style={{ fontSize: 14.5, color: "var(--amber)", lineHeight: 1.6, marginBottom: 14 }}>
              {t.okTitle}
            </p>
            <p style={{ fontSize: 14.5, color: "var(--warm-grey-dim)", lineHeight: 1.6, marginBottom: 14 }}>{t.okNext}</p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://calendly.com/onyx-ai/30min"
                target="_blank"
                rel="noopener"
                onClick={trackCalendlyClick}
                className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 font-semibold btn-ghost"
                style={{ border: "1px solid rgba(232,163,61,0.45)", color: "var(--amber)", fontSize: 14 }}
              >
                {t.book}
              </a>
            </div>
          </div>
        ) : (
          <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} className="text-left">
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="language" value={lang} />
            <input type="hidden" name="anliegen" value={topic} />
            <input type="hidden" name="quelle" value={source ?? ""} />
            <p style={{ position: "absolute", left: -9999 }}>
              <label>
                {t.honeypot} <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="flex flex-col gap-4 mb-5">
              {(
                [
                  { field: "name", label: t.name, type: "text", ac: "name", required: true },
                  { field: "email", label: t.email, type: "email", ac: "email", required: true },
                  topic === "info"
                    ? { field: "phone", label: t.phoneRequired, type: "tel", ac: "tel", required: true }
                    : { field: "phone", label: t.phone, type: "tel", ac: "tel", required: false },
                ] as const
              ).map(({ field, label, type, ac, required }) => (
                <label key={field} className="block">
                  <span className="mono block mb-2" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
                    {label}
                  </span>
                  <input type={type} name={field} required={required} autoComplete={ac} className="w-full rounded-[10px] px-4 py-3 on-dark" style={inputStyle} />
                </label>
              ))}

              {topic === "info" && (
                <label className="block">
                  <span className="mono block mb-2" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
                    {t.reachable}
                  </span>
                  <input
                    type="text"
                    name="erreichbar"
                    placeholder={t.reachablePlaceholder}
                    className="w-full rounded-[10px] px-4 py-3 on-dark"
                    style={inputStyle}
                  />
                </label>
              )}

              <label className="block">
                <span className="mono block mb-2" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
                  {tt.message}
                </span>
                <textarea name="message" rows={3} className="w-full rounded-[10px] px-4 py-3 on-dark" style={{ ...inputStyle, resize: "vertical" }} />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-[10px] py-4 font-semibold btn-amber"
              style={{ background: "var(--amber)", color: "#12141a", fontSize: 15.5, opacity: status === "sending" ? 0.6 : 1 }}
            >
              {status === "sending" ? t.sending : tt.submit}
            </button>

            <p role="status" aria-live="polite" className="mono mt-3.5" style={{ fontSize: 13, minHeight: "1.2em", color: "var(--warm-grey-dim)" }}>
              {status === "error" && t.error}
              {status === "idle" && t.idle}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
