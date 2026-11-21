import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const machinesFile = path.join(rootDir, 'src', 'data', 'machines.ts');
const publicDir = path.join(rootDir, 'public');

// Allow overriding domain via Cloudflare / CI env var: SITE_URL or VITE_SITE_URL
const rawSiteUrl =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  process.env.CF_PAGES_URL ||
  'https://imabangla.com';
const SITE_URL = rawSiteUrl.replace(/\/+$/, '');
const LASTMOD = new Date().toISOString().split('T')[0];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Parse all machine slugs, names, and primary images directly from src/data/machines.ts
const src = fs.readFileSync(machinesFile, 'utf8');
const machineBlocks = src.split(/\{\s*\n\s*slug:/).slice(1);

const machines = [];
for (const block of machineBlocks) {
  const slugMatch = block.match(/^\s*['"]([^'"]+)['"]/);
  const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
  const imageMatch = block.match(/image:\s*['"]([^'"]+)['"]/);
  if (slugMatch) {
    machines.push({
      slug: slugMatch[1],
      name: nameMatch ? nameMatch[1] : slugMatch[1],
      image: imageMatch ? imageMatch[1] : '/og-cover.png',
    });
  }
}

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly', image: '/og-cover.png', title: 'IMA Far East Ltd. — Italian Garment Machinery Bangladesh' },
  { path: '/machines', priority: '0.95', changefreq: 'weekly', image: '/og-cover.png', title: 'Complete 75-Machine Industrial Catalog — IMA Far East Ltd.' },
  { path: '/solutions', priority: '0.85', changefreq: 'monthly', image: '/images/ima-detail-syncro.webp', title: 'Eight Turnkey Garment Factory Solutions — IMA Far East Ltd.' },
  { path: '/service', priority: '0.85', changefreq: 'monthly', image: '/images/ima-detail-zephiro-head.webp', title: '24/7 Service & OEM Spare Parts Bangladesh — IMA Far East Ltd.' },
  { path: '/about', priority: '0.85', changefreq: 'monthly', image: '/og-cover.png', title: 'About IMA Far East Ltd. (IFEL) — Dhaka Bangladesh' },
  { path: '/company', priority: '0.80', changefreq: 'monthly', image: '/images/ima-partners.webp', title: 'Company & Principal Partners — IMA Far East Ltd.' },
  { path: '/gallery', priority: '0.75', changefreq: 'monthly', image: '/og-cover.png', title: 'Exhibition & Factory Installation Gallery — IMA Far East Ltd.' },
  { path: '/contact', priority: '0.90', changefreq: 'monthly', image: '/og-cover.png', title: 'Book a Factory Audit & Quote — IMA Far East Ltd.' },
];

const urlEntries = [];

for (const route of staticRoutes) {
  const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const imgLoc = route.image.startsWith('http') ? route.image : `${SITE_URL}${route.image}`;
  urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <image:image>
      <image:loc>${escapeXml(imgLoc)}</image:loc>
      <image:title>${escapeXml(route.title)}</image:title>
    </image:image>
  </url>`);
}

for (const m of machines) {
  const loc = `${SITE_URL}/machines/${m.slug}`;
  const imgLoc = m.image.startsWith('http') ? m.image : `${SITE_URL}${m.image}`;
  urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
    <image:image>
      <image:loc>${escapeXml(imgLoc)}</image:loc>
      <image:title>${escapeXml(m.name)} — IMA Far East Ltd. Bangladesh</image:title>
    </image:image>
  </url>`);
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>
`;

const robotsTxt = `# Robots.txt for IMA Far East Ltd. (IFEL)
User-agent: *
Allow: /

# Direct Google, Bing & other search crawlers to full XML sitemap (83+ pages & machine images)
Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

console.log(`[SEO] Generated public/sitemap.xml (${urlEntries.length} URLs) and public/robots.txt for ${SITE_URL}`);
