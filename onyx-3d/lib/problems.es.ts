import type { ProblemText } from "./problems";

export const problemsEs: Record<string, ProblemText> = {
  "mehrere-tools": {
    title: "Varias herramientas",
    highlight: "que no encajan entre sí",
    desc: "Hojas de Excel y herramientas SaaS que nunca se ajustan del todo a tu proceso.",
    detail:
      "Cada herramienta cubre solo una parte de tu trabajo; el resto va por hojas de Excel, papeles o de memoria. Al final pasas datos a mano entre varios sistemas que en realidad deberían estar conectados.",
    bullets: [
      "Los datos están repartidos en varias herramientas en lugar de en un solo lugar",
      "Pasar datos a mano entre sistemas cuesta tiempo cada día",
      "Ninguna herramienta encaja de verdad con tu forma de trabajar",
    ],
  },
  "fehlende-funktionen": {
    title: "Faltan funciones",
    highlight: "igualmente",
    desc: "El siguiente plan de precios cuesta el doble y aporta solo un poco más.",
    detail:
      "Justo la función que necesitas solo está en el siguiente plan, mucho más caro, aunque el resto no te sirva de nada. Pagas por funciones que nunca usas solo para conseguir la que te falta.",
    bullets: [
      "El siguiente plan de precios aporta solo una pequeña parte más de funciones",
      "Pagas por funciones que nunca usas",
      "Justo la función que necesitas a menudo sigue faltando",
    ],
  },
  "daten-nicht-bei-dir": {
    title: "Los datos",
    highlight: "no están en tu poder",
    desc: "Los datos de clientes están en servidores ajenos, a menudo fuera de la UE.",
    detail:
      "Los datos de clientes y del negocio están en los servidores de un proveedor ajeno, a menudo incluso fuera de la UE, con toda la inseguridad jurídica que eso supone para ti como empresario. En caso de conflicto o si el proveedor rescinde el contrato, apenas tienes margen de actuación.",
    bullets: [
      "Los datos de clientes están en servidores ajenos, a menudo fuera de Europa",
      "Riesgos de RGPD de los que, al final, respondes tú",
      "En caso de conflicto no tienes acceso a tu propia infraestructura",
    ],
  },
  "abhaengig-vom-anbieter": {
    title: "Dependiente",
    highlight: "del proveedor",
    desc: "Si rescinde el contrato o sube los precios, te quedas sin alternativa.",
    detail:
      "Si el proveedor sube los precios, cambia funciones o incluso te rescinde el contrato, no tienes con qué negociar: dependes de su software y de sus condiciones. Cambiar de proveedor suele significar empezar de cero.",
    bullets: [
      "Subidas de precio y cambios de contrato sin margen de negociación",
      "Si el proveedor rescinde, te quedas sin alternativa",
      "Cambiar de proveedor suele significar volver a montarlo todo",
    ],
  },
  "niemand-am-telefon": {
    title: "Nadie contesta",
    highlight: "al teléfono",
    desc: "Las llamadas se quedan sin atender porque nadie tiene tiempo de coger el teléfono.",
    detail:
      "Los clientes llaman mientras tu equipo está a tope con el día a día: nadie tiene tiempo de contestar ni de devolver la llamada. Cada llamada perdida es una solicitud perdida o un cliente molesto. Justo aquí integramos agentes de IA en tu sistema, según lo que más tiempo te ahorre: un agente telefónico atiende las llamadas entrantes y envía la respuesta automáticamente por correo. Un agente de reservas acepta solicitudes de cita y las anota directamente en tu calendario, comprobando la disponibilidad. Y un agente de llamadas toma la iniciativa: llama por su cuenta a clientes, proveedores o socios para recabar información o hacer seguimiento de asuntos pendientes, en lugar de que tu equipo tenga que andar llamando.",
    bullets: [
      "El agente telefónico atiende las llamadas entrantes, también fuera del horario laboral",
      "El agente de reservas anota las citas directamente en tu calendario, comprobando la disponibilidad",
      "El agente de llamadas llama por sí mismo para recabar información o hacer seguimiento",
    ],
  },
};
