import Image from 'next/image';
import Link from 'next/link';
import { products, site } from '@/content/site';
import { fullName, href, P0, publicPath, recipeCategories } from '@/lib/format';
import { imageExists, pngSize } from '@/lib/images';
import { BuyButton } from './BuyButton';
import { Leaf } from './icons';
import { HeaderNav } from './HeaderNav';

export function Wordmark() {
  return (
    <span className="wordmark">
      <Leaf />
      {site.name}
      <small>{site.tagline}</small>
    </span>
  );
}

/** Logo (white lettering for the green header and footer) with the tagline under it; text wordmark if the file is missing. */
export function Logo({ eager = false }: { eager?: boolean }) {
  if (imageExists(site.logo)) {
    const size = pngSize(site.logo);
    const height = 56;
    const width = size ? Math.round((size.width / size.height) * height) : 140;
    return (
      <span className="wordmark wordmark--img">
        {/* Served as-is (a crisp ~3x PNG, ~30 KB): resizing/compressing the thin script lettering made it look soft. */}
        <Image
          src={publicPath(site.logo)}
          alt={site.name}
          width={width}
          height={height}
          unoptimized
          {...(eager ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {})}
        />
        <small>{site.tagline}</small>
      </span>
    );
  }
  return <Wordmark />;
}

export function Header() {
  // The wrapper div matches the original page structure (it also limits how far the green bar "sticks").
  return (
    <div id="header">
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <div className="announce">
        <Link href={href.quiz}>
          {site.announcement} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <header className="header">
        <div className="wrap header__in">
          <Link className="logo" href="/" aria-label={`${site.name} home`}>
            <Logo eager />
          </Link>
          <HeaderNav
            productLinks={products.map((p) => ({ href: href.product(p.id), label: fullName(p) }))}
            categoryLinks={recipeCategories.map((c) => ({ href: href.recipeCategory(c), label: c }))}
            cta={<BuyButton p={P0} className="btn btn--sm" />}
          />
        </div>
      </header>
    </div>
  );
}
