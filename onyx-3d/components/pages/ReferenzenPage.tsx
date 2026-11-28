import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { AliveCase } from "@/components/alive/AliveChrome";
import { alternates, type Lang } from "@/lib/i18n";
import PageIntro, { IntroText } from "./PageIntro";

type CaseText = { tag: string; heading: string; desc: string; bullets?: string[]; name?: string };

/** Bilder, Logos und Layout je Case — sprachunabhängig. */
const CASES: {
  key: string;
  name: string;
  image: string;
  logo?: string;
  logoBg?: "light" | "dark";
  imageRight?: boolean;
  background?: "dark" | "light";
}[] = [
  { key: "hausmanager", name: "HausManager Pro", image: "/generated/chaos-to-portal.webp", logo: "/logos/hwp.png" },
  { key: "speedfire", name: "Speedfire", image: "/generated/speedfire-case.png", imageRight: true },
  { key: "wetblock", name: "WETBlock", image: "/generated/wetblock-case.webp", imageRight: true, background: "light" },
  { key: "rebstoeckel", name: "Rebstöckel", image: "/generated/rebstoeckel-case.png", logo: "/logos/rebstoeckel.png" },
  { key: "pawplace", name: "PawPlace (HWD Handelsagentur)", image: "/generated/pawplace-case.png", imageRight: true, logo: "/logos/pawplace.png" },
  { key: "haas", name: "Haas Wasserkraft", image: "/generated/haas-wasserkraft-case.png", background: "light", logo: "/logos/haas-wasserkraft.png" },
  { key: "voicelink", name: "VoiceLink AI", image: "/generated/voicelink-case.png", imageRight: true, logo: "/logos/voicelink.png", logoBg: "dark" },
  { key: "websites", name: "Websites für mehrere Kunden", image: "/generated/websites-case.webp" },
];

const TEXT: Record<
  Lang,
  {
    meta: { title: string; description: string };
    kicker: string;
    title: string;
    intro: string;
    cases: Record<string, CaseText>;
    ctaHeading: string;
    ctaSub: string;
  }
> = {
  de: {
    meta: { title: "Referenzen — Onyx.AI", description: "Projekte, die Onyx.AI gebaut und übergeben hat." },
    kicker: "Referenzen",
    title: "Projekte, die wir gebaut haben.",
    intro: "Kein Produkt zum Kaufen — Beispiele dafür, was für dein Unternehmen möglich ist.",
    cases: {
      hausmanager: {
        tag: "Kundencase · gebaut & übergeben",
        heading: "Vom Excel-Chaos zum eigenen System.",
        desc: "Für eine Hausverwaltung haben wir ein komplettes CRM von Grund auf entwickelt und vollständig übergeben. Kein Produkt zum Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen möglich ist.",
      },
      speedfire: {
        tag: "Kundencase · Markenaufbau & Vermarktung",
        heading: "Von der Sattlerei zur eigenen Marke mit planbarem Umsatz.",
        desc: "Speedfire war vorher eine Sattlerei. Wir haben Speedfire dabei geholfen, ein komplett neues Produkt auf den Markt zu bringen, eine eigene Marke aufzubauen und dieses Produkt online zu vermarkten — mit nachweislich über 10.000 € Umsatz pro Monat.",
        bullets: [
          "Instagram-Account von 0 auf 333+ Follower in 4 Wochen aufgebaut",
          "Über 1.000 erreichte Konten pro Woche durch strategischen Content",
          "Nachweislich über 10.000 € Umsatz pro Monat mit dem neuen Produkt",
        ],
      },
      wetblock: {
        tag: "Kundencase · Automatisierung",
        heading: "Vom manuellen Versand zur automatisierten Kundenansprache.",
        desc: "Für WETBlock haben wir den E-Mail-Outreach an ihre Geschäftskunden automatisiert. Vorher musste das Team jede Ansprache an die Unternehmen, an die sie ihre Produkte verkaufen, von Hand schreiben und verschicken — heute läuft das automatisch.",
        bullets: [
          "Automatischer Versand · individuelle Ansprache ohne manuelles Schreiben",
          "Automatisches Nachfassen · reagiert auf Antworten oder Funkstille",
          "Zentrale Auswertung · zeigt, welche Ansprache tatsächlich ankommt",
        ],
      },
      rebstoeckel: {
        tag: "Kundencase · Pension & Weinstube",
        heading: "Zimmerbelegung auf einen Blick statt Zettelwirtschaft.",
        desc: "Für die Pension Rebstöckel haben wir ein Dashboard gebaut, das in Echtzeit zeigt, welche Zimmer frei und welche belegt sind — ohne Excel-Liste oder Buch an der Rezeption.",
        bullets: [
          "Zimmerübersicht mit Status frei/belegt in Echtzeit",
          "Belegungsquote auf einen Blick",
          "Weniger Doppelbuchungen durch eine zentrale Übersicht",
        ],
      },
      pawplace: {
        tag: "Kundencase · Online-Shop",
        heading: "Support-Anfragen zentral im Blick statt verstreut in Postfächern.",
        desc: "Für den Online-Shop PawPlace der HWD Handelsagentur haben wir ein Dashboard gebaut, das Kunden, Bestellstatus und offene Support-Tickets an einem Ort zeigt.",
        bullets: [
          "Kundenliste mit Bestellstatus auf einen Blick",
          "Offene Support-Tickets sofort sichtbar markiert",
          "Kein Suchen mehr in mehreren Postfächern",
        ],
      },
      haas: {
        tag: "Kundencase · Herstellung",
        heading: "Materialbestand und Umsatz in einem System statt zwei Baustellen.",
        desc: "Haas Wasserkraft stellt Filter für sauberes Wasser her. Wir haben ein Tool gebaut, das zeigt, welche Metalle und Produkte gerade fehlen und nachbestellt werden müssen — mit einem kompletten CRM für Umsätze und Kunden dahinter.",
        bullets: [
          "Bestandsübersicht mit Warnung bei niedrigem Lagerbestand",
          "Direkte Nachbestellung aus dem Tool heraus",
          "CRM mit Umsätzen und Kundenverwaltung im selben System",
        ],
      },
      voicelink: {
        tag: "Kundencase · KI-Agentur",
        heading: "KI-Telefonagenten aufgebaut statt nur beraten.",
        desc: "VoiceLink AI ist selbst eine KI-Agentur — für Solarunternehmen. Wir haben für sie die KI-Agenten komplett aufgebaut und bei der Einführung bei ihren Unternehmen unterstützt.",
        bullets: [
          "KI-Voice-Agenten für Solarunternehmen komplett aufgebaut",
          "Unterstützung bei Einrichtung & Einführung beim Endkunden",
          "Skalierbare Basis statt Einzellösung pro Kunde",
        ],
      },
      websites: {
        tag: "Kundencase · Websites",
        heading: "Websites, die dem Kunden gehören — nicht dem Baukasten.",
        desc: "Neben Systemen und Automatisierungen bauen wir für unsere Kunden auch ihre Websites: jede einzeln auf das Unternehmen zugeschnitten, im jeweiligen Branding statt aus einer Vorlage. Wie bei allem anderen auch — gebaut, übergeben, danach gehören Code und Inhalte dem Kunden.",
        bullets: [
          "Individuelles Design im Branding des Kunden statt Baukasten-Vorlage",
          "Auf Ladezeit und mobile Darstellung gebaut, nicht nachträglich geflickt",
          "Vollständig übergeben — der Kunde besitzt und hostet seine Seite selbst",
        ],
      },
    },
    ctaHeading: "Dein Prozess könnte das nächste Projekt sein.",
    ctaSub: "Lass uns in einem kurzen Gespräch klären, was sich bei dir automatisieren oder als eigenes System bauen lässt.",
  },
  es: {
    meta: { title: "Casos — Onyx.AI", description: "Proyectos que Onyx.AI ha construido y entregado." },
    kicker: "Casos",
    title: "Proyectos que hemos construido.",
    intro: "No son productos a la venta, sino ejemplos de lo que es posible para tu empresa.",
    cases: {
      hausmanager: {
        tag: "Caso de cliente · construido y entregado",
        heading: "Del caos de Excel a un sistema propio.",
        desc: "Para una administración de fincas desarrollamos desde cero un CRM completo y lo entregamos por completo. No es un producto a la venta, sino un ejemplo de lo que es posible para tu empresa.",
      },
      speedfire: {
        tag: "Caso de cliente · Creación de marca y venta",
        heading: "De taller de tapicería a marca propia con ingresos previsibles.",
        desc: "Speedfire era antes un taller de tapicería. Le ayudamos a lanzar un producto completamente nuevo, crear una marca propia y venderlo online, con más de 10.000 € de facturación mensual demostrables.",
        bullets: [
          "Cuenta de Instagram de 0 a más de 333 seguidores en 4 semanas",
          "Más de 1.000 cuentas alcanzadas por semana con contenido estratégico",
          "Más de 10.000 € de facturación mensual demostrables con el nuevo producto",
        ],
      },
      wetblock: {
        tag: "Caso de cliente · Automatización",
        heading: "Del envío manual al contacto automatizado con clientes.",
        desc: "Para WETBlock automatizamos el contacto por e-mail con sus clientes empresariales. Antes, el equipo tenía que escribir y enviar a mano cada mensaje a las empresas a las que venden sus productos; hoy se hace solo.",
        bullets: [
          "Envío automático · mensajes personalizados sin escribirlos a mano",
          "Seguimiento automático · reacciona a respuestas o al silencio",
          "Análisis central · muestra qué mensajes funcionan de verdad",
        ],
      },
      rebstoeckel: {
        tag: "Caso de cliente · Pensión y bodega",
        heading: "La ocupación de habitaciones de un vistazo, sin papeles.",
        desc: "Para la pensión Rebstöckel construimos un panel que muestra en tiempo real qué habitaciones están libres y cuáles ocupadas, sin lista de Excel ni libro en recepción.",
        bullets: [
          "Vista de habitaciones con estado libre/ocupada en tiempo real",
          "Tasa de ocupación de un vistazo",
          "Menos reservas dobles gracias a una vista central",
        ],
      },
      pawplace: {
        tag: "Caso de cliente · Tienda online",
        heading: "Las consultas de soporte en un solo lugar, no repartidas en buzones.",
        desc: "Para la tienda online PawPlace de HWD Handelsagentur construimos un panel que muestra clientes, estado de pedidos y tickets de soporte abiertos en un mismo sitio.",
        bullets: [
          "Lista de clientes con estado del pedido de un vistazo",
          "Tickets de soporte abiertos marcados al instante",
          "Se acabó buscar en varios buzones",
        ],
      },
      haas: {
        tag: "Caso de cliente · Fabricación",
        heading: "Stock de material y facturación en un sistema, no en dos frentes.",
        desc: "Haas Wasserkraft fabrica filtros para agua limpia. Construimos una herramienta que muestra qué metales y productos faltan y hay que volver a pedir, con un CRM completo de facturación y clientes detrás.",
        bullets: [
          "Vista de stock con aviso cuando el inventario es bajo",
          "Pedido directo desde la propia herramienta",
          "CRM con facturación y gestión de clientes en el mismo sistema",
        ],
      },
      voicelink: {
        tag: "Caso de cliente · Agencia de IA",
        heading: "Agentes telefónicos de IA construidos, no solo recomendados.",
        desc: "VoiceLink AI es a su vez una agencia de IA para empresas solares. Les construimos los agentes de IA por completo y les ayudamos a implantarlos en sus empresas clientes.",
        bullets: [
          "Agentes de voz con IA para empresas solares, construidos por completo",
          "Apoyo en la configuración y la implantación en el cliente final",
          "Una base escalable en lugar de una solución suelta por cliente",
        ],
      },
      websites: {
        name: "Webs para varios clientes",
        tag: "Caso de cliente · Webs",
        heading: "Webs que son del cliente, no de la plantilla.",
        desc: "Además de sistemas y automatizaciones, también construimos las webs de nuestros clientes: cada una hecha a medida para la empresa, con su propia identidad visual y no a partir de una plantilla. Como todo lo demás: construida, entregada, y después el código y el contenido son del cliente.",
        bullets: [
          "Diseño a medida con la identidad del cliente, no una plantilla",
          "Pensada para cargar rápido y verse bien en móvil desde el principio",
          "Entregada por completo: el cliente es dueño de su web y la aloja él mismo",
        ],
      },
    },
    ctaHeading: "Tu proceso podría ser el próximo proyecto.",
    ctaSub: "Veamos en una conversación breve qué se puede automatizar en tu empresa o construir como sistema propio.",
  },
};

export function referenzenMetadata(lang: Lang): Metadata {
  return { ...TEXT[lang].meta, alternates: alternates(lang, "/referenzen") };
}

export default function ReferenzenPage({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <main>
      <PageIntro kicker={t.kicker} title={t.title}>
        <IntroText>{t.intro}</IntroText>
      </PageIntro>

      {CASES.map((c) => {
        const ct = t.cases[c.key];
        return (
          <AliveCase
            key={c.key}
            tag={ct.tag}
            name={ct.name ?? c.name}
            heading={ct.heading}
            desc={ct.desc}
            bullets={ct.bullets}
            image={c.image}
            imageRight={c.imageRight}
            background={c.background}
            logo={c.logo}
            logoBg={c.logoBg}
          />
        );
      })}

      <Testimonials lang={lang} />

      <CTABanner lang={lang} heading={t.ctaHeading} sub={t.ctaSub} />
      <Footer lang={lang} />
    </main>
  );
}
