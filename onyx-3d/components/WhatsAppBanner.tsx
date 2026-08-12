"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_HREF =
  "https://wa.me/4917632273522?text=Hallo%20Marvin%2C%20ich%20interessiere%20mich%20f%C3%BCr%20ein%20White-Label-System%20von%20Onyx.";

/** Standalone mid-page banner pointing people directly at WhatsApp for a personal, no-form contact path. */
export default function WhatsAppBanner() {
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-2xl px-8 py-9 md:px-12 md:py-10 flex flex-col lg:flex-row items-center gap-7"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          <div className="text-center lg:text-left" style={{ flex: 1 }}>
            <span
              className="mono inline-flex items-center gap-2 mb-3"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> Direkter Draht
            </span>
            <h3 style={{ fontSize: "clamp(1.3rem, 2.8vw, 1.8rem)", marginBottom: 8 }}>
              Hier kannst du mir persönlich schreiben.
            </h3>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", maxWidth: "46ch", marginLeft: "auto", marginRight: "auto" }}>
              Kein Formular, keine Warteschlange — schreib mir direkt auf
              WhatsApp, ich antworte selbst.
            </p>
          </div>

          <svg
            className="hidden lg:block"
            viewBox="0 0 120 60"
            width={100}
            height={50}
            fill="none"
            style={{ color: "var(--amber)", flexShrink: 0 }}
            aria-hidden
          >
            <path
              d="M4 8c24 2 46 14 60 30 8 9 18 14 28 15"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
            <path
              d="M82 46l12 8-2-14"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            className="lg:hidden"
            viewBox="0 0 40 40"
            width={28}
            height={28}
            fill="none"
            style={{ color: "var(--amber)" }}
            aria-hidden
          >
            <path d="M20 4v28" stroke="currentColor" strokeWidth={1.8} strokeDasharray="4 5" strokeLinecap="round" />
            <path d="M11 25l9 9 9-9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener"
            onClick={() => {
              if (typeof window.fbq === "function") window.fbq("trackCustom", "WhatsAppClick");
            }}
            className="inline-flex items-center gap-3 rounded-[10px] px-7 py-4 font-semibold whitespace-nowrap btn-amber"
            style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5, flexShrink: 0 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width={19} height={19}>
              <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.28 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.17h-.01a8.17 8.17 0 0 1-4.16-1.14l-.3-.18-3.11.82.83-3.03-.19-.31a8.18 8.18 0 0 1-1.26-4.35c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.19-8.21 8.19Zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.66.31-.23.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z" />
            </svg>
            Per WhatsApp schreiben
          </a>
        </div>
      </div>
    </section>
  );
}
