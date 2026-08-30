"use client";

import { useEffect, useState } from "react";
import { trackLead } from "@/lib/trackLead";
import { OPEN_CONTACT_EVENT } from "@/lib/contactModal";

/**
 * Ein einziges Kontakt-Formular als Overlay, das jeder CTA-Button oeffnet
 * (ueber openContactForm). Statt zur Kontakt-Section zu springen, erscheint
 * das Formular direkt vor dem Inhalt. Beim Absenden feuert der Lead mit dem
 * Namen des Buttons, der das Overlay geoeffnet hat, als Quelle.
 *
 * Das Formular nutzt denselben Netlify-Formularnamen "contact" wie die
 * ContactSection — Netlify erkennt das Formular schon aus deren statischem
 * Markup, das Overlay-Formular muss dafuer nicht im Build sichtbar sein.
 */
export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      setSource(detail?.source ?? null);
      setStatus("idle");
      setOpen(true);
    }
    window.addEventListener(OPEN_CONTACT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, onOpen);
  }, []);

  // Hintergrund-Scroll sperren, solange das Overlay offen ist, und mit Escape
  // schliessen.
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
        // Erst hier ist es ein Lead: vollstaendig ausgefuellt, abgeschickt und
        // von Netlify angenommen. Der Button-Name haengt als Quelle daran.
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(8,8,8,0.72)", backdropFilter: "blur(4px)", overflowY: "auto" }}
      onMouseDown={(e) => {
        // Klick auf den abgedunkelten Rand schliesst; Klick im Karten-Inneren
        // nicht (dort stoppt onMouseDown).
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="relative w-full on-dark silver-glow"
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
          aria-label="Schließen"
          onClick={() => setOpen(false)}
          className="absolute flex items-center justify-center rounded-full"
          style={{
            top: 14,
            right: 14,
            width: 34,
            height: 34,
            border: "1px solid var(--hairline)",
            color: "var(--warm-grey-dim)",
            background: "transparent",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={16} height={16}>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <span
          className="mono block mb-3"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          Kontakt
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 3.4vw, 2rem)", lineHeight: 1.15, marginBottom: 10 }}>
          Lass uns dein System besprechen.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.6, marginBottom: 24, maxWidth: "46ch" }}>
          Schreib kurz, was dein Unternehmen braucht — der Gründer antwortet
          selbst, kein Bot, keine Warteschlange.
        </p>

        {status === "ok" ? (
          <p className="mono" role="status" aria-live="polite" style={{ fontSize: 14.5, color: "var(--amber)", lineHeight: 1.6 }}>
            Danke! Deine Nachricht ist angekommen — wir melden uns zeitnah.
          </p>
        ) : (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="text-left"
          >
            <input type="hidden" name="form-name" value="contact" />
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
                  { field: "phone", label: "Telefonnummer (optional)", type: "tel", ac: "tel", required: false },
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
                  Was braucht dein Unternehmen?
                </span>
                <textarea
                  name="message"
                  rows={3}
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
              {status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="mono mt-3.5"
              style={{ fontSize: 13, minHeight: "1.2em", color: "var(--warm-grey-dim)" }}
            >
              {status === "error" && "Etwas ist schiefgelaufen. Schreib uns stattdessen direkt auf WhatsApp."}
              {status === "idle" && "DSGVO-konform · Der Gründer meldet sich persönlich"}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
