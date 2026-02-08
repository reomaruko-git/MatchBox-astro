export async function GET(context) {
  // サイトのベースURL (astro.config.mjsで設定されているsite、またはデフォルト)
  const siteUrl = context.site?.toString() || 'https://match-box.net/';
  const sitemapUrl = new URL('sitemap.xml', siteUrl).href;

  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}