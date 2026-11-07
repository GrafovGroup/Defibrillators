import { content, contact, type Locale } from '../data/content.ts';
import { labelFor, pathFor, type PageId } from '../data/routes.ts';
import { pageFor } from '../data/pages.ts';
import { products } from '../data/products.ts';
import { breadcrumbIds } from './breadcrumbs.ts';
import { siteOrigin } from './site-config.ts';

type Node = Record<string, unknown>;
export function structuredData(
  id: PageId,
  lang: Locale,
  title: string,
  description: string,
) {
  const url = siteOrigin + pathFor(id, lang);
  const page = id === 'home' ? undefined : pageFor(id);
  const graph: Node[] = [
    {
      '@type': 'Organization',
      '@id': `${siteOrigin}/#organization`,
      name: 'Defibrillators.ca',
      url: siteOrigin + '/',
      logo: `${siteOrigin}/brand/logo-en-light.svg`,
      telephone: contact.tel.replace('tel:', ''),
      email: contact.email,
      // No local offices, street addresses, licence numbers or dealership claims.
    },
    {
      '@type': 'WebSite',
      '@id': `${siteOrigin}/#website`,
      url: siteOrigin + '/',
      name: 'Defibrillators.ca',
      inLanguage: ['en-CA', 'fr-CA'],
      publisher: { '@id': `${siteOrigin}/#organization` },
    },
  ];
  const collectionItems =
    page?.kind === 'catalogue'
      ? products.map((p) => p.id)
      : (page?.children ?? []);
  const webpage: Node = {
    '@type':
      page?.kind === 'faq'
        ? 'FAQPage'
        : collectionItems.length
          ? 'CollectionPage'
          : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: `${lang}-CA`,
    isPartOf: { '@id': `${siteOrigin}/#website` },
  };
  if (id !== 'home') {
    webpage.breadcrumb = { '@id': `${url}#breadcrumb` };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbIds(id).map((ancestor, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: labelFor(ancestor, lang),
        item: siteOrigin + pathFor(ancestor, lang),
      })),
    });
  }
  if (page?.location) {
    webpage.about = {
      '@type':
        page.location.code === 'CA'
          ? 'Country'
          : page.parent === 'locations'
            ? 'AdministrativeArea'
            : 'Place',
      name: page.location.place[lang],
    };
  }
  if (page?.location) {
    webpage.dateModified = page.location.reviewed;
    webpage.author = { '@id': `${siteOrigin}/#organization` };
    webpage.citation = page.location.sources.map((source) => source.url);
  }
  if (collectionItems.length) {
    webpage.mainEntity = { '@id': `${url}#items` };
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#items`,
      numberOfItems: collectionItems.length,
      itemListElement: collectionItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: labelFor(item, lang),
        url: siteOrigin + pathFor(item, lang),
      })),
    });
  }
  if (page?.guide) {
    webpage.mainEntity = { '@id': `${url}#article` };
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      headline: labelFor(id, lang),
      description: page.guide.summary[lang],
      inLanguage: `${lang}-CA`,
      dateModified: page.guide.reviewed,
      author: { '@id': `${siteOrigin}/#organization` },
      publisher: { '@id': `${siteOrigin}/#organization` },
      citation: page.guide.sources.map((source) => source.url),
    });
  }
  const product = products.find((product) => product.id === id);
  if (product) {
    webpage.mainEntity = { '@id': `${url}#product` };
    graph.push({
      '@type': 'Product',
      '@id': `${url}#product`,
      url,
      name: labelFor(id, lang),
      model: product.model,
      brand: { '@type': 'Brand', name: product.manufacturer },
      description: page!.intro[lang],
      // Reference profile only: no Offer, SKU, rating, certification or implied stock.
      // Illustrative photos are not asserted to show a supplied configuration.
    });
  }
  const faqs =
    page?.kind === 'faq'
      ? page.sections[lang]
      : (page?.guide?.faqs[lang] ??
        page?.location?.faqs[lang] ??
        (id === 'home'
          ? content[lang].faqs.map(([heading, body]) => ({ heading, body }))
          : []));
  if (faqs.length) {
    const questions = faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.heading,
      acceptedAnswer: { '@type': 'Answer', text: faq.body },
    }));
    if (page?.kind === 'faq') webpage.mainEntity = questions;
    else {
      webpage.hasPart = { '@id': `${url}#faq` };
      graph.push({
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: `${lang}-CA`,
        isPartOf: { '@id': `${url}#webpage` },
        mainEntity: questions,
      });
    }
  }
  graph.push(webpage);
  return { '@context': 'https://schema.org', '@graph': graph };
}
