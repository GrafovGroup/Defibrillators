# Bilingual procurement and mounting compatibility

## Scope

The release adds English/French procurement pages at `/en/procurement/` and `/fr/approvisionnement/`, plus the manufacturer-sourced mounting compatibility guide under each language's resources section. Existing industry/resource directories, municipal, accessory, buying, Manitoba and Winnipeg pages link to the new content. Both pages are included in search, the sitemap, reciprocal language links and canonical metadata. The guide's Article and FAQ markup matches its visible content and sources.

The approved homepage, logo, imagery and layout remain unchanged. No inventory, dealership, customer relationship, service certification, pricing or universal compliance claim is introduced. The supplied tender documents are research inputs only; no attachments, buyer contacts, private prices or tender-specific contractual commitments are published.

## Enquiry behaviour

Commercial enquiries now have a tender/public-sector procurement choice. Optional fields capture project reference, public HTTPS document link, closing date/time/time zone, delivery date, alternatives policy, technical training need and equipment/compatibility details. A partially entered closing deadline asks for all three components; no Canadian time zone or daylight-saving offset is assumed. Switching request types hides and disables unrelated fields, including textareas. Native HTML retains access to the fields without JavaScript.

The two new pages preselect the procurement option. Locale switching carries only allowlisted catalogue/source choices, never private project details. The email subject includes the finite request category. Existing Formspree routing, hosted anti-spam fallback and the short privacy notice remain; analytics and consent popups stay off.

The optional commercial attachment input accepts up to three PDF, XLSX, JPG or PNG files, each up to 2 MB. Validation checks every selected file, count, size and extension/MIME pairing. Empty browser MIME values and generic binary MIME values are accepted only with an allowed extension. This is client usability validation, not content scanning. Macro-enabled spreadsheets and executable extensions are not allowed. The provider handles storage and server validation. Customers may use a public document link instead of an attachment.

## Provider alignment

On 7 November 2026 the signed-in Formspree account showed file-upload storage. The existing `attachment` workflow rule allowed PDF/JPG/PNG; XLSX was added. The obsolete `consent` and `consent_version` rules still required fields that the owner had previously removed from the website. Both legacy fields were made optional without deleting prior submissions or restoring a consent checkbox. Required contact/request validation and the configured notification destination remain.

Sources checked on 7 November 2026:

- [Formspree file uploads](https://help.formspree.io/articles/building-your-form/file-uploads/): multipart encoding, multiple uploads, provider plan/size limits and server file validation.
- [Technimount Safety Arm System 500](https://www.technimount.com/en/products/safety-arm-system-500-stryker/).
- [Technimount brochure](https://www.technimount.com/app/uploads/2025/11/BR-SAS-202508EN-01.pdf): distinct stretcher/side clamp references.
- [Technimount user guide](https://www.technimount.com/app/uploads/2025/11/UG-Safety-Arm-System-EN.pdf): manufacturer instructions and technical support context.

## Validation

`pnpm verify` passed lint, Astro/TypeScript checks, formatting, the production build and all 594 tests. Tests cover paired routes, sources/schema, discovery links, procurement context, deadlines, document links, multipart payload preservation, every attachment's validation and provider error mapping. The IndexNow route-count assertion now follows the route registry as pages are added.

Responsive browser audits cover 360, 390, 768, 1024, 1440 and 1920 px with no axe violations, horizontal overflow or broken images. Local browser checks exercise French deadline errors, a three-file multipart submission, success/reset, English provider-error recovery, request-type visibility and the native no-JavaScript fallback. All browser submissions use the loopback QA mock, which blocks production delivery. No real enquiry or notification-delivery claim is made from these checks. See `docs/qa/procurement-browser.json`.

The build contains 238 canonical localized pages. Follow `WHC-DEPLOYMENT.md` and `INDEXNOW.md` for complete-file deployment, live integrity verification and the post-deployment notification receipt.
