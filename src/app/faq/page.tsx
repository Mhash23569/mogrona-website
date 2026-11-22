import Link from 'next/link';
import { FaqList, JsonLd, PageHero } from '@/components/Blocks';
import { href } from '@/lib/format';
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Monk Fruit Sweetener FAQ',
  description:
    'Answers to common questions about Mogrona monk fruit sweetener: ingredients, how much to use, cooking, diabetes, halal status, storage and where to buy.',
  path: href.faq,
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqLd(),
          breadcrumbLd([
            ['Home', '/'],
            ['FAQ', href.faq],
          ]),
        ]}
      />
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions" lead="Everything you need to know about Mogrona." />
      <section className="section">
        <div className="wrap wrap--narrow">
          <FaqList />
          <div className="section__foot">
            <p>Still have a question?</p>
            <Link className="btn btn--green" href={href.contact}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
