import type { DifferentiatorText } from "./differentiators";

export const differentiatorsEs: Record<string, DifferentiatorText> = {
  "kein-crm-von-der-stange": {
    title: "No es un CRM estándar.",
    subtitle: "Tu sistema se construye según tu proceso.",
    detail:
      "Nada de paquetes estándar con módulos fijos: lo que cubre tu sistema depende de cómo trabajas de verdad, y no al revés. Tú nos cuentas cómo se trabaja en tu empresa y nosotros lo convertimos en software.",
    bullets: [
      "Sin catálogos de módulos estándar que solo encajan a medias",
      "Cada automatización sigue tu proceso real, no una plantilla",
      "Crece contigo si tu proceso cambia más adelante",
      "Análisis de procesos a medida antes de la primera línea de código",
      "Sin funciones que pagas pero nunca usas",
    ],
  },
  "volles-eigentum": {
    title: "Propiedad total.",
    subtitle: "El código y los datos son tuyos, por completo.",
    detail:
      "Tras la entrega, cada línea de código y cada registro son tuyos. Ningún proveedor que conserve el acceso, renueve licencias o esconda funciones detrás de un muro de pago.",
    bullets: [
      "Se entrega el código fuente completo",
      "Sin ataduras de suscripción con Onyx una vez terminado el proyecto",
      "Tú decides quién sigue desarrollándolo después",
      "Documentación completa para tu equipo o para desarrolladores externos",
      "Sin dependencias ocultas de la infraestructura de Onyx",
    ],
  },
  "deine-infrastruktur": {
    title: "Tu infraestructura.",
    subtitle: "Lo alojas en tu propio servidor.",
    detail:
      "Conforme al RGPD, en Alemania o en la UE, con contrato de encargo del tratamiento, y no en servidores ajenos que no controlas y sobre los que no tienes margen de actuación en caso de conflicto.",
    bullets: [
      "Alojamiento en tus servidores o con el proveedor que elijas, no en Onyx",
      "Contrato de encargo del tratamiento incluido desde el principio",
      "Ningún dato de clientes en servidores fuera de la UE",
      "Control total sobre copias de seguridad y permisos de acceso",
      "Independiente de la infraestructura propia de Onyx",
    ],
  },
  "kein-lock-in": {
    title: "Sin ataduras.",
    subtitle: "Tras la entrega, eres independiente.",
    detail:
      "Sin suscripción permanente y sin un proveedor que suba precios o rescinda el contrato. Onyx lo entrega todo y se retira: tu sistema sigue funcionando por su cuenta.",
    bullets: [
      "Sin obligación de suscripción mensual tras la entrega",
      "Onyx se retira a propósito al terminar el proyecto",
      "Tú decides si se sigue desarrollando y cuándo",
      "Entrega completa de código, accesos y documentación",
      "Libertad total para elegir con quién trabajas después",
    ],
  },
};
