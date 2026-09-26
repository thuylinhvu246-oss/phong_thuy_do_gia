import { listPosts } from './_lib/notion.js';
import { SITE, SERVICES } from './_lib/layout.js';
import { send } from './_lib/http.js';

export default async function handler(req, res) {
  let posts = [];
  try { posts = await listPosts(); } catch (e) { console.error(e); }
  const urls = [
    { loc: '/', pri: '1.0' },
    ...SERVICES.map((s) => ({ loc: '/' + s.slug, pri: '0.9' })),
    { loc: '/blog', pri: '0.8', mod: posts[0] && posts[0].updated },
    ...posts.map((p) => ({ loc: '/blog/' + p.slug, pri: '0.7', mod: p.updated || p.date })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE.url}${u.loc === '/' ? '/' : u.loc}</loc>${u.mod ? `<lastmod>${u.mod.slice(0, 10)}</lastmod>` : ''}<priority>${u.pri}</priority></url>`).join('\n')}
</urlset>`;
  send(res, 200, xml, 'application/xml; charset=utf-8');
}
