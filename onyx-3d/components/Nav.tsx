"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import LangSwitch from "./LangSwitch";
import { lp, type Lang } from "@/lib/i18n";
import { NAV_CTA, NAV_LINKS, offeringLinks } from "./navData";
import { openContactForm } from "@/lib/contactModal";

export default function Nav({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [offeringsOpen, setOfferingsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Entrance reveal for the header on first load — reduced motion skips
    // straight to visible, otherwise wait a frame so the hidden state has
    // actually painted before transitioning (same pattern as the Hero).
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setEntered(true);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    }
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOfferingsOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOfferingsOpen(false), 120);
  };

  const dropdown = offeringLinks(lang);

  return (
    <header
      className="sticky top-0 z-50 on-dark nav-silver"
      style={{
        background: "rgba(17,17,17,0.72)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        {/* Ab lg: eine Zeile — Logo | Links zentriert | Sprache + CTA, per
            Grid mit drei Spalten, damit die Links unabhängig von der
            Logobreite mittig bleiben. Darunter (Handy/Tablet): Logo mittig,
            Sprachumschalter links, Hamburger rechts. */}
        <div
          className="relative flex items-center justify-center lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6"
          style={{ height: 76 }}
        >
          <Link href={lp(lang, "/")} className="nav-logo-link inline-flex items-center gap-3">
            <span
              style={{
                opacity: entered ? 1 : 0,
                transform: entered ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <Image
                src="/logo/onyx-ai-logo.png"
                alt="ONYX.AI"
                width={1350}
                height={368}
                priority
                className="h-[44px] lg:h-[46px] xl:h-[56px]"
                style={{ width: "auto", display: "block" }}
              />
            </span>
          </Link>

          <div className="lg:hidden absolute left-0">
            <LangSwitch lang={lang} />
          </div>
          <div className="lg:hidden absolute right-0">
            <MobileNav lang={lang} />
          </div>

          <div
            className="hidden lg:flex items-center justify-center"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              transitionDelay: "160ms",
            }}
          >
            <nav
              className="flex items-center gap-4 xl:gap-5"
              style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "-0.01em" }}
            >
              {NAV_LINKS[lang].map((l) => {
                const href = lp(lang, l.href);
                const active = pathname === href;

                if (l.href === "/angebot") {
                  return (
                    <div
                      key={l.href}
                      className="relative"
                      onMouseEnter={openMenu}
                      onMouseLeave={closeMenu}
                    >
                      <Link
                        href={href}
                        className="nav-link inline-flex items-center gap-1.5 whitespace-nowrap"
                        aria-current={active ? "page" : undefined}
                        aria-expanded={offeringsOpen}
                        style={{ color: active ? "var(--amber)" : "var(--warm-grey)" }}
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
                          className="absolute rounded-xl overflow-hidden on-dark silver-rim"
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
                          {dropdown.map((ol) => (
                            <Link
                              key={ol.href}
                              href={ol.href}
                              onClick={() => setOfferingsOpen(false)}
                              className="block nav-dropdown-row"
                              style={{ color: "var(--warm-grey)" }}
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
                    href={href}
                    className="nav-link whitespace-nowrap"
                    aria-current={active ? "page" : undefined}
                    style={{ color: active ? "var(--amber)" : "var(--warm-grey)" }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div
            className="hidden lg:flex items-center gap-3"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              transitionDelay: "160ms",
            }}
          >
            <LangSwitch lang={lang} />
            {/* Kein Lead beim Klick: öffnet nur das Formular-Overlay. */}
            <a
              href={lp(lang, "/kontakt")}
              onClick={(e) => {
                e.preventDefault();
                openContactForm("Nav-CTA", "objekt");
              }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold whitespace-nowrap btn-amber"
              style={{ background: "var(--amber)", color: "#12141a", fontSize: 13 }}
            >
              {NAV_CTA[lang]}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
