import { ImageResponse } from 'next/og';

export const alt = 'Mogrona – Monk Fruit Sweetener. Zero calories. One sachet = two teaspoons of sugar.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The picture shown when a Mogrona link is shared on WhatsApp, Facebook, X, LinkedIn, etc. Uses the carton colours. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '70px 80px',
          background: 'radial-gradient(ellipse at 72% 45%, #0C7A4B 0%, #005C37 55%, #00452A 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 9, textTransform: 'uppercase', color: '#EEF720', display: 'flex' }}>Premium Sweetener</div>
        <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, marginTop: 14, display: 'flex' }}>MOGRONA</div>
        <div style={{ fontSize: 46, fontWeight: 700, marginTop: 18, display: 'flex' }}>Monk Fruit · Natural Sugar Replacement</div>
        <div style={{ display: 'flex', gap: 18, marginTop: 44 }}>
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
