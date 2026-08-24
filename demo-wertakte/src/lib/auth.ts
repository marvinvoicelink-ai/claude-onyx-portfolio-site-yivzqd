import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { DEMO_KONTO } from './demo-konto';

/*
 * Ein Demo-Zugang, signiertes Session-Cookie. Kein Rollensystem - fuer den
 * Demo-Durchlauf reicht ein Konto. Im Kundenprojekt uebernimmt das Supabase
 * Auth mit Rollen und Row Level Security.
 */

export { DEMO_KONTO } from './demo-konto';

const COOKIE = 'wertakte_sitzung';
const GEHEIMNIS = process.env.WERTAKTE_SECRET ?? 'demo-geheimnis-nur-fuer-die-vorfuehrung';

function signieren(wert: string): string {
  return createHmac('sha256', GEHEIMNIS).update(wert).digest('base64url');
}

function gueltig(token: string): boolean {
  // Am LETZTEN Punkt trennen: der Wert enthaelt die E-Mail und damit selbst Punkte.
  const trenner = token.lastIndexOf('.');
  if (trenner <= 0) return false;
  const wert = token.slice(0, trenner);
  const signatur = token.slice(trenner + 1);
  if (!wert || !signatur) return false;
  const erwartet = signieren(wert);
  const a = Buffer.from(signatur);
  const b = Buffer.from(erwartet);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function anmelden(email: string, passwort: string): Promise<boolean> {
  const passt =
    email.trim().toLowerCase() === DEMO_KONTO.email && passwort === DEMO_KONTO.passwort;
  if (!passt) return false;

  const wert = `${DEMO_KONTO.email}:${Date.now()}`;
  const store = await cookies();
  store.set(COOKIE, `${wert}.${signieren(wert)}`, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return true;
}

export async function abmelden(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function angemeldet(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE)?.value;
  return Boolean(token && gueltig(token));
}
