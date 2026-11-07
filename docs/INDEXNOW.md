# IndexNow and cited buying information

## Implementation

IndexNow runs from the release operator's Node environment, after the static site has been uploaded to WHC. It needs no persistent hosting process, plugin, customer cookie, tracking tag or account credential. `scripts/lib/indexnow-config.mjs` identifies the primary domain, the single global endpoint and the public ownership proof in `public/`. The proof file is intentionally publicly readable; it is not a WHC, Google or Bing account secret. It is excluded from the sitemap.

Every build creates `.release/indexnow-manifest.json`, outside `dist/` and Git. Canonical English/French URLs come from the built sitemap; each fingerprint covers the emitted HTML and its local images. Image replacement under the same filename therefore counts as a content update. Redirect aliases, the root entry, query strings, 404s and assets are never submitted as page URLs. The public receipt/state under `docs/search/` records only page/image URLs, hashes and notification outcomes, not leads or browser behaviour.

## Release procedure

1. Run `pnpm verify`. Tests use mocked HTTP responses and never notify search engines.
2. Run `pnpm indexnow`. This is a local dry run: it lists added, changed and removed pages without making network requests. Review unexpected changes.
3. Commit the tested implementation. Back up the dedicated WHC website root outside public directories. Upload the complete matching `dist/`, including the proof text file and all hidden headers, and verify the live release.
4. Run `pnpm indexnow:submit`. **First activation only:** run `pnpm indexnow:submit --bootstrap` after reviewing the full initial list.
5. Commit the successful `docs/search/indexnow-state.json` receipt. Re-running against the same content makes no notification and no network requests. A fresh checkout uses the same baseline. Do not delete it to force resubmission.

The command takes an exclusive local submission lock. It verifies the live ownership proof, exact robots.txt/sitemap, exact changed HTML and images, canonical URLs and indexability before posting once to `https://api.indexnow.org/indexnow`. A removed URL must return 404/410 or a permanent redirect to a current canonical URL. WHC archive extraction alone does not remove obsolete pages: deliberately remove or redirect retired application routes during deployment before running the notifier. Preserve hosting-managed files.

Submission is not tied to page views, builds, tests or a source push, because those do not prove that WHC serves the new release. The post-upload release step is required. `AGENTS.md` and the WHC deployment guide carry that requirement forward.

## Outcomes and recovery

- **200:** the endpoint received the batch; indexing/ranking is not established.
- **202:** received, with ownership validation pending. The receipt explicitly retains that distinction. Do not repeatedly send an unchanged batch while it processes.
- **400/403/422:** inspect URL format, proof and host. No baseline advancement.
- **429:** respect `Retry-After`; no automatic retry or baseline advancement.
- **Network/5xx failure:** baseline stays unchanged. Diagnose before retrying. If the request reached the provider but its response was lost, a later retry may repeat the notification; exactly-once delivery across a network failure cannot be guaranteed.
- **Local state save fails after acceptance:** recover the reviewed receipt/state before retrying to avoid repeating a received batch.
- **Stale lock:** confirm that no notifier process is running before removing `.release/indexnow.lock`.
- **More than 10,000 changed URLs:** the command stops before submission. This site's current 238-page release fits one batch; add checkpointed batching before expanding past the protocol limit.
- **Rollback:** restore the chosen full release and matching policies, verify it, then run the same notifier using the last successful state. Do not reset the baseline just because a release was rolled back.

## Content and AEO improvements in this release

Manufacturer sources and their existing review dates are visible on each of the eight model profiles, with direct section anchors. Part references use model-specific question headings, documentation links and review dates. The bilingual comparison adds adult pads, paediatric pads/keys and standard battery references where verified, linking to the relevant model section. The FRx Infant/Child Key remains clearly distinguished from a pad set. The Defibtech VIEW reference battery `DCF-2003` was checked against the manufacturer's product page on 7 November 2026. Product WebPage citation markup matches the visible manufacturer sources; no price, inventory, rating, dealership or licence claim was added.

Existing sourced guide summaries, bilingual FAQs, canonicals/hreflang, static HTML and open production robots remain in place. No special AI text file or fabricated schema was added. No new thin city pages were generated.

## Sources and limits

- [IndexNow protocol](https://www.indexnow.org/documentation): ownership proof, POST format, batch limit and response meanings.
- [IndexNow FAQ](https://www.indexnow.org/faq): one participating endpoint shares the notification across participating engines. This does not mean Google, DuckDuckGo or Brave directly support IndexNow.
- [DuckDuckGo sources](https://duckduckgo.com/duckduckgo-help-pages/results/sources): traditional web results largely use Bing; any DuckDuckGo benefit is indirect and must be assessed in actual results.
- [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features): normal SEO fundamentals and snippet eligibility apply; no special AI markup/file is required.
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers): search crawler access is separate from hosting firewall behaviour. The existing wildcard allow rule permits these crawlers at the robots layer; do not weaken hosting security based on a user-agent string alone.
- [Philips FRx owner's manual](https://www.documents.philips.com/assets/Instruction%20for%20Use/20210518/bbf1d8bda6e2442cb347ad2c002292ff.pdf?feed=ifu_docs_feed): SMART Pads II, Infant/Child Key and standard/aviation battery distinction.
- [Defibtech Lifeline VIEW](https://www.defibtech.com/products/lifeline-view-aed/): DDP-2001, DDP-2002 and DCF-2003 manufacturer references. Regional/supplied configuration still needs confirmation.

Supplier-confirmed pricing, stock, Canadian configurations, delivery commitments, actual service partners, approved project evidence and genuine customer reviews remain business inputs. Publish them when supplied and verified. A personal connection to another business is not evidence of an authorized commercial partnership. See [CONTENT-EVIDENCE.md](search/CONTENT-EVIDENCE.md) for the publishing checklist.

## Validation before deployment

`pnpm verify` passed all 574 tests, ESLint, Astro/TypeScript checking, formatting and the production build. IndexNow tests simulate accepted/pending/rejected responses, unchanged releases, image-only changes, staging, canonical errors, mismatched live files and retired routes. Six local browser audits cover 360, 390, 768, 1024, 1440 and 1920 px: no axe violations, overflow or broken images. Comparison selection, model-specific reference links and the parts finder were exercised. [Browser evidence](qa/indexnow-browser.json). No production enquiry was submitted.

## Verified production activation — 7 November 2026

The release from `b855dd28061d5cd57ba40e3c1f5ec018fce76639` is deployed on WHC. All 431 public files and 235 HTML security policies match the tested build; canonical redirects, valid HTTPS, 404s and archive isolation passed. The live English comparison and French model references were checked. [Live evidence](qa/indexnow-live.json).

The first IndexNow POST returned 403 without advancing the baseline. Direct inspection confirmed the ownership text file returned 200 with the matching key. A diagnostic improvement now surfaces bounded provider error details. After the live proof was rechecked, a single retry received **HTTP 200 for all 234 URLs** at `2026-11-07T21:10:14.387Z`. The committed [notification state](search/indexnow-state.json) records that accepted batch. A repeat command returned `unchanged`, zero submitted, with no network access. This records notification receipt, not confirmed indexing or ranking. The diagnostic-only script change passed lint, formatting and all 19 IndexNow tests; it does not change the deployed static site.
