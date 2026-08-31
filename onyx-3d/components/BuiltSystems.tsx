"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Gebaute Systeme nebeneinander, je ein Screen und zwei Saetze dazu.
 *
 * Jede Kachel zeigt den ersten Screen; ein Klick oeffnet ihn gross, und mit
 * den Pfeilen blaettert man durch die weiteren Seiten desselben Systems.
 * Die Kachel ist oben beschnitten — erst in der Grossansicht sind Zahlen und
 * Beschriftungen lesbar.
 */
const systems = [
  {
    branche: "Garten- & Landschaftsbau",
    title: "Projekte, die über Wochen laufen.",
    text: "Angebote, Projektstatus, Auslastung und Bestände in einem Dashboard. Der Wortschatz folgt dem Betrieb: hier heißen Aufträge Projekte und laufen über Wochen statt über Tage.",
    screens: [
      {
        src: "/generated/tablet-garten.png",
        label: "Dashboard",
        alt: "Dashboard für ein Unternehmen mit Projektgeschäft: Angebote, Projektstatus und Auslastung",
      },
      {
        src: "/generated/garten-angebote.png",
        label: "Angebote",
        alt: "Angebotsliste mit Kunde, Betrag, Laufzeit und Status bis hin zu automatisch versendet",
      },
      {
        src: "/generated/garten-projekte.png",
        label: "Projekte",
        alt: "Baustellen mit Bereich, Zeitraum, zugewiesenen Mitarbeitern und Fortschritt",
      },
      {
        src: "/generated/garten-lager.png",
        label: "Lager",
        alt: "Baustoffbestände mit Mindestbestand und Kennzeichnung, was leer oder knapp ist",
      },
    ],
  },
  {
    branche: "Handwerk & Dienstleistung",
    title: "Angebot, Rechnung, Zahlungseingang — ohne Nachfassen.",
    text: "Offene Rechnungen, laufende Aufträge und knappe Bestände auf einen Blick. Zahlungserinnerungen gehen automatisch raus, jeder Schritt landet im Protokoll.",
    screens: [
      {
        src: "/generated/tablet-handwerk.png",
        label: "Dashboard",
        alt: "Dashboard eines Dienstleistungsbetriebs: offene Rechnungen, Aufträge, Bestände und automatische Aktionen",
      },
      {
        src: "/generated/handwerk-angebote.png",
        label: "Angebote",
        alt: "Angebotsliste mit Kunde, Betrag, Gültigkeit und Status bis hin zu automatisch versendet",
      },
      {
        src: "/generated/handwerk-kunden.png",
        label: "Kunden",
        alt: "Kundenstamm mit Gewerk, Kontaktdaten, Kundenbeginn und Gesamtumsatz",
      },
      {
        src: "/generated/handwerk-auftraege.png",
        label: "Aufträge",
        alt: "Aufträge mit Gewerk, Zeitraum, zugewiesenen Monteuren, Materialhinweis und Fortschritt",
      },
      {
        src: "/generated/handwerk-lager.png",
        label: "Lager",
        alt: "Materialbestände mit Mindestbestand und Kennzeichnung, was leer oder knapp ist",
      },
    ],
  },
  {
    branche: "Hausverwaltung",
    title: "Jedes Gebäude mit eigenem Profil.",
    text: "Objekte, Aufträge, Mieter, Schäden und Dokumente in einem System statt in fünf Tabellen. Gebaut, übergeben und beim Kunden gehostet.",
    screens: [
      {
        src: "/generated/hm-dashboard.png",
        label: "Dashboard",
        alt: "Dashboard mit Kennzahlen, aktuellen Aufträgen, kritischen Schäden und Aktivitätslog",
      },
      {
        src: "/generated/hausmanager-auftraege.jpg",
        label: "Aufträge",
        alt: "Auftragsübersicht mit Objekt, Mitarbeiter, Priorität und Status",
      },
      {
        src: "/generated/hm-schaeden.png",
        label: "Schäden",
        alt: "Schadensmeldungen mit Priorität, Objekt, Beschreibung und wer den Schaden gemeldet hat",
      },
      {
        src: "/generated/hm-mitarbeiter.png",
        label: "Mitarbeiter",
        alt: "Mitarbeiter mit Verfügbarkeit, Kontaktwegen über WhatsApp und Telefon und aktiven Aufträgen",
      },
    ],
  },
  {
    branche: "Immobilien & Makler",
    title: "Objekt, Exposé und Nachweise in einer Akte.",
    text: "Fotos direkt am Objekt aufnehmen, Unterlagen, Investoren und Termine im selben Vorgang. Vor dem Versand prüft das System selbst, ob Provisionsvereinbarung, Widerrufsbelehrung und Adressvalidierung vorliegen, und hält das Exposé zurück, solange etwas fehlt. Ein Klick legt die Akte als App aufs Handy.",
    screens: [
      {
        src: "/generated/immo-akte.png",
        label: "Objektakte",
        alt: "Maklersoftware: Objektakte mit Kaufpreis, Mieteinnahmen, Faktor, Erfassungsbogen und den Prüfungen vor dem Exposé-Versand",
      },
      {
        src: "/generated/immo-objekte.png",
        label: "Objekte",
        alt: "Maklersoftware: Objektliste mit Aktenzeichen, Eigentümer, Kaufpreis, Unterlagenstand und Status",
      },
      {
        src: "/generated/immo-kontakte.png",
        label: "Kontakte",
        alt: "Maklersoftware: Kontakte nach Eigentümer, Investor, Privatkunde, Notariat und Bank getrennt",
      },
      {
        src: "/generated/immo-protokoll.png",
        label: "Protokoll",
        alt: "Maklersoftware: revisionssicheres Protokoll mit Zeitpunkt, Vorgang und Bearbeiter",
      },
    ],
  },
];

export default function BuiltSystems({ blatt }: { blatt?: string }) {
  // [System, Screen] der Grossansicht; null = zu.
  const [open, setOpen] = useState<[number, number] | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback((dir: number) => {
    setOpen((cur) => {
      if (!cur) return cur;
      const [s, i] = cur;
      const n = systems[s].screens.length;
      // Umlaufend: nach der letzten Seite kommt wieder die erste.
      return [s, (i + dir + n) % n];
    });
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const sys = open ? systems[open[0]] : null;
  const shot = open && sys ? sys.screens[open[1]] : null;

  return (
    <section className="py-12">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Gebaute Systeme` : "Gebaute Systeme"}
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "24ch", marginBottom: 12 }}>
          Aus Tool-Chaos wird <span className="accent">ein System</span>
        </h2>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "62ch", marginBottom: 32 }}>
          Immobilien, Handwerk, Garten- &amp; Landschaftsbau, Hausverwaltung —
          vier Branchen, ein Prinzip: nach dem Ablauf des Betriebs gebaut statt
          nach einer Vorlage, mit Automatisierung von Anfang an und danach
          vollständig übergeben. Jeder Screen ist ein Beispiel dafür, wie so
          ein System aussehen kann — deins wird auf deinen Betrieb
          zugeschnitten. Klick zeigt ihn groß, mit den Pfeilen geht es durch
          die weiteren Seiten.
        </p>

        {/* Vier Systeme, deshalb zwei Spalten statt drei: sonst haengt das
            vierte allein in der zweiten Reihe. Groessere Kacheln lassen die
            Screens ausserdem lesbar. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          {systems.map((s, si) => (
            <div
              key={s.branche}
              className="rounded-2xl overflow-hidden on-dark silver-rim flex flex-col"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setOpen([si, 0]);
                }}
                aria-label={`${s.branche}: ${s.screens.length} Screens ansehen`}
                className="zoom-tile relative w-full block"
                style={{ aspectRatio: "16 / 10", cursor: "zoom-in", background: "none", border: "none", padding: 0 }}
              >
                <Image
                  src={s.screens[0].src}
                  alt={s.screens[0].alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 92vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
                <span className="zoom-hint" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="M11 8v6M8 11h6M20 20l-4.5-4.5" />
                  </svg>
                  {s.screens.length} Seiten ansehen
                </span>
              </button>
              <div className="px-6 py-5">
                <span
                  className="mono block mb-2"
                  style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
                >
                  {s.branche}
                </span>
                <div className="display" style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 7, lineHeight: 1.2 }}>
                  {s.title}
                </div>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {s.text}
                </p>
                {/* Kein Versprechen auf ein fertiges Produkt: die Screens
                    zeigen, wie es aussehen kann, nicht was der Kunde kauft. */}
                <p
                  className="mono"
                  style={{ fontSize: 11, color: "var(--warm-grey-faint)", marginTop: 12, lineHeight: 1.5 }}
                >
                  Beispiel — so kann ein System für diese Branche aussehen.
                  {" "}{s.screens.length} Seiten zum Durchblättern.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sys && shot && open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${sys.branche}: ${shot.label}`}
          onClick={close}
          className="zoom-overlay"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Vorherige Seite"
            className="zoom-nav zoom-prev"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
              <path d="M15 18 9 12l6-6" />
            </svg>
          </button>

          {/* stopPropagation nur auf dem Bild: ein Klick daneben schliesst. */}
          <figure onClick={(e) => e.stopPropagation()} className="zoom-figure">
            <img src={shot.src} alt={shot.alt} className="zoom-img" />
            <figcaption className="zoom-cap">
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
                {sys.branche}
              </span>
              <span style={{ fontWeight: 600 }}>{shot.label}</span>
              {/* Punkte statt nur einer Zahl: man sieht sofort, wie viele
                  Seiten es gibt und wo man steht. */}
              <span className="zoom-dots" aria-hidden="true">
                {sys.screens.map((sc, i) => (
                  <i key={sc.src} className={i === open[1] ? "on" : ""} />
                ))}
              </span>
              <span className="mono" style={{ fontSize: 11, color: "var(--warm-grey-faint)" }}>
                {open[1] + 1} von {sys.screens.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Nächste Seite"
            className="zoom-nav zoom-next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <button ref={closeRef} type="button" onClick={close} aria-label="Ansicht schließen" className="zoom-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={18} height={18}>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
