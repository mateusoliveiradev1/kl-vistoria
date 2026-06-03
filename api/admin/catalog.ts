import { requireAdmin } from '../_lib/auth.js';
import { ensureSchema, isDatabaseConfigured, sql } from '../_lib/db.js';
import { allowOnly, setJsonHeaders } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, catalog: [] });
    return;
  }

  await ensureSchema();

  const catalog = await sql`
    SELECT id, name, short_description, full_description, base_price, average_time, active, sort_order, updated_at
    FROM service_catalog
    ORDER BY active DESC, sort_order ASC, name ASC
    LIMIT 100
  `;

  res.status(200).json({ ok: true, catalog });
}

