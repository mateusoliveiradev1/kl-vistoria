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

function toNullableText(value: unknown) {
  const text = toText(value);
  return text || null;
}

function toBoolean(value: unknown) {
  if (typeof value === 'boolean') return value;
  return toText(value) !== 'false';
}

function toSortOrder(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

async function listCatalog() {
  if (!sql) return [];

  return sql`
    SELECT id, name, short_description, full_description, base_price, average_time, active, sort_order, updated_at
    FROM service_catalog
    ORDER BY active DESC, sort_order ASC, name ASC
    LIMIT 100
  `;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET', 'POST', 'PATCH', 'DELETE'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, catalog: [] });
    return;
  }

  await ensureSchema();
  const body = getBody(req);

  if (req.method === 'POST') {
    const name = toText(body.name);
    if (!name) {
      res.status(400).json({ ok: false, error: 'missing_name' });
      return;
    }

    await sql`
      INSERT INTO service_catalog (
        name,
        short_description,
        full_description,
        base_price,
        average_time,
        active,
        sort_order
      )
      VALUES (
        ${name},
        ${toNullableText(body.short_description || body.shortDescription)},
        ${toNullableText(body.full_description || body.fullDescription)},
        ${toNullableText(body.base_price || body.basePrice)},
        ${toNullableText(body.average_time || body.averageTime)},
        ${toBoolean(body.active)},
        ${toSortOrder(body.sort_order || body.sortOrder)}
      )
    `;
  }

  if (req.method === 'PATCH') {
    const id = getId(req, body);
    const name = toText(body.name);
    if (!id || !name) {
      res.status(400).json({ ok: false, error: 'missing_id_or_name' });
      return;
    }

    await sql`
      UPDATE service_catalog
      SET
        name = ${name},
        short_description = ${toNullableText(body.short_description || body.shortDescription)},
        full_description = ${toNullableText(body.full_description || body.fullDescription)},
        base_price = ${toNullableText(body.base_price || body.basePrice)},
        average_time = ${toNullableText(body.average_time || body.averageTime)},
        active = ${toBoolean(body.active)},
        sort_order = ${toSortOrder(body.sort_order || body.sortOrder)},
        updated_at = now()
      WHERE id = ${id}
    `;
  }

  if (req.method === 'DELETE') {
    const id = getId(req, body);
    if (!id) {
      res.status(400).json({ ok: false, error: 'missing_id' });
      return;
    }

    await sql`DELETE FROM service_catalog WHERE id = ${id}`;
  }

  const catalog = await listCatalog();
  res.status(200).json({ ok: true, catalog });
}

