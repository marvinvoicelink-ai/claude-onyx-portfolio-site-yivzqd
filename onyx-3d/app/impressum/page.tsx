import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum — Onyx.AI",
  description: "Impressum von Onyx.AI, Marvin Weiß-Drumm.",
};

export default function ImpressumPage() {
  return (
    <main>
      <section className="py-16" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <Link
            href="/"
            className="mono inline-flex items-center gap-2 mb-6"
            style={{ fontSize: 12.5, color: "var(--amber)" }}
          >
            ← Zur Startseite
          </Link>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Rechtliches
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)" }}>Impressum</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto px-7 legal-content" style={{ maxWidth: 760 }}>
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Marvin Weiß-Drumm
            <br />
            Zweibrücker Straße 23
            <br />
            76829 Landau in der Pfalz
            <br />
            Deutschland
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: <a href="tel:+4917632273522">0176 322 273 522</a>
            <br />
            E-Mail: <a href="mailto:info@onyx-ai.de">info@onyx-ai.de</a>
          </p>

          <h2>Umsatzsteuer</h2>
          <p>Es wird keine Umsatzsteuer-Identifikationsnummer ausgewiesen.</p>

          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>Marvin Weiß-Drumm (Anschrift wie oben)</p>

          <h2>Streitschlichtung</h2>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
            Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die
            auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
            Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
            wir diese Inhalte umgehend entfernen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter (z. B.
            WhatsApp, Calendly), auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
            jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <p>
            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
            mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
            zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
            inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
            konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
            Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
            Links umgehend entfernen.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
