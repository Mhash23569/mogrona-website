import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, recipes, site } from '@/content/site';
import { ConversionTable, JsonLd, NutritionPanel } from '@/components/Blocks';
import { BuyButton } from '@/components/BuyButton';
import { RecipeGrid } from '@/components/Cards';
import { Gallery } from '@/components/Gallery';
import { fullName, href } from '@/lib/format';
import { existingImages } from '@/lib/images';
import { breadcrumbLd, pageMeta, productLd } from '@/lib/seo';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  if (!p) return {};
  const images = existingImages(p.images);
  return pageMeta({
    title: `${fullName(p)} | ${site.name}`,
    absoluteTitle: true,
    description: `${p.short} ${p.sweetness} Ingredients: ${p.ingredients}. ${p.facts.join(', ')}.`.slice(0, 300),
    path: href.product(p.id),
    image: images[0] ?? null,
  });
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  if (!p) notFound();
  const images = existingImages(p.images);
  const made = recipes.slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          productLd(p, images),
          breadcrumbLd([
            ['Home', '/'],
            ['Products', href.products],
            [p.name, href.product(p.id)],
          ]),
        ]}
      />
      <div className="wrap">
        <nav className="crumbs mb-[1em]" aria-label="Breadcrumb">
          <Link href="/">Home</Link> › <Link href={href.products}>Products</Link> › {p.name}
        </nav>
        <div className="product">
          <Gallery images={images} alt={fullName(p)} />
          <div className="product__info">
            <h1>{p.name}</h1>
            {p.pack ? <p className="product__pack">{p.pack}</p> : null}
            {p.price ? <p className="product__price">{p.price}</p> : null}
            {p.description.map((t) => (
              <p key={t}>{t}</p>
            ))}
            {p.size ? (
              <p>
                <strong>Pack size:</strong> {p.size}
              </p>
            ) : null}
            <ul className="facts">
              {p.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="btns">
              <BuyButton p={p} className="btn btn--green" />
              <Link className="btn btn--outline" href={href.recipes}>
                View recipes
              </Link>
            </div>
            <p className="sweetness">{p.sweetness}</p>
          </div>
        </div>
      </div>
      <section className="section section--peach">
        <div className="wrap">
          <div className="detail-grid">
            <div className="panel">
              <h2>Ingredients</h2>
              <p>{p.ingredients}</p>
              {p.storage ? (
                <>
                  <h2 className="mt-[1.4em]">Storage</h2>
                  <p>{p.storage}</p>
                </>
              ) : null}
            </div>
            {p.nutrition ? (
              <div className="panel">
                <h2>Nutrition</h2>
                <NutritionPanel p={p} />
              </div>
            ) : null}
            <div className="panel">
              <h2>Sugar to {site.name}</h2>
              <ConversionTable p={p} />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">Made with {site.name}</p>
            <h2>Try it in a recipe</h2>
          </div>
          <RecipeGrid list={made} />
          <div className="section__foot">
            <Link className="btn btn--green" href={href.recipes}>
              See all recipes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
