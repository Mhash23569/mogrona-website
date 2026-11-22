import { site } from '@/content/site';
import { ContactDetails, JsonLd, PageHero } from '@/components/Blocks';
import { ContactForm } from '@/components/ContactForm';
import { href } from '@/lib/format';
import { abs, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact Mogrona | Lahore, Pakistan',
  absoluteTitle: true,
  description: 'Get in touch with Mogrona Private Limited, Lahore, Pakistan, for questions, feedback or trade enquiries about Mogrona monk fruit sweetener.',
  path: href.contact,
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          { '@type': 'ContactPage', url: abs(href.contact), name: `Contact ${site.name}`, about: { '@id': `${abs('/')}#organization` } },
          breadcrumbLd([
            ['Home', '/'],
            ['Contact', href.contact],
          ]),
        ]}
      />
      <PageHero eyebrow="Contact" title="Contact Us" lead="Questions, feedback or trade enquiries. We would love to hear from you." />
      <section className="section">
        <div className="wrap split items-start">
          <div>
            <ContactDetails />
          </div>
          <div>
            <ContactForm email={site.email} />
          </div>
        </div>
      </section>
    </>
  );
}
