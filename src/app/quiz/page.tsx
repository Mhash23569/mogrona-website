import { recipes } from '@/content/site';
import { JsonLd, PageHero } from '@/components/Blocks';
import { BuyButton } from '@/components/BuyButton';
import { Quiz } from '@/components/Quiz';
import { fullName, href, P0 } from '@/lib/format';
import { firstImage } from '@/lib/images';
import { breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Sweet Swap Quiz: Find Your Sugar Swap',
  description: 'Answer four quick questions and see exactly how to swap the sugar in your day for Mogrona monk fruit sweetener. No sign-up needed.',
  path: href.quiz,
});

export default function QuizPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          ['Home', '/'],
          ['Quiz', href.quiz],
        ])}
      />
      <PageHero eyebrow="Quiz" title="Find Your Perfect Sweet Swap" lead="Four quick questions. No sign-up needed." />
      <section className="section">
        <div className="wrap">
          <Quiz
            productName={fullName(P0)}
            productUrl={href.product(P0.id)}
            productImage={firstImage(P0.images[0])}
            per={P0.sachetTsp || 2}
            recipes={recipes.map((r) => ({ id: r.id, title: r.title, url: href.recipe(r.id) }))}
            buyButton={<BuyButton p={P0} className="btn btn--outline" />}
          />
        </div>
      </section>
    </>
  );
}
