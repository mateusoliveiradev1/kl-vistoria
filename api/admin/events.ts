import { requireAdmin } from '../_lib/auth.js';
import { ensureSchema, isDatabaseConfigured, sql } from '../_lib/db.js';
import { allowOnly, setJsonHeaders, toText } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

function getQueryValue(req: ApiRequest, name: string) {
  const raw = req.query?.[name];
  return Array.isArray(raw) ? raw[0] || '' : raw || '';
}

function getBoundedNumber(req: ApiRequest, name: string, fallback: number, min: number, max: number) {
  const number = Number(getQueryValue(req, name) || fallback);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(Math.floor(number), min), max);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, events: [] });
    return;
  }

  await ensureSchema();

  const days = getBoundedNumber(req, 'days', 30, 1, 365);
  const limit = getBoundedNumber(req, 'limit', 80, 10, 200);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const eventName = toText(getQueryValue(req, 'event'));
  const search = toText(getQueryValue(req, 'search'));
  const searchPattern = `%${search}%`;

  const events = await sql`
    SELECT id, event_name, path, referrer, utm_source, utm_medium, utm_campaign, device_type, metadata_json, created_at
    FROM tracking_events
    WHERE created_at >= ${since}
      AND COALESCE(path, '') NOT LIKE '/admin%'
      AND (${eventName} = '' OR event_name = ${eventName})
      AND (
        ${search} = ''
        OR path ILIKE ${searchPattern}
        OR referrer ILIKE ${searchPattern}
        OR utm_source ILIKE ${searchPattern}
        OR utm_campaign ILIKE ${searchPattern}
      )
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  res.status(200).json({ ok: true, events });
}
