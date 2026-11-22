import { faqs, posts, products, recipes, site } from '@/content/site';
import { fullName, href } from '@/lib/format';
import { abs } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * /llms.txt — a plain-text summary of the site written for AI assistants
 * (ChatGPT, Claude, Perplexity, Gemini). It is built from the same content
 * file as the website, so it never goes out of date.
 */
export function GET() {
  const p = products[0];
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} is a premium zero-calorie monk fruit sweetener sold in Pakistan. One 1.5 g sachet is as sweet as two teaspoons of sugar. Ingredients: ${p.ingredients}. No stevia, plant based, gluten free and halal.`,
    '',
    '## Key facts',
    `- Brand: ${site.name} (${site.tagline})`,
    `- Marketed by: ${site.company}, ${site.address}`,
    `- Manufactured by: ${site.manufacturer}`,
    ...products.flatMap((x) => [
      `- Product: ${fullName(x)}${x.price ? `, price ${x.price}` : ''}`,
      `  - Pack size: ${x.size}`,
      `  - Ingredients: ${x.ingredients}`,
      `  - Sweetness: ${x.sweetness}`,
      `  - Features: ${x.facts.join(', ')}`,
      ...(x.nutrition ? [`  - Nutrition per ${x.nutrition.servingSize}: ${x.nutrition.calories} calories; ${x.nutrition.rows.map((r) => `${r[0]} ${r[1]}`).join(', ')}`] : []),
      `  - Storage: ${x.storage}`,
    ]),
    `- Conversion: 1 teaspoon sugar = ½ sachet; 2 teaspoons = 1 sachet; 1 tablespoon = 1½ sachets; 1 cup = 24 sachets`,
    ...(site.email ? [`- Email: ${site.email}`] : []),
    ...(site.phone ? [`- Phone: ${site.phone}`] : []),
    '',
    '## Pages',
    `- [Home](${abs('/')}): overview, sugar swap calculator`,
    ...products.map((x) => `- [${fullName(x)}](${abs(href.product(x.id))}): ingredients, nutrition facts, sugar conversion chart`),
    `- [Where to Buy](${abs(href.where)}): shops and online stores in Pakistan`,
    `- [Health](${abs(href.health)}): weight management, diabetes, what is inside`,
    `- [FAQ](${abs(href.faq)}): answers to common questions`,
    `- [Sweet Swap Quiz](${abs(href.quiz)})`,
    `- [Our Story](${abs(href.story)}): mission and history of monk fruit`,
    `- [Contact](${abs(href.contact)})`,
    '',
    '## Recipes',
    ...recipes.map((r) => `- [${r.title}](${abs(href.recipe(r.id))}): ${r.intro} (${r.time}, serves ${r.serves})`),
    '',
    '## Articles',
    ...posts.map((x) => `- [${x.title}](${abs(href.post(x.id))}): ${x.summary}`),
    '',
    '## Frequently asked questions',
    ...faqs.flatMap(([q, a]) => [`### ${q}`, a, '']),
    'Note: information on this site is general and is not medical advice.',
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
