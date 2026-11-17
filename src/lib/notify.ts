/**
 * Emails the business owner when a form is saved. Staff-only: visitors never
 * get this email. Sends through Resend's HTTP API when RESEND_API_KEY and
 * NOTIFY_EMAIL are set; otherwise does nothing. NOTIFY_BCC (optional,
 * comma-separated) gets a blind copy for web support. A failed email never fails
 * the submission, since the row is already stored in Supabase.
 */
export async function notifyOwner(
  subject: string,
  fields: Record<string, string | number | string[] | null>,
  replyTo?: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const toRaw = process.env.NOTIFY_EMAIL;
  if (!apiKey || !toRaw) return;
  const list = (raw?: string) => (raw ?? "").split(",").map((e) => e.trim()).filter(Boolean);
  const to = list(toRaw);
  // Silent copy for the site's web support (backup + tech issues). The owner
  // doesn't see who else received it.
  const bcc = list(process.env.NOTIFY_BCC);

  const body = Object.entries(fields)
    .map(([label, value]) => {
      const text = Array.isArray(value) ? value.join(", ") : value;
      return `${label}: ${text === null || text === "" ? "-" : text}`;
    })
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM ?? "Taste of Ty's Kitchen <onboarding@resend.dev>",
        to,
        ...(bcc.length ? { bcc } : {}),
        subject,
        ...(replyTo ? { reply_to: replyTo } : {}),
        text: `${body}\n\nSaved in Supabase.`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error("owner notification failed", response.status);
  } catch {
    console.error("owner notification failed");
  }
}
