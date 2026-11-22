import { products, recipes, site, type Product } from '@/content/site';

export const P0 = products[0];

export function fullName(p: Pick<Product, 'name' | 'pack'>) {
  return p.pack ? `${p.name} — ${p.pack}` : p.name;
}

export function unique<T>(list: T[]) {
  return list.filter((x, i) => list.indexOf(x) === i);
}

export function niceDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** 0.5 -> "½", 1.5 -> "1½", 6 -> "6" */
export function qty(n: number) {
  const whole = Math.floor(n);
  const frac = Math.round((n - whole) * 100) / 100;
  if (frac === 0) return String(whole);
  if (frac === 0.5) return (whole ? whole : '') + '½';
  return String(Math.round(n * 10) / 10);
}

export function num(n: number) {
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 });
}

export function waLink(text: string) {
  return `https://wa.me/${String(site.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

/** Turns "images/x.png" into "/images/x.png" for the public folder. */
export function publicPath(src: string) {
  if (!src) return '';
  if (/^https?:\/\//.test(src)) return src;
  return src.startsWith('/') ? src : `/${src}`;
}

export const recipeCategories = unique(recipes.map((r) => r.category));
export const categorySlug = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const href = {
  home: '/',
  products: '/products',
  product: (id: string) => `/products/${id}`,
  recipes: '/recipes',
  recipeCategory: (c: string) => `/recipes/category/${categorySlug(c)}`,
  recipe: (id: string) => `/recipes/${id}`,
  blog: '/blog',
  post: (id: string) => `/blog/${id}`,
  where: '/where-to-buy',
  health: '/health',
  story: '/story',
  faq: '/faq',
  contact: '/contact',
  quiz: '/quiz',
  search: '/search',
};
