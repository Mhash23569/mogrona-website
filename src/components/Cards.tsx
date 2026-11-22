import Link from 'next/link';
import type { Post, Product, Recipe } from '@/content/site';
import { fullName, href, niceDate } from '@/lib/format';
import { firstImage } from '@/lib/images';
import { BuyButton } from './BuyButton';
import { SIZES, Slot } from './Slot';

export function ProductCard({ p }: { p: Product }) {
  const url = href.product(p.id);
  return (
    <article className="card">
      <Link className="card__media" href={url} tabIndex={-1} aria-hidden="true">
        <Slot src={firstImage(p.images[0])} alt="" className="r-1x1 contain" sizes={SIZES.card} missing={p.images[0]} />
      </Link>
      <div className="card__body">
        {p.pack ? <span className="tag">{p.pack}</span> : null}
        <h3>
          <Link href={url}>{p.name}</Link>
        </h3>
        <p>{p.short}</p>
        <Link className="btn btn--green btn--sm" href={url}>
          View product
        </Link>
      </div>
    </article>
  );
}

export function ProductSpotlight({ p, eager }: { p: Product; eager?: boolean }) {
  const url = href.product(p.id);
  return (
    <div className="split">
      <div>
        <Slot src={firstImage(p.images[0])} alt={fullName(p)} className="r-1x1 contain" sizes={SIZES.half} eager={eager} missing={p.images[0]} />
      </div>
      <div>
        {p.pack ? <p className="eyebrow">{p.pack}</p> : null}
        <h3 className="text-[2rem] uppercase">{p.name}</h3>
        <p>{p.short}</p>
        <ul className="facts">
          {p.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="sweetness">{p.sweetness}</p>
        <div className="btns">
          <Link className="btn btn--green" href={url}>
            View product
          </Link>
          <BuyButton p={p} className="btn btn--outline" />
        </div>
      </div>
    </div>
  );
}

export function RecipeCard({ r }: { r: Recipe }) {
  const url = href.recipe(r.id);
  return (
    <article className="card">
      <Link className="card__media" href={url} tabIndex={-1} aria-hidden="true">
        <Slot src={firstImage(r.image)} alt="" className="r-4x3" sizes={SIZES.card} missing={r.image} />
      </Link>
      <div className="card__body">
        <span className="tag">
          {r.category} · {r.time}
        </span>
        <h3>
          <Link href={url}>{r.title}</Link>
        </h3>
        <p>{r.intro}</p>
      </div>
    </article>
  );
}

export function PostCard({ p }: { p: Post }) {
  const url = href.post(p.id);
  return (
    <article className="card">
      <Link className="card__media" href={url} tabIndex={-1} aria-hidden="true">
        <Slot src={firstImage(p.image)} alt="" className="r-16x9" sizes={SIZES.card} missing={p.image} />
      </Link>
      <div className="card__body">
        <span className="tag">
          <time dateTime={p.date}>{niceDate(p.date)}</time>
        </span>
        <h3>
          <Link href={url}>{p.title}</Link>
        </h3>
        <p>{p.summary}</p>
        <Link className="btn btn--outline btn--sm" href={url}>
          Read article
        </Link>
      </div>
    </article>
  );
}

export function ProductsBlock({ list, eager }: { list: Product[]; eager?: boolean }) {
  if (list.length === 1) return <ProductSpotlight p={list[0]} eager={eager} />;
  return (
    <div className="grid">
      {list.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

export function RecipeGrid({ list }: { list: Recipe[] }) {
  return (
    <div className="grid">
      {list.map((r) => (
        <RecipeCard key={r.id} r={r} />
      ))}
    </div>
  );
}

export function PostGrid({ list }: { list: Post[] }) {
  return (
    <div className="grid">
      {list.map((p) => (
        <PostCard key={p.id} p={p} />
      ))}
    </div>
  );
}
