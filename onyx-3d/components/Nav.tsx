import Link from "next/link";

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(17,17,17,0.72)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        className="mx-auto px-7 flex items-center justify-between"
        style={{ maxWidth: 1180, height: 64 }}
      >
        <Link
          href="/"
          className="mono"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "-0.01em",
            color: "#ffffff",
          }}
        >
          ONYX.<span style={{ color: "var(--amber)" }}>AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 mono" style={{ fontSize: 13 }}>
          <Link href="/angebot" style={{ color: "var(--warm-grey-dim)" }}>
            Angebot
          </Link>
          <Link href="/referenzen" style={{ color: "var(--warm-grey-dim)" }}>
            Referenzen
          </Link>
          <Link href="/faq" style={{ color: "var(--warm-grey-dim)" }}>
            FAQ
          </Link>
          <Link href="/ueber-mich" style={{ color: "var(--warm-grey-dim)" }}>
            Über mich
          </Link>
        </nav>

        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold"
          style={{ background: "var(--amber)", color: "#161104", fontSize: 13.5 }}
        >
          Kontakt aufnehmen
        </Link>
      </div>
    </header>
  );
}
