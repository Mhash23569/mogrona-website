import type { Metadata } from 'next';
import { faqs, site, type Post, type Product, type Recipe } from '@/content/site';
import { fullName, href } from './format';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, '');
export const abs = (p: string) => (/^https?:\/\//.test(p) ? p : `${SITE_URL}${p.startsWith('/') ? p : `/${p}`}`);

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** Standard metadata for a page: title, description, canonical link and social sharing. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: string | null;
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
}): Metadata {
  const title = opts.absoluteTitle ? { absolute: opts.title } : opts.title;
  const shareTitle = opts.absoluteTitle ? opts.title : `${opts.title} | ${site.name}`;
  // A page's own photo when it has one, otherwise the branded share card (app/opengraph-image.tsx).
  const images = opts.image
    ? [{ url: opts.image, alt: shareTitle }]
    : [{ url: '/opengraph-image', width: 1200, height: 630, alt: shareTitle }];
  return {
    title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.type ?? 'website',
      url: opts.path,
      title: shareTitle,
      description: opts.description,
      siteName: site.name,
      locale: 'en_PK',
      ...(images ? { images } : {}),
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: opts.description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------------- Structured data (JSON-LD) ---------------- */

export function organizationLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  const a = site.addressParts;
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.company,
    url: SITE_URL,
    logo: abs('/icon.svg'),
    slogan: 'Natural Sugar Replacement',
    description:
      'Mogrona is a premium zero-calorie monk fruit sweetener from Pakistan. One 1.5 g sachet equals two teaspoons of sugar. No stevia, plant based, gluten free and halal.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.email || site.phone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            areaServed: 'PK',
            availableLanguage: ['English', 'Urdu'],
            ...(site.email ? { email: site.email } : {}),
            ...(site.phone ? { telephone: site.phone } : {}),
          },
        }
      : {}),
  };
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: site.name,
    inLanguage: 'en-PK',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}${href.search}?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbLd(items: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: abs(path),
    })),
  };
}

function priceNumber(price: string) {
  const n = parseFloat(price.replace(/[^\d.]/g, ''));
  return isNaN(n) ? null : n;
}

export function productLd(p: Product, images: string[]) {
  const price = priceNumber(p.price);
  const url = abs(href.product(p.id));
  return {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: fullName(p),
    description: [p.short, ...p.description].join(' '),
    url,
    sku: p.id,
    category: 'Food & Beverages > Sweeteners',
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@type': 'Organization', name: site.manufacturer.split(',')[0] },
    ...(images.length ? { image: images.map(abs) } : {}),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Ingredients', value: p.ingredients },
      { '@type': 'PropertyValue', name: 'Pack size', value: p.size },
      { '@type': 'PropertyValue', name: 'Sweetness', value: p.sweetness },
      ...(p.nutrition ? [{ '@type': 'PropertyValue', name: 'Calories per serving', value: p.nutrition.calories }] : []),
      ...p.facts.map((f) => ({ '@type': 'PropertyValue', name: 'Feature', value: f })),
    ],
    ...(price != null
      ? {
          offers: {
            '@type': 'Offer',
            url,
            price,
            priceCurrency: 'PKR',
            availability: 'https://schema.org/InStock',
            seller: { '@id': ORG_ID },
          },
        }
      : {}),
  };
}

export function recipeLd(r: Recipe, image: string | null) {
  return {
    '@type': 'Recipe',
    name: r.title,
    description: r.intro,
    url: abs(href.recipe(r.id)),
    ...(image ? { image: [abs(image)] } : {}),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    recipeCategory: r.category,
    recipeCuisine: r.cuisine,
    recipeYield: `${r.serves} ${r.serves === '1' ? 'serving' : 'servings'}`,
    prepTime: r.prepTime,
    totalTime: r.totalTime,
    keywords: `sugar-free, no added sugar, monk fruit, ${r.category.toLowerCase()}, ${site.name}`,
    suitableForDiet: 'https://schema.org/LowCalorieDiet',
    recipeIngredient: r.ingredients,
    recipeInstructions: r.steps.map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text })),
  };
}

export function postLd(p: Post, image: string | null) {
  const url = abs(href.post(p.id));
  return {
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.summary,
    url,
    mainEntityOfPage: url,
    datePublished: p.date,
    dateModified: p.date,
    inLanguage: 'en-PK',
    ...(image ? { image: [abs(image)] } : {}),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function faqLd(list: [string, string][] = faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: list.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function itemListLd(items: [string, string][]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, url: abs(path) })),
  };
}
