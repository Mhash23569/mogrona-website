import Link from 'next/link';
import { recipes } from '@/content/site';
import { RecipeGrid } from '@/components/Cards';
import { href, recipeCategories } from '@/lib/format';

/** Category chips + recipe cards. Each category has its own page, so every filter is a real, fast, indexable link. */
export function RecipesList({ category }: { category?: string }) {
  const list = category ? recipes.filter((r) => r.category === category) : recipes;
  return (
    <>
      <div className="chips">
        <Link className={`chip${category ? '' : ' is-active'}`} href={href.recipes}>
          All
        </Link>
        {recipeCategories.map((c) => (
          <Link key={c} className={`chip${c === category ? ' is-active' : ''}`} href={href.recipeCategory(c)}>
            {c}
          </Link>
        ))}
      </div>
      <RecipeGrid list={list} />
    </>
  );
}
