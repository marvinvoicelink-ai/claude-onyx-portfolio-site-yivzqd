"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

type FbqQueueFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded?: boolean;
  version?: string;
};

const PIXEL_ID = "1809916830386915";

function loadMetaPixel() {
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) {
        n.callMethod(...args);
      } else {
        n.queue.push(args);
      }
    } as FbqQueueFn;
    n.queue = [];
    n.loaded = true;
    n.version = "2.0";
    window.fbq = n;
    window._fbq = n;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("init", PIXEL_ID);
  window.fbq?.("track", "PageView");
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("onyx_consent");
    if (consent === "granted") {
      loadMetaPixel();
    } else if (consent !== "denied") {
      setVisible(true);
    }

    function onOpenSettings() {
      setVisible(true);
    }
    window.addEventListener("onyx-open-cookie-settings", onOpenSettings);
    return () => window.removeEventListener("onyx-open-cookie-settings", onOpenSettings);
  }, []);

  function accept() {
    localStorage.setItem("onyx_consent", "granted");
    setVisible(false);
    loadMetaPixel();
    window.dispatchEvent(new Event("onyx-consent-changed"));
  }

  function decline() {
    localStorage.setItem("onyx_consent", "denied");
    setVisible(false);
    window.dispatchEvent(new Event("onyx-consent-changed"));
  }

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 right-0 bottom-0 on-dark"
      style={{
        zIndex: 200,
        background: "var(--near-black-2)",
        borderTop: "1px solid var(--hairline)",
        padding: "22px 28px",
        boxShadow: "0 -12px 32px -12px rgba(0,0,0,0.4)",
      }}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between gap-6" style={{ maxWidth: 1180 }}>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.92rem", lineHeight: 1.6, maxWidth: "62ch", flex: "1 1 320px" }}>
          Diese Seite nutzt <strong style={{ color: "var(--warm-grey)" }}>Cookies für Werbe-Tracking (Meta Pixel)</strong>,
          damit wir sehen, welche Anzeigen funktionieren. Ohne deine Zustimmung wird kein Pixel geladen — die Seite
          funktioniert in jedem Fall. Details dazu in der{" "}
          <a href="/datenschutz" style={{ color: "var(--amber)" }}>
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={decline}
            className="rounded-[10px] px-5 py-2.5 font-semibold btn-ghost"
            style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 14 }}
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-[10px] px-5 py-2.5 font-semibold btn-amber"
            style={{ background: "var(--amber)", color: "#161104", fontSize: 14 }}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
