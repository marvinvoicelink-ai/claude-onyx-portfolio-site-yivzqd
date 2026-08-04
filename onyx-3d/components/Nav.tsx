"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import { offerings } from "@/lib/offerings";

const links = [
  { href: "/", label: "Startseite" },
  { href: "/angebot", label: "Angebot" },
  { href: "/fuer-dich", label: "Für dich" },
  { href: "/problem", label: "Problem" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/faq", label: "FAQ" },
  { href: "/ueber-mich", label: "Über mich" },
];

/** Per-offering deep links — automatisierung gets its own dedicated page instead of an /angebot anchor. */
const offeringLinks = offerings.map((o) => ({
  href: o.slug === "automatisierung" ? "/ki-agenten" : `/angebot#${o.slug}`,
  label: o.title.replace(/\.$/, ""),
}));

export default function Nav() {
  const pathname = usePathname();
  const [offeringsOpen, setOfferingsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOfferingsOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOfferingsOpen(false), 120);
  };

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
          className="nav-logo-link"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "var(--amber)" }}>AI</span>KI Performance
        </Link>

        <div className="flex items-center gap-4">
          <nav
            className="hidden md:flex items-center gap-6"
            style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: 13.5, letterSpacing: "-0.01em" }}
          >
            {links.map((l) => {
              const active = pathname === l.href;

              if (l.href === "/angebot") {
                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={openMenu}
                    onMouseLeave={closeMenu}
                  >
                    <Link
                      href={l.href}
                      className="nav-link inline-flex items-center gap-1.5"
                      aria-current={active ? "page" : undefined}
                      aria-expanded={offeringsOpen}
                      style={{ color: active ? "var(--amber)" : "#ffffff" }}
                    >
                      {l.label}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width={11}
                        height={11}
                        style={{ transform: offeringsOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s ease" }}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Link>

                    {offeringsOpen && (
                      <div
                        className="absolute rounded-xl overflow-hidden"
                        style={{
                          top: "calc(100% + 12px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          minWidth: 240,
                          background: "var(--near-black-2)",
                          border: "1px solid var(--hairline)",
                          boxShadow: "0 20px 40px -12px rgba(0,0,0,0.6)",
                        }}
                      >
                        {offeringLinks.map((ol) => (
                          <Link
                            key={ol.href}
                            href={ol.href}
                            onClick={() => setOfferingsOpen(false)}
                            className="block nav-dropdown-row"
                            style={{ color: "#ffffff" }}
                          >
                            {ol.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

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
