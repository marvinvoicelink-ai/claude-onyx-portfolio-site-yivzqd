"use client";

import { LEISTUNG_WAEHLEN, type LeistungId } from "./leistungen";
import { noteCtaSource } from "@/lib/trackLead";

/** „Das will ich“: kreuzt die Leistung im Formular an und scrollt dorthin. */
export default function LeistungWaehlen({ id, name }: { id: LeistungId; name: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        noteCtaSource(`Landingpage: ${name}`);
        window.dispatchEvent(new CustomEvent(LEISTUNG_WAEHLEN, { detail: { id } }));
        // Direkt zum Formular, damit man den gesetzten Haken sieht (am Handy steht der Angebotstext davor).
        document.getElementById("anfrage-formular")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 font-semibold btn-amber"
      style={{ color: "#12141a", fontSize: 15 }}
    >
      Das will ich <span aria-hidden="true">→</span>
    </button>
  );
}
