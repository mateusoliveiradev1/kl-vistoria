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

function toRating(value: unknown) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return null;
  return Math.min(Math.max(rating, 1), 5);
}

function toBoolean(value: unknown) {
  if (typeof value === 'boolean') return value;
  return toText(value) === 'true';
}

function firstDefined(...values: unknown[]) {
  return values.find((value) => value !== undefined);
}

async function listReviews() {
  if (!sql) return [];

  return sql`
    SELECT id, google_review_id, author_name, rating, comment, review_date, business_reply, approved_for_site, source, created_at, updated_at
    FROM reviews
    ORDER BY approved_for_site DESC, COALESCE(review_date, created_at) DESC
    LIMIT 150
  `;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET', 'POST', 'PATCH', 'DELETE'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, reviews: [] });
    return;
  }

  await ensureSchema();
  const body = getBody(req);

  if (req.method === 'POST') {
    const authorName = toText(body.author_name || body.authorName);
    if (!authorName) {
      res.status(400).json({ ok: false, error: 'missing_author' });
      return;
    }

    await sql`
      INSERT INTO reviews (author_name, rating, comment, review_date, business_reply, approved_for_site, source)
      VALUES (
        ${authorName},
        ${toRating(body.rating)},
        ${toNullableText(body.comment)},
        ${toNullableText(body.review_date || body.reviewDate)},
        ${toNullableText(body.business_reply || body.businessReply)},
        ${toBoolean(firstDefined(body.approved_for_site, body.approvedForSite))},
        ${toText(body.source) || 'manual'}
      )
    `;
  }

  if (req.method === 'PATCH') {
    const id = getId(req, body);
    const authorName = toText(body.author_name || body.authorName);
    if (!id || !authorName) {
      res.status(400).json({ ok: false, error: 'missing_id_or_author' });
      return;
    }

    await sql`
      UPDATE reviews
      SET
        author_name = ${authorName},
        rating = ${toRating(body.rating)},
        comment = ${toNullableText(body.comment)},
        review_date = ${toNullableText(body.review_date || body.reviewDate)},
        business_reply = ${toNullableText(body.business_reply || body.businessReply)},
        approved_for_site = ${toBoolean(firstDefined(body.approved_for_site, body.approvedForSite))},
        source = ${toText(body.source) || 'manual'},
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

    await sql`DELETE FROM reviews WHERE id = ${id}`;
  }

  const reviews = await listReviews();
  res.status(200).json({ ok: true, reviews });
}
