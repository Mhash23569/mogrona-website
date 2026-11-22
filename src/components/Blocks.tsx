import Link from 'next/link';
import { faqs, site, stores, type Product } from '@/content/site';
import { qty, waLink } from '@/lib/format';

export function Badges() {
  return (
    <ul className="badges">
      {site.badges.map(([a, b]) => (
        <li key={b}>
          <strong>{a}</strong>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function NutritionPanel({ p }: { p: Product }) {
  const n = p.nutrition;
  if (!n) return null;
  return (
    <div className="nf">
      <h3>Nutrition Facts</h3>
      <p>{n.servings}</p>
      <div className="nf__row">
        <b>Serving size</b>
        <b>{n.servingSize}</b>
      </div>
      <div className="nf__row nf__cal">
        <span>Calories</span>
        <span>{n.calories}</span>
      </div>
      <div className="nf__row nf__dv">% Daily Value</div>
      {n.rows.map((r) => (
        <div className="nf__row" key={r[0]}>
          <span>
            <b>{r[0]}</b> {r[1]}
          </span>
          <b>{r[2]}</b>
        </div>
      ))}
    </div>
  );
}

const CONVERSION: [string, number][] = [
  ['1 teaspoon', 1],
  ['2 teaspoons', 2],
  ['1 tablespoon', 3],
  ['¼ cup', 12],
  ['⅓ cup', 16],
  ['½ cup', 24],
  ['1 cup', 48],
];

export function ConversionTable({ p }: { p: Product }) {
  const per = p.sachetTsp || 2;
  return (
    <table className="chart">
      <thead>
        <tr>
          <th>Sugar</th>
          <th>{site.name} sachets</th>
        </tr>
      </thead>
      <tbody>
        {CONVERSION.map(([label, tsp]) => {
          const s = tsp / per;
          return (
            <tr key={label}>
              <td>{label}</td>
              <td>
                {qty(s)}
                {s > 1 ? ' sachets' : ' sachet'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function FaqList() {
  return (
    <div className="faq">
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function StoresList() {
  if (!stores.length) {
    return (
      <div className="empty">
        <h2>Coming soon to a shop near you</h2>
        <p>Mogrona is launching across Pakistan, and our list of shops and online stores will appear here.</p>
        <div className="btns justify-center">
          {site.whatsapp ? (
            <a className="btn btn--green" href={waLink('Hello, I would like to order Mogrona.')} target="_blank" rel="noopener">
              Order on WhatsApp
            </a>
          ) : null}
          <Link className="btn btn--outline" href="/contact">
            Contact us
          </Link>
        </div>
      </div>
    );
  }
  const group = (type: 'online' | 'store', title: string) => {
    const list = stores.filter((s) => s.type === type);
    if (!list.length) return null;
    return (
      <>
        <h2>{title}</h2>
        <div className="stores mb-[44px]">
          {list.map((s) => (
            <div className="store" key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.city || (type === 'online' ? 'Delivery' : '')}</p>
              {s.url ? (
                <a className="btn btn--green btn--sm" href={s.url} target="_blank" rel="noopener">
                  {type === 'online' ? 'Shop online' : 'Visit website'}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <>
      {group('online', 'Buy online')}
      {group('store', 'Find in store')}
    </>
  );
}

export function ContactDetails() {
  return (
    <ul className="contact-list">
      <li>
        <b>Company</b>
        {site.company}
      </li>
      <li>
        <b>Address</b>
        <address className="not-italic">{site.address}</address>
      </li>
      {site.phone ? (
        <li>
          <b>Phone</b>
          <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a>
        </li>
      ) : null}
      {site.email ? (
        <li>
          <b>Email</b>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
      ) : null}
      {site.whatsapp ? (
        <li>
          <b>WhatsApp</b>
          <a href={waLink('Hello, I have a question about Mogrona.')} target="_blank" rel="noopener">
            Message us on WhatsApp
          </a>
        </li>
      ) : null}
    </ul>
  );
}

export function PageHero({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lead ? <p>{lead}</p> : null}
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  const graph = Array.isArray(data) ? data : [data];
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
