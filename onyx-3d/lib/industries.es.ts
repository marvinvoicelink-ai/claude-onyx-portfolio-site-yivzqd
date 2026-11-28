import type { IndustryText } from "./industries";

/** Spanische Texte der Branchen, per Slug den deutschen Einträgen in industries.ts zugeordnet. */
export const industriesEs: Record<string, IndustryText> = {
  "handwerk-bau": {
    label: "Construcción y oficios",
    intro:
      "Presupuestos, mediciones, documentación de obra y pedidos de material van en paralelo en papel, WhatsApp y Excel en la mayoría de las empresas. Nosotros lo reunimos en un sistema que se adapta a tu forma de trabajar en la obra.",
    painPoints: [
      "Presupuestos, mediciones y documentación de obra van en paralelo en papel, WhatsApp y Excel",
      "Los pedidos de material se hacen de palabra en lugar de registrarse de forma centralizada",
      "Facturas y presupuestos salen de varias plantillas en lugar de un solo sistema",
    ],
    capabilities: [
      "Registrar la medición directamente en la obra en formato digital, en lugar de pasarla después en la oficina",
      "Vista digital de encargos y obras con el estado de cada proyecto",
      "Inventario de material y pedidos centralizados en lugar de hacerse de palabra",
      "Documentación fotográfica y de obra directamente en el sistema, no repartida en los móviles",
      "Presupuestos y facturas desde una sola herramienta en lugar de varias plantillas",
    ],
    crossLink: {
      label: "Captura in situ",
      text: "Dicta y graba la medición y la documentación de obra durante el recorrido, en lugar de volver a registrarlas después en la oficina.",
    },
  },
  "hausverwaltung-immobilien": {
    label: "Administración de fincas e inmobiliarias",
    intro:
      "Varios inmuebles, consultas de inquilinos, documentos y citas: justo el problema para el que construimos HausManager Pro. Un CRM que muestra el estado, los documentos y la ocupación en un solo lugar.",
    painPoints: [
      "Varios inmuebles, consultas de inquilinos y documentos se gestionan por separado y sin coordinación",
      "Inquilinos o propietarios tienen que llamar o escribir un correo para saber cómo va lo suyo",
      "Falta una vista de la ocupación o no está actualizada",
    ],
    capabilities: [
      "Portal de clientes en el que inquilinos o propietarios consultan el estado por sí mismos",
      "Archivo central de documentos por inmueble, con buscador",
      "Ocupación de habitaciones o inmuebles en tiempo real, de un vistazo",
      "Menos consultas por teléfono o correo a la administración",
    ],
    crossLink: {
      label: "Captura in situ",
      text: "Dicta y graba los datos del inmueble durante la visita: de ahí salen el dossier y la web con scroll, en alemán y en español.",
    },
  },
  personaldienstleistung: {
    label: "Trabajo temporal y selección de personal",
    intro:
      "La gestión de candidatos, la planificación de asignaciones y la comunicación con los clientes suelen repartirse entre varias herramientas a la vez. Un sistema que reúna disponibilidades, asignaciones y seguimiento es lo que más tiempo ahorra aquí.",
    painPoints: [
      "La gestión de candidatos y la planificación de asignaciones se reparten entre varias herramientas a la vez",
      "El seguimiento de solicitudes o citas pendientes cuesta mucho tiempo a mano",
      "La carga de trabajo y la tasa de colocación son difíciles de analizar con rigor",
    ],
    capabilities: [
      "Vista central de candidatos y empleados en lugar de listas dispersas",
      "Planificación de asignaciones y turnos teniendo en cuenta las disponibilidades",
      "Seguimiento automatizado de solicitudes o citas pendientes",
      "Informes de carga de trabajo y tasa de colocación de un vistazo",
    ],
  },
  "logistik-spedition": {
    label: "Logística y transporte",
    intro:
      "El estado de los envíos, la planificación y el inventario cambian cada hora, y aun así los clientes quieren saber al momento cómo va todo, sin llamar. Justo para eso construimos paneles y portales de clientes.",
    painPoints: [
      "El estado de los envíos y la planificación cambian cada hora y los clientes no se enteran automáticamente",
      "Los clientes llaman para saber el estado en lugar de poder consultarlo ellos mismos",
      "El inventario está repartido en varias listas en lugar de verse de forma centralizada",
    ],
    capabilities: [
      "Panel en tiempo real de envíos, carga de trabajo y planificación",
      "Portal de clientes para consultar el estado sin llamar al planificador",
      "Avisos de estado automáticos por correo en lugar de mensajes manuales",
      "Inventario centralizado a la vista en lugar de en listas separadas",
    ],
  },
  "praxen-gesundheitswesen": {
    label: "Clínicas y sector sanitario",
    intro:
      "La asignación de citas, los datos de pacientes y los recordatorios necesitan un sistema que ahorre tiempo y cumpla el RGPD. Construimos exactamente ese marco, alojado en tus servidores en lugar de en los de un proveedor ajeno.",
    painPoints: [
      "La asignación de citas y los recordatorios se hacen con llamadas manuales",
      "Los datos de pacientes deben cumplir el RGPD, algo a menudo difícil con proveedores ajenos",
      "Mucho volumen de llamadas por falta de procesos digitales",
    ],
    capabilities: [
      "Planificación de citas con recordatorios automáticos en lugar de llamadas manuales",
      "Datos de pacientes y expedientes centralizados, conformes al RGPD y en tu infraestructura",
      "Menos llamadas gracias a procesos digitales claros",
      "Informes de ocupación y de citas anuladas",
    ],
  },
  "handel-e-commerce": {
    label: "Comercio y e-commerce",
    intro:
      "Pedidos, solicitudes de soporte e inventario repartidos en varios buzones: justo el problema que resolvimos para PawPlace. Un panel lo reúne todo en un solo lugar.",
    painPoints: [
      "Pedidos y solicitudes de soporte repartidos en varios buzones",
      "El inventario hay que contarlo a mano en lugar de consultarlo en tiempo real",
      "La comunicación con los clientes cuando cambia un estado no es automática",
    ],
    capabilities: [
      "Panel central de pedidos, clientes e incidencias de soporte abiertas",
      "Inventario en tiempo real en lugar de recuentos en el sistema",
      "Comunicación automática con los clientes cuando cambia un estado",
      "Se acabó buscar solicitudes pendientes en varios buzones",
    ],
  },
  "beratung-agenturen": {
    label: "Consultoría y agencias",
    intro:
      "El estado de los proyectos para los clientes, la planificación interna de capacidad y los informes periódicos son lo que más tiempo consume en el día a día de consultoras y agencias. Construimos un sistema que reúne estas tres cosas.",
    painPoints: [
      "Los clientes preguntan por el estado del proyecto por teléfono o en una llamada semanal",
      "La planificación interna de capacidad se hace con varias herramientas o con Excel",
      "Los informes se montan a mano, una y otra vez, para cada cliente",
    ],
    capabilities: [
      "Portal de clientes con el estado del proyecto en lugar de llamadas semanales de seguimiento",
      "Planificación interna de capacidad y recursos de un vistazo",
      "Informes automáticos en lugar de análisis montados a mano",
      "Todos los documentos del proyecto centralizados en lugar de repartidos en varias herramientas",
    ],
  },
  "versicherungen-finanzdienstleister": {
    label: "Seguros y servicios financieros",
    intro:
      "La gestión de contratos, los datos de clientes y los procesos de seguimiento exigen una protección de datos especialmente rigurosa. Construimos un sistema que funciona conforme al RGPD en tu propia infraestructura, no en la de un proveedor ajeno.",
    painPoints: [
      "La gestión de contratos y los datos de clientes exigen una protección de datos especialmente rigurosa",
      "El seguimiento de expedientes abiertos o documentos que faltan se hace a mano",
      "Dependencia de un proveedor ajeno para datos sensibles de clientes",
    ],
    capabilities: [
      "Gestión centralizada de contratos y datos de clientes conforme al RGPD",
      "Seguimiento automatizado de expedientes abiertos o documentos que faltan",
      "Portal de clientes para consultar contratos en lugar de preguntar por teléfono",
      "Propiedad total del código y los datos, sin depender de ningún proveedor",
    ],
  },
};
