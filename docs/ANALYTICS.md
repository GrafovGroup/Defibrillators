# Analytics retired — 7 November 2026

The owner requested removal of the analytics warning and popup/preferences control. The Google tag, consent panel, footer control and GA4 event forwarding are now removed. Returning visits remove this integration’s old preference and cookies. No replacement tracker is installed. The GA4 property and historical records were not deleted. See [the removal and discovery notes](ANALYTICS-REMOVAL-AND-DISCOVERY.md).

The following documents the earlier implementation and its historical verification, not the current runtime.

# Optional GA4 analytics

The owner authorized a dedicated Defibrillators.ca property in Grafov Group on 7 November 2026 and confirmed the 1–10 employee category. The bilingual web stream uses public measurement ID `G-ERD2WFW0WZ`, Toronto time and CAD. The tested implementation is live on WHC; live verification is recorded below.

## Consent and data

No Google tag loads before an explicit choice to allow analytics. English and French visitors receive an optional, nonmodal panel with equally prominent allow/decline controls. Footer preferences reopen it. The homepage remains directly accessible. A browser choice lasts at most 90 days; missing, malformed, future or expired choices default to no tracking. Withdrawal stops future events, removes this integration's cookies and propagates to other open tabs. It preserves form drafts. Without usable browser storage the choice lasts for the current page only.

GA4 uses cookies and technical connection data; it is not anonymous. The script sets canonical page addresses without query strings or fragments, an empty referrer, 90-day cookies without rolling renewal, and disabled advertising signals/personalization. This intentionally limits acquisition attribution. No form answers, contact details, attachments, arbitrary URLs or enquiry identifiers are sent. The selected planning-city category is public page context, not the visitor's detected location. The Formspree consent remains separate.

The property has enhanced measurement and Google signals off, granular location/device collection off, and advertising personalization disabled in all 307 regions. User-provided data collection is unavailable in its Health industry category. User and event retention are set to two months, with reset on new user activity off; Google notes that these settings do not govern most aggregated standard reports and take effect after 24 hours.

## Events and reporting

`rfq_success` maps to `generate_lead`, configured as a key event counted once per event with no invented monetary value. It means Formspree accepted the enquiry, not a qualified lead, sale or delivered notification. `rfq_start`, `rfq_error`, `rfq_provider_handoff` and `contact_click` retain their names. A handoff or telephone/email click does not prove completion. Formspree and business records remain authoritative.

All eight parameters are registered as event-scoped custom dimensions in the property. Sanitized event parameters: `page_id`, `site_language`, `source_page`, `planning_city`, `enquiry_audience`, `request_type`, `contact_channel`, `failure_category`. They are finite, validated categories. Automatic form interactions, outbound-link payloads and site-search capture are disabled with enhanced measurement.

## Implementation and verification

The Astro static site uses a small Vanilla JavaScript consent loader; no server or React integration is required. `scripts/client-data.mjs` derives a compact browser catalogue from editorial data at build time, removing unused labels and aliases from the downloaded bundle while preserving routing and form prefills. The existing initial JavaScript budget stays at 10 KB gzip, including shared imports. Google's external library adds a separate download only after consent.

`pnpm verify` passed lint, TypeScript/Astro, formatting, static build, generated headers and all 535 tests. Local browser checks use a Google-tag simulator and mock Formspree delivery: no production submission or test lead is created. They confirm default denial, persisted decline, safe canonical URLs, blank referrers, successful-delivery mapping, validation exclusions and withdrawal across tabs. French layouts at 360/1280 px have no axe violations or overflow; the panel's navy-on-white text was manually inspected where axe could not resolve an overlapping background. Evidence: [qa/analytics-browser.json](qa/analytics-browser.json). These checks are not full accessibility certification or field performance measurements.

The bilingual privacy notice describes consent, cookies, international processing and withdrawal limits. Operational entity, enquiry retention and formal rights procedures still need the owner's business/legal review; the analytics configuration does not establish those facts.

## References

- [Google consent implementation](https://developers.google.com/tag-platform/security/guides/consent)
- [Google tag privacy controls](https://developers.google.com/tag-platform/security/guides/privacy)
- [GA4 configuration fields](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)
- [Enhanced measurement](https://support.google.com/analytics/answer/9216061)
- [GA4 data retention](https://support.google.com/analytics/answer/7667196)

## Deployment

Deployed on 7 November 2026 from commit `30f4dd69668ee16431becd80519a74a4d00ab857`, after confirming a fresh private rollback archive. The package contains 517 files (234 HTML documents and 233 header files), is 3,097,107 bytes, and has SHA-256 `ccbaba97e2a615995e98388dc5be13960bf0cc5973a69cf9c590d14702788fed`.

All 283 checked public files and all 233 page security policies match the tested build. HTTPS, redirects with query preservation, custom 404, configuration-file protection and archive isolation pass. Live English/French consent, persisted withdrawal and English form validation were checked without sending a production enquiry. GA4 Realtime showed English/French homepage views, a quote-page view, `rfq_start` and a validation `rfq_error`. The browser was left with analytics declined after QA. Evidence: [qa/analytics-live.json](qa/analytics-live.json).

Google now reports sitemap Success with all 232 URLs discovered. Its English/French homepage indexing requests were accepted. Bing previously reported Success and 232 discovered URLs. These results confirm submission and processing, not guaranteed indexing or rankings.
