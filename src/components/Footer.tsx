import Link from 'next/link';
import { products, site } from '@/content/site';
import { fullName, href } from '@/lib/format';
import { Logo } from './Header';

export function Footer() {
  const social = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__about">
            <Logo />
            <p>
              <b>Marketed by</b>
              <br />
              {site.company}
              <br />
              {site.address}
            </p>
            {site.manufacturer ? (
              <p>
                <b>Manufactured by</b>
                <br />
                {site.manufacturer}
              </p>
            ) : null}
            {social.length ? (
              <div className="social">
                {social.map(([k, url]) => (
                  <a key={k} href={url} target="_blank" rel="noopener me">
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              {products.map((p) => (
                <li key={p.id}>
                  <Link href={href.product(p.id)}>{fullName(p)}</Link>
                </li>
              ))}
              <li>
                <Link href={href.where}>Where to Buy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li>
                <Link href={href.recipes}>Recipes</Link>
              </li>
              <li>
                <Link href={href.health}>Health</Link>
              </li>
              <li>
                <Link href={href.blog}>Blog</Link>
              </li>
              <li>
                <Link href={href.quiz}>Sweet Swap Quiz</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href={href.story}>Our Story</Link>
              </li>
              <li>
                <Link href={href.faq}>FAQ</Link>
              </li>
              <li>
                <Link href={href.contact}>Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <p>The information on this website is general and is not medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
