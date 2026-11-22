import Link from 'next/link';
import { site } from '@/content/site';
import { ConversionTable, JsonLd, PageHero } from '@/components/Blocks';
import { Calculator } from '@/components/Calculator';
import { href, P0 } from '@/lib/format';
import { breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Health: Sweetness Without the Sugar',
  description:
    'How swapping sugar for Mogrona monk fruit sweetener can help you cut back on added sugar and calories. One sachet equals two teaspoons of sugar, with zero calories.',
  path: href.health,
});

export default function HealthPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          ['Home', '/'],
          ['Health', href.health],
        ])}
      />
      <PageHero eyebrow="Health" title="Sweetness without the sugar" lead="Simple ways to enjoy sweet tastes while cutting back on added sugar." />

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Sweet Swaps</p>
            <h2>One sachet, two teaspoons</h2>
            <p>
              Every Mogrona sachet is as sweet as two teaspoons of sugar, with zero calories. Swap it in wherever you would normally reach for the sugar bowl:
              chai, coffee, cold drinks, yogurt and oats.
            </p>
            <p>If you usually take one teaspoon of sugar, start with half a sachet and adjust to your taste.</p>
            <div className="btns">
              <Link className="btn btn--green" href={href.recipes}>
                Try a Recipe
              </Link>
            </div>
          </div>
          <div className="panel">
            <h2>Sugar to Mogrona</h2>
            <ConversionTable p={P0} />
          </div>
        </div>
      </section>

      <section className="section section--green">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">Sugar Swap Calculator</p>
            <h2>How much sugar could you swap out?</h2>
          </div>
          <Calculator brand={site.name} per={P0.sachetTsp || 2} />
        </div>
      </section>

      <section className="section section--peach">
        <div className="wrap">
          <div className="detail-grid">
            <div className="panel">
              <h2>Weight management</h2>
              <p>
                Sugar adds calories quickly: one level teaspoon contains about 16. Mogrona has zero calories, so replacing the sugar in your daily drinks is an
                easy way to cut calories without giving up the taste you enjoy.
              </p>
            </div>
            <div className="panel">
              <h2>Diabetes</h2>
              <p>
                Mogrona contains no sugar, and the pack is labelled as suitable for weight control and diabetes. Managing diabetes is personal, so please follow
                the advice of your doctor or dietitian about what fits your plan.
              </p>
            </div>
            <div className="panel">
              <h2>What is inside</h2>
              <p>Just two ingredients: monk fruit extract and erythritol. Mogrona contains no stevia, and it is plant based, gluten free and halal.</p>
              <div className="btns">
                <Link className="btn btn--green btn--sm" href={href.products}>
                  See the Product
                </Link>
              </div>
            </div>
          </div>
          <p className="note center mt-8">
            The information on this page is general and is not medical advice. If you have a health condition, please speak to your doctor or dietitian.
          </p>
        </div>
      </section>
    </>
  );
}
