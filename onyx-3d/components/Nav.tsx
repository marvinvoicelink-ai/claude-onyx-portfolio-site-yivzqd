import Link from "next/link";
import MobileNav from "./MobileNav";

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

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 mono" style={{ fontSize: 13 }}>
            <Link href="/" style={{ color: "#ffffff" }}>
              Startseite
            </Link>
            <Link href="/angebot" style={{ color: "#ffffff" }}>
              Angebot
            </Link>
            <Link href="/referenzen" style={{ color: "#ffffff" }}>
              Referenzen
            </Link>
            <Link href="/faq" style={{ color: "#ffffff" }}>
              FAQ
            </Link>
            <Link href="/ueber-mich" style={{ color: "#ffffff" }}>
              Über mich
            </Link>
            <Link href="/kontakt" style={{ color: "#ffffff" }}>
              Kontakt
            </Link>
          </nav>

          <Link
            href="/kontakt"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold whitespace-nowrap"
            style={{ background: "var(--amber)", color: "#161104", fontSize: 13.5 }}
          >
            Kontakt aufnehmen
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
