import { notFound } from 'next/navigation';
import { recipes } from '@/content/site';
import { JsonLd, PageHero } from '@/components/Blocks';
import { categorySlug, href, recipeCategories } from '@/lib/format';
import { breadcrumbLd, itemListLd, pageMeta } from '@/lib/seo';
import { RecipesList } from '../../RecipesList';

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return recipeCategories.map((c) => ({ category: categorySlug(c) }));
}

const fromSlug = (slug: string) => recipeCategories.find((c) => categorySlug(c) === slug);

export async function generateMetadata({ params }: Props) {
  const c = fromSlug((await params).category);
  if (!c) return {};
  const names = recipes.filter((r) => r.category === c).map((r) => r.title);
  return pageMeta({
    title: `Sugar-Free ${c} Recipes`,
    description: `Sugar-free ${c.toLowerCase()} recipes made with Mogrona monk fruit sweetener: ${names.join(', ')}.`,
    path: href.recipeCategory(c),
  });
}

export default async function RecipeCategoryPage({ params }: Props) {
  const c = fromSlug((await params).category);
  if (!c) notFound();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            ['Home', '/'],
            ['Recipes', href.recipes],
            [c, href.recipeCategory(c)],
          ]),
          itemListLd(recipes.filter((r) => r.category === c).map((r) => [r.title, href.recipe(r.id)])),
        ]}
      />
      <PageHero eyebrow="Made with Mogrona" title="Recipes" lead="Your favourite drinks and treats, made without sugar." />
      <section className="section">
        <div className="wrap">
          <RecipesList category={c} />
        </div>
      </section>
    </>
  );
}
