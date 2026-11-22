import { NextResponse, type NextRequest } from 'next/server';

/**
 * Old addresses from the previous website (product.html?id=..., recipes.html?category=...)
 * permanently redirect to the new clean addresses, so links already shared on
 * WhatsApp / social media and any search engine listings keep working.
 */
const PAGES: Record<string, string> = {
  'index.html': '/',
  'products.html': '/products',
  'recipes.html': '/recipes',
  'blog.html': '/blog',
  'where-to-buy.html': '/where-to-buy',
  'health.html': '/health',
  'story.html': '/story',
  'faq.html': '/faq',
  'contact.html': '/contact',
  'quiz.html': '/quiz',
  'search.html': '/search',
  'product.html': '/products',
  'recipe.html': '/recipes',
  'post.html': '/blog',
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const file = url.pathname.replace(/^\/+/, '').toLowerCase();
  const target = PAGES[file];
  if (!target) return NextResponse.next();

  const id = url.searchParams.get('id');
  const dest = new URL(target, url);
  if (id && ['product.html', 'recipe.html', 'post.html'].includes(file)) dest.pathname = `${target}/${slug(id)}`;
  if (file === 'recipes.html') {
    const c = url.searchParams.get('category');
    if (c) dest.pathname = `/recipes/category/${slug(c)}`;
  }
  if (file === 'search.html') {
    const q = url.searchParams.get('q');
    if (q) dest.searchParams.set('q', q);
  }
  return NextResponse.redirect(dest, 301);
}

export const config = {
  // Only runs for old ".html" addresses; every other request skips it entirely.
  matcher: ['/(.*\\.html)'],
};
