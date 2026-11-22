import { Suspense } from 'react';
import { faqs, posts, products, recipes } from '@/content/site';
import { PageHero } from '@/components/Blocks';
import { SearchResults, type SearchEntry } from '@/components/SearchResults';
import { fullName, href } from '@/lib/format';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Search',
  description: 'Search the Mogrona website.',
  path: href.search,
  noindex: true,
});

function buildIndex(): SearchEntry[] {
  const hay = (...parts: string[]) => parts.join(' ').toLowerCase();
  return [
    ...products.map((p) => ({
      type: 'Product',
      title: fullName(p),
      text: p.short,
      url: href.product(p.id),
      haystack: hay(p.name, p.pack, p.short, p.description.join(' '), p.ingredients, p.facts.join(' ')),
    })),
    ...recipes.map((r) => ({
      type: 'Recipe',
      title: r.title,
      text: r.intro,
      url: href.recipe(r.id),
      haystack: hay(r.title, r.category, r.intro, r.ingredients.join(' ')),
    })),
    ...posts.map((p) => ({
      type: 'Article',
      title: p.title,
      text: p.summary,
      url: href.post(p.id),
      haystack: hay(p.title, p.summary, p.body.map((b) => (typeof b === 'string' ? b : ([] as string[]).concat(b[1]).join(' '))).join(' ')),
    })),
    ...faqs.map(([q, a]) => ({ type: 'FAQ', title: q, text: a, url: href.faq, haystack: hay(q, a) })),
  ];
}

export default function SearchPage() {
  return (
    <>
      <PageHero title="Search" />
      <section className="section">
        <div className="wrap wrap--narrow">
          <Suspense fallback={null}>
            <SearchResults index={buildIndex()} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
