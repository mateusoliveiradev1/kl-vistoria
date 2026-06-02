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
  await ensureSchema();

  const inserted = await sql`
    INSERT INTO lead_events (
      name,
      email,
      phone,
      service,
      city,
      vehicle,
      address,
      urgency,
      source_path,
      utm_source,
      utm_medium,
      utm_campaign,
      metadata_json
    )
    VALUES (
      ${toText(body.name)},
      ${toText(body.email)},
      ${toText(body.phone)},
      ${toText(body.service)},
      ${toText(body.city)},
      ${toText(body.vehicle)},
      ${toText(body.address)},
      ${toText(body.urgency)},
      ${toText(body.source_path || body.sourcePath)},
      ${toText(body.utm_source || body.utmSource)},
      ${toText(body.utm_medium || body.utmMedium)},
      ${toText(body.utm_campaign || body.utmCampaign)},
      ${JSON.stringify(body.metadata || {})}::jsonb
    )
    RETURNING id
  `;

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
      'popup_submit',
      ${toText(body.source_path || body.sourcePath)},
      ${toText(body.referrer)},
      ${toText(body.utm_source || body.utmSource)},
      ${toText(body.utm_medium || body.utmMedium)},
      ${toText(body.utm_campaign || body.utmCampaign)},
      ${toText(body.device_type || body.deviceType)},
      ${JSON.stringify({ lead_id: inserted[0]?.id, service: toText(body.service), urgency: toText(body.urgency) })}::jsonb
    )
  `;

  res.status(200).json({ ok: true, leadId: inserted[0]?.id });
}
