"use client";

import { useEffect, useState } from "react";

const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

/**
 * Knappheits-Hinweis: begrenzte kostenlose Demo-Plaetze im laufenden Monat.
 * Der Monatsname kommt aus dem Browser-Datum, damit die Zeile automatisch
 * mitlaeuft und nicht jeden Monat von Hand angepasst werden muss. Erst nach
 * dem Mount gerendert, damit Server- und Client-Markup nicht auseinanderlaufen
 * (die Seite ist statisch exportiert, das Datum ist beim Build ein anderes).
 */
export default function DemoSlotsBadge({ className = "" }: { className?: string }) {
  const [month, setMonth] = useState<string | null>(null);

  useEffect(() => {
    setMonth(MONTHS[new Date().getMonth()]);
  }, []);

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
      Nur 3 kostenlose Demo-Plätze im {month}
    </span>
  );
}
