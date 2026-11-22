// Server-side only: reads the public folder while pages are built.
import fs from 'node:fs';
import path from 'node:path';
import { publicPath } from './format';

const cache = new Map<string, boolean>();

/** True when the picture exists in the public folder. Checked once, at build time. */
export function imageExists(src: string) {
  if (!src) return false;
  if (/^https?:\/\//.test(src)) return true;
  const rel = publicPath(src);
  if (!cache.has(rel)) cache.set(rel, fs.existsSync(path.join(process.cwd(), 'public', rel)));
  return cache.get(rel)!;
}

/** First picture in the list that exists, as a "/images/..." path, or null. */
export function firstImage(...candidates: (string | undefined)[]) {
  const found = candidates.find((c) => c && imageExists(c));
  return found ? publicPath(found) : null;
}

/** All pictures in the list that exist. */
export function existingImages(list: string[]) {
  return list.filter(imageExists).map(publicPath);
}

/** Width and height of a PNG file (used for the logo), or null. */
export function pngSize(src: string): { width: number; height: number } | null {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'public', publicPath(src)));
    if (buf.toString('ascii', 1, 4) !== 'PNG') return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}
