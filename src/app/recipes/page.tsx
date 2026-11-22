import { recipes } from '@/content/site';
import { JsonLd, PageHero } from '@/components/Blocks';
import { href } from '@/lib/format';
import { breadcrumbLd, itemListLd, pageMeta } from '@/lib/seo';
import { RecipesList } from './RecipesList';

export const metadata = pageMeta({
  title: 'Sugar-Free Recipes with Monk Fruit Sweetener',
  description:
    'Sugar-free drinks, breakfasts and snacks made with Mogrona monk fruit sweetener: karak chai, iced coffee, nimbu pani, mango lassi, overnight oats and more.',
  path: href.recipes,
});

export default function RecipesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            ['Home', '/'],
            ['Recipes', href.recipes],
          ]),
          itemListLd(recipes.map((r) => [r.title, href.recipe(r.id)])),
        ]}
      />
      <PageHero eyebrow="Made with Mogrona" title="Recipes" lead="Your favourite drinks and treats, made without sugar." />
      <section className="section">
        <div className="wrap">
          <RecipesList />
        </div>
      </section>
    </>
  );
}
