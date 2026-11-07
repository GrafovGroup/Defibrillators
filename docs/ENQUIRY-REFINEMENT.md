# Enquiry refinement — 7 November 2026

## Shorter bilingual forms

The request type and project description now appear first, followed by contact/location fields and consent. Equipment and service details are grouped under an optional disclosure. It opens automatically when a valid model, part or package is selected from elsewhere on the site. Irrelevant controls are hidden and disabled; an existing-plan reference appears only for renewal enquiries. The required fields, provider endpoint, consent and anti-spam fallback are preserved.

Validation opens collapsed sections containing invalid controls and focuses the linked error summary. A successful submission restores the original safe product/city/source context for any subsequent enquiry. Without JavaScript, optional details remain open and native required-field validation remains available. The approved homepage, brand assets and direct English entry are preserved.

## Measurement foundation

The initial refinement release emitted transient `defibrillators:measurement` DOM events. That release had no analytics destination, cookies or persistent tracking. The subsequent owner-authorized GA4 integration is documented in [ANALYTICS.md](ANALYTICS.md). The Formspree delivery integration remains separate and continues processing explicitly submitted enquiry details under the existing consent notice.

| Event                  | Meaning                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| `rfq_start`            | First input/change or submit attempt for an enquiry. Resets after successful delivery.                         |
| `rfq_success`          | Formspree has confirmed acceptance. Not a sale, booking, notification-delivery confirmation or qualified lead. |
| `rfq_error`            | Validation, provider or verification failure. Never counted as success.                                        |
| `rfq_provider_handoff` | Visitor continues to hosted Formspree verification. Not confirmed delivery.                                    |
| `contact_click`        | Telephone/email link activation. Does not confirm a call or email.                                             |

The payload permits only known page IDs, language, source page, public planning-city ID, audience, request category, contact channel and error category. Unknown fields and values are dropped. Contact details, message text, uploaded files, URLs, referrers, request IDs and timestamps are excluded. City is the selected public guide context, not a detected visitor location.

The owner subsequently authorized a dedicated Defibrillators.ca GA4 property in Grafov Group. The consent-gated integration maps only sanitized events. Formspree enquiries and commercial outcomes remain the authoritative lead record. Hosted verification completion cannot be inferred from a handoff event.

## Verification

- `pnpm verify`: lint, Astro/TypeScript, formatting, build and **531 passing tests**.
- The JavaScript transfer-budget check now traverses shared imports, deduplicating each file. The existing 10 KB gzip limit is unchanged; HTML, CSS and CSP budgets also pass.
- 22 browser accessibility/responsive checks: both forms collapsed and with training details expanded at 360, 390, 768 and 1280 px; shared English/French homepages, city/service pages and native forms. Zero axe violations, overflow or broken images in these checks. This is not a complete accessibility certification.
- Simulated English/French success, validation recovery, provider field/429/503 errors, challenge fallback availability, request-specific controls, renewal visibility, product/city prefills, language switching and contact-click events. Production lead submissions: zero. No notification delivery claim is made from these simulations.
- Evidence: [qa/enquiry-browser.json](qa/enquiry-browser.json).

## Search status

Google live inspection at 1:24 PM on 7 November cleared the earlier crawl block and reported that the English homepage was available to Google and could be indexed. Indexing requests for both English and French homepages were accepted. After resubmission, Google subsequently reported sitemap Success with all 232 URLs discovered. Bing previously showed Success and 232 discovered URLs. Submission does not guarantee indexing or ranking. See [EXPANSION-AND-SEARCH.md](EXPANSION-AND-SEARCH.md).

## Deployment

Implementation commit: `6f2f7e1a454b801024a09fcab4c64614141c10b2`. The tested release archive contains 515 files, including 234 HTML documents and 233 `.htaccess` files; size 2,908,894 bytes; SHA-256 `20909d375ddc331d54ca226f7c7dd4cd5157b7f20b6eeb7232747608def2ae33`.

The refinement was deployed to WHC on **7 November 2026**, after the owner unlocked the Mac and a fresh private rollback archive had been confirmed. All **281 checked public files** matched the tested build byte for byte. All **233 checked HTML responses** returned exactly the generated Content Security Policy. HTTPS, primary/singular host redirects with query preservation, the custom 404, blocked configuration-file access and private archive isolation passed.

Live browser checks confirmed English required-field errors, request-specific controls and French model/part/province prefills at 390 px without overflow, broken images or captured console errors/warnings. No production lead submission was sent. Evidence: [qa/enquiry-live.json](qa/enquiry-live.json). Private hosting identifiers and rollback paths remain outside this repository.
