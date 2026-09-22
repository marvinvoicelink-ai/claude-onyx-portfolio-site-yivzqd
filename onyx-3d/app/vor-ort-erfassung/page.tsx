import type { Metadata } from "next";
import ErfassungHero from "@/components/erfassung/ErfassungHero";
import ErfassungDemo from "@/components/erfassung/ErfassungDemo";
import ErfassungSteps from "@/components/erfassung/ErfassungSteps";
import ErfassungRealCase from "@/components/erfassung/ErfassungRealCase";
import ErfassungBereiche from "@/components/erfassung/ErfassungBereiche";
import ErfassungVideoSection from "@/components/erfassung/ErfassungVideoSection";
import ErfassungSprachen from "@/components/erfassung/ErfassungSprachen";
import ErfassungPreise from "@/components/erfassung/ErfassungPreise";
import { AliveFaq } from "@/components/alive/AliveChrome";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vor-Ort-Erfassung — Onyx.AI",
  description:
    "Räume, Maße und Mängel direkt vor Ort einsprechen und filmen — Onyx.AI strukturiert die Angaben, erstellt eine schematische Zeichnung und baut daraus Baudokumentation, Aufmaß, Exposé oder Scroll-Website.",
};

const faqs = [
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
];

export default function VorOrtErfassungPage() {
  return (
    <main>
      <ErfassungHero />
      <ErfassungDemo />
      <ErfassungSteps />
      <ErfassungRealCase />
      <ErfassungBereiche />
      <ErfassungVideoSection />
      <ErfassungSprachen />
      <ErfassungPreise />

      <AliveFaq eyebrow="Bevor du fragst" heading="Einwände, die uns oft begegnen." faqs={faqs} />

      <CTABanner
        heading="Nimm beim nächsten Objekt nicht noch mehr Arbeit mit zurück ins Büro."
        sub="Teste Onyx.AI mit einem echten Objekt und sieh dir an, was aus einem einzigen Rundgang entsteht."
        buttonText="Erstes Objekt ausprobieren"
      />
      <p className="mono text-center" style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginTop: -8, marginBottom: 32 }}>
        Keine monatliche Verpflichtung. Abrechnung pro Objekt.
      </p>

      <Footer />
    </main>
  );
}
