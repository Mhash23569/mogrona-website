import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

const dataUrl = async (file: string) =>
  `data:image/png;base64,${(await readFile(path.join(process.cwd(), 'public', file))).toString('base64')}`;

export const alt = 'Mogrona – Monk Fruit Sweetener. Zero calories. One sachet = two teaspoons of sugar.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The picture shown when a Mogrona link is shared on WhatsApp, Facebook, X, LinkedIn, etc. Uses the carton colours. */
export default async function OpengraphImage() {
  const [logo, box] = await Promise.all([dataUrl('images/logo.png'), dataUrl('images/products/monk-fruit-sachets-50-1.png')]);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          padding: '60px 80px',
          background: 'radial-gradient(ellipse at 72% 45%, #0C7A4B 0%, #005C37 55%, #00452A 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={box} width={300} height={464} alt="" style={{ position: 'absolute', right: 70, top: 83, borderRadius: 10, boxShadow: '0 20px 50px rgba(0,0,0,.45)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={430} height={172} alt="" style={{ marginLeft: -6 }} />
        <div style={{ fontSize: 26, letterSpacing: 9, textTransform: 'uppercase', color: '#EEF720', display: 'flex', marginTop: 8, marginLeft: 210 }}>Premium Sweetener</div>
        <div style={{ fontSize: 46, fontWeight: 700, marginTop: 26, display: 'flex', maxWidth: 680 }}>Monk Fruit · Natural Sugar Replacement</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 34, maxWidth: 680 }}>
          {['Zero Calories', 'No Stevia', '1 Sachet = 2 tsp Sugar', 'Halal'].map((t) => (
            <div key={t} style={{ display: 'flex', fontSize: 28, fontWeight: 700, padding: '12px 24px', borderRadius: 999, background: '#EEF720', color: '#00452A' }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
