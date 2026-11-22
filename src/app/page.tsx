import Link from 'next/link';
import { posts, products, recipes, site } from '@/content/site';
import { Badges } from '@/components/Blocks';
import { Calculator } from '@/components/Calculator';
import { PostGrid, ProductsBlock, RecipeGrid } from '@/components/Cards';
import { SIZES, Slot } from '@/components/Slot';
import { fullName, href, P0 } from '@/lib/format';
import { firstImage } from '@/lib/images';

export default function Home() {
  const hero = firstImage(site.heroImage, P0.images[0]);
  return (
    <>
      {/* Top banner */}
      <section className="hero">
        <div className="wrap hero__in">
          <div className="hero__text">
            <p className="eyebrow eyebrow--yellow">Premium Sweetener</p>
            <h1>Monk Fruit</h1>
            <p className="hero__sub">Natural Sugar Replacement</p>
            <p className="hero__lead">
              All the sweetness you love, with zero calories. Made from monk fruit extract, and one sachet is as sweet as two teaspoons of sugar.
            </p>
            <div className="btns">
              <Link className="btn" href={href.products}>
                Shop Now
              </Link>
              <Link className="btn btn--ghost" href={href.quiz}>
                Take the Quiz
              </Link>
            </div>
          </div>
          <div className="hero__media">
            <Slot src={hero} alt={fullName(P0)} className="r-1x1 contain bare" sizes={SIZES.hero} eager missing={site.heroImage} />
          </div>
        </div>
      </section>

      {/* The five boxes from the carton */}
      <section className="badges-band">
        <div className="wrap">
          <Badges />
        </div>
      </section>

      {/* Quiz invitation */}
      <section className="section">
        <div className="wrap">
          <div className="quiz-band">
            <div>
              <p className="eyebrow">Quiz</p>
              <h2>Find your perfect sweet swap</h2>
              <p>Answer four quick questions and see exactly how to swap the sugar in your day for Mogrona.</p>
            </div>
            <Link className="btn btn--green" href={href.quiz}>
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section section--white">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">Our Products</p>
            <h2>Sweetness from monk fruit</h2>
          </div>
          <ProductsBlock list={products} />
        </div>
      </section>

      {/* Two feature tiles */}
      <section className="section">
        <div className="wrap tiles">
          <div className="tile tile--green">
            <p className="eyebrow eyebrow--yellow">Recipes</p>
            <h3>Rethink your drink</h3>
            <p>Karak chai, iced coffee, mint lemonade and more, all made without sugar.</p>
            <div className="btns">
              <Link className="btn" href={href.recipes}>
                Explore Recipes
              </Link>
            </div>
          </div>
          <div className="tile">
            <p className="eyebrow">Our Story</p>
            <h3>The monk fruit story</h3>
            <p>A small green fruit, prized for its sweetness for more than 800 years.</p>
            <div className="btns">
              <Link className="btn btn--green" href={href.story}>
                Read the Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sugar swap calculator */}
      <section className="section section--green">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">Sugar Swap Calculator</p>
            <h2>See what you could swap out</h2>
            <p>Tell us how you take your tea or coffee and see how much sugar you could leave out.</p>
          </div>
          <Calculator brand={site.name} per={P0.sachetTsp || 2} />
        </div>
      </section>

      {/* Recipes */}
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">Made with Mogrona</p>
            <h2>Explore recipes</h2>
          </div>
          <RecipeGrid list={recipes.slice(0, 3)} />
          <div className="section__foot">
            <Link className="btn btn--green" href={href.recipes}>
              See All Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Health */}
      <section className="section section--peach">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Health</p>
            <h2>Sweetness without the sugar</h2>
            <p>
              Mogrona has zero calories and contains no sugar, so you can keep the sweet taste in your tea, coffee and favourite foods while cutting back on
              added sugar.
            </p>
            <p>The pack is labelled as suitable for weight control and diabetes.</p>
            <div className="btns">
              <Link className="btn btn--green" href={href.health}>
                Learn More
              </Link>
            </div>
          </div>
          <Slot src={firstImage('images/home-health.jpg')} alt="A cup of tea sweetened with Mogrona" className="r-4x3" sizes={SIZES.half} missing="images/home-health.jpg" />
        </div>
      </section>

      {/* Blog */}
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">From the Blog</p>
            <h2>Sweet reads</h2>
          </div>
          <PostGrid list={posts.slice(0, 3)} />
          <div className="section__foot">
            <Link className="btn btn--outline" href={href.blog}>
              See All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
