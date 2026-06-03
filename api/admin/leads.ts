import { requireAdmin } from '../_lib/auth.js';
import { ensureSchema, isDatabaseConfigured, sql } from '../_lib/db.js';
import { allowOnly, setJsonHeaders } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, leads: [] });
    return;
  }

  await ensureSchema();

  const leads = await sql`
    SELECT id, name, email, phone, service, city, vehicle, address, urgency, source_path, utm_source, status, created_at
    FROM lead_events
    ORDER BY created_at DESC
    LIMIT 100
  `;

  res.status(200).json({ ok: true, leads });
}

