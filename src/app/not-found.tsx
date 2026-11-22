import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap center">
        <h1>Page not found</h1>
        <p>Sorry, we could not find that page.</p>
        <div className="btns">
          <Link className="btn btn--green" href="/">
            Go to the home page
          </Link>
          <Link className="btn btn--outline" href="/products">
            See our product
          </Link>
        </div>
      </div>
    </section>
  );
}
