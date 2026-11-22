import type { Metadata, Viewport } from 'next';
import { Kaushan_Script, Montserrat, Oswald } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/Blocks';
import { site } from '@/content/site';
import { organizationLd, SITE_URL, websiteLd } from '@/lib/seo';
import './globals.css';

// Self-hosted Google fonts. next/font serves them from this site (preloaded, cached for a year)
// under their real names; globals.css uses those names with the original fallback list.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
  adjustFontFallback: false,
});
const oswald = Oswald({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-oswald', display: 'swap', adjustFontFallback: false });
const kaushan = Kaushan_Script({ subsets: ['latin'], weight: '400', variable: '--font-kaushan', display: 'swap', adjustFontFallback: false });

const DESCRIPTION =
  'Mogrona is a premium zero-calorie sweetener made from monk fruit extract. One sachet equals two teaspoons of sugar. No stevia, plant based, gluten free and halal. Made for Pakistan.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mogrona | Monk Fruit Sweetener – Natural Sugar Replacement in Pakistan',
    template: `%s | ${site.name}`,
  },
  description: DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: site.company, url: SITE_URL }],
  creator: site.company,
  publisher: site.company,
  category: 'food',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_PK',
    url: '/',
    title: 'Mogrona | Monk Fruit Sweetener – Natural Sugar Replacement',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: 'Mogrona | Monk Fruit Sweetener', description: DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: '#005C37',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${oswald.variable} ${kaushan.variable}`}>
      <body>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <Header />
        <main id="main">{children}</main>
        <div id="footer">
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
