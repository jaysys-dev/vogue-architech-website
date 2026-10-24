import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Requested asset paths. Keep all homepage image references here.
export const homepageAssets = {
  logo: '/images/brand/vogue-architech-logo.png',
  hero: '/images/hero/vogue-architech-hero.jpg',
  projects: [
    '/images/projects/project-01.jpg',
    '/images/projects/project-02.jpg',
    '/images/projects/project-03.jpg',
  ],
};

export function isHomepageAssetAvailable(assetPath) {
  return existsSync(resolve(process.cwd(), 'public', assetPath.replace(/^\/+/, '')));
}
