import { ensureSchema, isDatabaseConfigured, sql } from './_lib/db.js';
import { allowOnly, getBody, setJsonHeaders, toText } from './_lib/http.js';
import type { ApiRequest, ApiResponse } from './_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['POST'])) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true });
    return;
  }

  const body = getBody(req);
  const eventName = toText(body.event_name || body.eventName);

  if (!eventName) {
    res.status(400).json({ ok: false, error: 'missing_event_name' });
    return;
  }

  await ensureSchema();

  await sql`
    INSERT INTO tracking_events (
      event_name,
      path,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      device_type,
      metadata_json
    )
    VALUES (
      ${eventName},
      ${toText(body.path)},
      ${toText(body.referrer)},
      ${toText(body.utm_source || body.utmSource)},
      ${toText(body.utm_medium || body.utmMedium)},
      ${toText(body.utm_campaign || body.utmCampaign)},
      ${toText(body.device_type || body.deviceType)},
      ${JSON.stringify(body.metadata || {})}::jsonb
    )
  `;

  res.status(200).json({ ok: true });
}
