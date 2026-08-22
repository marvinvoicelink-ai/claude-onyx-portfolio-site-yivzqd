const DATUM = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
const DATUM_LANG = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
const ZEIT = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
const WOCHENTAG = new Intl.DateTimeFormat('de-DE', { weekday: 'short' });

export function datum(iso: string | null | undefined): string {
  if (!iso) return '–';
  return DATUM.format(new Date(iso));
}

export function datumLang(iso: string | null | undefined): string {
  if (!iso) return '–';
  return DATUM_LANG.format(new Date(iso));
}

export function datumZeit(iso: string | null | undefined): string {
  if (!iso) return '–';
  const d = new Date(iso);
  return `${WOCHENTAG.format(d)}, ${DATUM.format(d)}, ${ZEIT.format(d)} Uhr`;
}

/** Ganze Tage bis zum Datum. Negativ = ueberfaellig. */
export function tageBis(iso: string | null | undefined, heute = new Date()): number | null {
  if (!iso) return null;
  const ziel = new Date(iso);
  const a = Date.UTC(ziel.getFullYear(), ziel.getMonth(), ziel.getDate());
  const b = Date.UTC(heute.getFullYear(), heute.getMonth(), heute.getDate());
  return Math.round((a - b) / 86_400_000);
}

export function fristText(tage: number | null): string {
  if (tage === null) return 'Keine Frist';
  if (tage < 0) return `${Math.abs(tage)} Tage überfällig`;
  if (tage === 0) return 'Heute fällig';
  if (tage === 1) return 'Morgen fällig';
  return `in ${tage} Tagen`;
}

export function flaeche(wert: string): string {
  return wert ? `${wert} m²` : '–';
}

export function oderStrich(wert: string | null | undefined): string {
  return wert && wert.trim() ? wert : '–';
}
