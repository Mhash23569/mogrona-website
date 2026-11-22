# Mogrona website — how to use and edit

Built with **Next.js** and **Tailwind CSS**, hosted on **Vercel**.
Every time a change is pushed to the `main` branch on GitHub, Vercel rebuilds
and publishes the site automatically (usually in under a minute).

## The only file you normally edit

`src/content/site.ts` — all text, products, recipes, blog articles, questions
and shops are in that one file, with instructions written inside it. You can
edit it directly on GitHub (open the file, click the pencil icon, then
"Commit changes"), and the live site updates itself.

## 1. Adding pictures

Save each picture into the `public/images` folder using the exact file name
below. Any shape or size works: the website crops or fits each picture into
its frame by itself, and automatically serves small, modern versions (AVIF /
WebP) to each visitor's screen. Until a picture is added, the site shows a
"Photo coming soon" panel in its place.

| Picture | File |
| --- | --- |
| Logo (top of every page) — white logo, transparent background (PNG) | `public/images/logo.png` |
| Home page banner picture — best with a transparent background | `public/images/hero.png` |
| Home page health section | `public/images/home-health.jpg` |
| Our Story page | `public/images/story.jpg` |
| Product pictures (first = main picture) | `public/images/products/monk-fruit-sachets-50-1.png` … `-4.png` |
| Recipe pictures | `public/images/recipes/karak-chai.jpg`, `iced-coffee.jpg`, `mint-lemonade.jpg`, `mango-lassi.jpg`, `overnight-oats.jpg`, `fruit-yogurt-parfait.jpg` |
| Blog pictures | `public/images/blog/what-is-monk-fruit.jpg`, `easy-ways-to-cut-sugar.jpg`, `how-to-use-mogrona.jpg` |

If your picture is a different type (for example `.jpg` instead of `.png`),
either rename it, or change the file name written in `src/content/site.ts`.

Tip: recipe and blog pictures also help Google show your recipes and
articles with a photo in search results.

## 2. Adding a new product

In `src/content/site.ts` find the "PRODUCTS" section. Copy the whole product
block (from its opening `{` to its closing `}`), paste it underneath with a
comma between the two, and change the details and picture names. The menu,
home page, products page, product page, sitemap and search engine data update
themselves. Filling in `price` (e.g. `"Rs. 1,250"`) also lets Google show the
price in search results.

## 3. Contact details, WhatsApp and social media

In section 1 "COMPANY DETAILS" fill in:

- `email` — switches on the contact form
- `phone` — shows on the Contact page
- `whatsapp` — turns the buy buttons into "Order on WhatsApp"
- `social` — adds the links to the bottom of every page (and tells Google they are yours)

Anything left empty (`""`) is simply hidden.

## 4. Shops that sell Mogrona

In section 3 "WHERE TO BUY", add one line per shop. An example is written there.

## 5. Running the site on your own computer (optional)

Install Node.js (version 20.9 or newer), then in this folder run:

```bash
npm install
npm run dev
```

and open http://localhost:3000.

## What is built in

- **Fast pages**: every page is pre-built as static HTML and served from
  Vercel's global network; links between pages load instantly.
- **Optimised images**: pictures are resized and converted automatically.
- **SEO**: page titles and descriptions, canonical links, a sitemap
  (`/sitemap.xml`), `robots.txt`, social sharing previews, and structured data
  for the organisation, product, recipes, articles, FAQ and breadcrumbs.
- **AI search (AEO / GEO)**: `/llms.txt` gives ChatGPT, Claude, Perplexity and
  Gemini a clean summary of Mogrona, and AI crawlers are allowed in `robots.txt`.
- **Old links keep working**: addresses from the previous website such as
  `product.html?id=…` redirect to the new ones.
