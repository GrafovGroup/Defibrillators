# DEFIBRILLATORS.CA — CODEX MASTER PROMPT
Version 1.0 | 2026-11-06 | Owner: Grafov Group
Repository: https://github.com/GrafovGroup/Defibrillators

## ROLE AND OBJECTIVE
Act as senior product strategist, brand designer, Canadian bilingual copywriter, accessibility specialist, full-stack engineer, technical SEO specialist and QA lead. Build a production-ready Canadian AED (automated external defibrillator) supplier website for Defibrillators.ca. Execute in phases; make working code, not just recommendations. Preserve the approved visual direction and report actual completed work, blockers and tests. Never invent business credentials, product inventory, regulatory status, certifications or customer testimonials.

## LOCKED BUSINESS DECISIONS
- Primary brand and canonical domain: Defibrillators.ca. Secondary Defibrillator.ca must 301 redirect to the primary domain when DNS/hosting are available.
- Direct provider/supplier positioning, not a directory or lead broker. Qualified subcontractors and service partners are permitted, but do not imply they are employees.
- Customers: commercial, institutional AND residential, Canada-wide.
- Offerings: AED sales; replacement electrode pads and batteries; cabinets, signage and accessories; installation; readiness inspections and maintenance programs; multi-site AED management; CPR/AED training coordination through qualified partners.
- Contact: (833) 696-9996; info@defibrillators.ca.
- English and Canadian French from launch, including Québec-appropriate terminology and language switch in top utility bar.
- Commercial procurement is the lead growth channel; residential checkout or quote requests must also be supported.

## APPROVED DESIGN — DO NOT REDESIGN
Use the approved homepage mockup from the project conversation as the visual reference, not as a flattened webpage image. Recreate in semantic responsive HTML/CSS/components:
- Logo concept #4 Modern Wordmark: navy “Defibrillators”, red “.ca”, fine red underline/heartbeat pulse detail. Tagline: “AED SALES • INSTALLATION • MAINTENANCE • TRAINING” (localize in FR). Create SVG/vector logo and light/dark variants, favicon and accessible text alternative.
- Premium clinical-corporate navy/red/white, clean sans-serif typography, generous spacing, wide containers, rounded CTA buttons; no generic AI-looking arrows, gimmicks or crowded gradients.
- Hero: compelling AED unit and wall cabinet imagery, split layout, headline “Canada’s AED Experts” or equally clear compliance-safe copy, commercial/residential positioning, CTA “REQUEST A QUOTE” and secondary “SHOP AEDs”.
- Top utility bar: Canada-wide service, phone, EN/FR toggle; stable universal uppercase navigation: AED DEFIBRILLATORS, ACCESSORIES, INSTALLATION, MAINTENANCE, AED PROGRAMS, INDUSTRIES, RESOURCES, CONTACT.
- Four prominent image-led service cards: AEDs, accessories, installation, maintenance.
- Product imagery must be properly licensed or supplied; never generate fake branded product renderings, certifications or medical device labels. Realistic relevant custom imagery for service contexts; unique imagery per service page.
- Desktop, tablet and mobile responsive; no menu shifts between pages. Make hero appropriately tall so next section is partially visible on common desktop screens.
Suggested starting tokens (adjust after visual QA): navy #102B4E, deeper navy #09213E, red #D62839, white #FFFFFF, light background #F5F8FB; content max width 1440–1600px with responsive gutters. AA contrast minimum.

## INFORMATION ARCHITECTURE
Build localized routes with consistent slugs and reciprocal hreflang:
- /en and /fr home
- /en/defibrillators, /fr/defibrillateurs (catalogue and individual product detail templates)
- Accessories: electrode pads, batteries, cabinets, signage, emergency response kits
- Services: installation, maintenance/inspections, multi-location AED programs, training coordination
- Industries: offices, industrial/warehouses, property management/condos, schools, gyms/recreation, hospitality, retail, municipalities, residential
- About, Contact, Request Quote, FAQs, Buying Guide, AED maintenance guide, privacy policy, terms, accessibility statement
- Province/territory hub pages and genuinely useful major-city pages as content and service coverage allow. No mass-generated thin doorway pages.
Include informative internal links and breadcrumbs; use page-specific images and original copy.

## PRODUCTS AND COMMERCIAL WORKFLOWS
Create structured product schema/types with manufacturer, model, Canadian licence verification status, intended user setting, description, key specifications, included components, pads/battery compatibility, warranty (only when verified), images with rights provenance, price/availability state, and optional quote-only mode. Do not publish fabricated SKUs, prices, stock, delivery times, reviews or approvals.
- Catalogue filtering by environment, brand and product type; accessible product comparisons.
- Commercial RFQ: contact/company, email/phone, province, delivery locations, quantities, models, installation needs, maintenance needs, optional attachments and consent.
- Residential RFQ: simpler contact and product-needs form.
- Product enquiry, request service, phone/email CTAs; validation, anti-spam, secure server-side processing, accessible success/error states and consent logging. Configure mail provider using environment variables, never commit secrets.
- E-commerce checkout only after merchant, tax, inventory, shipping, return policies and payment processor are confirmed; otherwise quote-first without fake cart functionality.
- Recurring maintenance: service plan enquiry and customer renewal tracking architecture, but do not promise operational monitoring until implemented.

## REGULATORY AND TRUST REQUIREMENTS
- Confirm relevant Canadian medical-device product licensing through Health Canada MDALL before listing products as approved/licensed.
- Assess Medical Device Establishment Licence (MDEL) requirements for the precise importer/distributor/retailer and customer channels; exemptions cannot be assumed. Get qualified legal/regulatory review before launch.
- Never claim every Canadian workplace is legally required to have an AED; requirements vary by jurisdiction and facility type.
- No unsupported claims of authorized dealership, certified technicians, in-house service fleet, Health Canada endorsement, clinical outcomes, guaranteed readiness or nationwide same-day installation.
- Manufacturer-specific maintenance and technical repairs only through authorized/qualified channels; distinguish readiness checks from device servicing.
- CPR/AED certification only through verified training partners.
- Include appropriate emergency-use messaging: follow device voice prompts and local emergency procedures; this website is not emergency response.
- Confirm Canadian privacy, marketing consent, consumer protection, tax, accessibility and Québec French-language obligations with relevant advisers.

## SEO / AEO / DISCOVERABILITY
- Unique human-useful titles, meta descriptions, headings, internal links and concise FAQ answers for each localized page.
- Canonical URLs, en-CA/fr-CA hreflang plus x-default, language-aware navigation, valid XML sitemaps, robots.txt, 301 redirects, correct 404s, no duplicate locale content.
- Structured data only where factually accurate: Organization, WebSite, BreadcrumbList, Product, Offer (only with real price/availability), FAQPage where appropriate. Do not fabricate ratings/reviews or use unsupported rich-result claims.
- Core Web Vitals, responsive images, image alt text, semantic headings, server-rendered/indexable content, accessible navigation and fast load.
- Follow Google Search Central spam policies, including https://developers.google.com/search/docs/monitor-debug/prevent-abuse; avoid scaled low-value pages, keyword stuffing, doorway pages, fake location claims, expired-domain abuse and misleading structured data.
- Prepare Search Console and Bing Webmaster verification slots; do not claim indexing submission until performed and verified.

## ENGINEERING / HOSTING
- Inspect repository before writing; preserve any existing work. Prefer a maintainable static-first framework (Astro or Next.js static-compatible) selected based on actual repository and WHC.ca Pro hosting constraints. Avoid server-only features unsupported by cPanel hosting.
- Componentize Header, Footer, LocaleSwitch, Hero, ServiceCard, ProductCard, QuoteForm, Breadcrumbs, SEO, IndustryGrid and CityPage.
- TypeScript, linting, formatting, type checks, tests, clear .env.example and README. Keep dependencies minimal, secure and current.
- Make deploy artifact compatible with the confirmed hosting environment. Do not assume WHC supports persistent Node processes. If using static export, implement forms with a verified compatible backend provider.
- Use GitHub source control, feature branches where appropriate, atomic commits and clear changelog. Never overwrite existing repository content without inspection.

## ACCESSIBILITY AND UX
Target WCAG 2.2 AA: keyboard navigation, focus states, skip link, labels, accessible form errors, proper contrast, reduced-motion handling, alt text, mobile tap targets, no horizontal overflow. Test at 360px, 390px, 768px, 1024px and wide desktop.

## EXECUTION PHASES
Phase 0 — Audit repository, hosting assumptions, existing assets and dependencies; create implementation checklist and identify factual/regulatory blockers.
Phase 1A — Recreate approved logo and visual design system, implement responsive bilingual homepage and shared header/footer; provide screenshots/previews for approval.
Phase 1B — Implement core product, accessory, service, industry and informational page templates; real content only.
Phase 2 — Implement RFQ forms, product data model, lead routing, consent and anti-spam; validate submissions end-to-end.
Phase 3 — Create substantive bilingual province/major-city architecture, FAQs, schema, sitemap, canonical/hreflang, redirects and SEO checks.
Phase 4 — QA: accessibility, localization, forms, broken links, metadata, performance, mobile navigation, security, lint/typecheck/build; fix issues.
Phase 5 — Prepare deployment documentation and hosting handoff; deploy only with necessary access; verify live DNS, SSL, forms and indexing readiness.

## ACCEPTANCE CRITERIA
- Approved homepage appearance closely matched, not a generic template.
- Logo #4 consistent across pages and favicon.
- English and French routes complete, no placeholder translations or broken language switch.
- Products and services represented accurately with verification status; no false certifications.
- Quote and service forms tested with real configured delivery before declaring production ready.
- All core routes work, no broken navigation, mobile layout correct.
- Clean production build, lint/type checks, accessible UX and verified SEO metadata.
- GitHub commits contain all source and docs; no secrets.
- Final report lists actual commit hashes, files changed, test commands/results, preview/deployment URL if real, and outstanding supplier/regulatory dependencies.

## FIRST ACTION FOR CODEX
Start with Phase 0 repository audit and Phase 1A implementation. Show a concise plan, then write code. Do not request new logo concepts or homepage redesign; those are already approved. If approved mockup assets are unavailable in repository, recreate the visual direction from this specification and flag that pixel-accurate matching requires the original reference image.
