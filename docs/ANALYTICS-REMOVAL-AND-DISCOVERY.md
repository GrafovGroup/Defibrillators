# Analytics removal and wider search discovery — 7 November 2026

## Requested change

The owner requested removal of the analytics warning and popup/preferences control. The English/French consent panel, footer preferences button, Google tag loader and event forwarding have been removed. Google Analytics domains are also removed from the generated Content Security Policy. The GA4 property and historical data were not changed.

A small local migration removes only `dfca-analytics-v1` and cookies beginning with this integration's `dfca_ga` prefix. It sends no requests, creates no new tracking state and works when local storage is unavailable. Unrelated cookies/preferences are preserved. The bilingual privacy notice now describes the current behaviour and distinguishes hosting logs and submitted Formspree enquiries. The anonymous in-page measurement event interface remains local, without a recipient, persistence or external network transport. Private lead-outcome records remain operator maintained.

`pnpm verify` passed lint, Astro/TypeScript, formatting, the build and **555 tests**. Obsolete GA4 mapping/consent tests were replaced with all-build tracking-absence and targeted migration checks. Four browser checks cover English/French homepages, the quote page and French privacy page at 390/1440 px: zero axe violations, page overflow or broken images, zero analytics controls and zero Google tag elements. Decorative/pseudo-background contrast checks that axe cannot resolve are retained in the evidence. An English commercial enquiry was accepted by the local mock; no production enquiry was sent. [Browser evidence](qa/analytics-removal-browser.json).

## Search engines and browsers

Chrome, Safari and Firefox are browsers. Visibility depends on the search engine selected inside them. Google/Bing indexing and crawlable public pages provide useful foundations across browsers. The site already has static English/French content, canonical links, reciprocal hreflang, a 234-URL XML sitemap, factual structured data and an open production robots.txt. Removing GA4 does not remove those features or the webmaster verification tags.

### Discovery routes checked against primary sources

- **DuckDuckGo:** traditional links and images largely come from Bing, supplemented by DuckDuckGo's own crawler/indexes and specialized sources. Existing Bing indexing work supports this route, but does not prove a particular DuckDuckGo ranking. [DuckDuckGo sources](https://duckduckgo.com/duckduckgo-help-pages/results/sources).
- **Yahoo:** its webmaster guidance identifies Bing and Yahoo's crawler as sources. The same technical crawl/indexing work applies. [Yahoo webmaster guidance](https://help.yahoo.com/kb/SLN2213.html).
- **Brave Search:** has its own crawler and does not crawl pages that Googlebot cannot crawl. Brave documents a page re-fetch route for stale results; it is not a general guarantee of initial inclusion. [Brave crawler](https://search.brave.com/help/brave-search-crawler), [Brave contact/re-fetch guidance](https://search.brave.com/help/contact).
- **Perplexity:** recommends allowing PerplexityBot and its verified crawler addresses to support inclusion in search results. The site's wildcard allow rule already permits it at the robots.txt layer. Hosting/CDN access is a separate concern; verify actual crawler requests in logs before changing security rules. [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).
- **Google AI features:** ordinary SEO fundamentals apply. Pages need to be indexed and eligible for a search snippet; no special AI file or schema is required. [Google AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Recommended next work, in priority order

1. **IndexNow in the release process.** Add a public ownership-verification key file and submit only added, changed or removed canonical URLs after a verified deployment. Participating engines share notifications; each still makes its own indexing decision. This is proposed work, not enabled by this analytics-removal release. [IndexNow documentation](https://www.indexnow.org/documentation), [FAQ and supported endpoints](https://www.indexnow.org/faq).
2. **Verified buying information.** Obtain supplier-confirmed Canadian configurations, exact compatible part numbers, included items, lead times, pricing/ranges and warranty terms. Publish useful side-by-side comparisons and direct answers in both languages. Cite current manufacturer sources and use review dates only after actual review.
3. **Real business evidence.** Add approved project photographs, case studies, named service partners and genuine customer reviews. Seek accurate mentions/links from actual suppliers, training partners and relevant Canadian business organizations. These are editorial recommendations, not a promise of ranking.
4. **Improve existing location pages.** Prioritize cities with confirmed service delivery and add practical local scope, delivery/installation arrangements and real project examples. Keep content useful and specific. The mailing address is not evidence of local branches.
5. **Measure search and enquiries without a popup.** Use Google Search Console, Bing Webmaster Tools, hosting crawl logs and actual Formspree enquiry outcomes. Review impressions, queries, exclusions, crawler errors and qualified leads. GA4 pageview/conversion collection stops with this release.

Google/Bing reporting was still processing after the previous release. Do not treat submitted or discovered URLs as confirmed indexed/ranking pages. Business listings require the relevant platform's eligibility rules; the PMB supplied for the website should not be presented as a staffed storefront. [Google Business Profile eligibility](https://support.google.com/business/answer/13763036?hl=en).
