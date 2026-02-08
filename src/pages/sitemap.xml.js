import { getCollection } from 'astro:content';

export async function GET(context) {
  // サイトのベースURL (astro.config.mjsで設定されているsite、またはデフォルト)
  const siteUrl = context.site?.toString() || 'https://match-box.net/';
  const site = new URL(siteUrl);

  // LPコレクションを自動取得
  const lps = await getCollection('lps');

  // 固定ページ（トップページや固定のページ）
  const pages = [
    { path: '', changefreq: 'weekly', priority: 1.0 },
    { path: 'privacy', changefreq: 'yearly', priority: 0.3 },
    { path: 'company', changefreq: 'yearly', priority: 0.5 },
  ];

  // XML生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${new URL(page.path, site).href}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${lps.map((lp) => `  <url>
    <loc>${new URL(lp.slug, site).href}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}