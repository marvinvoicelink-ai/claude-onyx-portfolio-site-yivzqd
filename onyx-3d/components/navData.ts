import { getOfferings } from "@/lib/offerings";
import { lp, type Lang } from "@/lib/i18n";

/** Pfade sind die deutschen Basispfade, lp() macht daraus die Adresse der jeweiligen Sprache. */
export const NAV_LINKS: Record<Lang, { href: string; label: string }[]> = {
  de: [
    { href: "/", label: "Startseite" },
    { href: "/angebot", label: "Angebot" },
    { href: "/fuer-dich", label: "Für dich" },
    { href: "/problem", label: "Problem" },
    { href: "/referenzen", label: "Referenzen" },
    { href: "/faq", label: "FAQ" },
    { href: "/ueber-mich", label: "Über mich" },
  ],
  es: [
    { href: "/", label: "Inicio" },
    { href: "/angebot", label: "Servicios" },
    { href: "/fuer-dich", label: "Para ti" },
    { href: "/problem", label: "El problema" },
    { href: "/referenzen", label: "Casos" },
    { href: "/faq", label: "FAQ" },
    { href: "/ueber-mich", label: "Nosotros" },
  ],
};

export const NAV_CTA: Record<Lang, string> = {
  de: "Objekt ausprobieren",
  es: "Probar con un inmueble",
};

const AUTOMATION_LINKS: Record<Lang, { href: string; label: string }[]> = {
  de: [
    { href: "/ki-agenten", label: "KI-Agenten" },
    { href: "/automatisierungen", label: "Automatisierungen" },
  ],
  es: [
    { href: "/ki-agenten", label: "Agentes de IA" },
    { href: "/automatisierungen", label: "Automatizaciones" },
  ],
};

/** Per-offering deep links — automatisierung gets its own dedicated pages instead of an /angebot anchor. */
export function offeringLinks(lang: Lang) {
  return getOfferings(lang).flatMap((o) =>
    o.slug === "automatisierung"
      ? AUTOMATION_LINKS[lang].map((l) => ({ href: lp(lang, l.href), label: l.label }))
      : [{ href: lp(lang, `/angebot/${o.slug}`), label: o.title.replace(/\.$/, "") }],
  );
}
