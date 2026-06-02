---
phase: 1
slug: landing-conversion-redesign
status: approved
shadcn_initialized: false
preset: technical-premium-automotive
created: 2026-06-02
---

# Phase 1 - UI Design Contract

> Visual and interaction contract for the homepage conversion redesign.

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | technical premium automotive |
| Component library | existing React components |
| Icon library | lucide-react |
| Font | Replace Orbitron-heavy feel with a cleaner premium sans/display pairing via existing CSS imports |

## Spacing Scale

Declared values must stay multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, compact labels |
| sm | 8px | Inline spacing |
| md | 16px | Component spacing |
| lg | 24px | Card/panel padding |
| xl | 32px | Layout gaps |
| 2xl | 48px | Section internal breaks |
| 3xl | 80px | Section padding |
| 4xl | 112px | Major landing blocks |

Exceptions: none.

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16-18px | 400 | 1.65 |
| Label | 11-12px | 700 | 1.2 |
| Heading | 32-52px | 700 | 1.05 |
| Display | 44-76px | 800 | 0.98-1.04 |

Rules:

- Avoid viewport-width font sizing outside Tailwind responsive breakpoints.
- Use tighter headings, not huge text inside compact panels.
- No negative letter spacing in utility CSS.
- Long Portuguese words must wrap cleanly on mobile.

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#080B10` near-black blue | Page background and hero surfaces |
| Secondary (30%) | `#111827` / `#18202C` graphite | Panels, dividers, muted UI |
| Accent (10%) | `#2563EB` / `#60A5FA` blue | Trust highlights, headings, focus rules |
| Conversion | `#25D366` WhatsApp green | Primary WhatsApp CTAs only |
| Destructive/Risk | `#EF4444` red / amber | Risk warnings only |

Accent reserved for: hero proof chips, section labels, key risk/protection highlights, active focus borders.

## Landing Flow Contract

1. Hero: risk-prevention headline, direct WhatsApp CTA, secondary "what we inspect" CTA, and trust strip.
2. Problem: buying a used car can hide crash repair, auction history, documentation issues, and painted panels.
3. Service: what KL checks and why each item matters.
4. Proof: testimonials, operational facts, business contact, CNPJ.
5. Mobile service: "we go to the car" with clear service area.
6. Objections: FAQ with concise answers.
7. Final CTA: send vehicle details on WhatsApp.

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Agendar vistoria no WhatsApp |
| Secondary CTA | Ver o que analisamos |
| Hero headline | Evite comprar carro batido ou adulterado |
| Form intent | Envie os dados do veiculo para avaliarmos o atendimento |
| Error state | Nao foi possivel enviar agora. Abra o WhatsApp e fale com a equipe. |

## WhatsApp Bot Readiness

The popup and message text should preserve these fields:

- Name
- Email
- WhatsApp
- Location
- Vehicle
- Service
- Urgency or buying context where feasible

The message should remain readable for a human and structured enough for future parsing.

## Interaction Contract

- Sticky WhatsApp button remains available.
- Primary CTAs dispatch `open-whatsapp-popup`.
- Buttons use lucide icons where useful.
- Hover motion should be subtle: translate 1-2px, no bounce.
- Respect reduced-motion where current components allow it.

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| none | none | not applicable |

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-06-02
