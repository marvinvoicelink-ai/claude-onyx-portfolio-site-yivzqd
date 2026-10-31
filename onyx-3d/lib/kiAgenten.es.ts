import type { KiAgentText } from "./kiAgenten";

export const kiAgentenEs: Record<string, KiAgentText> = {
  "telefon-agent": {
    title: "Agente telefónico.",
    subtitle: "Atiende las llamadas y envía la respuesta por correo.",
    detail:
      "Un agente de IA coge el teléfono, atiende la llamada y recoge los datos de quien llama, y a continuación envía automáticamente por correo la respuesta adecuada al cliente. Sin esperas en cola y sin llamadas perdidas. El agente mantiene la conversación en lenguaje natural, registra la solicitud de forma estructurada y se encarga justo de los casos que, de otro modo, se te quedan pendientes cuando nadie puede coger el teléfono.",
    bullets: [
      "Atiende llamadas las 24 horas, también fuera del horario laboral",
      "Registra la solicitud de forma estructurada en lugar de en una nota a mano",
      "La respuesta sale automáticamente por correo a quien llamó",
      "Habla en lenguaje natural, sin esperas en cola",
      "Se encarga justo de las llamadas que, si no, se quedarían sin respuesta",
    ],
  },
  "buchungs-agent": {
    title: "Agente de reservas.",
    subtitle: "Acepta reservas y las anota directamente en el calendario.",
    detail:
      "Un segundo agente se encarga de las solicitudes de cita por teléfono: recoge la reserva y la anota directamente en tu calendario, sin pasar por papelitos ni notas de llamadas. Antes de confirmar la cita, comprueba la disponibilidad real, de modo que al final ninguna cita se da dos veces ni hay que anotarla a mano.",
    bullets: [
      "Reserva citas directamente en tu calendario actual",
      "Comprueba la disponibilidad antes de confirmar la cita",
      "Menos reservas dobles por llamadas apuntadas por separado",
      "Mantiene la conversación de reserva en lenguaje natural",
      "Reduce el trabajo manual de tu equipo con el calendario",
    ],
  },
  "anruf-agent": {
    title: "Agente de llamadas.",
    subtitle: "Llama por sí mismo a otros para conseguir la información que falta.",
    detail:
      "Un tercer agente toma la iniciativa: llama a otros, como proveedores, socios o clientes, para recabar o confirmar información que no está registrada digitalmente en ningún sitio y que hasta ahora solo se conseguía por teléfono. En lugar de esperar una respuesta, el agente coge el teléfono y después anota el resultado de forma estructurada en tu sistema.",
    bullets: [
      "Llama activamente a otros en lugar de esperar respuesta",
      "Consigue información que hasta ahora solo se obtenía por teléfono",
      "Anota el resultado de forma estructurada en tu sistema",
      "Se encarga de las consultas a proveedores, socios o clientes",
      "Te ahorra tener que ir llamando tú detrás de cada cosa",
    ],
  },
};
