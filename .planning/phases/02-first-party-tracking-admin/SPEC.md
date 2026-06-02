# Phase 2 Spec: First-Party Tracking Admin

## Objective

Create a private admin panel for KL Vistorias to inspect real conversion data from the landing page without relying on GA4.

## What To Track

- Page view with path, referrer, UTM source, UTM medium, UTM campaign, device type, and timestamp.
- WhatsApp CTA click with CTA location, current page, and UTM context.
- WhatsApp popup open with source component and current page.
- WhatsApp popup submit with selected service, city/region, vehicle context, current page, and timestamp.
- Lead calculator WhatsApp click with risk result and current page.

## Data Model

Recommended tables:

- `tracking_events`: id, event_name, path, referrer, utm_source, utm_medium, utm_campaign, device_type, metadata_json, created_at.
- `lead_events`: id, name, phone, service, city, vehicle, source_path, utm_source, utm_medium, utm_campaign, created_at.
- `admin_users`: id, email, password_hash or provider id, role, created_at.

## API

- `POST /api/track`: records anonymous conversion events.
- `POST /api/leads`: records qualified lead data from the popup before opening WhatsApp.
- `GET /api/admin/summary`: totals and conversion rates for selected period.
- `GET /api/admin/events`: recent events.
- `GET /api/admin/leads`: recent leads and filters.

## Admin UI

- `/admin/login`: password or provider-based login.
- `/admin`: dashboard with date filters, KPI cards, top pages, source breakdown, and latest leads.
- `/admin/leads`: table with captured lead context and WhatsApp-ready summary.

## Privacy / LGPD

- Respect cookie consent for non-essential analytics.
- Do not store IP address unless there is a documented business reason.
- Avoid storing full user-agent if device type is enough.
- Add retention policy for old raw events.
- Update privacy policy before deploy.

## Recommended Stack

- Vercel serverless functions for API routes.
- Neon Postgres for durable event and lead storage.
- Auth.js, Clerk, or a simple protected admin session depending on budget and maintenance tolerance.
