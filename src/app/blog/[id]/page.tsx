import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts, site } from '@/content/site';
import { JsonLd } from '@/components/Blocks';
import { SIZES, Slot } from '@/components/Slot';
import { href, niceDate } from '@/lib/format';
import { firstImage } from '@/lib/images';
import { breadcrumbLd, pageMeta, postLd } from '@/lib/seo';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = posts.find((x) => x.id === id);
  if (!p) return {};
  return pageMeta({
    title: `${p.title} | ${site.name} Blog`,
    absoluteTitle: true,
    description: p.summary,
    path: href.post(p.id),
    image: firstImage(p.image),
    type: 'article',
    publishedTime: p.date,
  });
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const p = posts.find((x) => x.id === id);
  if (!p) notFound();
  const image = firstImage(p.image);

  return (
    <>
      <JsonLd
        data={[
          postLd(p, image),
          breadcrumbLd([
            ['Home', '/'],
            ['Blog', href.blog],
            [p.title, href.post(p.id)],
          ]),
        ]}
      />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">
            <time dateTime={p.date}>{niceDate(p.date)}</time>
          </p>
          <h1>{p.title}</h1>
        </div>
      </section>
      <section className="section">
        <article className="wrap wrap--narrow prose">
          <Slot src={image} alt={p.title} className="r-16x9" sizes={SIZES.narrow} eager missing={p.image} />
          {p.body.map((b, i) => {
            if (typeof b === 'string') return <p key={i}>{b}</p>;
            if (b[0] === 'h') return <h2 key={i}>{b[1]}</h2>;
            if (b[0] === 'ul')
              return (
                <ul key={i}>
                  {b[1].map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              );
            return null;
          })}
          <div className="btns">
            <Link className="btn btn--outline" href={href.blog}>
              ← All articles
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
