import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Die Demo speichert Fotos im Dateisystem unter data/uploads und liefert sie
  // ueber einen Route Handler aus. next/image wird bewusst nicht verwendet,
  // damit das Projekt ohne Bildoptimierungs-Dienst ueberall laeuft.
  outputFileTracingIncludes: {
    '/**': ['./seed/**'],
  },
  experimental: {
    // Fotos vom Handy sind schnell mehrere MB, und der Upload erlaubt
    // Mehrfachauswahl. Das Standardlimit von 1 MB reicht dafuer nicht.
    serverActions: { bodySizeLimit: '32mb' },
  },
};

export default nextConfig;
