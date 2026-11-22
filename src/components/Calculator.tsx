'use client';

import { useState } from 'react';
import { num, qty } from '@/lib/format';

function clamp(v: string, lo: number, hi: number, def: number) {
  const n = parseFloat(v);
  if (isNaN(n)) return def;
  return Math.min(hi, Math.max(lo, n));
}

export function Calculator({ brand, per }: { brand: string; per: number }) {
  const [cups, setCups] = useState('3');
  const [tsp, setTsp] = useState('2');
  const total = clamp(cups, 1, 30, 1) * clamp(tsp, 0.5, 10, 0.5);

  return (
    <div className="calc">
      <div>
        <label>
          Sweet cups or servings a day
          <input
            type="number"
            className="calc__cups"
            min={1}
            max={30}
            step={1}
            value={cups}
            inputMode="numeric"
            onChange={(e) => setCups(e.target.value)}
          />
        </label>
        <label>
          Teaspoons of sugar in each
          <input
            type="number"
            className="calc__tsp"
            min={0.5}
            max={10}
            step={0.5}
            value={tsp}
            inputMode="decimal"
            onChange={(e) => setTsp(e.target.value)}
          />
        </label>
      </div>
      <div className="calc__out" aria-live="polite">
        <div>
          <strong>{qty(Math.round((total / per) * 2) / 2)}</strong>
          <span>{brand} sachets a day</span>
        </div>
        <div>
          <strong>{num(total * 4)} g</strong>
          <span>grams of sugar swapped out each day</span>
        </div>
        <div>
          <strong>{num((total * 4 * 365) / 1000)} kg</strong>
          <span>kilograms of sugar a year</span>
        </div>
        <div>
          <strong>{num(total * 16)}</strong>
          <span>sugar calories avoided each day</span>
        </div>
      </div>
      <p className="note">
        Estimate only, based on one level teaspoon of sugar being about 4 g and 16 calories, and one sachet replacing {per} teaspoons of sugar.
      </p>
    </div>
  );
}
