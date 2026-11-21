"use client";

import { useEffect, useState } from "react";

import type { Lang } from "@/lib/i18n";

const MONTHS: Record<Lang, string[]> = {
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
};

const LABEL: Record<Lang, (month: string) => string> = {
  de: (m) => `Nur 3 kostenlose Demo-Plätze im ${m}`,
  es: (m) => `Solo 3 demos gratuitas en ${m}`,
};

/**
 * Knappheits-Hinweis: begrenzte kostenlose Demo-Plaetze im laufenden Monat.
 * Der Monatsname kommt aus dem Browser-Datum, damit die Zeile automatisch
 * mitlaeuft und nicht jeden Monat von Hand angepasst werden muss. Erst nach
 * dem Mount gerendert, damit Server- und Client-Markup nicht auseinanderlaufen
 * (die Seite ist statisch exportiert, das Datum ist beim Build ein anderes).
 */
export default function DemoSlotsBadge({ lang = "de", className = "" }: { lang?: Lang; className?: string }) {
  const [month, setMonth] = useState<string | null>(null);

  useEffect(() => {
    setMonth(MONTHS[lang][new Date().getMonth()]);
  }, [lang]);

  if (!month) return null;

  return (
    <span
      className={`mono inline-flex items-center gap-2 ${className}`}
      style={{
        fontSize: 12,
        letterSpacing: "0.02em",
        color: "var(--amber)",
        border: "1px solid rgba(232,163,61,0.4)",
        background: "var(--amber-soft)",
        borderRadius: 999,
        padding: "6px 12px",
      }}
    >
      <span
        className="inline-block rounded-full"
        style={{ width: 6, height: 6, background: "var(--amber)", boxShadow: "0 0 8px 1px rgba(232,163,61,0.6)", flexShrink: 0 }}
      />
      {LABEL[lang](month)}
    </span>
  );
}
