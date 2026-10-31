import type { Lang } from "@/lib/i18n";

/** FAQ und Abschluss-CTA der Vor-Ort-Erfassung — gleich auf Startseite und /vor-ort-erfassung. */
export const ERFASSUNG_FAQ: Record<Lang, { eyebrow: string; heading: string; items: { q: string; a: string }[] }> = {
  de: {
    eyebrow: "Bevor du fragst",
    heading: "Einwände, die uns oft begegnen.",
    items: [
      {
        q: "Ich kann das später auch selbst im Büro eingeben.",
        a: "Kannst du. Genau diese zweite Erfassung soll wegfallen. Die Informationen, die du vor Ort ohnehin aufnimmst, werden direkt strukturiert gespeichert.",
      },
      {
        q: "Was passiert, wenn ich ein falsches Maß einspreche?",
        a: "Das System kann nur mit den Informationen arbeiten, die vor Ort angegeben werden. Ein falsch genanntes Maß wird nicht automatisch richtig. Deshalb müssen die erfassten Daten prüfbar bleiben.",
      },
      {
        q: "Muss ich trotzdem jeden Raum fotografieren?",
        a: "Nein. Das Video ist das Hauptmaterial. Fotos werden nur dort ergänzt, wo sie sinnvoll sind.",
      },
      {
        q: "Verändert die KI echte Räume für die Vermarktung?",
        a: "Reale Maße, Fenster und die bauliche Situation bleiben unverändert. Wenn Einrichtungsvorschläge verwendet werden, sind sie klar als solche gekennzeichnet.",
      },
      {
        q: "Ist meine Objekt-Website danach automatisch online?",
        a: "Nein. Der Agent baut die Website. Die Veröffentlichung erfolgt separat und bewusst durch dich.",
      },
    ],
  },
  es: {
    eyebrow: "Antes de que preguntes",
    heading: "Objeciones que oímos a menudo.",
    items: [
      {
        q: "Esto lo puedo meter yo después en la oficina.",
        a: "Puedes. Justo ese segundo registro es lo que queremos eliminar. La información que ya recoges en el lugar se guarda directamente de forma ordenada.",
      },
      {
        q: "¿Qué pasa si dicto una medida equivocada?",
        a: "El sistema solo puede trabajar con lo que se indica en el lugar. Una medida mal dicha no se corrige sola. Por eso los datos registrados tienen que poder revisarse.",
      },
      {
        q: "¿Tengo que fotografiar igualmente cada estancia?",
        a: "No. El vídeo es el material principal. Las fotos solo se añaden donde tienen sentido.",
      },
      {
        q: "¿La IA cambia las estancias reales para la venta?",
        a: "Las medidas reales, las ventanas y la situación constructiva no se modifican. Si se usan propuestas de decoración, se marcan claramente como tales.",
      },
      {
        q: "¿Mi web del inmueble queda publicada automáticamente?",
        a: "No. El agente construye la web. La publicación se hace aparte y la decides tú.",
      },
    ],
  },
};

export const ERFASSUNG_CTA: Record<Lang, { heading: string; sub: string; button: string; note: string }> = {
  de: {
    heading: "Nimm beim nächsten Objekt nicht noch mehr Arbeit mit zurück ins Büro.",
    sub: "Teste Onyx.AI mit einem echten Objekt und sieh dir an, was aus einem einzigen Rundgang entsteht.",
    button: "Erstes Objekt ausprobieren",
    note: "Kein Abo, keine monatliche Verpflichtung — Abrechnung pro Objekt.",
  },
  es: {
    heading: "No te lleves más trabajo a la oficina en el próximo inmueble.",
    sub: "Prueba Onyx.AI con un inmueble real y mira lo que sale de un solo recorrido.",
    button: "Probar mi primer inmueble",
    note: "Sin suscripción ni permanencia mensual: se factura por inmueble.",
  },
};
