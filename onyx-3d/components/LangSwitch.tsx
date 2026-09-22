"use client";

import { usePathname } from "next/navigation";
import { LANG_STORAGE_KEY, switchPath, type Lang } from "@/lib/i18n";

const OPTIONS: { lang: Lang; label: string; title: string }[] = [
  { lang: "de", label: "DE", title: "Deutsch" },
  { lang: "es", label: "ES", title: "Español" },
];

/**
 * DE/ES-Umschalter. Die Wahl wird gespeichert und hat danach Vorrang vor der
 * automatischen Erkennung (Browsersprache/Land), siehe LANG_DETECT_SCRIPT.
 * Normale <a>-Links: Die Sprachen liegen in zwei Root-Layouts, der Wechsel
 * ist ohnehin ein kompletter Seitenaufruf.
 */
export default function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";

  return (
    <div
      className="mono inline-flex items-center rounded-full"
      style={{ fontSize: 11.5, border: "1px solid var(--hairline)", padding: 2 }}
      aria-label={lang === "de" ? "Sprache wählen" : "Elegir idioma"}
    >
      {OPTIONS.map((o) => {
        const active = o.lang === lang;
        return (
          <a
            key={o.lang}
            href={switchPath(pathname, o.lang)}
            hrefLang={o.lang}
            lang={o.lang}
            title={o.title}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              try {
                localStorage.setItem(LANG_STORAGE_KEY, o.lang);
              } catch {}
            }}
            className="rounded-full"
            style={{
              padding: "4px 9px",
              letterSpacing: "0.04em",
              background: active ? "var(--amber)" : "transparent",
              color: active ? "#161104" : "var(--warm-grey-dim)",
              fontWeight: active ? 600 : 400,
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {o.label}
          </a>
        );
      })}
    </div>
  );
}
