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

function getBoundedNumber(req: ApiRequest, name: string, fallback: number, min: number, max: number) {
  const number = Number(getQueryValue(req, name) || fallback);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(Math.floor(number), min), max);
}

async function listLeads(req: ApiRequest) {
  if (!sql) return { leads: [], pagination: { page: 1, limit: 30, total: 0, pages: 1 }, statusCounts: [] };

  const days = getDays(req);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const status = toText(getQueryValue(req, 'status'));
  const search = toText(getQueryValue(req, 'search'));
  const searchPattern = `%${search}%`;
  const page = getBoundedNumber(req, 'page', 1, 1, 100000);
  const limit = getBoundedNumber(req, 'limit', 30, 10, 100);
  const offset = (page - 1) * limit;

  const [leads, totals, statusCounts] = await Promise.all([
    sql`
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
      LIMIT ${limit}
      OFFSET ${offset}
    `,
    sql`
      SELECT COUNT(*)::int AS total
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
    `,
    sql`
      SELECT status, COUNT(*)::int AS total
      FROM lead_events
      WHERE created_at >= ${since}
        AND (
          ${search} = ''
          OR name ILIKE ${searchPattern}
          OR phone ILIKE ${searchPattern}
          OR email ILIKE ${searchPattern}
          OR vehicle ILIKE ${searchPattern}
          OR service ILIKE ${searchPattern}
        )
      GROUP BY status
    `,
  ]);

  const total = Number(totals[0]?.total || 0);

  return {
    leads,
    statusCounts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(Math.ceil(total / limit), 1),
    },
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET', 'PATCH'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({
      ok: true,
      disabled: true,
      leads: [],
      statusCounts: [],
      pagination: { page: 1, limit: 30, total: 0, pages: 1 },
    });
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

  const result = await listLeads(req);
  res.status(200).json({ ok: true, ...result });
}
