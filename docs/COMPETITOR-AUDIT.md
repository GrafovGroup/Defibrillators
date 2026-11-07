# Canadian AED competitor audit and implementation

Reviewed 2026-11-07 for Defibrillators.ca. Scope: 42 public HTML pages (seven per site), all six robots.txt files, six conventional sitemap locations and AED Solutions’ declared sitemap URL. Also inspected representative desktop/mobile buying journeys in a browser. The page inventory and compact metadata evidence are in [research/competitor-pages.json](research/competitor-pages.json).

This is a qualitative review of visible selection, buying tasks and technical discoverability. It does not establish competitors’ conversion rates, revenue, rankings, backlinks, accessibility conformance or field Core Web Vitals. Sampled pages are not an exhaustive inventory of every SKU or article. No enquiries, orders or course bookings were submitted. Competitor copy, photographs, logos, reviews and commercial promises were not imported.

## What each site does particularly well

| Site                                                                                                | Strongest observed pattern                                                                                                                                                                                                    | Application to Defibrillators.ca                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AED Advantage — replacement parts](https://aedadvantage.ca/collections/replacement-parts)          | Model-first parts selection, supported by brand/model navigation, refresh packs, scenario bundles and comparison resources. The visitor can start from the device they already own rather than understand accessory taxonomy. | A model-first parts finder with pad references, manufacturer links and model/accessory context carried into the enquiry. Package planning and selectable comparisons complement the catalogue.                 |
| [AED.ca — maintenance plans](https://aed.ca/pages/aed-maintenance-plans)                            | Makes ongoing ownership a prominent service, with a concrete list of plan inclusions and a form that asks about devices and locations. Its product/bundle/quote routes serve both direct buyers and procurement teams.        | Clarify the scope of a maintenance quote and connect equipment, installation, training and replacement costs. Existing maintenance and multi-site enquiries remain the service destinations.                   |
| [AEDShop — pads](https://aedshop.ca/collections/aed-pads)                                           | Broad accessory selection organized around brand/model; cabinets, packages, training equipment and a substantial buying guide extend beyond the initial AED sale.                                                             | Preserve accessory categories, add a parts entry point and training-equipment enquiry option, and make storage/site requirements part of package planning.                                                     |
| [St. John Ambulance — CPR/AED training](https://sja.ca/en/training/first-aid/cpr-and-aed-training)  | Training discovery centers on location, dates, course level, delivery format and learner eligibility. Language/province selection and a business-account route are visible.                                                   | Add optional group size, preferred language, format and initial/recertification fields. Collect desired dates and certification needs in the brief; confirm qualified partners and eligibility before booking. |
| [Rescue 7 — AED subscription](https://rescue7.net/products/aed-subscription-program)                | Connects equipment, training, ongoing supplies and asset management. Its plan comparison separates device options and recurring inclusions; its product quote flow supports organizational buying.                            | Add a total-ownership budget guide and four scoped package paths. The existing RFQ remains the real transaction path until commercial operations support more.                                                 |
| [AED Solutions — management program](https://www.aedsolutions.ca/aed-solutions-management-program/) | Ownership support, manufacturer references, model-specific supplies, refresh packs and maintenance records are connected to the product catalogue. Shipping/returns information is easy to find.                              | Surface exact-model parts references and readiness guidance; explain what a written quote must confirm, including supply, service, warranty, delivery and exclusions.                                          |

### AED Advantage

The parts page presents recognizable model choices and directs people toward the relevant supplies. Its comparison and multi-location resources answer pre-purchase questions and connect back to product pages. Bundles group items by the setting or task, rather than only by manufacturer. The broad menu supports several intents but is dense; we retained our approved navigation and placed task links within the relevant catalogue and resource pages. The reviewed parts page also displayed a management-program overlay. We did not reproduce promotional overlays.

### AED.ca

The maintenance page gives an ownership service a dedicated place in the navigation and names tangible inclusions. This is more useful than a vague “contact us for service” description. The transferable element is scope clarity, not the specific promise that parts, loaners, monitoring or priority service are included. Our written proposal must establish those terms. Equipment, bundles, procurement and ongoing care should remain connected paths rather than separate dead ends.

### AEDShop

The accessory catalogue demonstrates why buyers need both broad categories and exact-model guidance. It also distinguishes cases/cabinets and training equipment from the device itself. On the inspected mobile pads page, the initial cookie panel and chat control covered a substantial part of the screen; after declining, the content was readable. Our finder uses native labelled controls and introduces no additional popup, tracking library or third-party chat overlay.

### St. John Ambulance

Its course interface exposes location/date controls and course/format distinctions beside explanatory content. Business enquiries and regional/language paths support institutional buyers. These are useful requirements for training coordination, but a course calendar or certification badge would be misleading without verified partners and bookable sessions. Our form captures the brief and retains explicit confirmation of provider, prerequisites and availability.

### Rescue 7

Its plan cards make ongoing inclusions comparable, and its resource pages link products with training and replacement knowledge. The subscription page also identifies a contract term; this matters when comparing apparent monthly prices. Our ownership guide asks buyers to compare the same scope and planning period. No subscription price, monitoring software, loaner entitlement or event-medical service has been represented as ours.

### AED Solutions

Its model pages combine equipment details, included-item information and supporting resources; the batteries collection includes replacement combinations. Management and maintenance content extends the relationship after purchase. We adapted the information architecture and documentation approach. We did not copy generalized maintenance instructions, blanket readiness/compliance assurances or suggested extensions beyond consumable expiry dates. Exact-device instructions and qualified service routes remain authoritative.

## Product and service selection decisions

| Need                       | Implemented now                                                                                                                                                                                                                                                       | What requires supplier/operating confirmation                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AED choice                 | Eight bilingual manufacturer reference profiles: ZOLL AED Plus, Philips HS1, ZOLL AED 3, Philips FRx, LIFEPAK CR2, HeartSine samaritan PAD 350P, Powerheart G5 and Defibtech Lifeline VIEW. Search, brand and guidance-feature filters; choose two models to compare. | Exact Canadian device identifiers/licences, supply agreements, configuration, real prices, warranty, stock and licensed model photography. Reference information is not an inventory claim. |
| Replacement supplies       | Model-first finder; pads, battery, combined supply, storage, signage/kit and training-equipment enquiry choices. Existing part reference can be supplied in the RFQ.                                                                                                  | A validated SKU-to-device compatibility catalogue, current manufacturer notices, real inventory and replacement conditions. No automatic “this fits” verdict is given.                      |
| Complete equipment package | Workplace/community, home/family, mobile/outdoor and multi-site planning paths. Package choice and residential/commercial context travel into the enquiry.                                                                                                            | Exact bill of materials, installation arrangement, local availability and written quote. Outdoor storage always needs a configuration/site review.                                          |
| Ongoing care               | Readiness guide and ownership budget covering replacement supplies, inspections, responsibilities and service exclusions. Existing maintenance and multi-location forms remain available.                                                                             | Automated reminders/monitoring, subscriptions, included consumables, loaners, response times, technical repair and accepted service agreements.                                             |
| Training                   | Optional participants, language, initial/recertification and preferred format fields; current request routing and consent remain in place.                                                                                                                            | Verified partner/course credentials, curriculum, eligibility, dates, prices and bookable capacity.                                                                                          |
| Adjacent ranges            | Training equipment is an enquiry option.                                                                                                                                                                                                                              | Rentals, refurbished/trade-in devices, advanced EMS equipment, first-aid/trauma expansion and event-medical services require a separate commercial decision and operating capability.       |

The former environment/type filters offered choices with no verified matching inventory. The visible filters now use actual reference data. Environment/type metadata and matching support remain in the model for future verified products; storage questions are handled in package planning instead of implying a model is approved for outdoor use.

New reference profiles use typographic cards when no licensed product photo is available. They do not reuse a different device’s photograph. The approved homepage scene, logo, navigation and four service illustrations are preserved.

## SEO and AEO findings

All 42 sampled pages returned HTTP 200 and included a canonical link. The following counts describe source HTML at the time of review, not the entirety of each site. “No JSON-LD” does not rule out RDFa, microdata or markup added later in the browser. Hreflang presence does not prove that all translations are complete or reciprocal.

| Site               | Sample pages | Missing meta description | Pages with hreflang | Selected JSON-LD observed                                                      |
| ------------------ | ------------ | ------------------------ | ------------------- | ------------------------------------------------------------------------------ |
| AED Advantage      | 7            | 0                        | 7                   | Product/Offer, Article, BreadcrumbList, FAQPage, Organization                  |
| AED.ca             | 7            | 1                        | 0                   | Organization and WebSite; no Product JSON-LD found on the sampled product page |
| AEDShop            | 7            | 0                        | 7                   | CollectionPage/ItemList, Product, BreadcrumbList, shipping-related types       |
| St. John Ambulance | 7            | 1                        | 7                   | No JSON-LD found in sampled source HTML                                        |
| Rescue 7           | 7            | 3                        | 7                   | Article, Organization, WebPage/WebSite                                         |
| AED Solutions      | 7            | 0                        | 0                   | Product/Offer/Review, CollectionPage/ItemList, Organization                    |

AED Advantage, AEDShop, SJA and Rescue 7 exposed English/French alternates in the sampled pages. AED.ca and AED Solutions did not expose hreflang in this sample. Existing reciprocal en-CA/fr-CA and x-default routes remain a strength of Defibrillators.ca.

The four Shopify sites served XML sitemap indexes at `/sitemap.xml` and declared sitemaps in robots.txt. SJA’s tested conventional sitemap URL returned 404 and its robots.txt did not declare one; this does not establish that no sitemap exists elsewhere. AED Solutions declared `/sitemap.php`, which returned an HTML sitemap in this inspection; its conventional `/sitemap.xml` returned 404. An HTML navigation sitemap and an XML search-engine sitemap serve different purposes.

The strongest content pattern is an answerable buying task with a useful next step: comparison, model-specific replacement, complete package, regional training or ownership planning. That pattern is more actionable than adding large numbers of near-identical city or keyword pages.

### Applied discoverability changes

- Three bilingual guides now have concise visible summaries, a table of contents, visible authorship/date, source links and original questions/answers. The new ownership-cost guide avoids invented prices.
- Catalogue and directory pages use CollectionPage/ItemList markup tied to links actually rendered on those pages. Guide Article markup matches the visible title, summary, author, update date and sources.
- Product references retain factual Product markup without fabricated Offer, rating, SKU, availability or medical approval. Their current data does **not** satisfy Google’s product rich-result requirements for an offer, review or aggregate rating; this is intentional until real data exists. See [Google product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).
- Visible FAQs remain useful information; FAQPage markup is retained as semantic data, not a promise of a Google feature. Google discontinued FAQ rich results on May 7, 2026, as recorded in its [documentation updates](https://developers.google.com/search/updates).
- Google’s [AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) continues to emphasize useful original content, accessible crawling, internal discovery and sound SEO. No special AI schema or llms.txt file is needed for Google visibility. These changes cannot guarantee rankings or AI citations.

The prelaunch `noindex` and robots crawl block remain enabled. Pages cannot be presented as eligible for search/AI discovery while those controls remain in place. GitHub-only delivery is deliberate; launch/indexing approval, final product verification and deployment are separate steps.

## Measurement after an approved launch

Establish a baseline in Search Console/Bing Webmaster Tools once ownership and indexing are verified. Monitor indexed canonical URLs, locale pairing, model/parts/guide queries and crawl errors. Compare enquiry completion by public source-page, model, package and request category using the existing provider records; avoid putting names, email addresses, medical details or free text into analytics URLs. Review changes against real enquiries and actual supply/partner capability before adding inventory, a checkout, subscription plans or a course calendar.

## Verification record

See [QA.md](QA.md) for the completed build/test and browser checks. No WHC deployment, competitor submission, Google/Bing submission or analytics integration is part of this change. The existing Formspree endpoint is retained; new optional fields are covered by validation and mocked transport tests, with no extra live lead submitted during this audit.
