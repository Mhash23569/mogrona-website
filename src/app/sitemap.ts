import type { MetadataRoute } from 'next';
import { posts, products, recipes } from '@/content/site';
import { href, recipeCategories } from '@/lib/format';
import { firstImage } from '@/lib/images';
import { abs } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const latestPost = posts.map((p) => p.date).sort().at(-1);
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly', images?: (string | null)[]) => ({
    url: abs(path),
    lastModified: now,
    changeFrequency,
    priority,
    ...(images?.filter(Boolean).length ? { images: images.filter(Boolean).map((i) => abs(i!)) } : {}),
  });

  return [
    page('/', 1, 'weekly', [firstImage(products[0].images[0])]),
    page(href.products, 0.9, 'weekly'),
    ...products.map((p) => page(href.product(p.id), 0.9, 'weekly', p.images.map((i) => firstImage(i)))),
    page(href.where, 0.8, 'weekly'),
    page(href.recipes, 0.7, 'weekly'),
    ...recipeCategories.map((c) => page(href.recipeCategory(c), 0.5)),
    ...recipes.map((r) => page(href.recipe(r.id), 0.6, 'monthly', [firstImage(r.image)])),
    { ...page(href.blog, 0.6, 'weekly'), lastModified: latestPost ? new Date(latestPost) : now },
    ...posts.map((p) => ({ ...page(href.post(p.id), 0.6, 'monthly', [firstImage(p.image)]), lastModified: new Date(p.date) })),
    page(href.health, 0.7),
    page(href.faq, 0.7),
    page(href.quiz, 0.6),
    page(href.story, 0.5),
    page(href.contact, 0.4),
  ];
}
