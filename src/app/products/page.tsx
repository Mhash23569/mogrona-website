import { products } from '@/content/site';
import { JsonLd, PageHero } from '@/components/Blocks';
import { ProductsBlock } from '@/components/Cards';
import { fullName, href } from '@/lib/format';
import { breadcrumbLd, itemListLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Monk Fruit Sweetener Products',
  description:
    'Browse Mogrona monk fruit sweeteners: a natural, zero-calorie sugar replacement in handy 1.5 g sachets. No stevia, plant based and halal.',
  path: href.products,
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            ['Home', '/'],
            ['Products', href.products],
          ]),
          itemListLd(products.map((p) => [fullName(p), href.product(p.id)])),
        ]}
      />
      <PageHero eyebrow="Our Products" title="Mogrona Sweeteners" lead="Natural sugar replacement made from monk fruit extract." />
      <section className="section">
        <div className="wrap">
          <ProductsBlock list={products} eager />
        </div>
      </section>
    </>
  );
}
