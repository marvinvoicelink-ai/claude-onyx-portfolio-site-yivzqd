"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
    fbq?: (...args: unknown[]) => void;
  }
}

const CALENDLY_URL = "https://calendly.com/onyx-ai/30min";

export default function CalendlyEmbed() {
  const [granted, setGranted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem("onyx_consent") === "granted") setGranted(true);

    function onConsentChanged() {
      if (localStorage.getItem("onyx_consent") === "granted") setGranted(true);
    }
    window.addEventListener("onyx-consent-changed", onConsentChanged);
    return () => window.removeEventListener("onyx-consent-changed", onConsentChanged);
  }, []);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!e.data || typeof e.data.event !== "string" || !e.data.event.startsWith("calendly.")) return;
      if (e.data.event === "calendly.event_scheduled" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!granted || !containerRef.current) return;
    const container = containerRef.current;

    function init() {
      if (window.Calendly && container) {
        container.innerHTML = "";
        window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: container });
      }
    }

    if (window.Calendly) {
      init();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }, [granted]);

  function enable() {
    localStorage.setItem("onyx_consent", "granted");
    setGranted(true);
  }

  return (
    <div className="mt-8">
      <p className="mono mb-3" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)" }}>
        Oder buch direkt hier deinen Termin:
      </p>
      {granted ? (
        <div
          ref={containerRef}
          style={{ minWidth: 280, height: 660, borderRadius: 16, overflow: "hidden" }}
        />
      ) : (
        <div
          className="rounded-xl p-8 text-center"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", marginBottom: 16 }}>
            Der eingebettete Kalender lädt Inhalte von Calendly nach und
            braucht dazu deine Zustimmung.
          </p>
          <button
            type="button"
            onClick={enable}
            className="rounded-[10px] px-5 py-2.5 font-semibold btn-ghost"
            style={{
              background: "transparent",
              color: "var(--warm-grey)",
              border: "1px solid var(--hairline)",
              fontSize: 14,
            }}
          >
            Kalender aktivieren
          </button>
        </div>
      )}
    </div>
  );
}
