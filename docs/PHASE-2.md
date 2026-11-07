# Phase 2 — RFQ and Formspree integration

The static Astro site uses the Vanilla JavaScript AJAX approach with native HTML POST fallback. Both language routes submit to the owner-supplied public endpoint `https://formspree.io/f/maeezonn`. No API key is required or stored. The recipient remains the address already configured by the owner in Formspree; see its Workflow screen for the current destination.

## Customer flow

Separate business and home forms work without JavaScript. Business requests collect organisation, contact, province, locations, quantity, model, installation, maintenance, renewal reference and an optional project attachment. Home requests omit the organisation, locations, quantity, renewal-reference and attachment fields. Both collect contact details, a request category, message and explicit non-marketing consent. Device information remains reference-only and unknown availability/licensing/pricing is not invented.

Product and service CTAs carry allowlisted identifiers into the form. The language switch preserves only those identifiers, never customer-entered values. Errors are translated, linked to fields, announced and focused; failed submissions preserve input. Requests are not automatically retried. A per-page request identifier helps an operator reconcile ambiguous retries but is not a server idempotency guarantee. No enquiry data is placed in local storage, URLs or analytics.

## Hosted processing and limits

Formspree performs server-side processing, spam screening, archival and email delivery. Formshield was already enabled and remains enabled. The existing CAPTCHA setting was disabled; it was not weakened. A `_gotcha` honeypot is included. If the provider later requires a challenge, the form offers native hosted submission rather than suppressing that challenge. `_language` supports the provider's English/French fallback screens.

Workflow validations configured through the dashboard:

| Field            | Rule                              |
| ---------------- | --------------------------------- |
| email            | Required email                    |
| name             | Required text, 2–100 characters   |
| message          | Required text, 10–4000 characters |
| consent          | Required text, length 3           |
| consent_version  | Required text, length 14          |
| province, locale | Required text, length 2           |
| audience         | Required text, 10–11 characters   |
| request_type     | Required text, 8–12 characters    |
| company          | Optional text, 2–160 characters   |
| locations        | Optional text, 2–1000 characters  |
| attachment       | Optional file, PDF/JPG/PNG        |

The shared endpoint's dashboard rules do not enforce conditional company/location requirements or enumerated values. Those are enforced in the browser and remain untrusted in incoming leads: an operator must review submissions. The consent field is required server-side, while its exact `yes` value and translated disclosure are enforced by the site. This is a submitted consent record, not an authenticated signature. Formspree supplies the server receipt timestamp; submitted metadata is not trusted for authorization. Marketing consent is neither requested nor inferred.

The client limits uploads to one PDF/JPG/PNG of 2 MB. The dashboard supports file-type validation but does not expose a 2 MB size setting; provider limits still apply to direct/native submissions. Never treat uploaded files as safe executable content. Open attachments through the provider's dashboard using normal document protections. Server validation or product metadata must never be used to authorize purchases or create contracts.

All leads enter the existing inbox with audience/language subjects and structured request/model/service fields. Additional routing to departments requires confirmed recipients and a Formspree plan that supports conditional rules. No auto-response, marketing list, customer account, payment or automatic renewal was activated.

## Product and maintenance architecture

`products.ts` includes bilingual description, sourced specifications, intended setting, Canadian licence identifiers/status, included components, pads/battery compatibility, warranty, image rights, availability and quote-only state. Unknown values are explicit `null` or unverified. Environment filters deliberately do not claim indoor/outdoor suitability before exact Canadian configurations are reviewed. Accessory pages remain enquiry categories without fabricated inventory records.

`maintenance.ts` defines internal customer/site/device references, responsible operator, agreement status, renewal date and next contact/action. An enquiry never becomes an active plan automatically. Operational records belong in an access-controlled CRM, not this static repository. An operator must confirm a contract and dates before using `renewalDue`; the function rejects impossible dates. Scheduled reminders, monitoring and billing are not implemented or advertised.

## Verification

`pnpm verify` runs lint, type checking, formatting, the production build and 173 automated checks. Tests cover routes, native forms, consent, both languages, uploads, service categories, transport failures, provider errors, ambiguous responses, CAPTCHA fallback and maintenance dates. Browser testing additionally checks actual submissions and accessible error focus. Direct API rejection checks returned HTTP 422 for a missing consent field and an invalid email address.

The English synthetic browser submission was accepted and archived in Formspree's Spam folder. The French browser submission received the localized success state and was verified in the Formspree Inbox with consent text/version and a server receipt timestamp. Email notification delivery remains to be confirmed. Both language forms were checked at 360, 390, 768, 1024 and 1440 px with no document overflow; desktop and French mobile screenshots were saved. A browser attachment upload initially failed because the Chrome extension did not have file-URL access. No private credentials or customer data are test fixtures.

## Sources

- [Formspree AJAX integration](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/)
- [Workflow validation](https://help.formspree.io/articles/building-your-form/getting-started-with-workflow)
- [File uploads and provider limits](https://help.formspree.io/articles/building-your-form/file-uploads)
- [Localization](https://help.formspree.io/articles/building-your-form/localization-and-translation)
- [Formspree privacy policy](https://formspree.io/legal/privacy-policy/)

Supplier licensing/configuration, privacy retention/operator details and qualified regulatory review remain prelaunch dependencies. Existing noindex guards remain in place.
