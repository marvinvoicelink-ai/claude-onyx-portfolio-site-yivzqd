import type { OfferingText } from "./offerings";

/** Spanische Texte der Bausteine, per Slug den deutschen Einträgen in offerings.ts zugeordnet. */
export const offeringsEs: Record<string, OfferingText> = {
  kundenportale: {
    title: "Portales de clientes.",
    subtitle: "Consultar presupuestos, facturas, estado de entregas y reclamaciones.",
    detail:
      "Tus clientes ven por sí mismos el estado de sus solicitudes, documentos y citas, sin llamarte ni escribirte un correo. Menos consultas para ti y más transparencia para tus clientes.",
    meta: "Un portal de clientes con tu marca: tus clientes consultan por sí mismos presupuestos, facturas, pedidos y el estado de las entregas. Construido por Onyx.AI y entregado por completo.",
    painPoints: [
      "«¿Cómo va lo mío?» — la misma pregunta, tres veces por semana, de clientes distintos.",
      "Los clientes vuelven a pedir facturas y albaranes porque se les han perdido en el correo.",
      "Las reclamaciones llegan por teléfono y acaban como una nota en un papel.",
    ],
    beispiel: {
      title: "Así lo ve el cliente",
      text: "Un cliente empresarial inicia sesión con sus datos de acceso y ve en la página de inicio sus pedidos en curso con su estado. Un clic más allá están todos los presupuestos y facturas de los últimos años en PDF, con buscador. Si tiene un problema con una entrega, sube una foto y describe brevemente qué falla. En tu lado se crea automáticamente una incidencia con la foto, el número de pedido y la fecha y hora. Nadie tiene que llamar y nadie tiene que reconstruir después de qué se trataba.",
    },
    bullets: [
      "Tus clientes ven presupuestos, facturas, pedidos y el estado de las entregas en un solo portal",
      "Suben solicitudes de servicio y reclamaciones con foto, y la incidencia se crea automáticamente",
      "Compras anteriores, garantías y manuales siempre disponibles",
      "Menos consultas por teléfono o por correo",
      "Funciona con tu propia marca, no como una herramienta ajena",
    ],
    referenz: {
      tag: "Caso de cliente · Tienda online",
      name: "PawPlace (HWD Handelsagentur)",
      heading: "Las solicitudes de soporte, centralizadas en lugar de dispersas en varios buzones.",
      desc: "Para la tienda online PawPlace de HWD Handelsagentur construimos un panel que muestra en un solo lugar los clientes, el estado de los pedidos y las incidencias de soporte abiertas.",
      bullets: [
        "Lista de clientes con el estado de sus pedidos de un vistazo",
        "Incidencias de soporte abiertas marcadas al instante",
        "Se acabó buscar en varios buzones",
      ],
    },
  },
  "interne-tools": {
    title: "Herramientas internas.",
    subtitle: "Gestión de proyectos, app para el equipo y control de inventario.",
    detail:
      "Las hojas de Excel, los papelitos y las soluciones sueltas se convierten en un sistema que se adapta a tu forma de trabajar, y no al revés. Tú nos cuentas cómo se trabaja en tu empresa y nosotros lo convertimos en software.",
    meta: "Gestión de proyectos, una app para el equipo y control de inventario en un solo sistema, construido según los procesos de tu empresa. Desarrollado por Onyx.AI y entregado por completo.",
    painPoints: [
      "Las horas y los gastos se apuntan en cualquier sitio y luego se pasan a mano al sistema.",
      "Cada departamento lleva su propia lista y ninguna está completa.",
      "Para saber cómo va un trámite, hay que llamar a alguien.",
    ],
    beispiel: {
      title: "Un encargo, de principio a fin",
      text: "Entra un encargo y queda registrado al instante en el sistema como expediente, con responsable y fecha. Quien trabaja en él registra su tiempo allí donde ya está trabajando y adjunta los documentos directamente al expediente. El material consumido se descuenta del inventario al registrarlo. Así, en la oficina está todo reunido antes de que nadie tenga que preguntar: horas, estado y documentación.",
    },
    bullets: [
      "Proyectos, citas, recursos y responsables en un solo lugar",
      "App para el equipo: registrar horas, adjuntar documentos y cerrar trámites sobre la marcha",
      "Control de inventario con existencias mínimas y recuentos, también desde el móvil",
      "Sustituye un montón de hojas de Excel acumuladas por un sistema central",
      "Crece contigo si tus procesos cambian más adelante",
    ],
    referenz: {
      tag: "Caso de cliente · construido y entregado",
      name: "HausManager Pro",
      heading: "Del caos de Excel a un sistema propio.",
      desc: "Para una administración de fincas desarrollamos desde cero un CRM completo y lo entregamos por completo. No es un producto a la venta, sino un ejemplo de lo que es posible para tu empresa.",
      bullets: [
        "Análisis de procesos y concepto a medida",
        "Desarrollo completo con el estándar Onyx",
        "Entrega de código, accesos y documentación",
      ],
    },
  },
  dashboards: {
    title: "Paneles e informes.",
    subtitle: "Facturación, estado de proyectos y carga de trabajo en tiempo real.",
    detail:
      "Todas las cifras importantes en un solo lugar, en tiempo real y fáciles de entender. Se acabó reunirlas a partir de varias hojas o herramientas.",
    meta: "Paneles en tiempo real de facturación, carga de trabajo y asuntos pendientes, preparados para tu empresa. Construidos por Onyx.AI y entregados por completo.",
    painPoints: [
      "Las cifras para la reunión mensual se montan cada vez a partir de tres hojas distintas.",
      "Si un encargo ha dado dinero, no se sabe hasta semanas después.",
      "La carga de trabajo se calcula a ojo porque nadie la ve con claridad.",
    ],
    beispiel: {
      title: "Lunes por la mañana, de un vistazo",
      text: "En lugar de exportar hojas de cálculo, abres una página. Arriba están las cifras que importan para ti: presupuestos pendientes, facturas vencidas, facturación del mes en curso y capital inmovilizado. Debajo ves qué proyectos están en marcha y quién está asignado a cada uno. Si una cifra se sale de lo normal, haces clic en ella y llegas a los expedientes que hay detrás, en lugar de a otro informe más.",
    },
    bullets: [
      "Panel en tiempo real con facturación, presupuestos y facturas pendientes y valor del inventario",
      "Carga de trabajo de los equipos y estado de los proyectos en curso de un vistazo",
      "Historial completo de cada cliente: presupuestos, pedidos, reclamaciones y personas de contacto",
      "Fácil de entender, también sin conocimientos de análisis de datos",
      "Muestra las cifras que importan en tu empresa, no las de una plantilla",
    ],
    referenz: {
      tag: "Caso de cliente · Fabricación",
      name: "Haas Wasserkraft",
      heading: "Inventario de material y facturación en un solo sistema, no en dos frentes.",
      desc: "Haas Wasserkraft fabrica filtros para agua limpia. Construimos una herramienta que muestra qué metales y productos faltan y hay que volver a pedir, con un CRM completo de facturación y clientes detrás.",
      bullets: [
        "Resumen del inventario con aviso de existencias bajas",
        "Pedidos de reposición directamente desde la herramienta",
        "CRM con facturación y gestión de clientes en el mismo sistema",
      ],
    },
  },
  automatisierung: {
    title: "Automatización y agentes de IA.",
    subtitle: "Seguimiento de presupuestos, agentes telefónicos e informes automáticos.",
    detail:
      "Los correos, los informes y los recordatorios salen solos. A eso se suman agentes telefónicos de IA que atienden el teléfono por ti: reciben llamadas, reservan citas en tu calendario o llaman ellos mismos cuando falta información.",
    meta: "Seguimiento automático de presupuestos, informes y agentes telefónicos de IA para tu empresa. También dentro del ERP o CRM que ya usas. Construido y entregado por Onyx.AI.",
    painPoints: [
      "Los presupuestos se envían y nadie hace el seguimiento porque se pierde en el día a día.",
      "Las llamadas se quedan sin atender cuando todos están ocupados.",
      "Los mismos datos se pasan a mano de un programa a otro.",
    ],
    beispiel: {
      title: "Un presupuesto que se persigue solo",
      text: "Envías un presupuesto. Si en cinco días no hay respuesta, sale un recordatorio amable; a los diez días, el segundo. Si el cliente sigue sin contestar, a los veinte días el asunto te llega como tarea, con todo lo necesario. Al mismo tiempo, un agente telefónico atiende las llamadas que de otro modo se perderían y envía la respuesta por correo a quien llamó. Lo que notas tú: se te escapan menos cosas.",
    },
    bullets: [
      "Seguimiento automático de presupuestos: recordatorio a los 5 y 10 días, contacto personal a los 20",
      "Agentes de teléfono, de reservas y de llamadas se encargan de las llamadas entrantes y salientes",
      "La IA ayuda a redactar presupuestos y responde correos repetitivos",
      "Hablar en lugar de teclear: dicta notas e informes directamente desde el móvil",
      "Funciona también dentro del ERP o CRM que ya utilizas",
    ],
    referenz: {
      tag: "Caso de cliente · Automatización",
      name: "WETBlock",
      heading: "Del envío manual a la captación de clientes automatizada.",
      desc: "Para WETBlock automatizamos el contacto por correo con sus clientes empresariales. Antes, el equipo tenía que redactar y enviar cada mensaje a mano; hoy funciona de forma automática.",
      bullets: [
        "Envío automático sin redactar a mano",
        "Seguimiento automático ante respuestas o silencio",
        "Análisis centralizado de qué mensajes funcionan",
      ],
    },
  },
  terminplanung: {
    title: "Planificación de citas y recursos.",
    subtitle: "Citas, capacidad y contratos de mantenimiento en un solo sistema.",
    detail:
      "Calendario, capacidad y responsables en un solo sistema, en lugar de en varios calendarios o de palabra. Las reservas dobles y los cuellos de botella se ven antes de convertirse en un problema.",
    meta: "Planificación de citas y recursos con capacidades y contratos de mantenimiento periódicos en un solo sistema. Construido por Onyx.AI y entregado por completo.",
    painPoints: [
      "Dos compañeros le dan al mismo cliente dos citas distintas.",
      "Se escapan contratos de mantenimiento porque nadie los tenía en el calendario.",
      "Si la semana que viene queda alguien libre, solo lo sabe una persona.",
    ],
    beispiel: {
      title: "Mantenimiento que no se olvida",
      text: "Un cliente empresarial tiene un contrato de mantenimiento con dos visitas al año. Seis semanas antes de la fecha, el sistema avisa a planificación, propone huecos libres y tiene en cuenta quién se encargó de la instalación la última vez. El cliente recibe una propuesta de cita, la confirma y la intervención queda en el plan. Nadie tuvo que acordarse de la fecha.",
    },
    bullets: [
      "Contratos de mantenimiento periódicos con recordatorios automáticos para clientes empresariales",
      "Vista central de citas, capacidades y responsables",
      "Menos reservas dobles gracias a una base de datos común",
      "Los cuellos de botella se ven pronto y no en el día a día",
    ],
    referenz: {
      tag: "Caso de cliente · Pensión y bodega",
      name: "Rebstöckel",
      heading: "La ocupación de las habitaciones de un vistazo, sin papeles.",
      desc: "Para la pensión Rebstöckel construimos un panel que muestra en tiempo real qué habitaciones están libres y cuáles ocupadas, sin hojas de Excel ni libro en la recepción.",
      bullets: [
        "Resumen de habitaciones con estado libre/ocupada en tiempo real",
        "Tasa de ocupación de un vistazo",
        "Menos reservas dobles gracias a una vista central",
      ],
    },
  },
  dokumentenverwaltung: {
    title: "Gestión de documentos y datos.",
    subtitle: "Contratos, planos y expedientes de proyecto en lugar de carpetas caóticas.",
    detail:
      "Un archivo central con buscador, en lugar de carpetas caóticas repartidas en varias unidades. Cada persona encuentra el documento correcto sin tener que preguntar al equipo.",
    meta: "Archivo central con buscador para contratos, planos y expedientes de proyecto, alojado en tus propios servidores. Construido por Onyx.AI y entregado por completo.",
    painPoints: [
      "El plano actual existe en tres versiones repartidas en dos unidades.",
      "Quien necesita la documentación de una recepción de obra de hace dos años se pasa media hora buscando.",
      "Los documentos se generan fuera de la oficina y tardan días en llegar al archivo.",
    ],
    beispiel: {
      title: "El plano bueno, para todos",
      text: "Cada proyecto tiene su expediente. En él están los contratos, planos, justificantes y actas de recepción, con versiones y fechas. Quien abre un archivo ve al instante si existe una versión más reciente. El cliente solo tiene acceso a lo que le concierne, y un proveedor, solo a su parte. Se busca por el contenido, no por el nombre de carpeta que alguien puso hace tres años.",
    },
    bullets: [
      "Los justificantes y actas de recepción se generan directamente en el sistema y no por separado",
      "Documentos, planos y cálculos del proyecto con control de versiones en un solo lugar",
      "Archivo central en el que se puede buscar por contenido",
      "Gestión clara de permisos y accesos por equipo o por cliente",
      "Alojado en tus servidores, conforme al RGPD, sin proveedores de nube ajenos",
    ],
  },
};
