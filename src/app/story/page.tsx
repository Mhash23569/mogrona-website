import Link from 'next/link';
import { JsonLd, PageHero } from '@/components/Blocks';
import { SIZES, Slot } from '@/components/Slot';
import { href } from '@/lib/format';
import { firstImage } from '@/lib/images';
import { breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Our Story and the History of Monk Fruit',
  description:
    'The Mogrona mission and the story of monk fruit (luo han guo), prized for its natural sweetness for more than 800 years and now blended in Pakistan.',
  path: href.story,
});

const TIMELINE: [string, string][] = [
  ['13th century', 'Buddhist monks in Guangxi, southern China, begin cultivating luo han guo (monk fruit).'],
  ['18th century', 'Monk fruit is documented in the Ben Cao Gang Mu Shi Yi, a supplement to the classic Chinese pharmacopoeia.'],
  ['1930s', 'Monk fruit is first documented for Western readers after a National Geographic Society-supported expedition to Guangxi.'],
  ['1995', 'Procter & Gamble patents one of the earliest processes for making a sweetener from monk fruit.'],
  ['2010', 'The U.S. FDA issues its first “no questions” response to a GRAS (Generally Recognized as Safe) notice for monk fruit extract.'],
  ['2010s', 'Monk fruit products go mainstream around the world, embraced by health-conscious and low-sugar communities.'],
  ['2026', 'Mogrona launches in Pakistan, bringing premium monk fruit sweetener to Pakistani consumers.'],
];

export default function StoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          ['Home', '/'],
          ['Our Story', href.story],
        ])}
      />
      <PageHero eyebrow="Our Story" title="The Monk Fruit Story" lead="Happier and healthier, one sweet swap at a time." />

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Happier &amp; Healthier</p>
            <h2>Our mission</h2>
            <p>At Mogrona, our mission is to help people live happier, healthier, longer lives.</p>
            <p>
              We are dedicated to creating great-tasting sugar alternatives from the best ingredients, with superior taste and quality, grown in one of the most
              beautiful valleys in China and blended right here in Pakistan.
            </p>
          </div>
          <Slot src={firstImage('images/story.jpg')} alt="A pagoda among green fields and misty mountains in Guilin, China, home of monk fruit" className="r-4x3" sizes={SIZES.half} missing="images/story.jpg" />
        </div>
      </section>

      <section className="section section--peach">
        <div className="wrap wrap--narrow">
          <p className="eyebrow">Monk Fruit Magic</p>
          <h2>A discovery, not an invention</h2>
          <p>
            In a market flooded with synthetic sweeteners invented in labs, monk fruit stands apart because it is not an invention at all. It is a discovery: a
            natural sweetness that comes from the ancient monk fruit, said to be named after the monks who harvested the fruit for its sweetness over 800 years
            ago.
          </p>
          <p>For centuries this small green fruit has been prized for its natural sweetness. When extracted, it is much sweeter than sugar but contains zero calories.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--narrow">
          <p className="eyebrow">Through the Centuries</p>
          <h2>Key moments in monk fruit history</h2>
          <ul className="timeline">
            {TIMELINE.map(([when, what]) => (
              <li key={when}>
                <b>{when}</b>
                {what}
              </li>
            ))}
          </ul>
          <div className="btns">
            <Link className="btn btn--green" href={href.products}>
              See Our Product
            </Link>
            <Link className="btn btn--outline" href={href.blog}>
              Read the Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
