# National expansion and search launch — 7 November 2026

The owner requested related product/service pages, coverage of every major Canadian city, UX/SEO/AEO improvements and submission to Google and Bing. This explicitly supersedes the earlier indexing gate. It does not establish unverified product licensing, inventory, pricing, local offices, installer availability or training credentials.

## Coverage and content

The coverage baseline is all **41 census metropolitan areas in Statistics Canada's 2021 classification**, plus Charlottetown, Whitehorse, Yellowknife and Iqaluit. This produces **45 city/metropolitan guides**, alongside the existing national hub and all 13 provinces/territories. Ottawa–Gatineau is linked from both Ontario and Québec; its RFQ does not silently select one province. Metropolitan guides include nearby municipalities where useful, such as Surrey/Burnaby, Mississauga/Brampton and Laval/Longueuil. The exact destination must still be confirmed in the enquiry.

Source: [Statistics Canada SGC 2021 metropolitan classification](https://www23.statcan.gc.ca/imdb/p3VD.pl?CLV=1&CPV=A&CST=01012021&CVD=1348194&Function=getVD&MLV=3&TVD=1348193). This is a defined editorial coverage baseline, not a claim that every Canadian municipality has its own page or that services are locally available everywhere.

The 41 added city guides contain original bilingual procurement scenarios, four-item briefs, questions/answers and related offerings. Topics include cross-province purchasing, controlled entrances, shift changes, seasonal facilities, island freight and northern transfers. These are planning scenarios, not claims about named facilities or local laws. New city pages use explicitly labelled provincial/territorial locator maps; they do not show invented business locations. Existing four city maps and all approved homepage/brand artwork are preserved.

Twelve focused offerings add 24 localized pages:

- Site assessment/placement planning; cabinet mounting coordination; readiness-inspection planning; expiry tracking; post-use replenishment; asset inventory/multi-site records.
- Adult pads; paediatric pads/keys; combined pad/battery packs; AED trainers and supplies; carrying cases; outdoor cabinet planning.

Each offering has a concise answer, a detailed scope, an enquiry checklist, a visible FAQ, sources, authorship/update date and related links. These are quotation/reference pages, without fabricated SKUs, stock, prices, warranty promises, technical repair capability or automatic monitoring subscriptions. Equipment examples use manufacturer references; Canadian configuration and licensing still require exact-device verification.

The site now has **116 equivalent page pairs / 232 canonical localized URLs**, an English root fallback and the bilingual 404 document. All routes are listed in [ROUTES.md](ROUTES.md). There is no city-by-service Cartesian multiplication of near-identical pages.

## Audit findings and implemented changes

| Finding                                                                       | Implementation                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Four city guides did not cover national metropolitan demand.                  | 45 city/metropolitan guides, region links and searchable municipality aliases.                                                                                                                                                                                                         |
| A long directory is difficult to scan, especially on phones.                  | Accent- and punctuation-tolerant search, province filtering, visible result counts, clear filters, an empty state and a jump link. Every guide remains a normal crawlable link without JavaScript.                                                                                     |
| Broad service categories conceal specific buying tasks.                       | Focused offering pages linked from their parent categories and city guides; service/accessory directories with explanatory summaries.                                                                                                                                                  |
| City and specific service intent could be lost at the form.                   | Allowlisted city context survives offering pages and language switching. RFQs receive the appropriate request/part category, source page and planning city. Commercial location text remains editable; Ottawa–Gatineau requires the actual province. No contact data is put into URLs. |
| The global CSP hash list was near the existing 7.5 KB response-header budget. | Generated per-directory CSP headers authorize the actual page and fallback scripts. All security restrictions and same-origin/Formspree permissions remain; the test budget is unchanged. Deploy all nested `.htaccess` files with their HTML.                                         |
| The owner now wants search discovery.                                         | Production defaults are `index, follow`; robots.txt permits crawling and declares the sitemap. Public Google/Bing account verification tags are retained in source with explicit staging overrides.                                                                                    |
| Answer-oriented content needs evidence and usable navigation.                 | Visible summaries, section anchors, practical checklists, restrained FAQs, manufacturer/geographic sources and matching Article/FAQ/Breadcrumb/Collection metadata. No unsupported offers, ratings or local branches.                                                                  |

Google states that its normal SEO requirements apply to AI features and that no special AI file or schema is required. The work therefore improves accessible text, useful answers, internal links and factual markup. Neither FAQ rich results nor AI citations are promised. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Verification before deployment

- `pnpm verify`: lint, Astro/TypeScript, formatting, build and **526 tests**. The master prompt remains byte-identical to its pinned original blob.
- Integration coverage checks all 232 localized routes, canonical and reciprocal language links, headings, IDs, assets, local links, metadata uniqueness, source-backed visible schema, all 41 CMA codes, capitals, query allowlists and request routing.
- Existing transfer budgets remain: each HTML document below 12 KB gzip, external JS below 10 KB gzip and CSS below 12 KB gzip. Every generated page CSP remains below 7.5 KB.
- **332 browser checks**: 150 changed pages at 390 and 1280 px; eight representative pages at 360, 768, 1024 and 1710 px. Zero axe violations, horizontal overflow or broken images. Decorative-arrow contrast items remain automated “incomplete” notices; visible contrast uses the established tested palette. This is not a full accessibility certification.
- Browser journeys verified suburb-to-region search, city → mounting → French → RFQ context, cross-province selection, and a simulated French submission. The local QA server blocks real provider traffic and does not store submitted data. Existing live Formspree delivery evidence is in [PHASE-5.md](PHASE-5.md); no new production delivery claim is inferred from a mock success.
- Browser evidence: [qa/expansion-browser.json](qa/expansion-browser.json).

## Deployment and search submission record

The release is prepared for WHC. Google Search Console and Bing Webmaster Tools are accessible, the Defibrillators.ca properties have been added, and the public ownership tags have been obtained. Verification and sitemap submission will be recorded here after the indexable build is deployed and the respective success states are observed. A generated sitemap or an ownership tag alone is not a submission or proof of indexing.

Submission asks the engines to discover the pages; their indexing, ranking and answer-engine inclusion remain their decisions. No Google Indexing API request is used for these ordinary commercial/informational pages.
