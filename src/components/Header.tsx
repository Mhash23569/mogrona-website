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

function Logo() {
  // Real logo file, if one has been added to public/images; otherwise the text wordmark.
  if (imageExists(site.logo)) {
    const size = pngSize(site.logo);
    const height = 54;
    const width = size ? Math.round((size.width / size.height) * height) : 160;
    return <Image src={publicPath(site.logo)} alt={site.name} width={width} height={height} loading="eager" />;
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
            <Logo />
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
