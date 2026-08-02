"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";

const links = [
  { href: "/", label: "Startseite" },
  { href: "/angebot", label: "Angebot" },
  { href: "/fuer-dich", label: "Für dich" },
  { href: "/problem", label: "Problem" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/faq", label: "FAQ" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  const pathname = usePathname();

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
          className="mono nav-logo-link"
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
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link"
                  aria-current={active ? "page" : undefined}
                  style={{ color: active ? "var(--amber)" : "#ffffff" }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/kontakt"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold whitespace-nowrap btn-amber"
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
