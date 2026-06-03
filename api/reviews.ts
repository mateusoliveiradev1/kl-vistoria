import { ensureSchema, isDatabaseConfigured, sql } from './_lib/db.js';
import { allowOnly, setJsonHeaders } from './_lib/http.js';
import type { ApiRequest, ApiResponse } from './_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET'])) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, reviews: [] });
    return;
  }

  await ensureSchema();

  const reviews = await sql`
    SELECT id, author_name, rating, comment, review_date, source
    FROM reviews
    WHERE approved_for_site = true
      AND comment IS NOT NULL
      AND comment <> ''
    ORDER BY COALESCE(review_date, created_at) DESC
    LIMIT 12
  `;

  res.status(200).json({ ok: true, reviews });
}
