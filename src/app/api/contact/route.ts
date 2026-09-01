import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(20),
  privacy: z.literal(true)
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten() }, { status: 400 });
  }

  // TODO: deliver the enquiry — Resend, Postmark, SMTP or a CRM webhook.
  // Keep the payload out of the logs, it contains personal data.
  console.info('contact form submission received', { at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
