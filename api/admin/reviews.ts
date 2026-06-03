import { requireAdmin } from '../_lib/auth.js';
import { ensureSchema, isDatabaseConfigured, sql } from '../_lib/db.js';
import { allowOnly, setJsonHeaders } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, reviews: [] });
    return;
  }

  await ensureSchema();

  const reviews = await sql`
    SELECT id, google_review_id, author_name, rating, comment, review_date, business_reply, approved_for_site, source, created_at
    FROM reviews
    ORDER BY COALESCE(review_date, created_at) DESC
    LIMIT 100
  `;

  res.status(200).json({ ok: true, reviews });
}

