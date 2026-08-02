"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Startseite" },
  { href: "/angebot", label: "Angebot" },
  { href: "/fuer-dich", label: "Was wir für dich tun können" },
  { href: "/problem", label: "Problem" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/faq", label: "FAQ" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

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
            className="fixed left-0 right-0"
            style={{
              top: 64,
              bottom: 0,
              background: "var(--near-black)",
              zIndex: 100,
            }}
          >
            <nav className="flex flex-col mono px-7 py-4" style={{ fontSize: 15.5 }}>
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="py-3.5"
                    style={{ color: active ? "var(--amber)" : "#ffffff" }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>,
          document.body
        )}
    </div>
  );
}
