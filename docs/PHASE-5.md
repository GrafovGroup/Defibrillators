# Phase 5 — WHC deployment and live verification

Deployed on 7 November 2026 after the owner authorized proceeding. The website is available at [Defibrillators.ca](https://defibrillators.ca/) and [the French homepage](https://defibrillators.ca/fr/). This completes the technical hosting handoff; supplier, regulatory, privacy and operating clearance still gate public launch and search indexing.

## Release and recovery

- Deployed application source: `1b9adc4815166b4170c180a1d7fb2c67a5234f0a`, the Phase 4 release with 309 passing tests. This Phase 5 revision documents deployment; it does not redesign the site or change application code.
- Release archive SHA-256: `4ba6ee5d0be012c1bab4edcf0a4015914b3dcadd2e742683d169ee8ac92f7468` (1,821,948 bytes).
- Confirmed the dedicated website document root before writing. Archived the previous live site outside public document roots, then uploaded and extracted the complete production build, including `.htaccess`. Certificate-validation and hosting-managed directories were preserved. The upload archive remains outside the public website.
- Other hosted websites, the primary domain's DNS and existing mail records were not changed. Account identifiers, server details, DNS snapshots, submission identifiers and archive locations are retained in the private operations record, outside GitHub.
- See [WHC-DEPLOYMENT.md](WHC-DEPLOYMENT.md) for repeatable packaging, verification and rollback instructions. Application files and generated CSP hashes must always come from the same build.

## Live verification

The public HTTP report is [qa/phase-5-live.json](qa/phase-5-live.json). Checks used normal certificate validation; no browser or TLS warning was bypassed.

After the handoff updates, `pnpm verify` passed again: lint, Astro/TypeScript, formatting, production build and **309 tests**, with zero failures. No application changes were needed after deployment.

- **171 deployed files returned HTTP 200 and matched the local build byte for byte:** all 126 localized pages, the error document, sitemap, robots file and static assets. The root is checked as a redirect rather than a separately accessible file.
- `/` and `/index.html` return 301 directly to `/en/`, with query strings retained. Explicit localized `index.html` URLs collapse to their directory URLs. HTTP and `www` primary-host requests redirect to canonical HTTPS.
- The owner’s singular domain is now mapped to the same website. Its apex A, `www` CNAME and HTTPS service record were corrected from the old parking setup, preserving nameservers and mail configuration. Free certificates validate both singular-domain hostnames. HTTP/HTTPS requests redirect permanently to the matching primary-domain path, preserving the query string.
- Primary apex and `www` HTTPS also validate. Certificates are managed by WHC's automatic renewal setup. Certificate maintenance remains an ongoing hosting responsibility.
- A nonexistent route returns the custom bilingual document with **HTTP 404**. Direct access to `.htaccess` returns **403**. The uploaded release and rollback archive names return **404** from the public website.
- Live responses include CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`. Interactive catalogue, comparison and RFQ scripts run under the generated CSP.
- Both homepages preserve the approved illustration and logo. The header language switch retains page identity. The French homepage at 390px has no document-level horizontal overflow; its menu opens with Enter and closes with Escape, returning focus to the menu control. No captured console warnings/errors were observed on that mobile check.
- Manufacturer filtering returns the expected model count. Comparison preserves the selected model order. Parts selection reaches the RFQ with the requested model and accessory; switching to French retains that context. A residential package value also reached the provider.

## Real enquiry delivery

Three explicitly labelled synthetic enquiries were submitted through the deployed site using the configured Formspree form. No customer information or order was submitted.

1. French commercial enquiry: localized required-field/consent validation, success feedback, field reset, provider inbox receipt and notification delivery confirmed.
2. English residential enquiry: success feedback, provider inbox receipt and notification delivery confirmed; the `home` planning value was retained.
3. French parts enquiry: a small synthetic PNG was stored with the submission. The provider received the `frx` model, `battery` accessory, localized source path and consent version. Attachment processing was asynchronous; a browser success message alone was not treated as proof of file storage. The notification subsequently reached the provider's `open` status.

The inbox records show audience, language, province, source, request identifier and the current consent text/version. Notification status was checked in Formspree, not inferred from the front-end success message. Incoming leads go to the existing configured notification recipient; separate department destinations are not configured.

Formshield and submission archiving are enabled. CAPTCHA is currently disabled in the provider settings; those settings were inspected without changes. The website retains its honeypot and hosted-verification fallback, while Phase 4 covered simulated challenge/rate-limit/unavailable states. No CAPTCHA challenge was triggered or bypassed in these live checks. Provider filtering and operator review remain necessary; browser validation and submitted routing fields are not a trust boundary.

## Transfer measurements

One direct network sample per resource returned HTTP 200:

| Resource         | Transferred bytes | Compression | First byte |
| ---------------- | ----------------: | ----------- | ---------: |
| English homepage |             5,924 | gzip        |      54 ms |
| French homepage  |             6,300 | gzip        |      54 ms |
| Shared CSS       |             8,260 | gzip        |      66 ms |
| RFQ JavaScript   |             6,060 | gzip        |      50 ms |

The sampled CSS and WebP response specify seven-day cache freshness; the sampled font specifies one year. HTML and RFQ JavaScript did not send an explicit `Cache-Control` header in this sample. These are observations from one client, not a speed guarantee, Lighthouse score or measured field LCP/INP/CLS. Real-user Core Web Vitals and broader device/assistive-technology evaluation remain separate work.

## Indexing and launch handoff

`PUBLIC_SITE_INDEXABLE=false` remains in effect. The deployed pages contain `noindex, nofollow`, and the deployed robots file disallows crawling. The sitemap contains 126 canonical localized URLs, but no sitemap submission or search-console verification was performed. Noindex is not access control, and a crawl block does not guarantee removal of already discovered URLs.

Before enabling indexing, the owner must complete the supplier/product-licensing, applicable establishment-licensing, service/training, privacy retention/operator and French legal/editorial checks identified in earlier phases. Do not present unverified reference products as confirmed inventory or infer launch clearance from this deployment. After clearance and explicit approval, set the indexing switch, rebuild, rerun verification, deploy the complete build, confirm live robots/metadata and then verify and submit through the relevant search tools.

Technical references: [WHC DNS management](https://help.whc.ca/en/articles/618632-how-to-use-the-domain-management-tools), [HTTPS service aliases in RFC 9460](https://www.rfc-editor.org/rfc/rfc9460.html#section-2.4.2).
