import { posts } from '@/content/site';
import { JsonLd, PageHero } from '@/components/Blocks';
import { PostGrid } from '@/components/Cards';
import { href } from '@/lib/format';
import { breadcrumbLd, itemListLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Blog: Monk Fruit and Low-Sugar Living',
  description: 'Articles about monk fruit, cutting back on sugar and using Mogrona monk fruit sweetener in your kitchen.',
  path: href.blog,
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            ['Home', '/'],
            ['Blog', href.blog],
          ]),
          itemListLd(posts.map((p) => [p.title, href.post(p.id)])),
        ]}
      />
      <PageHero eyebrow="Blog" title="Sweet Reads" lead="Tips, guides and ideas for a lower-sugar life." />
      <section className="section">
        <div className="wrap">
          <PostGrid list={posts} />
        </div>
      </section>
    </>
  );
}
