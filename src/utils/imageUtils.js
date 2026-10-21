/**
 * Image URL Resolution and Fallback Utility
 * Ensures images resolve correctly on localhost, preview servers, and GitHub Pages subpaths.
 */

export function getOptimizedImageUrl(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  // Strip any leading ./ or /
  const cleanPath = src.replace(/^(\.\/|\/)+/, '');
  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
}

export function handleImageFallback(e) {
  const target = e.currentTarget;
  if (!target || target.dataset.fallbackTried) return;
  target.dataset.fallbackTried = 'true';

  const originalSrc = target.getAttribute('src') || '';
  const clean = originalSrc.replace(/^(\.\/|\/)+/, '');

  // 1. If on github.io, resolve using repo pathname
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    const segments = window.location.pathname.split('/').filter(Boolean);
    const repoName = segments[0] || 'cosmetics-clinic-website';
    target.src = `/${repoName}/${clean}`;
    return;
  }

  // 2. Fallback to clean relative path
  target.src = `./${clean}`;
}
