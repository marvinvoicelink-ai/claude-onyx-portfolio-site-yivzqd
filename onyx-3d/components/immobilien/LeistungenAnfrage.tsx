"use client";

import { useEffect, useState } from "react";
import { trackLead } from "@/lib/trackLead";
import { LEISTUNGEN, LEISTUNG_WAEHLEN, type LeistungId } from "./leistungen";

/**
 * Anfrage-Formular der Landingpage /immobilien.
 *
 * Eine Absendung geht an Netlify Forms (Formular "leistungen"). Netlify leitet
 * sie selbst an das CRM weiter (/api/anfrage): Lead mit Status „Neu“, Push und
 * SMS an Marvin, Bestätigungsmail an den Absender. Marvin, 27.11.2026:
 * „Wichtig ist, dass die Kontakte, die sich wirklich eintragen, im CRM stehen.“
 * Erst wenn Netlify annimmt, zählt sie als Meta-`Lead` (Regel 09/2026).
 * Fällt Netlify aus, geht die Anfrage direkt ans CRM.
 */

const CRM_ANFRAGE = "https://onyxai-crm.vercel.app/api/anfrage";
const ROLLEN = ["Bauträger / Bauunternehmen", "Makler", "Andere"] as const;
const ERREICHBAR = ["Egal, einfach anrufen", "Vormittags", "Nachmittags", "Abends"] as const;

/** Woher kam der Besuch? Aus der Anzeige (utm/fbclid) oder direkt. */
function quelleAusAdresse() {
  try {
    const q = new URLSearchParams(window.location.search);
    const ausAnzeige = q.get("utm_source") === "meta" || q.has("fbclid");
    const motiv = q.get("utm_content");
    // Welche Seite: /immobilien, /immobilien/bautraeger, /immobilien/zeitraffer …
    const pfad = window.location.pathname.replace(/\.html$|\/$/g, "") || "/immobilien";
    const basis = ausAnzeige ? `Facebook-Anzeige · Landingpage ${pfad}` : `Landingpage ${pfad}`;
    return (motiv ? `${basis} · ${motiv}` : basis).slice(0, 90);
  } catch {
    return "Landingpage /immobilien";
  }
}

/**
 * vorauswahl: Leistung aus der Anzeige, die schon angehakt ist (Einstiege /immobilien/…).
 * rolle: auf den Seiten für Bauträger bzw. Makler schon ausgewählt.
 * auswahl: nur diese Leistungen zum Ankreuzen (Makler brauchen keinen Zeitraffer).
 * linkFeld: Feld für den Link zur Anzeige oder zum Exposé (Makler schicken uns ihr Objekt).
 */
export default function LeistungenAnfrage({
  vorauswahl,
  rolle,
  objektBeispiel = "z. B. Neubau mit 6 Villen, Finca mit Pool, Wohnung im Rohbau",
  auswahl,
  linkFeld,
}: { vorauswahl?: LeistungId; rolle?: (typeof ROLLEN)[number]; objektBeispiel?: string; auswahl?: LeistungId[]; linkFeld?: boolean } = {}) {
  const angebot = auswahl ? auswahl.map((id) => LEISTUNGEN.find((l) => l.id === id)!).filter(Boolean) : LEISTUNGEN;
  const [gewaehlt, setGewaehlt] = useState<Set<string>>(() => new Set(vorauswahl ? [vorauswahl] : []));
  const [status, setStatus] = useState<"bereit" | "sendet" | "ok" | "fehler">("bereit");

  useEffect(() => {
    function waehlen(e: Event) {
      const id = (e as CustomEvent<{ id: LeistungId }>).detail?.id;
      if (id) setGewaehlt((alt) => new Set(alt).add(id));
    }
    window.addEventListener(LEISTUNG_WAEHLEN, waehlen);
    return () => window.removeEventListener(LEISTUNG_WAEHLEN, waehlen);
  }, []);

  function umschalten(id: string) {
    setGewaehlt((alt) => {
      const neu = new Set(alt);
      if (neu.has(id)) neu.delete(id);
      else neu.add(id);
      return neu;
    });
  }

  async function absenden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("bot-field")) return;

    const text = (k: string) => String(d.get(k) ?? "").trim();
    const leistungen = LEISTUNGEN.filter((l) => gewaehlt.has(l.id)).map((l) => l.name);
    if (gewaehlt.has("sonstiges")) leistungen.push("Sonstiges");
    const quelle = quelleAusAdresse();

    const wunsch = [
      `Rolle: ${text("rolle")}`,
      `Interesse: ${leistungen.length ? leistungen.join(", ") : "noch offen"}`,
      text("objekt") && `Objekt/Projekt: ${text("objekt")}`,
      text("link") && `Link Anzeige/Exposé: ${text("link")}`,
      `Erreichbar: ${text("erreichbar")}`,
      text("nachricht") && `Nachricht: ${text("nachricht")}`,
    ]
      .filter(Boolean)
      .join("\n");

    const netlifyDaten = new URLSearchParams();
    d.forEach((v, k) => netlifyDaten.append(k, String(v)));
    netlifyDaten.set("leistungen", leistungen.join(", "));
    netlifyDaten.set("quelle", quelle);
    // Netlify leitet jede Absendung selbst ans CRM weiter (/api/anfrage liest
    // dort "wunsch"). Deshalb hier nur EIN Weg – sonst gäbe es jeden Lead und
    // jede SMS doppelt (Livetest 28.11.2026).
    netlifyDaten.set("wunsch", wunsch);

    setStatus("sendet");
    let netlifyOk = false;
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: netlifyDaten.toString(),
      });
      netlifyOk = res.ok;
    } catch {
      netlifyOk = false;
    }

    if (netlifyOk) {
      trackLead(`Landingpage: ${leistungen[0] ?? "allgemein"}`);
      fertig();
      return;
    }

    // Nur wenn Netlify ausfällt: direkt ins CRM, damit die Anfrage nicht verloren geht.
    try {
      const res = await fetch(CRM_ANFRAGE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: text("name"),
          firma: text("firma") || text("name"),
          email: text("email"),
          telefon: text("telefon"),
          wunsch,
          quelle,
          website: "",
        }),
      });
      if (res.ok) {
        fertig();
        return;
      }
    } catch {
      // fällt unten in die Fehlermeldung
    }
    setStatus("fehler");

    function fertig() {
      setStatus("ok");
      form.reset();
      setGewaehlt(new Set());
    }
  }

  const feld = {
    background: "var(--near-black)",
    border: "1px solid var(--hairline)",
    color: "var(--warm-grey)",
    fontSize: 16,
  } as const;
  const label = { fontSize: 13, color: "var(--warm-grey-dim)", marginBottom: 6, display: "block" } as const;

  if (status === "ok") {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ background: "var(--near-black)", border: "1px solid var(--amber)" }} role="status">
        <div style={{ fontSize: 34, marginBottom: 8 }} aria-hidden="true">✓</div>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 10 }}>Danke – Ihre Anfrage ist da.</h3>
        <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
          Marvin meldet sich persönlich bei Ihnen, in der Regel innerhalb eines Werktages. Wenn Sie schon Fotos oder Pläne haben, legen Sie sie gern bereit.
        </p>
      </div>
    );
  }

  return (
    <form name="leistungen" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={absenden} className="grid gap-5">
      <input type="hidden" name="form-name" value="leistungen" />
      {/* Werden beim Absenden gesetzt; stehen hier, damit Netlify dieselben Felder sieht wie im RootShell-Duplikat. */}
      <input type="hidden" name="leistungen" value="" />
      <input type="hidden" name="quelle" value="" />
      <input type="hidden" name="wunsch" value="" />
      <p hidden>
        <label>
          Nicht ausfüllen: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <fieldset>
        <legend style={label}>Was interessiert Sie? (mehrere möglich)</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[...angebot.map((l) => ({ id: l.id as string, name: l.name })), { id: "sonstiges", name: "Etwas anderes" }].map((l) => {
            const an = gewaehlt.has(l.id);
            return (
              <label
                key={l.id}
                className="flex items-center gap-3 rounded-[10px] px-4 py-3 cursor-pointer"
                style={{ border: `1px solid ${an ? "var(--amber)" : "var(--hairline)"}`, background: an ? "var(--amber-soft)" : "var(--near-black)" }}
              >
                <input type="checkbox" checked={an} onChange={() => umschalten(l.id)} style={{ accentColor: "#e8a33d", width: 18, height: 18 }} />
                <span style={{ fontSize: 15 }}>{l.name}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend style={label}>Sie sind *</legend>
        <div className="flex flex-wrap gap-2.5">
          {ROLLEN.map((r) => (
            <label key={r} className="flex items-center gap-2.5 rounded-[10px] px-4 py-3 cursor-pointer" style={{ border: "1px solid var(--hairline)", background: "var(--near-black)" }}>
              <input type="radio" name="rolle" value={r} required defaultChecked={r === rolle} style={{ accentColor: "#e8a33d", width: 18, height: 18 }} />
              <span style={{ fontSize: 15 }}>{r}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label>
          <span style={label}>Ihr Name *</span>
          <input name="name" required autoComplete="name" className="w-full rounded-[10px] px-4 py-3" style={feld} />
        </label>
        <label>
          <span style={label}>Firma</span>
          <input name="firma" autoComplete="organization" className="w-full rounded-[10px] px-4 py-3" style={feld} />
        </label>
        <label>
          <span style={label}>Telefon *</span>
          <input name="telefon" type="tel" required autoComplete="tel" className="w-full rounded-[10px] px-4 py-3" style={feld} />
        </label>
        <label>
          <span style={label}>E-Mail</span>
          <input name="email" type="email" autoComplete="email" className="w-full rounded-[10px] px-4 py-3" style={feld} />
        </label>
      </div>

      <label>
        <span style={label}>Um welches Objekt oder Projekt geht es?</span>
        <input name="objekt" placeholder={objektBeispiel} className="w-full rounded-[10px] px-4 py-3" style={feld} />
      </label>

      {linkFeld && (
        <label>
          <span style={label}>Link zu Ihrer Anzeige oder Ihrem Exposé (optional)</span>
          <input name="link" inputMode="url" autoComplete="url" placeholder="z. B. Ihr Inserat auf Idealista oder ImmoScout24" className="w-full rounded-[10px] px-4 py-3" style={feld} />
        </label>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label>
          <span style={label}>Wann erreichen wir Sie am besten?</span>
          <select name="erreichbar" className="w-full rounded-[10px] px-4 py-3" style={feld} defaultValue={ERREICHBAR[0]}>
            {ERREICHBAR.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          <span style={label}>Nachricht (optional)</span>
          <input name="nachricht" className="w-full rounded-[10px] px-4 py-3" style={feld} />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={status === "sendet"} className="inline-flex shrink-0 whitespace-nowrap justify-center items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber" style={{ color: "#12141a", fontSize: 16 }}>
          {status === "sendet" ? "Wird gesendet …" : "Anfrage senden"}
        </button>
        <p style={{ fontSize: 12.5, color: "var(--warm-grey-faint)", lineHeight: 1.5 }}>
          <span style={{ display: "block", color: "var(--warm-grey-dim)", fontSize: 14, marginBottom: 4 }}>Marvin ruft Sie persönlich an, in der Regel innerhalb eines Werktags. Kein Newsletter.</span>
          Ihre Angaben nutzen wir nur, um Sie zu Ihrer Anfrage zu kontaktieren. Mehr in der <a href="/datenschutz" style={{ textDecoration: "underline" }}>Datenschutzerklärung</a>.
        </p>
      </div>
      {status === "fehler" && (
        <p role="alert" style={{ color: "#f0a0a0", fontSize: 14 }}>
          Das hat leider nicht geklappt. Bitte versuchen Sie es noch einmal oder schreiben Sie an info@onyx-ai.de.
        </p>
      )}
    </form>
  );
}
