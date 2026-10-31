import type { AutomatisierungText } from "./automatisierungen";

export const automatisierungenEs: Record<string, AutomatisierungText> = {
  "angebote-rechnungen": {
    title: "Presupuestos y facturas.",
    subtitle: "Del contacto con el cliente al presupuesto terminado, sin teclear.",
    detail:
      "En la mayoría de las empresas, hacer presupuestos es donde más tiempo se queda atascado: reunir partidas, buscar precios, redactar el texto, montar el PDF, enviarlo y hacer el seguimiento. Automatizamos justo esa cadena: a partir de los datos del encargo se genera el presupuesto terminado con tus partidas, tus precios y tu diseño, se envía y se le hace el seguimiento automáticamente.",
    bullets: [
      "El presupuesto sale de los datos del encargo, no de una plantilla vacía",
      "Tu lista de precios, tus textos y tu papel con membrete",
      "Seguimiento automático si el cliente no responde",
      "El presupuesto aceptado se convierte directamente en factura",
      "Los recordatorios de pago salen solos, sin que tengas que tenerlos en la cabeza",
    ],
  },
  "bestehende-systeme": {
    title: "Agentes de IA en sistemas existentes.",
    subtitle: "Tu herramienta se queda: el agente trabaja encima.",
    detail:
      "No tienes que tirar nada para trabajar con IA. Si ya usas un ERP, un CRM, un sistema de gestión de almacén o un programa sectorial, integramos nuestros agentes de IA directamente en ese sistema, a través de las interfaces existentes. El agente lee y escribe allí donde ya están tus datos, y tu equipo sigue trabajando con la interfaz que conoce.",
    bullets: [
      "Conexión con tu ERP, CRM o programa sectorial actual",
      "Sin cambiar de sistema, sin migrar datos y sin una herramienta nueva que aprender",
      "El agente lee y escribe directamente en tus datos actuales",
      "También para entornos con varios programas que han ido creciendo",
      "Funciona en tu infraestructura y después es tuyo",
    ],
  },
  "dokumente-daten": {
    title: "Documentos y reconocimiento de datos.",
    subtitle: "Leer automáticamente facturas recibidas, albaranes y formularios.",
    detail:
      "En la mayoría de las empresas, el papel y los PDF siguen siendo trabajo manual: teclear, asignar, archivar. Dejamos que la IA lea los documentos (facturas recibidas, albaranes, contratos, formularios rellenados) y que los datos lleguen de forma estructurada adonde tienen que ir. Lo que no está claro se presenta para revisión en lugar de contabilizarse mal sin que nadie se entere.",
    bullets: [
      "Las facturas recibidas y los albaranes se leen en lugar de teclearse",
      "Importes, partidas y proveedores se asignan automáticamente",
      "Basta con una foto del móvil, por ejemplo del albarán al recibir la mercancía",
      "Los casos dudosos se presentan para revisión, no se contabilizan en silencio",
      "Todo llega estructurado a tu sistema en lugar de a una carpeta",
    ],
  },
  kommunikation: {
    title: "Correos y comunicación.",
    subtitle: "Las solicitudes se clasifican, se responden y se reenvían.",
    detail:
      "Un buzón lleno rara vez es un problema del buzón: es un problema de clasificación. Construimos automatizaciones que reconocen las solicitudes entrantes, las asignan al expediente correcto y responden directamente a los casos estándar. Lo que necesita una decisión de verdad sigue llegándote a ti, pero preparado, no en bruto.",
    bullets: [
      "Las solicitudes entrantes se reconocen y se asignan al expediente correcto",
      "Las preguntas estándar repetitivas se responden automáticamente",
      "Se preparan borradores de respuesta y tú solo los apruebas",
      "Se reenvían a la persona responsable, no a una lista general",
      "No se pierde nada, aunque entren muchas cosas a la vez",
    ],
  },
  prozesse: {
    title: "Procesos entre tus herramientas.",
    subtitle: "Lo que hoy es copiar y pegar, mañana funciona solo.",
    detail:
      "La mayor parte del trabajo invisible surge entre programas: pasar datos de una herramienta a otra, cotejar listas, actualizar estados, avisar a alguien. Convertimos esos traspasos en automatizaciones, con gestión de errores y registro, para que veas en todo momento qué se ha ejecutado y no tengas que fiarte a ciegas.",
    bullets: [
      "Los traspasos de datos entre tus programas funcionan solos",
      "Los análisis e informes periódicos llegan solos",
      "Los recordatorios y plazos se vigilan en lugar de tenerlos en la cabeza",
      "Cada ejecución queda registrada: ves qué ha pasado",
      "Los errores se notifican en lugar de pasarse por alto",
    ],
  },
};
