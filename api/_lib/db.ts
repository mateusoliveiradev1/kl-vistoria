import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL ||
  '';

export const isDatabaseConfigured = Boolean(connectionString);

export const sql = connectionString ? neon(connectionString) : null;

let schemaReady = false;

export async function ensureSchema() {
  if (!sql || schemaReady) return;

  await sql`
    CREATE TABLE IF NOT EXISTS tracking_events (
      id BIGSERIAL PRIMARY KEY,
      event_name TEXT NOT NULL,
      path TEXT,
      referrer TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      device_type TEXT,
      metadata_json JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS lead_events (
      id BIGSERIAL PRIMARY KEY,
      name TEXT,
      email TEXT,
      phone TEXT,
      service TEXT,
      city TEXT,
      vehicle TEXT,
      address TEXT,
      urgency TEXT,
      source_path TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      metadata_json JSONB DEFAULT '{}'::jsonb,
      status TEXT DEFAULT 'new' NOT NULL,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL
    )
  `;

  await sql`ALTER TABLE lead_events ADD COLUMN IF NOT EXISTS notes TEXT`;
  await sql`ALTER TABLE lead_events ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now() NOT NULL`;

  await sql`
    CREATE TABLE IF NOT EXISTS service_catalog (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      short_description TEXT,
      full_description TEXT,
      base_price TEXT,
      average_time TEXT,
      active BOOLEAN DEFAULT true NOT NULL,
      sort_order INTEGER DEFAULT 0 NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id BIGSERIAL PRIMARY KEY,
      google_review_id TEXT UNIQUE,
      author_name TEXT,
      rating NUMERIC(2, 1),
      comment TEXT,
      review_date TIMESTAMPTZ,
      business_reply TEXT,
      approved_for_site BOOLEAN DEFAULT false NOT NULL,
      source TEXT DEFAULT 'manual' NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS appointments (
      id BIGSERIAL PRIMARY KEY,
      lead_id BIGINT REFERENCES lead_events(id) ON DELETE SET NULL,
      scheduled_for TIMESTAMPTZ,
      location TEXT,
      status TEXT DEFAULT 'pending' NOT NULL,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS tracking_events_created_at_idx
    ON tracking_events (created_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS tracking_events_event_name_idx
    ON tracking_events (event_name)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS lead_events_created_at_idx
    ON lead_events (created_at DESC)
  `;

  schemaReady = true;
}
