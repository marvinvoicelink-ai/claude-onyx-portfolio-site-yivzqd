import fs from 'node:fs/promises';
import path from 'node:path';
import { angemeldet } from '@/lib/auth';
import { UPLOAD_ORDNER } from '@/lib/db';

const TYPEN: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.heic': 'image/heic',
  '.heif': 'image/heif',
};

/** Liefert selbst aufgenommene Fotos aus data/uploads aus. */
export async function GET(_anfrage: Request, ctx: { params: Promise<{ datei: string }> }) {
  if (!(await angemeldet())) return new Response('Nicht angemeldet', { status: 401 });

  const { datei } = await ctx.params;
  // Nur der reine Dateiname, damit kein Pfad nach oben ausbrechen kann.
  const name = path.basename(datei);
  const typ = TYPEN[path.extname(name).toLowerCase()];
  if (!typ || name !== datei) return new Response('Nicht gefunden', { status: 404 });

  try {
    const inhalt = await fs.readFile(path.join(UPLOAD_ORDNER, name));
    return new Response(new Uint8Array(inhalt), {
      headers: {
        'Content-Type': typ,
        'Cache-Control': 'private, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Nicht gefunden', { status: 404 });
  }
}
