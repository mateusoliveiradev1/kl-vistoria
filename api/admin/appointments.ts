import { requireAdmin } from '../_lib/auth.js';
import { ensureSchema, isDatabaseConfigured, sql } from '../_lib/db.js';
import { allowOnly, setJsonHeaders } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, appointments: [] });
    return;
  }

  await ensureSchema();

  const appointments = await sql`
    SELECT
      appointments.id,
      appointments.scheduled_for,
      appointments.location,
      appointments.status,
      appointments.notes,
      appointments.created_at,
      lead_events.name AS lead_name,
      lead_events.phone AS lead_phone,
      lead_events.service AS lead_service,
      lead_events.vehicle AS lead_vehicle
    FROM appointments
    LEFT JOIN lead_events ON lead_events.id = appointments.lead_id
    ORDER BY appointments.created_at DESC
    LIMIT 100
  `;

  res.status(200).json({ ok: true, appointments });
}

