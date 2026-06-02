# Roadmap

## Phase 1: Landing Conversion Redesign

**Goal:** Redesign the homepage into a premium, high-conversion landing page for WhatsApp leads while preserving the existing stack, SEO, and business data.

**Slug:** `landing-conversion-redesign`

**UI hint:** yes

**Requirements:** LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, VIS-01, VIS-02, VIS-03, VIS-04, BOT-01, BOT-02, BOT-03

**Success Criteria**

1. Hero clearly communicates risk prevention and has a WhatsApp CTA visible above the fold.
2. Homepage sections follow one consistent premium visual system.
3. Lead capture copy prepares the future WhatsApp bot by collecting relevant vehicle and scheduling context.
4. Mobile layout has no overlapping text, clipped buttons, or awkward card nesting.
5. `npm run build` passes.

## Phase 2: First-Party Tracking Admin

**Goal:** Build a private admin dashboard where the client can see real landing-page conversion data without depending on GA4.

**Slug:** `first-party-tracking-admin`

**UI hint:** yes

**Requirements:** TRACK-01, TRACK-02, TRACK-03, TRACK-04, TRACK-05, LGPD-01

**Success Criteria**

1. WhatsApp CTA clicks, popup opens, popup submissions, source page, UTM data, device type, and timestamp are captured by a first-party API.
2. Events are stored in a database with privacy-conscious metadata and no unnecessary personal data.
3. `/admin` requires authentication before showing metrics.
4. Dashboard shows totals, conversion rate, recent leads, top pages, traffic sources, and period filters.
5. Tracking respects cookie consent and LGPD requirements.

## Phase 3: WhatsApp Bot

**Goal:** Implement the WhatsApp automation flow that qualifies leads and routes them to human service or scheduling.

**UI hint:** no

**Requirements:** BOT-V2-01, CRM-V2-01

**Success Criteria**

1. Bot can classify lead intent and collect missing vehicle/location data.
2. Bot can hand off to a human with a complete summary.
3. Bot flow respects LGPD consent and business contact boundaries.
