# KL Vistorias Landing

## What This Is

KL Vistorias is a React/Vite landing page for automotive inspection services in Goiania and nearby cities. The site exists to convert people who are about to buy or sell a vehicle into qualified WhatsApp leads for vistoria cautelar, historic checks, and mobile inspection scheduling.

The next product direction is a premium, high-conversion landing page that feels trustworthy, operational, and direct rather than decorative or generic tech.

## Core Value

The page must make a buyer feel protected enough to start a WhatsApp conversation before closing a vehicle deal.

## Requirements

### Validated

- Existing React/Vite landing page ships on Vercel.
- Existing WhatsApp popup collects lead context and opens WhatsApp.
- Existing SEO pages and service-area routes are part of the project.
- Company contact number and CNPJ are now corrected.

### Active

- [ ] Redesign the homepage landing flow for high conversion.
- [ ] Make WhatsApp the dominant conversion path without hiding trust details.
- [ ] Improve visual trust, hierarchy, spacing, and mobile readability.
- [ ] Prepare lead capture copy and data structure for a future WhatsApp bot.

### Out of Scope

- Building the WhatsApp bot in this phase - handled after the landing redesign.
- Rebuilding the app framework - keep React/Vite/Tailwind.
- Replacing SEO service-area generation - preserve current local SEO behavior.
- Building the admin dashboard - separate project track.

## Context

- Current UI uses a dark technical automotive style, heavy motion, glass cards, Orbitron/Exo typography, and multiple section styles.
- The referenced Impeccable repo is useful as design guidance: small radii, deliberate type, strong contrast, restrained borders, clear component primitives, and anti-pattern avoidance.
- The landing should sell a real local service, not a SaaS product. The visual tone should be technical premium: near-black blue, graphite, white, blue trust signals, and green only for WhatsApp conversion.
- The future WhatsApp bot needs structured lead inputs: name, phone, vehicle, location, urgency, and service intent.

## Constraints

- **Tech stack**: Keep React, TypeScript, Vite, Tailwind, Framer Motion, Lucide, React Helmet.
- **Conversion**: Primary CTA must always route to WhatsApp/popup.
- **SEO**: Preserve existing metadata, local route pages, and schema behavior.
- **Mobile**: Above-the-fold content must fit cleanly on common mobile viewports.
- **Performance**: Avoid adding heavy new libraries for the redesign.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Impeccable principles, not direct copy | The external repo is Astro/CSS and not domain-specific | Pending |
| Make WhatsApp the primary funnel | Business lead handling happens on WhatsApp | Pending |
| Use premium automotive trust language | The buyer needs risk reduction, not visual novelty | Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition**
1. Requirements invalidated? Move to Out of Scope with reason.
2. Requirements validated? Move to Validated with phase reference.
3. New requirements emerged? Add to Active.
4. Decisions to log? Add to Key Decisions.
5. "What This Is" still accurate? Update if drifted.

**After each milestone**
1. Full review of all sections.
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state.

---
*Last updated: 2026-06-02 after GSD initialization for landing redesign*
