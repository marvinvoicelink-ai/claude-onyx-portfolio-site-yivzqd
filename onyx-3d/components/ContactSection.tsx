"use client";

import { useState } from "react";
import CalendlyEmbed from "./CalendlyEmbed";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ContactSection() {
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
        setStatus("ok");
        form.reset();
        if (typeof window.fbq === "function") window.fbq("track", "Lead");
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
      className="py-14"
      style={{ background: "var(--near-black-2)" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: 720 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 07 / Kontakt
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: 14 }}>
          Lass uns dein System besprechen.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", marginBottom: 36, maxWidth: "50ch" }}>
          Schreib direkt, was dein Unternehmen braucht — der Gründer
          antwortet selbst, kein Bot, keine Warteschlange.
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p style={{ position: "absolute", left: -9999 }}>
            <label>
              Nicht ausfüllen: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {(["name", "email", "phone"] as const).map((field) => (
              <label key={field} className="block">
                <span className="mono block mb-2" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
                  {field === "name" ? "Name" : field === "email" ? "E-Mail" : "Telefonnummer"}
                </span>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  name={field}
                  required
                  autoComplete={field}
                  className="w-full rounded-[10px] px-4 py-3"
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
              Was braucht dein Unternehmen?
            </span>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full rounded-[10px] px-4 py-3"
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
              color: "#161104",
              fontSize: 15.5,
              opacity: status === "sending" ? 0.6 : 1,
            }}
          >
            {status === "sending" ? "Wird gesendet …" : "Bewerben"}
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
            {status === "ok" && "Danke! Deine Nachricht ist angekommen — wir melden uns zeitnah."}
            {status === "error" && "Etwas ist schiefgelaufen. Schreib uns stattdessen direkt auf WhatsApp."}
          </p>
        </form>

        <div
          className="flex items-center gap-3.5 my-8 mono"
          style={{ fontSize: 12, color: "var(--warm-grey-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}
        >
          <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
          oder direkt
          <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
        </div>

        <div className="flex flex-wrap gap-3.5">
          <a
            href="https://wa.me/4917632273522?text=Hallo%20Marvin%2C%20ich%20interessiere%20mich%20f%C3%BCr%20ein%20White-Label-System%20von%20Onyx."
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold"
            style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
          >
            WhatsApp schreiben
          </a>
          <a
            href="https://calendly.com/onyx-ai/30min"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold"
            style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
          >
            30 Min. Termin buchen
          </a>
        </div>
        <p className="mono mt-6" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
          WhatsApp{" "}
          <a href="https://wa.me/4917632273522" style={{ color: "var(--amber)" }}>
            0176 322 273 522
          </a>{" "}
          · info@onyx-ai.de
        </p>

        <CalendlyEmbed />
      </div>
    </section>
  );
}
