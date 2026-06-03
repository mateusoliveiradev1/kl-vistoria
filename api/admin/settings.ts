import { requireAdmin } from '../_lib/auth.js';
import { ensureSchema, isDatabaseConfigured, sql } from '../_lib/db.js';
import { allowOnly, getBody, setJsonHeaders, toText } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

const GOOGLE_REVIEW_KEY = 'google_review_url';

function isValidReviewUrl(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

async function getSettings() {
  if (!sql) return { google_review_url: '' };

  const rows = await sql`
    SELECT key, value
    FROM app_settings
    WHERE key = ${GOOGLE_REVIEW_KEY}
  `;

  return {
    google_review_url: toText(rows[0]?.value),
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET', 'PATCH'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, settings: { google_review_url: '' } });
    return;
  }

  await ensureSchema();

  if (req.method === 'PATCH') {
    const body = getBody(req);
    const googleReviewUrl = toText(body.google_review_url || body.googleReviewUrl);

    if (!isValidReviewUrl(googleReviewUrl)) {
      res.status(400).json({ ok: false, error: 'invalid_google_review_url' });
      return;
    }

    await sql`
      INSERT INTO app_settings (key, value, updated_at)
      VALUES (${GOOGLE_REVIEW_KEY}, ${googleReviewUrl}, now())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `;
  }

  const settings = await getSettings();
  res.status(200).json({ ok: true, settings });
}
