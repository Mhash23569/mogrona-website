import { JsonLd, PageHero, StoresList } from '@/components/Blocks';
import { href } from '@/lib/format';
import { breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Where to Buy Mogrona Monk Fruit Sweetener in Pakistan',
  absoluteTitle: true,
  description: 'Find out where to buy Mogrona monk fruit sweetener in Pakistan: shops, supermarkets and online stores.',
  path: href.where,
});

export default function WhereToBuyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          ['Home', '/'],
          ['Where to Buy', href.where],
        ])}
      />
      <PageHero eyebrow="Where to Buy" title="Find Mogrona" lead="Shops and online stores that stock Mogrona." />
      <section className="section">
        <div className="wrap">
          <StoresList />
        </div>
      </section>
    </>
  );
}
