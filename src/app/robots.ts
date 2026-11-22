import type { MetadataRoute } from 'next';
import { abs, SITE_URL } from '@/lib/seo';

/**
 * Search engines AND AI answer engines are welcome: being readable by ChatGPT,
 * Claude, Perplexity, Gemini and Copilot is what gets Mogrona mentioned in
 * their answers (Generative Engine Optimisation).
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'Bingbot',
    'CCBot',
  ];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/search'] },
      { userAgent: aiBots, allow: '/' },
    ],
    sitemap: abs('/sitemap.xml'),
    host: SITE_URL,
  };
}
