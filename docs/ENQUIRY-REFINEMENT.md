# Enquiry refinement — 7 November 2026

## Shorter bilingual forms

The request type and project description now appear first, followed by contact/location fields and consent. Equipment and service details are grouped under an optional disclosure. It opens automatically when a valid model, part or package is selected from elsewhere on the site. Irrelevant controls are hidden and disabled; an existing-plan reference appears only for renewal enquiries. The required fields, provider endpoint, consent and anti-spam fallback are preserved.

Validation opens collapsed sections containing invalid controls and focuses the linked error summary. A successful submission restores the original safe product/city/source context for any subsequent enquiry. Without JavaScript, optional details remain open and native required-field validation remains available. The approved homepage, brand assets and direct English entry are preserved.

## Measurement preparation, not active analytics

The site emits transient `defibrillators:measurement` DOM events. No analytics provider is connected, no events are sent or persisted, and no cookies, visitor IDs or tracking queue are created. The Formspree delivery integration remains separate and continues processing explicitly submitted enquiry details under the existing consent notice.

| Event                  | Meaning                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| `rfq_start`            | First input/change or submit attempt for an enquiry. Resets after successful delivery.                         |
| `rfq_success`          | Formspree has confirmed acceptance. Not a sale, booking, notification-delivery confirmation or qualified lead. |
| `rfq_error`            | Validation, provider or verification failure. Never counted as success.                                        |
| `rfq_provider_handoff` | Visitor continues to hosted Formspree verification. Not confirmed delivery.                                    |
| `contact_click`        | Telephone/email link activation. Does not confirm a call or email.                                             |

The payload permits only known page IDs, language, source page, public planning-city ID, audience, request category, contact channel and error category. Unknown fields and values are dropped. Contact details, message text, uploaded files, URLs, referrers, request IDs and timestamps are excluded. City is the selected public guide context, not a detected visitor location.

Before activating analytics, confirm the owner's provider/property and configure its consent, retention and privacy notice. Map only these sanitized events; disable automatic form-field and full-URL capture. Use received Formspree enquiries and commercial outcomes as the authoritative lead record. Hosted verification completion cannot be inferred from the handoff event.

## Verification

- `pnpm verify`: lint, Astro/TypeScript, formatting, build and **531 passing tests**.
- The JavaScript transfer-budget check now traverses shared imports, deduplicating each file. The existing 10 KB gzip limit is unchanged; HTML, CSS and CSP budgets also pass.
- 22 browser accessibility/responsive checks: both forms collapsed and with training details expanded at 360, 390, 768 and 1280 px; shared English/French homepages, city/service pages and native forms. Zero axe violations, overflow or broken images in these checks. This is not a complete accessibility certification.
- Simulated English/French success, validation recovery, provider field/429/503 errors, challenge fallback availability, request-specific controls, renewal visibility, product/city prefills, language switching and contact-click events. Production lead submissions: zero. No notification delivery claim is made from these simulations.
- Evidence: [qa/enquiry-browser.json](qa/enquiry-browser.json).

## Search status

Google's live homepage inspection at 10:30 AM on 7 November still reported the earlier robots block, despite its robots report already showing the refreshed allow-crawling file. The existing sitemap submission remains pending successful Google processing; the crawler/cache cannot be forced from site code. Bing's previous verified sitemap report showed Success and 232 discovered URLs. Submission does not guarantee indexing or ranking. See [EXPANSION-AND-SEARCH.md](EXPANSION-AND-SEARCH.md).

## Deployment

Release packaging and live verification are recorded here after upload. Private hosting identifiers and rollback paths are kept outside this repository.
