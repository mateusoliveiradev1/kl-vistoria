import { requireAdmin } from '../_lib/auth.js';
import { ensureSchema, isDatabaseConfigured, sql } from '../_lib/db.js';
import { allowOnly, setJsonHeaders } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

function getDays(req: ApiRequest) {
  const raw = req.query?.days;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const days = Number(value || 30);

  if (!Number.isFinite(days)) return 30;
  return Math.min(Math.max(Math.floor(days), 1), 365);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true });
    return;
  }

  await ensureSchema();

  const days = getDays(req);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const [
    eventCounts,
    leadTotals,
    topPages,
    sourceBreakdown,
    recentLeads,
    recentEvents,
  ] = await Promise.all([
    sql`
      SELECT event_name, COUNT(*)::int AS total
      FROM tracking_events
      WHERE created_at >= ${since}
      GROUP BY event_name
      ORDER BY total DESC
    `,
    sql`
      SELECT COUNT(*)::int AS total
      FROM lead_events
      WHERE created_at >= ${since}
    `,
    sql`
      SELECT COALESCE(NULLIF(path, ''), '/') AS path, COUNT(*)::int AS total
      FROM tracking_events
      WHERE created_at >= ${since}
      GROUP BY COALESCE(NULLIF(path, ''), '/')
      ORDER BY total DESC
      LIMIT 8
    `,
    sql`
      SELECT COALESCE(NULLIF(utm_source, ''), 'direto') AS source, COUNT(*)::int AS total
      FROM tracking_events
      WHERE created_at >= ${since}
      GROUP BY COALESCE(NULLIF(utm_source, ''), 'direto')
      ORDER BY total DESC
      LIMIT 8
    `,
    sql`
      SELECT id, name, email, phone, service, vehicle, address, urgency, source_path, status, created_at
      FROM lead_events
      ORDER BY created_at DESC
      LIMIT 12
    `,
    sql`
      SELECT id, event_name, path, utm_source, device_type, created_at
      FROM tracking_events
      ORDER BY created_at DESC
      LIMIT 20
    `,
  ]);

  const counts = Object.fromEntries(eventCounts.map((row) => [row.event_name, row.total]));
  const pageViews = Number(counts.page_view || 0);
  const whatsappClicks = Number(counts.whatsapp_click || 0);
  const popupOpens = Number(counts.popup_open || 0);
  const popupSubmits = Number(counts.popup_submit || 0);
  const leads = Number(leadTotals[0]?.total || 0);

  res.status(200).json({
    ok: true,
    days,
    kpis: {
      pageViews,
      whatsappClicks,
      popupOpens,
      popupSubmits,
      leads,
      conversionRate: pageViews > 0 ? Number(((leads / pageViews) * 100).toFixed(2)) : 0,
    },
    eventCounts,
    topPages,
    sourceBreakdown,
    recentLeads,
    recentEvents,
  });
}
