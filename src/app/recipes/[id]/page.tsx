import Link from 'next/link';
import { notFound } from 'next/navigation';
import { recipes, site } from '@/content/site';
import { JsonLd } from '@/components/Blocks';
import { RecipeGrid } from '@/components/Cards';
import { SIZES, Slot } from '@/components/Slot';
import { href, P0 } from '@/lib/format';
import { firstImage } from '@/lib/images';
import { breadcrumbLd, pageMeta, recipeLd } from '@/lib/seo';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const r = recipes.find((x) => x.id === id);
  if (!r) return {};
  return pageMeta({
    title: `${r.title} Recipe | ${site.name} Recipes`,
    absoluteTitle: true,
    description: `${r.intro} Ready in ${r.time}, serves ${r.serves}. Sweetened with Mogrona monk fruit sweetener instead of sugar.`,
    path: href.recipe(r.id),
    image: firstImage(r.image),
  });
}

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const r = recipes.find((x) => x.id === id);
  if (!r) notFound();
  const image = firstImage(r.image);
  const more = recipes.filter((x) => x.id !== r.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          recipeLd(r, image),
          breadcrumbLd([
            ['Home', '/'],
            ['Recipes', href.recipes],
            [r.title, href.recipe(r.id)],
          ]),
        ]}
      />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{r.category}</p>
          <h1>{r.title}</h1>
          <p>{r.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="recipe">
            <div>
              <Slot src={image} alt={r.title} className="r-4x3" sizes={SIZES.half} eager missing={r.image} />
              <ul className="meta mt-[22px]">
                <li>
                  <b>Time</b>
                  {r.time}
                </li>
                <li>
                  <b>Serves</b>
                  {r.serves}
                </li>
              </ul>
              <div className="btns">
                <Link className="btn btn--green btn--sm" href={href.product(P0.id)}>
                  Made with {site.name}
                </Link>
              </div>
            </div>
            <div>
              <h2>Ingredients</h2>
              <ul>
                {r.ingredients.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <h2>Method</h2>
              <ol>
                {r.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--peach">
        <div className="wrap">
          <div className="section__head">
            <h2>More recipes</h2>
          </div>
          <RecipeGrid list={more} />
        </div>
      </section>
    </>
  );
}
