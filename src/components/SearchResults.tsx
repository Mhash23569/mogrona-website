'use client';

import Form from 'next/form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export type SearchEntry = { type: string; title: string; text: string; url: string; haystack: string };

export function SearchResults({ index }: { index: SearchEntry[] }) {
  const q = (useSearchParams().get('q') || '').trim();

  const head = (
    <Form className="form flex gap-[10px] mb-8" action="/search" role="search" key={q}>
      <input type="search" name="q" defaultValue={q} placeholder="Search the site" aria-label="Search the site" className="m-0" required />
      <button className="btn btn--green" type="submit">
        Search
      </button>
    </Form>
  );
  if (!q) return head;

  const needle = q.toLowerCase();
  const hits = index.filter((e) => e.haystack.includes(needle));

  if (!hits.length) {
    return (
      <>
        {head}
        <div className="empty">
          <h2>No results</h2>
          <p>We could not find anything for “{q}”. Try a different word.</p>
        </div>
      </>
    );
  }

  return (
    <>
      {head}
      <p className="muted">
        {hits.length}
        {hits.length === 1 ? ' result' : ' results'} for “{q}”
      </p>
      <div className="stores">
        {hits.map((h) => (
          <div className="store" key={`${h.type}-${h.title}`}>
            <span className="tag">{h.type}</span>
            <h3>
              <Link href={h.url}>{h.title}</Link>
            </h3>
            <p>{h.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
