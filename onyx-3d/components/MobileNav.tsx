"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { offerings } from "@/lib/offerings";
import { trackLead } from "@/lib/trackLead";

const pageLinks = [
  { href: "/", label: "Startseite" },
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

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center"
        style={{ width: 36, height: 36, color: "#ffffff" }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {mounted && open &&
        createPortal(
          <div
            className="fixed left-0 right-0 overflow-y-auto"
            style={{
              top: 80,
              bottom: 0,
              background: "var(--near-black)",
              zIndex: 100,
            }}
          >
            <nav className="flex flex-col px-7 py-2">
              {pageLinks.slice(0, 1).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="mobile-nav-row"
                  style={{ color: pathname === l.href ? "var(--amber)" : "#ffffff" }}
                >
                  {l.label}
                </Link>
              ))}

              <span
                className="mono"
                style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)", padding: "18px 0 6px" }}
              >
                Angebot
              </span>
              {offeringLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="mobile-nav-row"
                  style={{ color: "#ffffff" }}
                >
                  {l.label}
                </Link>
              ))}

              {pageLinks.slice(1).map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="mobile-nav-row"
                    style={{ color: active ? "var(--amber)" : "#ffffff" }}
                  >
                    {l.label}
                  </Link>
                );
              })}

              <Link
                href="/kontakt"
                onClick={() => {
                  setOpen(false);
                  trackLead();
                }}
                className="inline-flex items-center justify-center rounded-full font-semibold btn-amber"
                style={{ background: "var(--amber)", color: "#161104", fontSize: 16, padding: "16px 0", margin: "24px 0 32px" }}
              >
                Kontakt aufnehmen
              </Link>
            </nav>
          </div>,
          document.body
        )}
    </div>
  );
}
