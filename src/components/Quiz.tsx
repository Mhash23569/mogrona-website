'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { num, qty } from '@/lib/format';
import { Leaf } from './icons';

type Answers = { use?: string; tsp?: number; cups?: number; goal?: string };
type Opt = [string, string | number];

const Q: { key: keyof Answers; q: string; opts: Opt[] }[] = [
  { key: 'use', q: 'What do you sweeten most often?', opts: [['Chai or tea', 'karak-chai'], ['Coffee', 'iced-coffee'], ['Cold drinks and juices', 'mint-lemonade'], ['Breakfast and desserts', 'overnight-oats']] },
  { key: 'tsp', q: 'How much sugar do you usually add to each cup or serving?', opts: [['1 teaspoon', 1], ['2 teaspoons', 2], ['3 teaspoons', 3], ['4 teaspoons or more', 4]] },
  { key: 'cups', q: 'How many sweetened cups or servings do you have a day?', opts: [['1', 1], ['2', 2], ['3', 3], ['4 or more', 4]] },
  { key: 'goal', q: 'What matters most to you?', opts: [['Cutting down on sugar', 'sugar'], ['Watching my weight', 'weight'], ['Watching my blood sugar', 'blood'], ['Choosing plant-based sweetness', 'plant']] },
];

const GOAL: Record<string, string> = {
  sugar: 'Swapping the sugar in the cups you already drink is one of the simplest ways to cut down.',
  weight: 'Mogrona has zero calories, so your favourite drinks stay sweet without the sugar calories.',
  blood: 'Mogrona contains no sugar. If you have diabetes, ask your doctor or dietitian how it fits into your plan.',
  plant: 'Mogrona is plant based, sweetened with monk fruit extract and contains no stevia.',
};

export function Quiz({
  productName,
  productUrl,
  productImage,
  per,
  recipes,
  buyButton,
}: {
  productName: string;
  productUrl: string;
  productImage: string | null;
  per: number;
  recipes: { id: string; title: string; url: string }[];
  buyButton: ReactNode;
}) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    if (touched.current) headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  function choose(value: string | number) {
    touched.current = true;
    setAns((a) => ({ ...a, [Q[step].key]: value }));
    setStep((s) => s + 1);
  }

  if (step < Q.length) {
    const s = Q[step];
    return (
      <div className="quiz" id="quiz">
        <div className="quiz__bar">
          <i style={{ width: `${(step / Q.length) * 100}%` }}></i>
        </div>
        <p className="quiz__step">
          Question {step + 1} of {Q.length}
        </p>
        <h2 tabIndex={-1} ref={headingRef}>
          {s.q}
        </h2>
        <div className="quiz__opts">
          {s.opts.map((o) => (
            <button type="button" className="quiz__opt" key={o[0]} onClick={() => choose(o[1])}>
              {o[0]}
            </button>
          ))}
        </div>
        {step ? (
          <button
            type="button"
            className="quiz__back"
            onClick={() => {
              touched.current = true;
              setStep((x) => x - 1);
            }}
          >
            ← Back
          </button>
        ) : null}
      </div>
    );
  }

  const tsp = ans.tsp ?? 1;
  const cups = ans.cups ?? 1;
  const each = tsp / per;
  const total = tsp * cups;
  const r = recipes.find((x) => x.id === ans.use) || recipes[0];

  return (
    <div className="quiz" id="quiz">
      <div className="quiz__bar">
        <i style={{ width: '100%' }}></i>
      </div>
      <p className="quiz__step">Your sweet swap</p>
      <h2 tabIndex={-1} ref={headingRef}>
        {productName}
      </h2>
      <div className="result">
        {productImage ? (
          <div className="slot r-1x1 contain">
            <Image src={productImage} alt={productName} fill sizes="220px" quality={85} />
          </div>
        ) : (
          <div className="slot r-1x1 contain is-empty">
            <div className="slot__ph">
              <Leaf />
              <span>Photo coming soon</span>
            </div>
          </div>
        )}
        <div>
          <p>{GOAL[ans.goal ?? 'sugar']}</p>
          <p className="result__stat">
            Use <strong>{qty(each) + (each > 1 ? ' sachets' : ' sachet')}</strong> in each cup or serving in place of {tsp}
            {tsp > 1 ? ' teaspoons' : ' teaspoon'} of sugar.
          </p>
          <p className="result__stat">
            That swaps out about <strong>{num(total * 4)} g</strong> of sugar a day, or roughly <strong>{num((total * 4 * 365) / 1000)} kg</strong> a year.
          </p>
        </div>
      </div>
      {r ? (
        <p>
          <strong>A recipe to try:</strong> <Link href={r.url}>{r.title}</Link>
        </p>
      ) : null}
      <div className="btns">
        <Link className="btn btn--green" href={productUrl}>
          View product
        </Link>
        {buyButton}
      </div>
      <button
        type="button"
        className="quiz__back"
        onClick={() => {
          touched.current = true;
          setAns({});
          setStep(0);
        }}
      >
        Start again
      </button>
      <p className="note mt-[18px]">Estimate based on one level teaspoon of sugar being about 4 g.</p>
    </div>
  );
}
