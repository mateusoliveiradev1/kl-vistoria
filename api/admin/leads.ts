import { requireAdmin } from '../_lib/auth.js';
import { ensureSchema, isDatabaseConfigured, sql } from '../_lib/db.js';
import { allowOnly, getBody, setJsonHeaders, toText } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

function getId(req: ApiRequest, body: Record<string, unknown>) {
  const raw = body.id || req.query?.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const id = Number(value);
  return Number.isFinite(id) && id > 0 ? id : 0;
}

function getQueryValue(req: ApiRequest, name: string) {
  const raw = req.query?.[name];
  return Array.isArray(raw) ? raw[0] || '' : raw || '';
}

function getDays(req: ApiRequest) {
  const days = Number(getQueryValue(req, 'days') || 365);
  if (!Number.isFinite(days)) return 365;
  return Math.min(Math.max(Math.floor(days), 1), 365);
}

async function listLeads(req: ApiRequest) {
  if (!sql) return [];

  const days = getDays(req);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const status = toText(getQueryValue(req, 'status'));
  const search = toText(getQueryValue(req, 'search'));
  const searchPattern = `%${search}%`;

  return sql`
    SELECT id, name, email, phone, service, city, vehicle, address, urgency, source_path, utm_source, status, notes, created_at, updated_at
    FROM lead_events
    WHERE created_at >= ${since}
      AND (${status} = '' OR status = ${status})
      AND (
        ${search} = ''
        OR name ILIKE ${searchPattern}
        OR phone ILIKE ${searchPattern}
        OR email ILIKE ${searchPattern}
        OR vehicle ILIKE ${searchPattern}
        OR service ILIKE ${searchPattern}
      )
    ORDER BY created_at DESC
    LIMIT 150
  `;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET', 'PATCH'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, leads: [] });
    return;
  }

  await ensureSchema();
  const body = getBody(req);

  if (req.method === 'PATCH') {
    const id = getId(req, body);
    if (!id) {
      res.status(400).json({ ok: false, error: 'missing_id' });
      return;
    }

    const status = toText(body.status) || 'new';
    const notes = toText(body.notes);

    await sql`
      UPDATE lead_events
      SET status = ${status}, notes = ${notes || null}, updated_at = now()
      WHERE id = ${id}
    `;
  }

  const leads = await listLeads(req);
  res.status(200).json({ ok: true, leads });
}
