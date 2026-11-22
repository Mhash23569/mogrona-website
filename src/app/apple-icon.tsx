import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon for iPhone and Android (same leaf mark as the favicon). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#005C37' }}>
        <svg width="130" height="130" viewBox="0 0 64 64">
          <path d="M31 50C16 46 9 34 10 16c14 2 23 12 21 34z" fill="#7CC043" />
          <path d="M33 50c15-4 22-16 21-34-14 2-23 12-21 34z" fill="#EEF720" />
        </svg>
      </div>
    ),
    size,
  );
}
