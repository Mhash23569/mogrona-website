import Image from 'next/image';
import { Leaf } from './icons';

export const SIZES = {
  card: '(max-width: 640px) calc(100vw - 40px), (max-width: 1180px) 50vw, 380px',
  half: '(max-width: 900px) calc(100vw - 40px), 560px',
  hero: '(max-width: 900px) 300px, 440px',
  narrow: '(max-width: 860px) calc(100vw - 40px), 780px',
  result: '220px',
};

/**
 * A picture frame with a fixed shape. Any picture, any size, fits the frame.
 * `src` is an already-checked public path (or null when the file is missing,
 * in which case the tidy "Photo coming soon" panel is shown — no broken image
 * and no wasted request).
 */
export function Slot({
  src,
  alt,
  className,
  sizes,
  eager,
  missing,
}: {
  src: string | null;
  alt: string;
  className: string;
  sizes: string;
  eager?: boolean;
  /** The file name to mention on the placeholder's tooltip. */
  missing?: string;
}) {
  if (!src) {
    return (
      <div className={`slot ${className} is-empty`} title={missing ? `Add this picture: ${missing}` : undefined}>
        <div className="slot__ph">
          <Leaf />
          <span>Photo coming soon</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`slot ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={85}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
      />
    </div>
  );
}
