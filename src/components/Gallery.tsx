'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Leaf } from './icons';

/** Product pictures: a big main picture with clickable thumbnails. Only pictures that exist are passed in. */
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return (
      <div className="gallery">
        <div className="slot r-1x1 contain gallery__main is-empty">
          <div className="slot__ph">
            <Leaf />
            <span>Photo coming soon</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="slot r-1x1 contain gallery__main">
        <Image
          key={images[current]}
          src={images[current]}
          alt={alt}
          fill
          sizes="(max-width: 900px) calc(100vw - 40px), 564px"
          quality={85}
          loading="eager"
          fetchPriority="high"
        />
      </div>
      {images.length > 1 ? (
        <div className="gallery__thumbs">
          {images.map((s, i) => (
            <button
              type="button"
              key={s}
              className={`thumb${i === current ? ' is-active' : ''}`}
              aria-label={`Show picture ${i + 1}`}
              onClick={() => setCurrent(i)}
            >
              <Image src={s} alt="" width={64} height={64} quality={75} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
