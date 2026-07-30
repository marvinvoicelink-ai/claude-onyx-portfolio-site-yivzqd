// Sends contact-form submissions via Resend. Requires env vars on Vercel:
//   RESEND_API_KEY   – API key from resend.com
//   CONTACT_TO_EMAIL – where leads should land (e.g. info@onyx-ai.de)
//   CONTACT_FROM_EMAIL – a sender verified in Resend (e.g. onboarding@resend.dev while testing)
// Netlify Forms doesn't exist on Vercel, so this replaces it. Lead-tracking
// accuracy depends on this endpoint only ever returning ok:true when the
// email actually sent — never fake a success.

export async function POST(request: Request) {
  const data = await request.formData();

  // Honeypot: silently accept without sending, so bots don't learn it failed.
  if (data.get("bot-field")) {
    return Response.json({ ok: true });
  }

  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Contact form: missing RESEND_API_KEY/CONTACT_TO_EMAIL/CONTACT_FROM_EMAIL env vars");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `Neue Anfrage über onyx-ai.de — ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const body = await resendResponse.text();
    console.error("Resend error:", resendResponse.status, body);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
