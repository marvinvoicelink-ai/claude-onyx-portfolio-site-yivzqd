"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MidFormSection({
  heading = "Bereit für dein eigenes System?",
}: {
  heading?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("bot-field")) return;

    if (typeof window.fbq === "function") window.fbq("track", "Lead");

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 720 }}>
        <div
          className="rounded-2xl p-8 md:p-10 text-center"
          style={{ background: "var(--near-black-2)" }}
        >
          <h2 style={{ fontSize: "clamp(1.5rem, 3.2vw, 2rem)", marginBottom: 10 }}>
            {heading}
          </h2>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", marginBottom: 28, maxWidth: "48ch", marginLeft: "auto", marginRight: "auto" }}>
            Hinterlass kurz deine Kontaktdaten — der Gründer meldet sich
            persönlich bei dir zurück.
          </p>

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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
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
              {status === "sending" ? "Wird gesendet …" : "Kontakt aufnehmen"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="mono mt-3.5 text-center"
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
        </div>
      </div>
    </section>
  );
}
