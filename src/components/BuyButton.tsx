import Link from 'next/link';
import { site, type Product } from '@/content/site';
import { fullName, href, waLink } from '@/lib/format';

/** "Buy Now" (shop link) → "Order on WhatsApp" (if a number is set) → "Where to Buy". */
export function BuyButton({ p, className = 'btn' }: { p: Product; className?: string }) {
  if (p.buyUrl) {
    return (
      <a className={className} href={p.buyUrl} target="_blank" rel="noopener">
        Buy Now
      </a>
    );
  }
  if (site.whatsapp) {
    return (
      <a className={className} href={waLink(`Hello, I would like to order ${fullName(p)}.`)} target="_blank" rel="noopener">
        Order on WhatsApp
      </a>
    );
  }
  return (
    <Link className={className} href={href.where}>
      Where to Buy
    </Link>
  );
}
