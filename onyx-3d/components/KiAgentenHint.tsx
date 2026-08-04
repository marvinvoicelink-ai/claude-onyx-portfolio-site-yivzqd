import Link from "next/link";

/** Slim homepage teaser pointing at the /ki-agenten deep dive — deliberately small, not a full section. */
export default function KiAgentenHint() {
  return (
    <div className="mx-auto px-7" style={{ maxWidth: 1180, marginTop: -8, marginBottom: 32 }}>
      <Link
        href="/ki-agenten"
        className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-3 sm:gap-4 rounded-xl px-5 py-4 kiagenten-hint"
        style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span
            className="mono flex-shrink-0 rounded-full px-2.5 py-1"
            style={{ fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "#161104", background: "var(--amber)" }}
          >
            Neu
          </span>
          <span style={{ fontSize: "0.94rem", color: "var(--warm-grey-dim)" }}>
            Drei KI-Agenten, die für dich telefonieren — Anrufe entgegennehmen, Termine buchen, aktiv nachfragen.
          </span>
        </span>
        <span className="mono flex-shrink-0" style={{ fontSize: 12.5, color: "var(--amber)" }}>
          Mehr erfahren →
        </span>
      </Link>
    </div>
  );
}
