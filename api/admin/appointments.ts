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

function toNullableNumber(value: unknown) {
  const text = toText(value);
  if (!text) return null;
  const number = Number(text);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function appointmentStatusToLeadStatus(status: string) {
  if (status === 'done') return 'won';
  if (status === 'confirmed' || status === 'pending') return 'scheduled';
  if (status === 'canceled') return 'contacted';
  return 'scheduled';
}

async function syncLeadFromAppointment(leadId: number | null, status: string) {
  if (!sql || !leadId) return;

  await sql`
    UPDATE lead_events
    SET status = ${appointmentStatusToLeadStatus(status)}, updated_at = now()
    WHERE id = ${leadId}
      AND (
        status NOT IN ('won', 'lost')
        OR ${status} = 'done'
      )
  `;
}

async function syncLeadStatusesFromAppointments() {
  if (!sql) return;

  await sql`
    WITH appointment_state AS (
      SELECT
        lead_id,
        BOOL_OR(status = 'done') AS has_done,
        BOOL_OR(status IN ('pending', 'confirmed')) AS has_active,
        BOOL_OR(status = 'canceled') AS has_canceled
      FROM appointments
      WHERE lead_id IS NOT NULL
      GROUP BY lead_id
    )
    UPDATE lead_events
    SET
      status = CASE
        WHEN appointment_state.has_done THEN 'won'
        WHEN appointment_state.has_active AND lead_events.status IN ('new', 'contacted', 'scheduled') THEN 'scheduled'
        WHEN appointment_state.has_canceled AND lead_events.status = 'new' THEN 'contacted'
        ELSE lead_events.status
      END,
      updated_at = now()
    FROM appointment_state
    WHERE lead_events.id = appointment_state.lead_id
      AND (
        appointment_state.has_done
        OR (appointment_state.has_active AND lead_events.status IN ('new', 'contacted', 'scheduled'))
        OR (appointment_state.has_canceled AND lead_events.status = 'new')
      )
  `;
}

async function listAppointments() {
  if (!sql) return [];

  return sql`
    SELECT
      appointments.id,
      appointments.lead_id,
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
    ORDER BY COALESCE(appointments.scheduled_for, appointments.created_at) DESC
    LIMIT 100
  `;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['GET', 'POST', 'PATCH', 'DELETE'])) return;
  if (requireAdmin(req, res)) return;

  if (!isDatabaseConfigured || !sql) {
    res.status(200).json({ ok: true, disabled: true, appointments: [] });
    return;
  }

  await ensureSchema();
  const body = getBody(req);

  if (req.method === 'POST') {
    const leadId = toNullableNumber(body.lead_id || body.leadId);
    const status = toText(body.status) || 'pending';

    await sql`
      INSERT INTO appointments (lead_id, scheduled_for, location, status, notes)
      VALUES (
        ${leadId},
        ${toNullableText(body.scheduled_for || body.scheduledFor)},
        ${toNullableText(body.location)},
        ${status},
        ${toNullableText(body.notes)}
      )
    `;

    await syncLeadFromAppointment(leadId, status);
  }

  if (req.method === 'PATCH') {
    const id = getId(req, body);
    if (!id) {
      res.status(400).json({ ok: false, error: 'missing_id' });
      return;
    }

    const leadId = toNullableNumber(body.lead_id || body.leadId);
    const status = toText(body.status) || 'pending';

    await sql`
      UPDATE appointments
      SET
        lead_id = ${leadId},
        scheduled_for = ${toNullableText(body.scheduled_for || body.scheduledFor)},
        location = ${toNullableText(body.location)},
        status = ${status},
        notes = ${toNullableText(body.notes)},
        updated_at = now()
      WHERE id = ${id}
    `;

    await syncLeadFromAppointment(leadId, status);
  }

  if (req.method === 'DELETE') {
    const id = getId(req, body);
    if (!id) {
      res.status(400).json({ ok: false, error: 'missing_id' });
      return;
    }

    await sql`DELETE FROM appointments WHERE id = ${id}`;
  }

  await syncLeadStatusesFromAppointments();
  const appointments = await listAppointments();
  res.status(200).json({ ok: true, appointments });
}
