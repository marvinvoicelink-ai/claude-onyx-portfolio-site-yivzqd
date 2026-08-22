# Onyx Designsystem „Dunkel/Amber“

Verbindliche Oberflächen-Sprache für **Onyx-eigene** Frontends: Demos,
Vorführsoftware, Eigenprodukte. Near-Black als Grund, Amber `#E8A33D` als
einziger Akzent, warmes Hellgrau `#F5F2EC` als Text, Glow-Rahmen um die
Anwendung, Icon-Leiste links, Mono für Zahlen und Etiketten.

Dieselben Farben und Schriften wie onyx-ai.de, übersetzt auf Software statt
Marketingseite.

## Dateien

| Datei | Zweck |
| --- | --- |
| `onyx-dunkel.css` | Das System. Reines CSS, keine Framework-Abhängigkeit. |
| `referenz.html` | Musterseite mit allen Bausteinen. Im Browser öffnen. |

`referenz.html` ist eine interne Musterseite zum Nachschlagen, kein Webauftritt.

## Verwenden

**In einem Tailwind-v4-Projekt** die Datei ins Projekt kopieren, in der
globalen CSS importieren und die Tokens über `@theme inline` auf Utilities
legen:

```css
@import "tailwindcss";
@import "./onyx-dunkel.css";

@theme inline {
  --font-sans: var(--onyx-schrift-text);
  --font-mono: var(--onyx-schrift-mono);
  --radius-karte: var(--onyx-radius);

  --color-grund: var(--onyx-grund-tief);
  --color-flaeche: var(--onyx-flaeche);
  --color-text: var(--onyx-text);
  --color-text-leise: var(--onyx-text-leise);
  --color-akzent: var(--onyx-amber);
  /* ... vollständige Zuordnung siehe demo-wertakte/src/app/globals.css */
}
```

Am `<html>` die Klasse `onyx` setzen. Ein Arbeitsbeispiel steht in
`demo-wertakte/`, dort holt `npm run stil:sync` diese Datei ins Projekt.

**Ohne Tailwind** genügt der Import der Datei und `class="onyx"` am `<html>`.
Die Komponentenklassen (`onyx-karte`, `onyx-knopf-primaer`, …) funktionieren
unabhängig.

## Schriften

Archivo (Überschriften), Instrument Sans (Fließtext), IBM Plex Mono
(Etiketten, Zahlen, Aktenzeichen). In Anwendungen selbst hosten, damit nichts
von fremden Servern nachgeladen wird:

```bash
npm install @fontsource-variable/archivo @fontsource-variable/instrument-sans @fontsource/ibm-plex-mono
```

## Bausteine

`onyx-rahmen` · `onyx-karte` / `onyx-karte-klick` · `onyx-kachel` mit
`onyx-kachel-zahl` · `onyx-etikett` · `onyx-rail` / `onyx-rail-punkt` ·
`onyx-knopf` mit `-primaer` / `-leise` / `-klar` / `-gefahr` · `onyx-feld` /
`onyx-suche` · `onyx-marke` mit `-laeuft` / `-ruht` / `-fertig` / `-warn` ·
`onyx-balken` · `onyx-schiene` · `onyx-register` / `onyx-zeile` · `onyx-leer` ·
`onyx-kein-druck`

## Regeln

1. Ein Akzent. Amber, sonst nichts. Rot, Grün und Grau sind Signale mit
   Bedeutung, keine zweiten Akzente.
2. Ein Amber-Knopf je Bildschirmbereich.
3. Farbwerte nur im Block „Themenebene“ der CSS-Datei, nie in Komponenten.
4. Zahlen, Aktenzeichen, Datum und Etiketten in Mono mit `tabular-nums`.
5. Ein Eckenmaß: 12 px Karten, 8 px Knöpfe und Felder. Nichts dazwischen.
6. Glow genau einmal je Seite, am äußeren Rahmen. Nicht auf Karten.
7. Trennen durch Haarlinie und Weißraum, nicht durch Kartenrahmen um alles.
8. Bewegung nur, wenn sie etwas erklärt, immer über `prefers-reduced-motion`
   abschaltbar.
9. Dokumente, die gedruckt werden, bleiben Papier: heller Grund, Serifenschrift.
10. Komponenten liegen im Layer `components`, damit Tailwind-Utilities sie
    überstimmen können. Nicht ungelayert schreiben.

## Kundenprojekte

Amber ist die Onyx-Handschrift und bleibt bei Onyx. Ein System, das an einen
Kunden übergeben wird, erbt Struktur, Komponenten und Regeln, bekommt aber
das CI des Kunden: nur der Block „Themenebene“ am Kopf der CSS-Datei wird
ersetzt, alles darunter bleibt unverändert.

## Barrierefreiheit

Alle Text-Rollen erreichen auf den Grundflächen mindestens WCAG AA
(Text 16,2:1, Text-leise 6,6:1, Text-still 4,8:1, Amber 8,4:1, Warn 5,0:1 auf
`--onyx-flaeche`). Wer Farbwerte ändert, prüft diese Paare erneut.
